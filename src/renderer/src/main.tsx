import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/global.css";
import { ToastProvider } from "./components/toast/toast-context";
import { SelectedProvider } from "./components/dashboard/context/selected-context";
import { SearchProvider } from "./components/dashboard/context/search-context";
import { LoadingProvider } from "./components/loading/loading-context";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ToastProvider>
      <SearchProvider>
        <SelectedProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </SelectedProvider>
      </SearchProvider>
    </ToastProvider>
  </HashRouter>
);
