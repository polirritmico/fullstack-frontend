import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import { CarritoContext } from "./CarritoContext";

function cargarCarrito(claveStorage) {
  try {
    const guardado = localStorage.getItem(claveStorage);
    const datos = guardado ? JSON.parse(guardado) : [];

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function CarritoProvider({ children }) {
  const sesion = useContext(AuthContext);
  const usuario = sesion?.user;

  const claveStorage = usuario ? `jk-carrito-${usuario.id}` : "jk-carrito";

  return (
    <EstadoCarrito key={claveStorage} claveStorage={claveStorage}>
      {children}
    </EstadoCarrito>
  );
}

function EstadoCarrito({ children, claveStorage }) {
  const [carrito, setCarrito] = useState(() => cargarCarrito(claveStorage));

  useEffect(() => {
    try {
      localStorage.setItem(claveStorage, JSON.stringify(carrito));
    } catch {
      console.warn("No se pudo guardar el carrito.");
    }
  }, [carrito, claveStorage]);

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

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        quitarProducto,
        cambiarCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;
