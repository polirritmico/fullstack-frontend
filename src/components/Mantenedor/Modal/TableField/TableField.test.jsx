import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import TableField from ".";

function renderTableField(props) {
  render(<TableField {...props} />);
}

describe("TableField", () => {
  it("debería renderizar un input genérico con el valor por defecto", () => {
    const testCase = {
      field: { key: "email", label: "Correo", type: "email", required: true },
      value: "ana@test.com",
      mode: "edit",
    };

    renderTableField(testCase);

    const input = screen.getByLabelText("Correo");
    expect(input).toHaveValue(testCase.value);
    expect(input).toBeRequired();
  });

  it("debería renderizar un textarea para el tipo text", () => {
    const testCase = {
      field: { key: "detalle", label: "Detalle", type: "text" },
      value: "Descripción",
      mode: "edit",
    };

    renderTableField(testCase);

    const textarea = screen.getByLabelText("Detalle");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveValue(testCase.value);
  });

  it("debería renderizar un selector con las opciones y el valor seleccionado", () => {
    const testCase = {
      field: {
        key: "rolId",
        label: "Rol",
        type: "int",
        options: [
          { value: 1, label: "Administrador" },
          { value: 2, label: "Gerente" },
        ],
      },
      value: 2,
      mode: "edit",
    };

    renderTableField(testCase);

    const select = screen.getByLabelText("Rol");
    expect(select).toHaveValue(String(testCase.value));
    expect(
      screen.getByRole("option", { name: "Administrador" }),
    ).toBeInTheDocument();
  });

  it("debería deshabilitar los campos de solo lectura en modo edición", () => {
    const testCase = {
      field: { key: "rut", label: "RUT", type: "string", isReadOnly: true },
      value: "12345678",
      mode: "edit",
    };

    renderTableField(testCase);

    const input = screen.getByLabelText("RUT");
    expect(input).toBeDisabled();
    expect(input).toHaveValue(testCase.value);
  });

  it("debería mostrar el valor resuelto recibido en modo vista", () => {
    render(
      <>
        <TableField
          field={{ key: "email", label: "Correo", type: "email" }}
          value="ana@test.com"
          mode="view"
        />
        <TableField
          field={{
            key: "categoriaId",
            label: "Categoría",
            type: "int",
            options: [{ value: 1, label: "Administradores" }],
          }}
          value="Administradores"
          mode="view"
        />
        <TableField
          field={{ key: "detalle", label: "Detalle", type: "text" }}
          value="Descripción"
          mode="view"
        />
      </>,
    );

    const email = screen.getByLabelText("Correo");
    const category = screen.getByLabelText("Categoría");
    const detail = screen.getByLabelText("Detalle");

    expect(email).toHaveValue("ana@test.com");
    expect(email).toBeDisabled();
    expect(category.tagName).toBe("INPUT");
    expect(category).toHaveValue("Administradores");
    expect(category).toBeDisabled();
    expect(detail.tagName).toBe("TEXTAREA");
    expect(detail).toHaveValue("Descripción");
    expect(detail).toBeDisabled();
  });
});
