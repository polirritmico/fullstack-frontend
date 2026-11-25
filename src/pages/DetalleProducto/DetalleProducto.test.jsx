import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import DetalleProducto from "./index";
import CarritoProvider from "@/contexts/Carrito/CarritoProvider";
import productoService from "@/services/productoService";

vi.mock("@/services/productoService", () => ({
  default: { getById: vi.fn() },
}));

const producto = {
  id: 1,
  nombre: "Alimento Perro Adulto",
  precio: 29990,
  categoriaId: 1,
  categoria: "Alimentos",
  imagen: "/img/comida-perro.png",
  descripcion: "Alimento seco balanceado para perros adultos.",
  caracteristicas: "Formato seco para perros adultos.",
  activo: true,
};

function mostrarDetalle(id = "1") {
  render(
    <MemoryRouter initialEntries={[`/tienda/productos/${id}`]}>
      <CarritoProvider>
        <Routes>
          <Route
            path="/tienda/productos/:id"
            element={<DetalleProducto />}
          />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>,
  );
}

describe("DetalleProducto", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(productoService.getById).mockReset();
  });

  it("consulta el producto por id y muestra sus datos", async () => {
    vi.mocked(productoService.getById).mockResolvedValue(producto);

    mostrarDetalle("1");

    expect(
      await screen.findByRole("heading", { name: producto.nombre }),
    ).toBeInTheDocument();
    expect(productoService.getById).toHaveBeenCalledWith("1");
    expect(screen.getByText("Alimentos")).toBeInTheDocument();
    expect(screen.getByText(producto.caracteristicas)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: producto.nombre })).toHaveAttribute(
      "src",
      producto.imagen,
    );
  });

  it("muestra 'Producto no encontrado' cuando el backend responde 404", async () => {
    vi.mocked(productoService.getById).mockRejectedValue({
      response: { status: 404 },
    });

    mostrarDetalle("99");

    expect(
      await screen.findByText("Producto no encontrado"),
    ).toBeInTheDocument();
  });

  it("no muestra productos desactivados", async () => {
    vi.mocked(productoService.getById).mockResolvedValue({
      ...producto,
      activo: false,
    });

    mostrarDetalle("1");

    expect(
      await screen.findByText("Producto no encontrado"),
    ).toBeInTheDocument();
  });
});
