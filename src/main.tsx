import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ComponentProvider from "./components/others/ComponentProvider.tsx";
import ContextProvider from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ComponentProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </ComponentProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
