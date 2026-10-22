import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableView from ".";

const mockData = [
  {
    id: "1",
    nombre: "Ana Rojas",
    correo: "ana@test.com",
    rol: "Administrador",
    estado: "Activo",
  },
  {
    id: "2",
    nombre: "Carlos Pinto",
    correo: "carlos@test.com",
    rol: "Gerente",
    estado: "Activo",
  },
  {
    id: "3",
    nombre: "Fernando V.",
    correo: "fernando@test.com",
    rol: "Desarrollador",
    estado: "Inactivo",
  },
];

const mockEstados = {
  todos: "Todos los estados",
  activo: "Activo",
  inactivo: "Inactivo",
};

const defaultProps = {
  data: mockData,
  tableColumnas: ["Usuario", "Rol", "Correo", "Estado"],
  tableCampos: {
    id: "string",
    nombre: "string",
    correo: "string",
    rol: "string",
    estado: "string",
  },
  tableEtiquetas: { contador: "usuarios", estado: "Estado" },
  tableEstados: mockEstados,
  toolbarPlaceholder: "Buscar...",
  toolbarTextoBoton: "+ Agregar",
  filterSearchFields: ["nombre", "correo", "rol"],
};

describe("TableView filters", () => {
  it("shows all rows by default", () => {
    render(<TableView {...defaultProps} />);
    expect(screen.getAllByRole("row")).toHaveLength(4);
  });

  describe("Search filter", () => {
    it("filters by nombre", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(screen.getByPlaceholderText("Buscar..."), "Ana");
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });

    it("filters by correo", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText("Buscar..."),
        "carlos@test.com",
      );
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });

    it("case insensitive", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(screen.getByPlaceholderText("Buscar..."), "ANA");
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });

    it("partial match", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(screen.getByPlaceholderText("Buscar..."), "Pint");
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });

    it("empty search shows all", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(screen.getByPlaceholderText("Buscar..."), "Ana");
      await userEvent.clear(screen.getByPlaceholderText("Buscar..."));
      expect(screen.getAllByRole("row")).toHaveLength(4);
    });

    it("no matches shows empty", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(screen.getByPlaceholderText("Buscar..."), "xyz");
      expect(screen.getAllByRole("row")).toHaveLength(1);
    });
  });

  describe("Status filter", () => {
    it("'todos' shows all", () => {
      render(<TableView {...defaultProps} />);
      expect(screen.getAllByRole("row")).toHaveLength(4);
    });

    it("'activo' shows only Activo (key→label mapping)", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.selectOptions(
        screen.getByLabelText("Selector de estados"),
        "activo",
      );
      expect(screen.getAllByRole("row")).toHaveLength(3);
    });

    it("'inactivo' shows only Inactivo", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.selectOptions(
        screen.getByLabelText("Selector de estados"),
        "inactivo",
      );
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });
  });

  describe("Combined filter (AND)", () => {
    it("search + status both match", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(screen.getByPlaceholderText("Buscar..."), "Ana");
      await userEvent.selectOptions(
        screen.getByLabelText("Selector de estados"),
        "activo",
      );
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });

    it("search matches but status doesn't", async () => {
      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText("Buscar..."),
        "Fernando",
      );
      await userEvent.selectOptions(
        screen.getByLabelText("Selector de estados"),
        "activo",
      );
      expect(screen.getAllByRole("row")).toHaveLength(1);
    });
  });
});
