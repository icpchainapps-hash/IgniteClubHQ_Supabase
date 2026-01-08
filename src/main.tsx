import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPushSyncListener } from "./lib/pushNotifications";

// Initialize background sync listener for push notifications
// Wrap in try-catch to prevent Safari issues
try {
  initPushSyncListener();
} catch (error) {
  console.warn('Failed to initialize push sync listener:', error);
}

createRoot(document.getElementById("root")!).render(<App />);
