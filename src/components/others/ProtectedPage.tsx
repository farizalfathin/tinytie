import { useAuth } from "@/context/authentication";
import { Outlet } from "react-router-dom";

export default function ProtectedPage() {
  const { isAuth } = useAuth();

  if (isAuth) return <Outlet />;

  return null;
}
