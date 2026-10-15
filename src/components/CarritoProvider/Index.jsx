import { useState } from "react";
import { CarritoContext } from "@/Context/CarritoContext";

function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

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

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto }}>
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoProvider;
