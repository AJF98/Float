interface CapacitorPluginListenerHandle {
  remove: () => Promise<void> | void;
}

interface PushPermissionsResult {
  receive: "granted" | "denied" | "prompt";
}

interface PushRegistrationToken {
  value: string;
}

interface CapacitorPushNotificationsPlugin {
  requestPermissions: () => Promise<PushPermissionsResult>;
  register: () => Promise<void>;
  addListener: (
    eventName: "registration" | "registrationError",
    listenerFunc: ((token: PushRegistrationToken) => void) | ((error: unknown) => void),
  ) => Promise<CapacitorPluginListenerHandle> | CapacitorPluginListenerHandle;
}

interface CapacitorBrowserPlugin {
  open: (options: { url: string }) => Promise<void>;
}

interface CapacitorAppPlugin {
  getInfo: () => Promise<{ version?: string }>;
}

interface CapacitorRuntime {
  isNativePlatform?: () => boolean;
  Plugins?: {
    PushNotifications?: CapacitorPushNotificationsPlugin;
    Browser?: CapacitorBrowserPlugin;
    App?: CapacitorAppPlugin;
  };
}

interface Window {
  Capacitor?: CapacitorRuntime;
}
