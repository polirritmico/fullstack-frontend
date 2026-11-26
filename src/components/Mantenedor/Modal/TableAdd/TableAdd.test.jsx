import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableAdd from ".";

const BTN_ROLE_PATTERN = { name: /crear usuario/i }; // (i for insensitive case)
const mockFields = [
  { key: "nombre", label: "Nombre", type: "string", showInCreate: true },
];

function renderTableAdd(props = {}) {
  const onSave = vi.fn();
  const onHide = vi.fn();

  render(
    <TableAdd
      show
      entityName="Usuario"
      fields={mockFields}
      onSave={onSave}
      onHide={onHide}
      {...props}
    />,
  );

  return { onSave, onHide };
}

describe("TableAdd", () => {
  it("debería mostrar el mensaje de error de la operación", () => {
    const testCase = { error: "No se pudo crear el usuario." };
    const expected = "No se pudo crear el usuario.";

    renderTableAdd(testCase);

    expect(screen.getByRole("alert")).toHaveTextContent(expected);
  });

  it("debería deshabilitar el botón y mostrar un spinner mientras guarda", () => {
    const testCase = { isSubmitting: true };
    const expectedAttribute = ["aria-busy", "true"];
    const expectedSpinner = ".spinner-border";

    renderTableAdd(testCase);
    const outputButton = screen.getByRole("button", BTN_ROLE_PATTERN);

    expect(outputButton).toBeDisabled();
    expect(outputButton).toHaveAttribute(...expectedAttribute);
    expect(outputButton.querySelector(expectedSpinner)).toBeInTheDocument();
  });

  it("debería enviar los datos del formulario", async () => {
    const testCase = { nombre: "TestUser" };
    const expected = testCase;

    const { onSave } = renderTableAdd();
    await userEvent.type(screen.getByLabelText("Nombre"), testCase.nombre);
    await userEvent.click(screen.getByRole("button", BTN_ROLE_PATTERN));

    const output = onSave.mock.calls[0][0];
    expect(output).toEqual(expected);
  });
});
