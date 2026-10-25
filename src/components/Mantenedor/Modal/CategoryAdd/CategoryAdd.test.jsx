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
  it("debería enviar el nombre y el ícono por defecto", async () => {
    const testCase = { name: "Juguetes", icon: "A" };
    const expected = testCase;

    const { onSave } = renderCategoryAdd();
    await userEvent.type(screen.getByLabelText("Nombre:"), testCase.name);
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    const output = onSave.mock.calls[0][0];
    expect(output).toEqual(expected);
  });

  it("debería enviar el ícono seleccionado", async () => {
    const testCase = { name: "Accesorios", icon: "B" };
    const expected = testCase;

    const { onSave } = renderCategoryAdd();
    await userEvent.type(screen.getByLabelText("Nombre:"), testCase.name);
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
