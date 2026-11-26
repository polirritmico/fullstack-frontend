import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CategoryAdd from ".";

const icons = ["A", "B"];

function renderCategoryAdd(props = {}) {
  const onSave = vi.fn();
  const onHide = vi.fn();

  render(
    <CategoryAdd
      show
      title="Nueva Categoría"
      icons={icons}
      onSave={onSave}
      onHide={onHide}
      {...props}
    />,
  );

  return { onSave, onHide };
}

describe("CategoryAdd", () => {
  it("debería enviar el nombre, plural, descripción y el ícono por defecto", async () => {
    const testCase = {
      nombre: "Juguete",
      nombreMostrar: "Juguetes",
      descripcion: "Juguetes para mascotas",
      icon: "A",
    };
    const expected = testCase;

    const { onSave } = renderCategoryAdd();
    await userEvent.type(screen.getByLabelText("Nombre:"), testCase.nombre);
    await userEvent.type(
      screen.getByLabelText("Nombre en plural:"),
      testCase.nombreMostrar,
    );
    await userEvent.type(
      screen.getByLabelText("Descripción:"),
      testCase.descripcion,
    );
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    const output = onSave.mock.calls[0][0];
    expect(output).toEqual(expected);
  });

  it("debería mostrar el mensaje de error de la operación", () => {
    const testCase = "No se pudo crear la categoría.";
    const expected = "No se pudo crear la categoría.";

    renderCategoryAdd({ error: testCase });

    expect(screen.getByRole("alert")).toHaveTextContent(expected);
  });

  it("debería deshabilitar las acciones y mostrar un spinner mientras guarda", () => {
    renderCategoryAdd({ isSubmitting: true });

    const saveButton = screen.getByRole("button", { name: /guardar/i });
    const cancelButton = screen.getByRole("button", { name: /cancelar/i });

    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveAttribute("aria-busy", "true");
    expect(saveButton.querySelector(".spinner-border")).toBeInTheDocument();
    expect(cancelButton).toBeDisabled();
  });

  it("debería enviar el ícono seleccionado", async () => {
    const testCase = {
      nombre: "Juguete",
      nombreMostrar: "Juguetes",
      descripcion: "Juguetes para mascotas",
      icon: "B",
    };
    const expected = testCase;

    const { onSave } = renderCategoryAdd();
    await userEvent.type(screen.getByLabelText("Nombre:"), testCase.nombre);
    await userEvent.type(
      screen.getByLabelText("Nombre en plural:"),
      testCase.nombreMostrar,
    );
    await userEvent.type(
      screen.getByLabelText("Descripción:"),
      testCase.descripcion,
    );
    await userEvent.click(screen.getByRole("radio", { name: testCase.icon }));
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    const output = onSave.mock.calls[0][0];
    expect(output).toEqual(expected);
  });

  it("debería cerrar al cancelar", async () => {
    const testCase = { name: "Cancelar" };

    const { onHide } = renderCategoryAdd();
    await userEvent.click(screen.getByRole("button", testCase));

    expect(onHide).toHaveBeenCalled();
  });
});
