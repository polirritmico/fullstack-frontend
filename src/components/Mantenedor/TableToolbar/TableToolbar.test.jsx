import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableToolbar from ".";

const mockEstados = {
  todos: "Todos los estados",
  activo: "Activo",
  inactivo: "Inactivo",
};

describe("TableToolbar", () => {
  const defaultProps = {
    placeholder: "Buscar...",
    estados: mockEstados,
    textoBoton: "+ Agregar",
    search: "",
    onSearchChange: vi.fn(),
    selectedStatus: "todos",
    onStatusChange: vi.fn(),
  };

  it("renders search input and dropdown", () => {
    render(<TableToolbar {...defaultProps} />);
    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    expect(screen.getByLabelText("Selector de estados")).toBeInTheDocument();
  });

  it("search input calls onSearchChange", () => {
    render(<TableToolbar {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Buscar..."), {
      target: { value: "test" },
    });

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("test");
  });

  it("dropdown calls onStatusChange with key", async () => {
    render(<TableToolbar {...defaultProps} />);
    await userEvent.selectOptions(
      screen.getByLabelText("Selector de estados"),
      "activo",
    );
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith("activo");
  });

  it("dropdown options show labels, values are keys", () => {
    render(<TableToolbar {...defaultProps} />);
    const options = screen.getByLabelText("Selector de estados").options;
    expect(options[0]).toHaveValue("todos");
    expect(options[0]).toHaveTextContent("Todos los estados");
    expect(options[1]).toHaveValue("activo");
    expect(options[1]).toHaveTextContent("Activo");
  });
});
