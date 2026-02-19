import { useEffect } from "react";
import { TravelLoading } from "@/components/LoadingSpinners";
import { apiRequest } from "@/lib/queryClient";
import {
  getOrCreateMobileDeviceId,
  isNativeCapacitorApp,
  setMobileAccessToken,
} from "@/lib/native";

export default function Logout() {
  useEffect(() => {
    const run = async () => {
      try {
        if (isNativeCapacitorApp()) {
          await apiRequest("/api/mobile/push/unregister", {
            method: "POST",
            body: { deviceId: getOrCreateMobileDeviceId() },
          });
        }
      } catch (error) {
        console.warn("Failed to unregister push device during logout", error);
      }

      try {
        await apiRequest("/api/auth/logout", { method: "POST" });
      } catch (error) {
        console.warn("Failed to log out via API", error);
      } finally {
        if (isNativeCapacitorApp()) {
          setMobileAccessToken(null);
        }
        localStorage.clear();
        sessionStorage.clear();
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
    };

    void run();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
      <div className="text-center">
        <TravelLoading size="lg" text="Logging you out..." />
        <p className="mt-4 text-gray-600">Clearing your session...</p>
      </div>
    </div>
  );
}
