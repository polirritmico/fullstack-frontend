import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { GuardTestWrapper } from "@/test/utils";

import { AuthContext } from "@/contexts/Auth/AuthContext";
import ProtectedAdminRoute from ".";

describe("ProtectedAdminRoute tests", () => {
  const protectedRoutes = ["/mantenedor/productos"];
  const unprotectedRoutes = ["/login", "/no-autorizado"];
  const initialPath = "/mantenedor/productos";

  it("debería redirigir a /login si no hay un usuario autenticado", () => {
    const testCase = null;
    const expected = "/login";

    render(
      <AuthContext value={{ user: testCase }}>
        <GuardTestWrapper
          GuardComponent={ProtectedAdminRoute}
          initialPath={initialPath}
          protectedRoutes={protectedRoutes}
          unprotectedRoutes={unprotectedRoutes}
        />
      </AuthContext>,
    );

    expect(screen.getByTestId("aqui").textContent).toBe(expected);
  });

  it("ir a /mantenedor debería redirigir a /no-autorizado si el usuario tiene rol Cliente", () => {
    const testCase = { username: "Usuario Cliente", role: "Cliente" };
    const expected = "/no-autorizado";

    render(
      <AuthContext value={{ user: testCase }}>
        <GuardTestWrapper
          GuardComponent={ProtectedAdminRoute}
          initialPath={initialPath}
          protectedRoutes={protectedRoutes}
          unprotectedRoutes={unprotectedRoutes}
        />
      </AuthContext>,
    );

    expect(screen.getByTestId("aqui").textContent).toBe(expected);
  });

  it("ir a /mantenedor/productos debería permitir el acceso si el usuario tiene rol Administrador", () => {
    const testCase = { username: "Usuario Jefe", role: "Administrador" };
    const expected = "/mantenedor/productos";

    render(
      <AuthContext value={{ user: testCase }}>
        <GuardTestWrapper
          GuardComponent={ProtectedAdminRoute}
          initialPath={initialPath}
          protectedRoutes={protectedRoutes}
          unprotectedRoutes={unprotectedRoutes}
        />
      </AuthContext>,
    );

    expect(screen.getByTestId("aqui").textContent).toBe(expected);
  });
});
