import { useContext } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import storeManagerService from "@/services/storeManagerService";
import CarritoProvider from "./CarritoProvider";
import { CarritoContext } from "./CarritoContext";

vi.mock("@/services/storeManagerService", () => ({
  default: { validarProducto: vi.fn() },
}));

const producto = {
  id: 1,
  nombre: "Alimento Perro Adulto",
  precio: 29990,
  imagen: "/img/comida-perro.png",
};

describe("CarritoProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia vacío cuando no hay un carrito guardado", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    expect(result.current.carrito).toEqual([]);
  });

  it("agrega un producto con cantidad inicial de uno", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto(producto);
    });

    expect(result.current.carrito).toEqual([{ ...producto, cantidad: 1 }]);
  });

  it("aumenta la cantidad sin duplicar un producto existente", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto(producto);
    });

    act(() => {
      result.current.agregarProducto(producto);
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(2);
  });

  it("quita el producto indicado y mantiene los demás", () => {
    const otroProducto = {
      id: 2,
      nombre: "Alimento Gato Adulto",
      precio: 24990,
      imagen: "/img/comida-gato.png",
    };

    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto(producto);
      result.current.agregarProducto(otroProducto);
    });

    act(() => {
      result.current.quitarProducto(producto.id);
    });

    expect(result.current.carrito).toEqual([{ ...otroProducto, cantidad: 1 }]);
  });

  it("cambia la cantidad de un producto", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto(producto);
    });

    act(() => {
      result.current.cambiarCantidad(producto.id, 3);
    });

    expect(result.current.carrito[0].cantidad).toBe(3);
  });

  it("no permite cambiar la cantidad por sobre el stock", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto({ ...producto, stock: 3 });
    });

    act(() => {
      result.current.cambiarCantidad(producto.id, 3);
    });

    act(() => {
      result.current.cambiarCantidad(producto.id, 4);
    });

    expect(result.current.carrito[0].cantidad).toBe(3);
    expect(result.current.aviso).toBe(
      "Solo quedan 3 unidades de Alimento Perro Adulto.",
    );
  });

  it("no agrega más unidades que el stock del catálogo sin sesión", async () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    let agregado;
    await act(async () => {
      agregado = await result.current.agregarProducto(
        { ...producto, stock: 2 },
        3,
      );
    });

    expect(agregado).toBe(false);
    expect(result.current.carrito).toEqual([]);
    expect(result.current.aviso).toBe(
      "Solo quedan 2 unidades de Alimento Perro Adulto.",
    );
  });

  it("avisa que no quedan unidades cuando el stock es cero", async () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    await act(() => result.current.agregarProducto({ ...producto, stock: 0 }));

    expect(result.current.carrito).toEqual([]);
    expect(result.current.aviso).toBe(
      "No quedan unidades de Alimento Perro Adulto.",
    );
  });

  it("no agrega cantidades decimales", async () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    await act(() => result.current.agregarProducto(producto, 1.5));

    expect(result.current.carrito).toEqual([]);
  });

  it("rechaza cantidades menores a uno o que no sean enteras", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto(producto);
    });

    for (const cantidad of [0, -1, 1.5]) {
      act(() => {
        result.current.cambiarCantidad(producto.id, cantidad);
      });

      expect(result.current.carrito[0].cantidad).toBe(1);
    }
  });

  it("vacía el carrito", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto(producto);
    });

    expect(result.current.carrito).toHaveLength(1);

    act(() => {
      result.current.vaciarCarrito();
    });

    expect(result.current.carrito).toEqual([]);
  });

  it("guarda el carrito en localStorage después de agregar un producto", () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    act(() => {
      result.current.agregarProducto(producto);
    });

    const carritoGuardado = JSON.parse(localStorage.getItem("jk-carrito"));

    expect(carritoGuardado).toEqual([{ ...producto, cantidad: 1 }]);
  });

  it("recupera el carrito guardado al iniciar", () => {
    const carritoGuardado = [{ ...producto, cantidad: 3 }];

    localStorage.setItem("jk-carrito", JSON.stringify(carritoGuardado));

    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    expect(result.current.carrito).toEqual(carritoGuardado);
  });

  it("inicia vacío si el contenido guardado no es un JSON válido", () => {
    localStorage.setItem("jk-carrito", "contenido dañado");

    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    expect(result.current.carrito).toEqual([]);
  });
});

describe("CarritoProvider con sesión iniciada", () => {
  function ConSesion({ children }) {
    return (
      <AuthContext value={{ user: { id: 7 } }}>
        <CarritoProvider>{children}</CarritoProvider>
      </AuthContext>
    );
  }

  function renderCarritoConSesion() {
    return renderHook(() => useContext(CarritoContext), { wrapper: ConSesion });
  }

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("no valida con store-manager cuando no hay sesión", async () => {
    const { result } = renderHook(() => useContext(CarritoContext), {
      wrapper: CarritoProvider,
    });

    await act(() => result.current.agregarProducto(producto));

    expect(storeManagerService.validarProducto).not.toHaveBeenCalled();
    expect(result.current.carrito).toEqual([{ ...producto, cantidad: 1 }]);
  });

  it("agrega el producto cuando store-manager lo valida", async () => {
    vi.mocked(storeManagerService.validarProducto).mockResolvedValue({
      ...producto,
      stock: 10,
    });
    const { result } = renderCarritoConSesion();

    let agregado;
    await act(async () => {
      agregado = await result.current.agregarProducto(producto, 2);
    });

    expect(storeManagerService.validarProducto).toHaveBeenCalledWith(1);
    expect(agregado).toBe(true);
    expect(result.current.carrito).toEqual([
      { ...producto, stock: 10, cantidad: 2 },
    ]);
    expect(result.current.aviso).toBe("");
  });

  it("actualiza el stock guardado con el informado por store-manager", async () => {
    vi.mocked(storeManagerService.validarProducto).mockResolvedValue({
      ...producto,
      stock: 4,
    });
    localStorage.setItem(
      "jk-carrito-7",
      JSON.stringify([{ ...producto, stock: 30, cantidad: 1 }]),
    );
    const { result } = renderCarritoConSesion();

    await act(() => result.current.agregarProducto({ ...producto, stock: 30 }));

    expect(result.current.carrito).toEqual([
      { ...producto, stock: 4, cantidad: 2 },
    ]);
  });

  it("no agrega y avisa cuando la cantidad supera el stock", async () => {
    vi.mocked(storeManagerService.validarProducto).mockResolvedValue({
      ...producto,
      stock: 2,
    });
    const { result } = renderCarritoConSesion();

    await act(() => result.current.agregarProducto(producto, 3));

    expect(result.current.carrito).toEqual([]);
    expect(result.current.aviso).toBe(
      "Solo quedan 2 unidades de Alimento Perro Adulto.",
    );
  });

  it("considera lo que ya está en el carrito al comparar con el stock", async () => {
    vi.mocked(storeManagerService.validarProducto).mockResolvedValue({
      ...producto,
      stock: 1,
    });
    localStorage.setItem(
      "jk-carrito-7",
      JSON.stringify([{ ...producto, cantidad: 1 }]),
    );
    const { result } = renderCarritoConSesion();

    await act(() => result.current.agregarProducto(producto));

    expect(result.current.carrito).toEqual([{ ...producto, cantidad: 1 }]);
    expect(result.current.aviso).toBe(
      "Solo queda 1 unidad de Alimento Perro Adulto.",
    );
  });

  it("no agrega y muestra el motivo cuando el producto no está disponible", async () => {
    vi.mocked(storeManagerService.validarProducto).mockRejectedValue({
      response: { status: 409, data: "El producto no tiene stock disponible" },
    });
    const { result } = renderCarritoConSesion();

    await act(() => result.current.agregarProducto(producto));

    expect(result.current.carrito).toEqual([]);
    expect(result.current.aviso).toBe(
      "No se pudo agregar Alimento Perro Adulto: El producto no tiene stock disponible.",
    );
  });

  it("limpia el aviso", async () => {
    vi.mocked(storeManagerService.validarProducto).mockRejectedValue({
      response: { status: 404, data: "Producto no encontrado con ID: 1" },
    });
    const { result } = renderCarritoConSesion();

    await act(() => result.current.agregarProducto(producto));
    act(() => result.current.limpiarAviso());

    expect(result.current.aviso).toBe("");
  });

  it("validarCarrito no informa problemas cuando todo está disponible", async () => {
    vi.mocked(storeManagerService.validarProducto).mockResolvedValue({
      ...producto,
      stock: 5,
    });
    localStorage.setItem(
      "jk-carrito-7",
      JSON.stringify([{ ...producto, cantidad: 2 }]),
    );
    const { result } = renderCarritoConSesion();

    let problemas;
    await act(async () => {
      problemas = await result.current.validarCarrito();
    });

    expect(problemas).toEqual([]);
  });

  it("validarCarrito informa cada producto con problemas", async () => {
    const pelota = { id: 2, nombre: "Pelota", precio: 4990 };
    vi.mocked(storeManagerService.validarProducto).mockImplementation((id) =>
      id === 1
        ? Promise.resolve({ ...producto, stock: 1 })
        : Promise.reject({
            response: {
              status: 409,
              data: "El producto no tiene stock disponible",
            },
          }),
    );
    localStorage.setItem(
      "jk-carrito-7",
      JSON.stringify([
        { ...producto, cantidad: 3 },
        { ...pelota, cantidad: 1 },
      ]),
    );
    const { result } = renderCarritoConSesion();

    let problemas;
    await act(async () => {
      problemas = await result.current.validarCarrito();
    });

    expect(problemas).toEqual([
      "Solo queda 1 unidad de Alimento Perro Adulto.",
      "Pelota: El producto no tiene stock disponible.",
    ]);
  });
});
