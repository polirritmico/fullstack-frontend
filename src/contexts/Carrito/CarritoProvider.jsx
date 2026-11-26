import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import storeManagerService from "@/services/storeManagerService";
import { getApiErrorMessage } from "@/services/utils/apiError";
import { CarritoContext } from "./CarritoContext";
import { stockMaximo } from "./stock";

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
  if (stock <= 0) {
    return `No quedan unidades de ${producto.nombre}.`;
  }

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

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      return false;
    }

    const cantidadEnCarrito =
      carrito.find((item) => item.id === producto.id)?.cantidad ?? 0;

    if (!conSesion) {
      const stock = stockMaximo(producto);

      if (stock < cantidadEnCarrito + cantidad) {
        setAviso(mensajeStockInsuficiente(producto, stock));
        return false;
      }

      sumarAlCarrito(producto, cantidad);
      return true;
    }

    let stockActual;

    try {
      const validado = await storeManagerService.validarProducto(producto.id);
      stockActual = validado.stock;

      if (stockActual < cantidadEnCarrito + cantidad) {
        setAviso(mensajeStockInsuficiente(producto, stockActual));
        return false;
      }
    } catch (err) {
      setAviso(
        `No se pudo agregar ${producto.nombre}: ${getApiErrorMessage(err)}`,
      );
      return false;
    }

    sumarAlCarrito({ ...producto, stock: stockActual }, cantidad);
    return true;
  }

  function limpiarAviso() {
    setAviso("");
  }

  async function validarCarrito() {
    const resultados = await Promise.all(
      carrito.map(async (producto) => {
        try {
          const validado = await storeManagerService.validarProducto(
            producto.id,
          );

          return validado.stock < producto.cantidad
            ? mensajeStockInsuficiente(producto, validado.stock)
            : null;
        } catch (err) {
          return `${producto.nombre}: ${getApiErrorMessage(err)}`;
        }
      }),
    );

    return resultados.filter(Boolean);
  }

  function sumarAlCarrito(producto, cantidad) {
    setCarrito((actual) => {
      const existe = actual.some((item) => item.id === producto.id);

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                stock: producto.stock ?? item.stock,
                cantidad: item.cantidad + cantidad,
              }
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

    const producto = carrito.find((item) => item.id === id);
    const stock = stockMaximo(producto);

    if (producto && cantidad > stock) {
      setAviso(mensajeStockInsuficiente(producto, stock));
      return;
    }

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
        validarCarrito,
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
