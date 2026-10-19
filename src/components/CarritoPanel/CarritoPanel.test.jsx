import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import CarritoPanel from "./index";
import CarritoProvider from "@/contexts/Carrito/CarritoProvider";

const producto = {
  id: 1,
  nombre: "Alimento Perro Adulto",
  precio: 29990,
  imagen: "/img/comida-perro.png",
  cantidad: 1,
};

function mostrarPanel() {
  localStorage.setItem("jk-carrito", JSON.stringify([producto]));

  render(
    <MemoryRouter initialEntries={["/tienda"]}>
      <CarritoProvider>
        <Routes>
          <Route path="/tienda" element={<CarritoPanel />} />

          <Route
            path="/tienda/carrito"
            element={<h1>Carrito completo de prueba</h1>}
          />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>,
  );
}

describe("CarritoPanel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra el nombre, la imagen y la cantidad del producto", () => {
    mostrarPanel();

    expect(
      screen.getByRole("heading", { name: producto.nombre }),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: producto.nombre })).toHaveAttribute(
      "src",
      producto.imagen,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("permite aumentar y disminuir la cantidad desde los botones", () => {
    mostrarPanel();

    const botonMenos = screen.getByRole("button", {
      name: `Disminuir cantidad de ${producto.nombre}`,
    });

    const botonMas = screen.getByRole("button", {
      name: `Aumentar cantidad de ${producto.nombre}`,
    });

    expect(botonMenos).toBeDisabled();

    fireEvent.click(botonMas);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(botonMenos).toBeEnabled();

    fireEvent.click(botonMenos);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(botonMenos).toBeDisabled();
  });

  it("navega al carrito completo al presionar Ver carrito", () => {
    mostrarPanel();

    fireEvent.click(screen.getByRole("button", { name: "Ver carrito" }));

    expect(
      screen.getByRole("heading", {
        name: "Carrito completo de prueba",
      }),
    ).toBeInTheDocument();
  });
});
