import { useEffect, useState } from "react";
import { CarritoContext } from "@/Context/CarritoContext";

function cargarCarrito() {
  try {
    const guardado = localStorage.getItem("jk-carrito");
    const datos = guardado ? JSON.parse(guardado) : [];

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(cargarCarrito);

  useEffect(() => {
    try {
      localStorage.setItem("jk-carrito", JSON.stringify(carrito));
    } catch {
      console.warn("No se pudo guardar el carrito.");
    }
  }, [carrito]);

  function agregarProducto(producto, cantidad = 1) {
    setCarrito((actual) => {
      const existe = actual.some((item) => item.id === producto.id);

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }

      return [...actual, { ...producto, cantidad }];
    });
  }

  function quitarProducto(id) {
    setCarrito((actual) => actual.filter((producto) => producto.id !== id));
  }

  function cambiarCantidad(id, cantidad) {
    if (!Number.isInteger(cantidad) || cantidad < 1) return;

    setCarrito((actual) =>
      actual.map((producto) =>
        producto.id === id ? { ...producto, cantidad } : producto,
      ),
    );
  }

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, quitarProducto, cambiarCantidad }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;
