import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupNativeAuthFetchBridge, setupNativeWindowOpenBridge } from "./lib/native";

setupNativeAuthFetchBridge();
setupNativeWindowOpenBridge();

createRoot(document.getElementById("root")!).render(<App />);
