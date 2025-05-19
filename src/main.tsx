import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import ContextProvider from "./context/index.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ContextProvider>
          <SidebarProvider>
            <App />
            <Toaster />
          </SidebarProvider>
        </ContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
