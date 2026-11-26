import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { CarritoContext } from "@/contexts/Carrito/CarritoContext";
import compraService from "@/services/compraService";
import Carrito from "./index";

vi.mock("@/services/compraService", () => ({
  default: { registrarCompra: vi.fn() },
}));

const producto = {
  id: 1,
  nombre: "Alimento Perro Adulto",
  precio: 29990,
  imagen: "/img/comida-perro.png",
  cantidad: 1,
};

function mostrarCarrito(carritoValue) {
  render(
    <AuthContext value={{ user: { id: 7 } }}>
      <CarritoContext
        value={{
          carrito: [producto],
          quitarProducto: vi.fn(),
          cambiarCantidad: vi.fn(),
          vaciarCarrito: vi.fn(),
          validarCarrito: vi.fn().mockResolvedValue([]),
          ...carritoValue,
        }}
      >
        <MemoryRouter initialEntries={["/tienda/carrito"]}>
          <Routes>
            <Route path="/tienda/carrito" element={<Carrito />} />
            <Route path="/tienda/mis-compras" element={<h1>Mis compras</h1>} />
          </Routes>
        </MemoryRouter>
      </CarritoContext>
    </AuthContext>,
  );
}

describe("Carrito", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deshabilita aumentar cuando la cantidad llega al stock", () => {
    mostrarCarrito({ carrito: [{ ...producto, stock: 1 }] });

    expect(
      screen.getByRole("button", {
        name: `Aumentar cantidad de ${producto.nombre}`,
      }),
    ).toBeDisabled();
  });

  it("permite aumentar mientras quede stock", () => {
    const cambiarCantidad = vi.fn();
    mostrarCarrito({ carrito: [{ ...producto, stock: 3 }], cambiarCantidad });

    fireEvent.click(
      screen.getByRole("button", {
        name: `Aumentar cantidad de ${producto.nombre}`,
      }),
    );

    expect(cambiarCantidad).toHaveBeenCalledWith(producto.id, 2);
  });

  it("no finaliza la compra y muestra los problemas del carrito", async () => {
    const vaciarCarrito = vi.fn();
    mostrarCarrito({
      vaciarCarrito,
      validarCarrito: vi
        .fn()
        .mockResolvedValue(["Solo queda 1 unidad de Alimento Perro Adulto."]),
    });

    fireEvent.click(screen.getByRole("button", { name: "Finalizar compra" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Solo queda 1 unidad de Alimento Perro Adulto.",
    );
    expect(compraService.registrarCompra).not.toHaveBeenCalled();
    expect(vaciarCarrito).not.toHaveBeenCalled();
  });

  it("finaliza la compra cuando el carrito es válido", async () => {
    const vaciarCarrito = vi.fn();
    mostrarCarrito({ vaciarCarrito });

    fireEvent.click(screen.getByRole("button", { name: "Finalizar compra" }));

    expect(
      await screen.findByRole("heading", { name: "Mis compras" }),
    ).toBeInTheDocument();
    expect(compraService.registrarCompra).toHaveBeenCalledWith(7, [producto]);
    expect(vaciarCarrito).toHaveBeenCalled();
  });
});
