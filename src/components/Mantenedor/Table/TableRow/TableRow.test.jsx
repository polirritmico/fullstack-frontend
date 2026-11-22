import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import TableRow from "./index";

function renderRow(entry, columns, props = {}) {
  return render(
    <table>
      <tbody>
        <TableRow entry={entry} columns={columns} {...props} />
      </tbody>
    </table>,
  );
}

describe("TableRow", () => {
  describe("Dinero", () => {
    const columns = [
      { key: "nombre", label: "Producto", type: "string" },
      { key: "precio", label: "Precio", type: "money" },
    ];

    it("debería convertir números en CLP cuando el type es 'money'", () => {
      const testCase = {
        id: "42",
        nombre: "Producto test",
        sku: "42",
        categoria: "Test",
        precio: 1222333,
        stock: 80,
        estado: "Activo",
      };
      const expected = "$1.222.333";

      renderRow(testCase, columns);

      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    it("debería formatear strings numéricos enviados por el formulario", () => {
      const testCase = {
        id: "42",
        nombre: "Producto test",
        precio: "1222333",
      };

      renderRow(testCase, columns);

      expect(screen.getByText("$1.222.333")).toBeInTheDocument();
    });

    it("debería formatear el precio cero como $0", () => {
      const testCase = {
        id: "42",
        nombre: "Producto test",
        precio: 0,
      };

      renderRow(testCase, columns);

      expect(screen.getByText("$0")).toBeInTheDocument();
    });
  });
  describe("Categoría y estado", () => {
    const columns = [
      { key: "rolId", label: "Rol" },
      { key: "estadoId", label: "Estado", isState: true },
    ];

    const categories = [
      { id: 0, value: "todos", name: "Todos", isDefault: true },
      { id: 1, value: "Administrador", name: "Administradores" },
    ];

    const states = [
      { id: 0, key: "todos", label: "Todos los estados", isDefault: true },
      { id: 1, key: "activo", label: "Activo" },
      { id: 2, key: "inactivo", label: "Inactivo" },
    ];

    it("debería mostrar value de la categoría y label del estado", () => {
      const testCase = { id: 1, rolId: 1, estadoId: 1 };
      const testCaseCategory = "rolId";
      const expectedCategoria = "Administrador";
      const expectedEstado = "Activo";

      renderRow(testCase, columns, {
        categories,
        states,
        categoryField: testCaseCategory,
      });

      expect(screen.getByText(expectedCategoria)).toBeInTheDocument();
      expect(screen.getByText(expectedEstado)).toBeInTheDocument();
    });
  });
});
