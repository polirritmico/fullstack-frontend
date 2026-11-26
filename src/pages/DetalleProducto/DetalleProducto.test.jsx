import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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
          <Route path="/tienda/productos/:id" element={<DetalleProducto />} />
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

  it("limita la cantidad al stock disponible", async () => {
    vi.mocked(productoService.getById).mockResolvedValue({
      ...producto,
      stock: 5,
    });

    mostrarDetalle("1");

    const cantidad = await screen.findByLabelText("Cantidad");
    expect(cantidad).toHaveAttribute("min", "1");
    expect(cantidad).toHaveAttribute("max", "5");
    expect(screen.getByText("Disponibles: 5.")).toBeInTheDocument();

    fireEvent.change(cantidad, { target: { value: "8" } });

    expect(cantidad).toHaveValue(5);
    expect(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    ).toBeEnabled();
  });

  it("descuenta lo que ya está en el carrito", async () => {
    localStorage.setItem(
      "jk-carrito",
      JSON.stringify([{ ...producto, stock: 5, cantidad: 3 }]),
    );
    vi.mocked(productoService.getById).mockResolvedValue({
      ...producto,
      stock: 5,
    });

    mostrarDetalle("1");

    const cantidad = await screen.findByLabelText("Cantidad");
    expect(cantidad).toHaveAttribute("max", "2");
    expect(
      screen.getByText("Disponibles: 2 (ya tienes 3 en tu carrito)."),
    ).toBeInTheDocument();
  });

  it("no permite agregar cuando el carrito ya tiene todo el stock", async () => {
    localStorage.setItem(
      "jk-carrito",
      JSON.stringify([{ ...producto, stock: 2, cantidad: 2 }]),
    );
    vi.mocked(productoService.getById).mockResolvedValue({
      ...producto,
      stock: 2,
    });

    mostrarDetalle("1");

    expect(await screen.findByLabelText("Cantidad")).toBeDisabled();
    expect(
      screen.getByText(
        "Ya tienes en tu carrito todas las unidades disponibles.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    ).toBeDisabled();
  });

  it("muestra 'Sin stock' cuando no quedan unidades", async () => {
    vi.mocked(productoService.getById).mockResolvedValue({
      ...producto,
      stock: 0,
    });

    mostrarDetalle("1");

    expect(
      await screen.findByRole("button", { name: "Sin stock" }),
    ).toBeDisabled();
    expect(screen.getByLabelText("Cantidad")).toBeDisabled();
  });

  it("no permite agregar cantidades decimales", async () => {
    vi.mocked(productoService.getById).mockResolvedValue({
      ...producto,
      stock: 5,
    });

    mostrarDetalle("1");

    fireEvent.change(await screen.findByLabelText("Cantidad"), {
      target: { value: "1.5" },
    });

    expect(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    ).toBeDisabled();
  });

  it("agrega la cantidad elegida y vuelve a uno", async () => {
    vi.mocked(productoService.getById).mockResolvedValue({
      ...producto,
      stock: 5,
    });

    mostrarDetalle("1");

    const cantidad = await screen.findByLabelText("Cantidad");
    fireEvent.change(cantidad, { target: { value: "2" } });
    fireEvent.click(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    );

    expect(
      await screen.findByText("Disponibles: 3 (ya tienes 2 en tu carrito)."),
    ).toBeInTheDocument();
    expect(cantidad).toHaveValue(1);
  });
});
