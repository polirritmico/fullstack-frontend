import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductCard from "./index";

const producto = {
  id: 1,
  nombre: "Alimento Perro Adulto",
  descripcion: "Alimento balanceado para perros adultos.",
  precio: 29990,
  imagen: "/img/comida-perro.png",
};

describe("ProductCard", () => {
  it("muestra el nombre, descripción, imagen y precio del producto", () => {
    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAgregar={vi.fn()} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: producto.nombre }),
    ).toBeInTheDocument();

    expect(screen.getByText(producto.descripcion)).toBeInTheDocument();

    expect(screen.getByRole("img", { name: producto.nombre })).toHaveAttribute(
      "src",
      producto.imagen,
    );

    const precioEsperado = producto.precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });

    expect(screen.getByText(precioEsperado)).toBeInTheDocument();
  });

  it("incluye el enlace al detalle del producto", () => {
    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAgregar={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: producto.nombre })).toHaveAttribute(
      "href",
      "/tienda/productos/1",
    );
  });

  it("envía el producto al presionar Agregar al carro", () => {
    const agregarProducto = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAgregar={agregarProducto} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /agregar al carro/i }));

    expect(agregarProducto).toHaveBeenCalledTimes(1);
    expect(agregarProducto).toHaveBeenCalledWith(producto);
  });
});
