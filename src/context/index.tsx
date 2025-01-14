import { ReactNode } from "react";
import AuthenticationProvider from "./authentication";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
}
