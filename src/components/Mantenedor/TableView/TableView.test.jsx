import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableView from ".";

const SEARCH_PLACEHOLDER = "Buscar...";
const STATUS_SELECT_LABEL = "Selector de estados";

const mockMetadata = {
  entity: { pluralLabel: "usuarios" },
  category: {
    field: "rol",
    label: "Roles",
    addTitle: "Nueva Categoría",
    icons: ["A", "B"],
  },
  action: { key: "accion", label: "Acciones" },
  states: [
    { key: "todos", label: "Todos los estados", isDefault: true },
    { key: "activo", label: "Activo" },
    { key: "inactivo", label: "Inactivo" },
  ],
  columns: [
    { key: "nombre", label: "Usuario", isSearchable: true },
    { key: "rol", label: "Rol", isSearchable: true },
    { key: "email", label: "Correo", isSearchable: true },
    { key: "estado", label: "Estado", isState: true },
  ],
};

// prettier-ignore
const mockSidebarCategories = [
  { id: "1", value: "todos", name: "Todos", icon: "", amount: 3, isDefault: true },
  { id: "2", value: "activo", name: "Activo", icon: "", amount: 1 },
  { id: "3", value: "inactivo", name: "Inactivo", icon: "", amount: 2 },
];

// prettier-ignore
const mockData = [
  { id: "1", nombre: "Ana Rojas", email: "ana@test.com", rol: "Administrador", estado: "Activo" },
  { id: "2", nombre: "Carlos Pinto", email: "carlos@test.com", rol: "Gerente", estado: "Activo" },
  { id: "3", nombre: "Alan Brito", email: "alan.brito@test.com", rol: "Desarrollador", estado: "Inactivo" },
];

const defaultProps = {
  data: mockData,
  metadata: mockMetadata,
  sidebarCategories: mockSidebarCategories,
  toolbarPlaceholder: SEARCH_PLACEHOLDER,
  toolbarTextoBoton: "+ Agregar",
};

describe("TableView filters", () => {
  describe("Filtros por defecto", () => {
    it("debería mostrar todas las filas por defecto", () => {
      const expected = mockMetadata.columns.length;

      render(<TableView {...defaultProps} />);

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });
  });

  describe("Filtros de búsqueda", () => {
    it("debería filtrar por nombre", async () => {
      const testCase = "Ana";
      const expected = 1 + 1; // match + header

      render(<TableView {...defaultProps} />);

      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería filtrar por correo", async () => {
      const testCase = "carlos@test.com";
      const expected = 1 + 1; // match + header

      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería incluir mayúsculas y minúsculas", async () => {
      const testCase = "ANA";
      const expected = 1 + 1; // match + header

      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería filtrar por coincidencia parcial", async () => {
      const testCase = "Pint";
      const expected = 1 + 1; // match + header

      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería mostrar todas las filas con búsquedas vacías", async () => {
      const testCase = "Ana";
      const expectedBefore = 1 + 1; // match + header
      const expectedAfter = mockData.length + 1; // mock data + header

      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCase,
      );

      let output = screen.getAllByRole("row").length;
      expect(output).toBe(expectedBefore);

      await userEvent.clear(screen.getByPlaceholderText(SEARCH_PLACEHOLDER));

      output = screen.getAllByRole("row").length;
      expect(output).toBe(expectedAfter);
    });

    it("debería mostrar la tabla vacía cuando no hay coincidencias", async () => {
      const testCase = "xyz";
      const expected = 1; // solo el header

      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });
  });

  describe("Filtro de estado", () => {
    it("debería mostrar todas las filas con 'todos' seleccionado", () => {
      const expected = mockData.length + 1; // mock data + header

      render(<TableView {...defaultProps} />);

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería mostrar solo las filas 'Activo' con 'activo' seleccionado", async () => {
      const testCase = "activo";
      const expected = 2 + 1; // matches + header
      //
      render(<TableView {...defaultProps} />);
      await userEvent.selectOptions(
        screen.getByLabelText(STATUS_SELECT_LABEL),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería mostrar solo las filas 'Inactivo' con 'inactivo' seleccionado", async () => {
      const testCase = "inactivo";
      const expected = 1 + 1; // match + header
      //
      render(<TableView {...defaultProps} />);
      await userEvent.selectOptions(
        screen.getByLabelText(STATUS_SELECT_LABEL),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });
  });

  describe("Filtro combinado (AND)", () => {
    it("debería filtrar correctamente cuando la búsqueda y estado coinciden", async () => {
      const testCaseSearch = "Ana";
      const testCaseFilter = "activo";
      const expected = 1 + 1; // match + header

      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCaseSearch,
      );
      await userEvent.selectOptions(
        screen.getByLabelText(STATUS_SELECT_LABEL),
        testCaseFilter,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería mostrar la tabla vacía cuando la búsqueda coincide pero no el estado ", async () => {
      const testCaseSearch = "Alan";
      const testCaseFilter = "activo";
      const expected = 1; // solo el header
      //
      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCaseSearch,
      );
      await userEvent.selectOptions(
        screen.getByLabelText(STATUS_SELECT_LABEL),
        testCaseFilter,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });
  });
});

describe("Modal de categoría", () => {
  it("debería abrir el modal al hacer clic en + Nuevo", async () => {
    render(<TableView {...defaultProps} />);

    await userEvent.click(screen.getByRole("button", { name: "+ Nuevo" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
