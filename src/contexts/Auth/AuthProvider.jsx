// based on: https://fireship.dev/react-router-protected-routes-authentication
import { useCallback, useEffect, useState } from "react";

import authService from "@/services/authService";
import usuarioService from "@/services/usuarioService";
import { SESSION_EXPIRED_EVENT } from "@/services/session";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(function () {
    return authService.getCurrentUser();
  });

  async function login(credentials) {
    try {
      await authService.login(credentials);
      const userData = await usuarioService.getMyProfile();
      if (!userData) {
        throw new Error("No se encontró el perfil del usuario");
      }

      const userSessionData = authService.addUserDataToSession(userData);
      if (!userSessionData) {
        throw new Error("Sesión expirada");
      }

      setUser(userSessionData);
    } catch (error) {
      authService.logout();
      setUser(null);
      throw error;
    }
  }

  const logout = useCallback(function () {
    authService.logout();
    setUser(null);
  }, []);

  useEffect(() => {
    window.addEventListener(SESSION_EXPIRED_EVENT, logout);

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, logout);
    };
  }, [logout]);

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}
