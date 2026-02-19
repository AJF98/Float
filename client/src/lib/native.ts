const DEVICE_ID_STORAGE_KEY = "mobileDeviceId";
const MOBILE_ACCESS_TOKEN_STORAGE_KEY = "mobileAccessToken";

export const getCapacitorRuntime = (): CapacitorRuntime | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.Capacitor ?? null;
};

export const isNativeCapacitorApp = (): boolean => {
  const capacitor = getCapacitorRuntime();
  return Boolean(capacitor?.isNativePlatform?.());
};

export const getOrCreateMobileDeviceId = (): string => {
  if (typeof window === "undefined") {
    return "server";
  }

  const existing = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const generated =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `device_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, generated);
  return generated;
};

export const getMobileAccessToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(MOBILE_ACCESS_TOKEN_STORAGE_KEY);
};

export const setMobileAccessToken = (token: string | null): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!token) {
    window.localStorage.removeItem(MOBILE_ACCESS_TOKEN_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(MOBILE_ACCESS_TOKEN_STORAGE_KEY, token);
};

const resolveApiOrigin = (): string | null => {
  const raw = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return new URL(trimmed).origin;
  } catch {
    return null;
  }
};

const isApiRequestUrl = (urlValue: string): boolean => {
  if (!urlValue) {
    return false;
  }

  if (urlValue.startsWith("/api/") || urlValue.startsWith("/search") || urlValue.startsWith("/health")) {
    return true;
  }

  try {
    const requestUrl = new URL(urlValue, window.location.origin);
    const apiOrigin = resolveApiOrigin();
    return Boolean(apiOrigin && requestUrl.origin === apiOrigin);
  } catch {
    return false;
  }
};

const withAuthorizationHeader = (init: RequestInit | undefined, token: string): RequestInit => {
  const headers = new Headers(init?.headers ?? {});
  if (!headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return {
    ...init,
    headers,
  };
};

export const setupNativeAuthFetchBridge = (): void => {
  if (typeof window === "undefined" || !isNativeCapacitorApp()) {
    return;
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const token = getMobileAccessToken();
    if (!token) {
      return originalFetch(input, init);
    }

    if (typeof input === "string" || input instanceof URL) {
      const url = typeof input === "string" ? input : input.toString();
      if (isApiRequestUrl(url)) {
        return originalFetch(input, withAuthorizationHeader(init, token));
      }
      return originalFetch(input, init);
    }

    const requestUrl = input.url;
    if (!isApiRequestUrl(requestUrl)) {
      return originalFetch(input, init);
    }

    const mergedInit = withAuthorizationHeader(init, token);
    const request = new Request(input, mergedInit);
    return originalFetch(request);
  }) as typeof window.fetch;
};

const normalizeExternalUrl = (rawUrl: string): string | null => {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    try {
      return new URL(trimmed, window.location.origin).toString();
    } catch {
      return null;
    }
  }

  return null;
};

export const openExternalUrl = async (rawUrl: string): Promise<boolean> => {
  const url = normalizeExternalUrl(rawUrl);
  if (!url) {
    return false;
  }

  if (!isNativeCapacitorApp()) {
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  }

  const browser = getCapacitorRuntime()?.Plugins?.Browser;
  if (!browser?.open) {
    window.location.href = url;
    return true;
  }

  await browser.open({ url });
  return true;
};

export const setupNativeWindowOpenBridge = (): void => {
  if (typeof window === "undefined" || !isNativeCapacitorApp()) {
    return;
  }

  const originalOpen = window.open.bind(window);
  const nativeCssClass = "native-capacitor";
  document.documentElement.classList.add(nativeCssClass);

  window.open = ((url?: string | URL, target?: string, features?: string) => {
    const nextUrl = typeof url === "string" ? url : url?.toString() ?? "";
    const nextTarget = (target ?? "").toLowerCase();
    const isExternalTarget = nextTarget === "_blank" || nextTarget === "_system";

    if (nextUrl && isExternalTarget) {
      void openExternalUrl(nextUrl);
      return null;
    }

    return originalOpen(nextUrl, target, features);
  }) as Window["open"];
};

export const getNativeAppVersion = async (): Promise<string | null> => {
  if (!isNativeCapacitorApp()) {
    return null;
  }

  try {
    const info = await getCapacitorRuntime()?.Plugins?.App?.getInfo?.();
    return info?.version ?? null;
  } catch {
    return null;
  }
};
