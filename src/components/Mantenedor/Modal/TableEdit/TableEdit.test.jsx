import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableEdit from ".";

const mockFields = [
  { key: "id", label: "ID", type: "string", isHidden: true },
  { key: "nombre", label: "Usuario", type: "string" },
  { key: "email", label: "Correo", type: "email" },
  {
    key: "rol",
    label: "Rol",
    type: "string",
    options: [
      { value: "Administrador", label: "Administrador" },
      { value: "Gerente", label: "Gerente" },
    ],
  },
];

const mockEntry = {
  id: "101",
  nombre: "Ana Rojas",
  email: "ana.rojas@empresa.cl",
  rol: "Administrador",
};

function renderTableEdit(props = {}) {
  const onSave = vi.fn();
  const onHide = vi.fn();

  render(
    <TableEdit
      show
      entityName="Usuario"
      fields={mockFields}
      entry={mockEntry}
      onSave={onSave}
      onHide={onHide}
      {...props}
    />,
  );

  return { onSave, onHide };
}

describe("TableEdit", () => {
  it("debería renderizar los valores por defecto sin mostrar campos ocultos", () => {
    const testCase = mockEntry;
    const expected = {
      nombre: testCase.nombre,
      email: testCase.email,
      rol: testCase.rol,
    };
    const expectedHidden = null;

    renderTableEdit();

    const output = {
      nombre: screen.getByLabelText("Usuario").value,
      email: screen.getByLabelText("Correo").value,
      rol: screen.getByLabelText("Rol").value,
    };
    const outputHidden = screen.queryByLabelText("ID");

    expect(output).toEqual(expected);
    expect(outputHidden).toBe(expectedHidden);
  });

  it("debería enviar los datos actualizados combinados con los originales", async () => {
    const testCase = { nombre: "Ana Maria Rojas", rol: "Gerente" };
    const expected = { ...mockEntry, ...testCase };

    const { onSave } = renderTableEdit();
    const nameInput = screen.getByLabelText("Usuario");
    const roleSelect = screen.getByLabelText("Rol");
    const saveButton = screen.getByRole("button", {
      name: /guardar los cambios/i,
    });
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, testCase.nombre);
    await userEvent.selectOptions(roleSelect, testCase.rol);
    await userEvent.click(saveButton);

    const output = onSave.mock.calls[0][0];
    expect(output).toEqual(expected);
  });

  it("debería cerrar al presionar el botón de cerrar del header", async () => {
    const testCase = "Close";
    const expected = 1;

    const { onHide } = renderTableEdit();
    const closeButton = screen.getByRole("button", { name: testCase });
    await userEvent.click(closeButton);
    const output = onHide.mock.calls.length;

    expect(output).toEqual(expected);
  });

  it("no debería renderizar nada si entry es nulo", () => {
    const testCase = null;
    const testSearch = "Editar usuario";
    const expected = null;

    renderTableEdit({ entry: testCase });

    const output = screen.queryByText(testSearch);
    expect(output).toBe(expected);
  });
});
