import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/global.css";
import { ToastProvider } from "./components/toast/toast-context";
import { SelectedProvider } from "./components/dashboard/context/selected-context";
import { SearchProvider } from "./components/dashboard/context/search-context";

createRoot(document.getElementById("root")!).render(
  <ToastProvider>
    <SearchProvider>
      <SelectedProvider>
        <App />
      </SelectedProvider>
    </SearchProvider>
  </ToastProvider>
);
