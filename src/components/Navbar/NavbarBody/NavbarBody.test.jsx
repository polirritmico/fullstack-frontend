import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { useAuth } from "@/contexts/Auth/AuthContext";
import NavbarBody from ".";

vi.mock("@/contexts/Auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

function renderNavbarBody(mockUser = null) {
  useAuth.mockReturnValue({ user: mockUser });

  render(
    <MemoryRouter>
      <NavbarBody />
    </MemoryRouter>,
  );
}

describe("NavbarBody", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Navegación base y UI", () => {
    it("debería renderizar los enlaces base con sus rutas correctas", () => {
      // NOTE: Esto debería estar alinedo con las rutas definidas en el componente
      const testCases = [
        { name: "Inicio", path: "/" },
        { name: "Tienda", path: "/tienda" },
        { name: "Nosotros", path: "/nosotros" },
      ];

      renderNavbarBody();

      testCases.forEach((testCase) => {
        const expected = testCase.path;
        const output = screen
          .getByRole("link", { name: testCase.name })
          .getAttribute("href");
        expect(output).toEqual(expected);
      });
    });

    it("debería renderizar el botón del carrito", () => {
      const testCase = { name: /carrito/i };

      renderNavbarBody();

      const output = screen.getByRole("button", testCase);
      expect(output).toBeDefined();
    });

    it("debería renderizar el botón toggler para móviles", () => {
      const testCase = { name: "Toggle navigation" };

      renderNavbarBody();

      const output = screen.getByRole("button", testCase);
      expect(output).toBeDefined();
    });
  });

  describe("Renderizado condicional por rol", () => {
    it("debería mostrar 'Crear perfil' cuando no hay un usuario autenticado", () => {
      const testCase = null;
      const expected = "/crear-perfil";

      renderNavbarBody(testCase);
      const output = screen
        .getByRole("link", { name: "Crear perfil" })
        .getAttribute("href");

      expect(output).toEqual(expected);
    });

    it("no debería mostrar 'Crear perfil' cuando hay un usuario autenticado", () => {
      const testCase = { role: "Cliente" };
      const expected = null;

      renderNavbarBody(testCase);

      const output = screen.queryByRole("link", { name: "Crear perfil" });
      expect(output).toEqual(expected);
    });

    it("debería mostrar 'Administración' cuando el usuario es Administrador", () => {
      const testCase = { role: "Administrador" };
      const expected = "/mantenedor";

      renderNavbarBody(testCase);
      const output = screen
        .getByRole("link", { name: "Administración" })
        .getAttribute("href");

      expect(output).toEqual(expected);
    });

    it("no debería mostrar 'Administración' cuando el usuario tiene otro rol", () => {
      const testCase = { role: "Cliente" };
      const expected = null;

      renderNavbarBody(testCase);

      const output = screen.queryByRole("link", { name: "Administración" });
      expect(output).toEqual(expected);
    });
  });
});
