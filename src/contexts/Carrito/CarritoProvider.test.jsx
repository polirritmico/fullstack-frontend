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
});
