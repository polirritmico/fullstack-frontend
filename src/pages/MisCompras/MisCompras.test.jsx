import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import MisCompras from ".";
import { useAuth } from "@/contexts/Auth/AuthContext";
import compraService from "@/services/compraService";

vi.mock("@/contexts/Auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/services/compraService", () => ({
  default: {
    obtenerCompras: vi.fn(),
  },
}));

const usuario = {
  id: 2,
  username: "Ana Rojas",
  email: "ana@gmail.com",
  role: "Cliente",
};

const compra = {
  id: "JK-001",
  usuarioId: usuario.id,
  fecha: "2026-10-25T12:00:00.000Z",
  estado: "En preparación",
  productos: [
    {
      id: 3,
      nombre: "Snacks Naturales",
      imagen: "/img/snacks-naturales.png",
      precio: 8990,
      cantidad: 2,
    },
  ],
  subtotal: 17980,
  despacho: 2990,
  total: 20970,
};

function mostrarCompras() {
  render(
    <MemoryRouter>
      <MisCompras />
    </MemoryRouter>,
  );
}

describe("MisCompras tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useAuth).mockReturnValue({ user: usuario });
    vi.mocked(compraService.obtenerCompras).mockReturnValue([]);
  });

  it("debería mostrar un mensaje si no existen compras", () => {
    const testCase = [];
    const expected = "Todavía no has realizado compras.";

    vi.mocked(compraService.obtenerCompras).mockReturnValue(testCase);

    mostrarCompras();

    const output = screen.getByText(expected);

    expect(output).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ir a la tienda" }),
    ).toHaveAttribute("href", "/tienda");
    expect(compraService.obtenerCompras).toHaveBeenCalledWith(usuario.id);
  });

  it("debería mostrar los productos del pedido", () => {
    const testCase = [compra];
    const expected = compra.productos[0].nombre;

    vi.mocked(compraService.obtenerCompras).mockReturnValue(testCase);

    mostrarCompras();

    const output = screen.getByRole("heading", { name: expected });

    expect(output).toBeInTheDocument();
    expect(screen.getByText("Pedido #JK-001")).toBeInTheDocument();
    expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: expected })).toHaveAttribute(
      "src",
      compra.productos[0].imagen,
    );
  });

  it("debería mostrar solo los pedidos del estado seleccionado", () => {
    const testCase = [
      compra,
      {
        ...compra,
        id: "JK-002",
        estado: "Entregado",
      },
    ];
    const expected = "Pedido #JK-002";

    vi.mocked(compraService.obtenerCompras).mockReturnValue(testCase);

    mostrarCompras();

    expect(screen.getByText("Pedido #JK-001")).toBeInTheDocument();
    expect(screen.getByText(expected)).toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("combobox", {
        name: "Filtrar pedidos por estado",
      }),
      { target: { value: "Entregado" } },
    );

    const output = screen.getByText(expected);

    expect(output).toBeInTheDocument();
    expect(screen.queryByText("Pedido #JK-001")).not.toBeInTheDocument();
  });
});
