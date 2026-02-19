import { useEffect, useRef } from "react";

import { apiRequest } from "@/lib/queryClient";
import {
  getCapacitorRuntime,
  getNativeAppVersion,
  getOrCreateMobileDeviceId,
  isNativeCapacitorApp,
} from "@/lib/native";

type UseMobilePushOptions = {
  enabled: boolean;
  userId?: string | null;
};

const registerPushToken = async (token: string, deviceId: string): Promise<void> => {
  const appVersion = await getNativeAppVersion();

  await apiRequest("/api/mobile/push/register", {
    method: "POST",
    body: {
      token,
      platform: "ios",
      deviceId,
      appVersion,
    },
  });
};

export function useMobilePush({ enabled, userId }: UseMobilePushOptions): void {
  const listenersRef = useRef<CapacitorPluginListenerHandle[]>([]);

  useEffect(() => {
    let isDisposed = false;

    const setup = async () => {
      if (!enabled || !userId || !isNativeCapacitorApp()) {
        return;
      }

      const push = getCapacitorRuntime()?.Plugins?.PushNotifications;
      if (!push) {
        return;
      }

      const deviceId = getOrCreateMobileDeviceId();

      const registrationListener = await Promise.resolve(
        push.addListener("registration", (token) => {
          if (isDisposed || !token?.value) {
            return;
          }
          void registerPushToken(token.value, deviceId).catch((error: unknown) => {
            console.warn("Failed to register push token", error);
          });
        }),
      );

      const errorListener = await Promise.resolve(
        push.addListener("registrationError", (error) => {
          console.warn("Push registration error", error);
        }),
      );

      listenersRef.current = [registrationListener, errorListener];

      const permissions = await push.requestPermissions();
      if (permissions.receive !== "granted") {
        return;
      }

      await push.register();
    };

    void setup();

    return () => {
      isDisposed = true;
      const listeners = listenersRef.current;
      listenersRef.current = [];
      for (const listener of listeners) {
        void Promise.resolve(listener.remove()).catch(() => {
          // no-op
        });
      }
    };
  }, [enabled, userId]);
}
