// based on: https://fireship.dev/react-router-protected-routes-authentication
import { useState } from "react";

import authService from "@/services/authService";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(function () {
    return authService.getCurrentUser();
  });

  async function login(credentials) {
    const userData = await authService.login(credentials);
    setUser(userData);
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}
