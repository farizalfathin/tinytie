import { ReactNode } from "react";
import AuthenticationProvider from "./authentication";
import ThemeProvider from "./theme";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <AuthenticationProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </AuthenticationProvider>
  );
}
