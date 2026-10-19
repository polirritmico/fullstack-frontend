import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Tienda from "./index";
import CarritoProvider from "@/contexts/Carrito/CarritoProvider";
import { productos } from "@/data/productos";

function mostrarTienda() {
  render(
    <MemoryRouter>
      <CarritoProvider>
        <Tienda />
      </CarritoProvider>
    </MemoryRouter>,
  );
}

describe("Tienda", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra todos los productos al ingresar", () => {
    mostrarTienda();

    expect(
      screen.getByText(`Productos encontrados: ${productos.length}`),
    ).toBeInTheDocument();

    for (const producto of productos) {
      expect(
        screen.getByRole("link", { name: producto.nombre }),
      ).toBeInTheDocument();
    }
  });

  it("muestra solamente juguetes al seleccionar esa categoría", () => {
    mostrarTienda();

    fireEvent.change(screen.getByRole("combobox", { name: "Categoría" }), {
      target: { value: "Juguetes" },
    });

    expect(
      screen.getByRole("link", { name: "Juguete de Cuerda" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Pelota Mordedora" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Ratón de Peluche" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "Alimento Perro Adulto" }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "Collar con Correa" }),
    ).not.toBeInTheDocument();

    expect(screen.getByText("Productos encontrados: 3")).toBeInTheDocument();
  });

  it("combina la categoría Alimentos con precios menores a 20000", () => {
    mostrarTienda();

    fireEvent.change(screen.getByRole("combobox", { name: "Categoría" }), {
      target: { value: "Alimentos" },
    });

    fireEvent.change(screen.getByRole("combobox", { name: "Precio" }), {
      target: { value: "menos-20000" },
    });

    expect(
      screen.getByRole("link", { name: "Snacks Naturales" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "Alimento Perro Adulto" }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "Alimento Gato Adulto" }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "Juguete de Cuerda" }),
    ).not.toBeInTheDocument();

    expect(screen.getByText("Productos encontrados: 1")).toBeInTheDocument();
  });
});
