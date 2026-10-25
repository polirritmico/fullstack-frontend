import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import MiPerfil from ".";
import { useAuth } from "@/contexts/Auth/AuthContext";

vi.mock("@/contexts/Auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const perfil = {
  nombre: "Ana",
  apellido: "Rojas",
  email: "ana@gmail.com",
  telefono: "912345678",
};

const usuario = {
  ...perfil,
  id: 2,
  username: "Ana Rojas",
  role: "Cliente",
};

const claveStorage = `jk-perfil-${usuario.id}`;

function mostrarPerfil() {
  render(
    <MemoryRouter>
      <MiPerfil />
    </MemoryRouter>,
  );
}

describe("MiPerfil tests", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({ user: usuario });
  });

  it("debería recuperar el perfil guardado en localStorage", () => {
    const testCase = { ...perfil, nombre: "Camila" };
    const expected = "Camila";

    localStorage.setItem(claveStorage, JSON.stringify(testCase));

    mostrarPerfil();

    const output = screen.getByLabelText("Nombre");

    expect(output).toHaveValue(expected);
    expect(output).toHaveAttribute("readonly");
    expect(
      screen.getByRole("heading", { name: "Camila Rojas" }),
    ).toBeInTheDocument();
  });

  it("debería guardar los cambios del perfil", () => {
    const testCase = "Camila";
    const expected = { ...perfil, nombre: testCase };

    mostrarPerfil();

    fireEvent.click(screen.getByRole("button", { name: "Editar información" }));

    expect(screen.getByLabelText("Nombre")).not.toHaveAttribute("readonly");

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: testCase },
    });

    fireEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

    const output = JSON.parse(localStorage.getItem(claveStorage));

    expect(output).toEqual(expected);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Perfil actualizado correctamente.",
    );
    expect(
      screen.getByRole("heading", { name: "Camila Rojas" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toHaveAttribute("readonly");
  });

  it("debería descartar los cambios al cancelar", () => {
    const testCase = "Camila";
    const expected = perfil.nombre;

    localStorage.setItem(claveStorage, JSON.stringify(perfil));

    mostrarPerfil();

    fireEvent.click(screen.getByRole("button", { name: "Editar información" }));

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: testCase },
    });

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    const output = screen.getByLabelText("Nombre");
    const outputStorage = JSON.parse(localStorage.getItem(claveStorage));

    expect(output).toHaveValue(expected);
    expect(output).toHaveAttribute("readonly");
    expect(outputStorage).toEqual(perfil);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
