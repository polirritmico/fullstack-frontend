import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import Direccion from ".";
import { useAuth } from "@/contexts/Auth/AuthContext";

vi.mock("@/contexts/Auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const usuario = {
  id: 2,
  username: "Ana Rojas",
  role: "Cliente",
};

const direccion = {
  destinatario: "Ana Rojas",
  telefono: "912345678",
  direccion: "Los Pinos 123",
  referencia: "Casa de esquina",
};

const claveStorage = `jk-direccion-${usuario.id}`;

function mostrarDireccion() {
  render(
    <MemoryRouter>
      <Direccion />
    </MemoryRouter>,
  );
}

describe("Direccion tests", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({ user: usuario });
  });

  it("debería guardar una dirección válida", () => {
    const testCase = direccion;
    const expected = direccion;

    mostrarDireccion();

    fireEvent.change(screen.getByLabelText("Nombre del destinatario"), {
      target: { value: testCase.destinatario },
    });

    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { value: testCase.telefono },
    });

    fireEvent.change(screen.getByLabelText("Dirección"), {
      target: { value: testCase.direccion },
    });

    fireEvent.change(
      screen.getByLabelText("Referencia de entrega (opcional)"),
      { target: { value: testCase.referencia } },
    );

    fireEvent.click(screen.getByRole("button", { name: "Guardar dirección" }));

    const output = JSON.parse(localStorage.getItem(claveStorage));

    expect(output).toEqual(expected);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Dirección guardada correctamente.",
    );
    expect(screen.getByLabelText("Dirección")).toHaveAttribute("readonly");
  });

  it("debería recuperar la dirección guardada", () => {
    const testCase = direccion;
    const expected = testCase.direccion;

    localStorage.setItem(claveStorage, JSON.stringify(testCase));

    mostrarDireccion();

    const output = screen.getByLabelText("Dirección");

    expect(output).toHaveValue(expected);
    expect(output).toHaveAttribute("readonly");
    expect(screen.getByLabelText("Nombre del destinatario")).toHaveValue(
      testCase.destinatario,
    );
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
  });

  it("debería eliminar la dirección y limpiar el formulario", () => {
    const testCase = direccion;
    const expected = null;

    localStorage.setItem(claveStorage, JSON.stringify(testCase));

    mostrarDireccion();

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    const output = localStorage.getItem(claveStorage);

    expect(output).toBe(expected);
    expect(screen.getByLabelText("Dirección")).toHaveValue("");
    expect(screen.getByLabelText("Dirección")).not.toHaveAttribute("readonly");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Dirección eliminada correctamente.",
    );
    expect(
      screen.getByRole("button", { name: "Guardar dirección" }),
    ).toBeInTheDocument();
  });
});
