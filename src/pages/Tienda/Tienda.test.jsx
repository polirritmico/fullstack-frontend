import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Tienda from "./index";
import CarritoProvider from "@/contexts/Carrito/CarritoProvider";
import productoService from "@/services/productoService";
import { productos as productosBase } from "@/data/productos";

vi.mock("@/services/productoService", () => ({
  default: { getCatalogo: vi.fn(), getCategories: vi.fn() },
}));

// Respuesta simulada de GET /api/v1/products/categories
const categorias = [
  { id: 0, name: "Todos los productos", value: "todos", isDefault: true },
  { id: 1, name: "Alimentos", value: "Alimentos" },
  { id: 2, name: "Juguetes", value: "Juguetes" },
  { id: 3, name: "Accesorios y cuidado", value: "Accesorios y cuidado" },
];

// Productos con la forma que entrega productoService.getCatalogo()
const productos = productosBase.map((producto) => ({
  ...producto,
  categoriaId: categorias.find((cat) => cat.name === producto.categoria).id,
}));

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
    vi.mocked(productoService.getCatalogo).mockReset();
    vi.mocked(productoService.getCategories).mockReset();
    vi.mocked(productoService.getCatalogo).mockResolvedValue(productos);
    vi.mocked(productoService.getCategories).mockResolvedValue(categorias);
  });

  it("muestra todos los productos obtenidos desde el backend", async () => {
    mostrarTienda();

    expect(
      await screen.findByText(`Productos encontrados: ${productos.length}`),
    ).toBeInTheDocument();

    for (const producto of productos) {
      expect(
        screen.getByRole("link", { name: producto.nombre }),
      ).toBeInTheDocument();
    }

    expect(productoService.getCatalogo).toHaveBeenCalledTimes(1);
  });

  it("carga las categorías del backend en el filtro", async () => {
    mostrarTienda();

    const filtro = await screen.findByRole("combobox", { name: "Categoría" });

    expect(
      screen.getByRole("option", { name: "Todas las categorías" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Juguetes" })).toBeInTheDocument();
    // La categoría "Todos los productos" del backend no se duplica
    expect(
      screen.queryByRole("option", { name: "Todos los productos" }),
    ).not.toBeInTheDocument();
    expect(filtro.options).toHaveLength(categorias.length);
  });

  it("muestra solamente juguetes al seleccionar esa categoría", async () => {
    mostrarTienda();

    fireEvent.change(
      await screen.findByRole("combobox", { name: "Categoría" }),
      { target: { value: "2" } },
    );

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

  it("combina la categoría Alimentos con precios menores a 20000", async () => {
    mostrarTienda();

    fireEvent.change(
      await screen.findByRole("combobox", { name: "Categoría" }),
      { target: { value: "1" } },
    );

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

  it("muestra el aviso de servidor no disponible si falla la petición", async () => {
    vi.mocked(productoService.getCatalogo).mockRejectedValue(
      new Error("Network Error"),
    );
    vi.spyOn(console, "error").mockImplementation(() => {});

    mostrarTienda();

    expect(
      await screen.findByText("Servidor no disponible"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reintentar/ }),
    ).toBeInTheDocument();
  });
});
