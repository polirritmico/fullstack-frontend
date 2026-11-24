import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import TableDetails from ".";

const fields = [
  { key: "nombre", label: "Nombre", type: "string" },
  { key: "categoriaId", label: "Categoría", type: "int" },
  { key: "estadoId", label: "Estado", type: "int", isState: true },
];

const entry = {
  id: 1,
  nombre: "Café",
  categoriaId: 10,
  estadoId: 2,
};

function renderTableDetails(props = {}) {
  render(
    <TableDetails
      show
      entityName="Producto"
      fields={fields}
      entry={entry}
      categories={[{ id: 10, value: "Bebidas" }]}
      states={[{ id: 2, label: "Activo" }]}
      categoryField="categoriaId"
      onHide={vi.fn()}
      {...props}
    />,
  );
}

describe("TableDetails", () => {
  it("debería resolver los valores de categoría y estado antes de renderizar", () => {
    renderTableDetails();

    expect(screen.getByLabelText("Nombre")).toHaveValue(entry.nombre);
    expect(screen.getByLabelText("Categoría")).toHaveValue("Bebidas");
    expect(screen.getByLabelText("Estado")).toHaveValue("Activo");
  });

  it("debería mostrar los campos como solo lectura", () => {
    renderTableDetails();

    expect(screen.getByLabelText("Nombre")).toBeDisabled();
    expect(screen.getByLabelText("Categoría")).toBeDisabled();
    expect(screen.getByLabelText("Estado")).toBeDisabled();
  });
});
