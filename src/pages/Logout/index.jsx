import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "@/contexts/Auth/AuthContext";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/", { replace: true });
  }, [logout, navigate]);

  return null;
}

export default Logout;
