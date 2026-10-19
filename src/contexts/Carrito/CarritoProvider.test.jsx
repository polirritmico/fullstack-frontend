import { useContext } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import CarritoProvider from "./CarritoProvider";
import { CarritoContext } from "./CarritoContext";

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
