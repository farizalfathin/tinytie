import { useAuth } from "@/context/authentication";
import { Helmet } from "react-helmet-async";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedPage() {
  const { user } = useAuth();
  const isAdmin = user?.id === import.meta.env.VITE_ADMIN_ID;

  if (isAdmin)
    return (
      <>
        <Helmet>
          <title>TinyTie | Admin</title>
        </Helmet>
        <Outlet />
      </>
    );

  return <Navigate to="/" replace />;
}
