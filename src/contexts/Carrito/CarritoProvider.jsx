import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import storeManagerService from "@/services/storeManagerService";
import { getApiErrorMessage } from "@/services/utils/apiError";
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
    <EstadoCarrito
      key={claveStorage}
      claveStorage={claveStorage}
      conSesion={Boolean(usuario)}
    >
      {children}
    </EstadoCarrito>
  );
}

function mensajeStockInsuficiente(producto, stock) {
  const unidades = stock === 1 ? "queda 1 unidad" : `quedan ${stock} unidades`;
  return `Solo ${unidades} de ${producto.nombre}.`;
}

function EstadoCarrito({ children, claveStorage, conSesion }) {
  const [carrito, setCarrito] = useState(() => cargarCarrito(claveStorage));
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(claveStorage, JSON.stringify(carrito));
    } catch {
      console.warn("No se pudo guardar el carrito.");
    }
  }, [carrito, claveStorage]);

  async function agregarProducto(producto, cantidad = 1) {
    setAviso("");

    if (!conSesion) {
      sumarAlCarrito(producto, cantidad);
      return true;
    }

    const cantidadEnCarrito =
      carrito.find((item) => item.id === producto.id)?.cantidad ?? 0;

    try {
      const validado = await storeManagerService.validarProducto(producto.id);

      if (validado.stock < cantidadEnCarrito + cantidad) {
        setAviso(mensajeStockInsuficiente(producto, validado.stock));
        return false;
      }
    } catch (err) {
      setAviso(
        `No se pudo agregar ${producto.nombre}: ${getApiErrorMessage(err)}`,
      );
      return false;
    }

    sumarAlCarrito(producto, cantidad);
    return true;
  }

  function limpiarAviso() {
    setAviso("");
  }

  function sumarAlCarrito(producto, cantidad) {
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
        aviso,
        limpiarAviso,
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
