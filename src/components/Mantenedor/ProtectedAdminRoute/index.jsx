import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "@/contexts/Auth/AuthContext";

const ADMIN_ROLE = "Administrador";

function ProtectedAdminRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (user.role !== ADMIN_ROLE) {
    return <Navigate to="/no-autorizado" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
