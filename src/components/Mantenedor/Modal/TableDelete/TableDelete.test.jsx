import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableDelete from ".";

const metadata = {
  entity: { singleLabel: "Usuario" },
  delete: { nameKey: "nombre", detailKey: "email", detailLabel: "Correo" },
};

function renderTableDelete(props = {}) {
  const onConfirm = vi.fn();
  const onHide = vi.fn();

  render(
    <TableDelete
      show
      entry={{
        id: "1",
        nombre: "Ana Rojas",
        email: "ana@test.com",
      }}
      metadata={metadata}
      onConfirm={onConfirm}
      onHide={onHide}
      {...props}
    />,
  );

  return { onConfirm, onHide };
}

describe("TableDelete", () => {
  it("debería mostrar los datos del registro", () => {
    const testCase = {
      titulo: "Eliminar Usuario",
      nombre: "Ana Rojas",
      correo: "Correo: ana@test.com",
    };

    renderTableDelete();

    const output = {
      titulo: screen.getByText(testCase.titulo),
      nombre: screen.getByText(testCase.nombre),
      correo: screen.getByText(testCase.correo),
    };
    expect(output.titulo).toBeInTheDocument();
    expect(output.nombre).toBeInTheDocument();
    expect(output.correo).toBeInTheDocument();
  });

  it("debería confirmar la eliminación", async () => {
    const { onConfirm } = renderTableDelete();

    await userEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(onConfirm).toHaveBeenCalled();
  });

  it("debería cerrar al cancelar", async () => {
    const { onHide } = renderTableDelete();

    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onHide).toHaveBeenCalled();
  });
});
