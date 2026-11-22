import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableToolbar from ".";

const mockEstados = {
  0: "Todos los estados",
  1: "Activo",
  2: "Inactivo",
};

describe("TableToolbar", () => {
  const defaultProps = {
    placeholder: "Buscar...",
    estados: mockEstados,
    textoBoton: "+ Agregar",
    search: "",
    onSearchChange: vi.fn(),
    selectedStatus: 0, // "todos"
    onStatusChange: vi.fn(),
  };

  it("debería renderizar barra de búsqueda y selector de estados", () => {
    const expectedSearchBar = "Buscar...";
    const expectedStateSelector = "Selector de estados";

    render(<TableToolbar {...defaultProps} />);
    expect(screen.getByPlaceholderText(expectedSearchBar)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedStateSelector)).toBeInTheDocument();
  });

  it("campo de búsqueda debería llamar a onSearchChange", () => {
    const testCase = "test";
    const expected = "test";

    render(<TableToolbar {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Buscar..."), {
      target: { value: testCase },
    });

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith(expected);
  });

  it("seleccionar estado debería lanzar onStatusChange con la llave del estado", async () => {
    const testCase = "1"; // "activo"
    const expected = 1;

    render(<TableToolbar {...defaultProps} />);
    await userEvent.selectOptions(
      screen.getByLabelText("Selector de estados"),
      testCase,
    );

    expect(defaultProps.onStatusChange).toHaveBeenCalledWith(expected);
  });

  it("debería mostrar etiquetas", () => {
    render(<TableToolbar {...defaultProps} />);
    const options = screen.getByLabelText("Selector de estados").options;
    expect(options[0]).toHaveValue("0");
    expect(options[0]).toHaveTextContent("Todos los estados");
    expect(options[1]).toHaveValue("1");
    expect(options[1]).toHaveTextContent("Activo");
  });
});
