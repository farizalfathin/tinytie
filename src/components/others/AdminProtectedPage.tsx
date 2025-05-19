import { useAuth } from "@/context/authentication";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedPage() {
  const { user } = useAuth();
  const isAdmin = user?.id === import.meta.env.VITE_ADMIN_ID;

  if (isAdmin) return <Outlet />;

  return <Navigate to="/" replace />;
}
