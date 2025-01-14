import { useAuth } from "@/context/authentication";
import { ReactNode } from "react";

export default function AuthProtected({
  componentUnAuth,
  componentAuth,
}: {
  componentUnAuth: ReactNode;
  componentAuth: ReactNode | false;
}) {
  const { isAuth } = useAuth();

  if (isAuth) {
    return componentAuth ? componentAuth : null;
  }

  return componentUnAuth;
}
