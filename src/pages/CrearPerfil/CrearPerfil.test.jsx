import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import CrearPerfil from ".";

function completarFormulario(cambios = {}) {
  const datos = {
    Nombre: "Ana",
    Apellido: "Rojas",
    RUN: "123456785",
    Teléfono: "912345678",
    "Correo electrónico": "ana@gmail.com",
    Dirección: "Los Pinos 123",
    Comuna: "Santiago",
    Región: "metropolitana",
    Contraseña: "Clave1234",
    "Confirmar contraseña": "Clave1234",
    ...cambios,
  };

  for (const [etiqueta, valor] of Object.entries(datos)) {
    fireEvent.change(screen.getByLabelText(etiqueta), {
      target: { value: valor },
    });
  }

  fireEvent.click(
    screen.getByRole("checkbox", { name: /acepto los términos/i }),
  );
}

describe("CrearPerfil tests", () => {
  it("debería validar datos correctos y limpiar el formulario", () => {
    const expected = "Datos validados correctamente";

    render(<CrearPerfil />);
    completarFormulario();

    fireEvent.click(screen.getByRole("button", { name: "Registrar" }));

    const output = screen.getByRole("status").textContent;

    expect(output).toContain(expected);
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("Contraseña")).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("debería rechazar un RUN con dígito verificador incorrecto", () => {
    const testCase = { RUN: "123456789" };
    const expected = "Ingresa un RUN válido, sin puntos ni guion.";

    render(<CrearPerfil />);
    completarFormulario(testCase);

    fireEvent.click(screen.getByRole("button", { name: "Registrar" }));

    const output = screen.getByRole("alert").textContent;

    expect(output).toBe(expected);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("debería rechazar contraseñas que no coinciden", () => {
    const testCase = { "Confirmar contraseña": "OtraClave123" };
    const expected = "Las contraseñas deben coincidir";

    render(<CrearPerfil />);
    completarFormulario(testCase);

    fireEvent.click(screen.getByRole("button", { name: "Registrar" }));

    const output = screen.getByRole("alert").textContent;

    expect(output).toContain(expected);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
