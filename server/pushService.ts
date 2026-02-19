import http2 from "http2";
import { createPrivateKey, createSign } from "crypto";

type PushPayload = {
  title: string;
  body: string;
  data?: Record<string, string>;
};

type PushSendResult = {
  token: string;
  ok: boolean;
  reason?: string;
  status?: number;
};

const APNS_TOKEN_TTL_SECONDS = 50 * 60;

let cachedJwtToken: { value: string; expiresAt: number } | null = null;

const parseBoolean = (value: string | undefined): boolean => {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
};

const getApnsHost = (): string =>
  parseBoolean(process.env.APNS_USE_SANDBOX)
    ? "api.sandbox.push.apple.com"
    : "api.push.apple.com";

const toBase64Url = (value: string | Buffer): string =>
  Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const createApnsJwt = (): string => {
  const teamId = process.env.APNS_TEAM_ID;
  const keyId = process.env.APNS_KEY_ID;
  const privateKeyRaw = process.env.APNS_PRIVATE_KEY;

  if (!teamId || !keyId || !privateKeyRaw) {
    throw new Error("APNS_TEAM_ID, APNS_KEY_ID, and APNS_PRIVATE_KEY are required");
  }

  const now = Math.floor(Date.now() / 1000);

  if (cachedJwtToken && cachedJwtToken.expiresAt > now + 60) {
    return cachedJwtToken.value;
  }

  const header = toBase64Url(JSON.stringify({ alg: "ES256", kid: keyId, typ: "JWT" }));
  const claims = toBase64Url(JSON.stringify({ iss: teamId, iat: now }));
  const signingInput = `${header}.${claims}`;

  const privateKey = createPrivateKey(privateKeyRaw.replace(/\\n/g, "\n"));
  const signer = createSign("SHA256");
  signer.update(signingInput);
  signer.end();

  const signature = signer.sign(privateKey);
  const jwt = `${signingInput}.${toBase64Url(signature)}`;
  cachedJwtToken = {
    value: jwt,
    expiresAt: now + APNS_TOKEN_TTL_SECONDS,
  };

  return jwt;
};

const sendPush = (
  client: http2.ClientHttp2Session,
  token: string,
  topic: string,
  bearerToken: string,
  payload: PushPayload,
): Promise<PushSendResult> =>
  new Promise((resolve) => {
    const req = client.request({
      ":method": "POST",
      ":path": `/3/device/${token}`,
      authorization: `bearer ${bearerToken}`,
      "apns-topic": topic,
      "apns-push-type": "alert",
      "apns-priority": "10",
      "content-type": "application/json",
    });

    let status: number | undefined;
    let responseBody = "";

    req.setEncoding("utf8");
    req.on("response", (headers) => {
      const rawStatus = headers[":status"];
      status = typeof rawStatus === "number" ? rawStatus : Number(rawStatus);
    });

    req.on("data", (chunk) => {
      responseBody += chunk;
    });

    req.on("error", (error) => {
      resolve({
        token,
        ok: false,
        reason: error instanceof Error ? error.message : "apns_request_error",
        status,
      });
    });

    req.on("end", () => {
      if (status === 200) {
        resolve({ token, ok: true, status });
        return;
      }

      let reason = "apns_rejected";
      try {
        const parsed = JSON.parse(responseBody) as { reason?: string };
        if (parsed?.reason) {
          reason = parsed.reason;
        }
      } catch {
        // Ignore parse errors and keep generic reason.
      }

      resolve({ token, ok: false, reason, status });
    });

    req.end(
      JSON.stringify({
        aps: {
          alert: {
            title: payload.title,
            body: payload.body,
          },
          sound: "default",
        },
        data: payload.data ?? {},
      }),
    );
  });

const isApnsConfigured = (): boolean =>
  Boolean(
    process.env.APNS_TEAM_ID &&
      process.env.APNS_KEY_ID &&
      process.env.APNS_PRIVATE_KEY &&
      process.env.APNS_BUNDLE_ID,
  );

export async function sendPushNotificationToDeviceTokens(
  tokens: string[],
  payload: PushPayload,
): Promise<PushSendResult[]> {
  if (!tokens.length) {
    return [];
  }

  if (!isApnsConfigured()) {
    return tokens.map((token) => ({ token, ok: false, reason: "apns_not_configured" }));
  }

  const topic = process.env.APNS_BUNDLE_ID as string;
  const host = getApnsHost();
  let bearerToken: string;
  try {
    bearerToken = createApnsJwt();
  } catch (error) {
    return tokens.map((token) => ({
      token,
      ok: false,
      reason: error instanceof Error ? error.message : "apns_jwt_error",
    }));
  }

  const client = http2.connect(`https://${host}`);
  client.on("error", () => {
    // Request-level handlers already capture per-token failures.
  });

  try {
    const results = await Promise.all(
      tokens.map((token) => sendPush(client, token, topic, bearerToken, payload)),
    );
    return results;
  } catch (error) {
    return tokens.map((token) => ({
      token,
      ok: false,
      reason: error instanceof Error ? error.message : "apns_send_error",
    }));
  } finally {
    client.close();
  }
}

export const __testables__ = {
  isApnsConfigured,
  parseBoolean,
};
