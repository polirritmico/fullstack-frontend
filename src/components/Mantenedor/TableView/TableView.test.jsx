import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TableView from ".";

const SEARCH_PLACEHOLDER = "Buscar...";
const STATUS_SELECT_LABEL = "Selector de estados";

const STATUS_SELECT_ACTIVO = "1";
const STATUS_SELECT_INACTIVO = "2";

const mockMetadata = {
  entity: { singleLabel: "Usuario", pluralLabel: "usuarios" },
  category: {
    field: "rolId",
    label: "Roles",
    addTitle: "Nueva Categoría",
    icons: ["A", "B"],
  },
  delete: {
    nameKey: "nombre",
    detailKey: "email",
    detailLabel: "Correo",
  },
  action: { key: "accion", label: "Acciones" },
  states: [
    { id: 0, key: "todos", label: "Todos los estados", isDefault: true },
    { id: 1, key: "activo", label: "Activo" },
    { id: 2, key: "inactivo", label: "Inactivo" },
  ],
  columns: [
    { key: "nombre", label: "Usuario", isSearchable: true },
    { key: "rolId", label: "Rol", isSearchable: true },
    { key: "email", label: "Correo", isSearchable: true },
    { key: "estadoId", label: "Estado", isState: true },
  ],
};

// prettier-ignore
const mockSidebarCategories = [
  { id: 0, value: "todos", name: "Todos", icon: "", amount: 3, isDefault: true },
  { id: 1, value: "Administrador", name: "Administradores", icon: "", amount: 2 },
  { id: 2, value: "Gerente", name: "Gerentes", icon: "", amount: 1 },
];

// prettier-ignore
const mockData = [
  { id: 1, nombre: "Ana Rojas", email: "ana@test.com", rolId: 1, estadoId: 1 },
  { id: 2, nombre: "Carlos Pinto", email: "carlos@test.com", rolId: 2, estadoId: 1 },
  { id: 3, nombre: "Alan Brito", email: "alan.brito@test.com", rolId: 1, estadoId: 2 },
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
      const expected = mockData.length + 1;

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

    it("debería filtrar por value de la categoría", async () => {
      const testCase = "Administra";
      const expected = 2 + 1; // matches + header

      render(<TableView {...defaultProps} />);
      await userEvent.type(
        screen.getByPlaceholderText(SEARCH_PLACEHOLDER),
        testCase,
      );

      expect(screen.getAllByRole("row")).toHaveLength(expected);
    });

    it("debería filtrar por la categoría del sidebar", async () => {
      const testCase = /Administra/;
      const expected = 2 + 1; // matches + header

      render(<TableView {...defaultProps} />);
      await userEvent.click(screen.getByRole("button", { name: testCase }));

      expect(screen.getAllByRole("row")).toHaveLength(expected);
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
      const testCase = STATUS_SELECT_ACTIVO;
      const expected = 2 + 1; // matches + header

      render(<TableView {...defaultProps} />);
      await userEvent.selectOptions(
        screen.getByLabelText(STATUS_SELECT_LABEL),
        testCase,
      );

      const output = screen.getAllByRole("row").length;
      expect(output).toBe(expected);
    });

    it("debería mostrar solo las filas 'Inactivo' con 'inactivo' seleccionado", async () => {
      const testCase = STATUS_SELECT_INACTIVO;
      const expected = 1 + 1; // match + header

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
      const testCaseFilter = STATUS_SELECT_ACTIVO;
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
      const testCaseFilter = STATUS_SELECT_ACTIVO;
      const expected = 1; // solo el header

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

describe("TableView modales", () => {
  describe("Modal de categoría", () => {
    it("debería abrir el modal al hacer clic en + Nuevo", async () => {
      render(<TableView {...defaultProps} />);

      await userEvent.click(screen.getByRole("button", { name: "+ Nuevo" }));

      expect(await screen.findByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Modal de eliminación", () => {
    it("debería abrir el modal con el registro seleccionado", async () => {
      const testCase = { ...defaultProps };
      const expected = "Ana Rojas";

      render(<TableView {...testCase} />);
      await userEvent.click(
        screen.getAllByRole("button", { name: "Eliminar" })[0],
      );
      const dialog = await screen.findByRole("dialog");

      const output = within(dialog).getByText(expected);
      expect(output).toBeInTheDocument();
    });
  });

  describe("Errores de operaciones", () => {
    it("debería mostrar error del back y mantener abierto el modal al fallar la creación", async () => {
      const testCase = "El usuario ya existe.";
      const onAdd = vi.fn().mockRejectedValue({
        response: { data: { message: testCase } },
      });

      render(<TableView {...defaultProps} onAdd={onAdd} />);
      await userEvent.click(screen.getByRole("button", { name: "+ Agregar" }));
      const dialog = await screen.findByRole("dialog");

      await userEvent.click(
        within(dialog).getByRole("button", { name: "Crear Usuario" }),
      );

      const output = await within(dialog).findByRole("alert");
      expect(output).toHaveTextContent(testCase);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("debería deshabilitar el botón mientras la creación está en curso", async () => {
      const onAdd = vi.fn(() => new Promise(() => {}));

      render(<TableView {...defaultProps} onAdd={onAdd} />);
      await userEvent.click(screen.getByRole("button", { name: "+ Agregar" }));
      const dialog = await screen.findByRole("dialog");
      const saveButton = within(dialog).getByRole("button", {
        name: "Crear Usuario",
      });

      await userEvent.click(saveButton);

      expect(saveButton).toBeDisabled();
      expect(saveButton).toHaveAttribute("aria-busy", "true");
      expect(saveButton.querySelector(".spinner-border")).toBeInTheDocument();
    });
  });
});
