import { useContext } from "react";
import { CarritoContext } from "@/Context/CarritoContext";

function CarritoPanel() {
  const { carrito, quitarProducto } = useContext(CarritoContext);

  const subtotal = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0,
  );

  function formatearPrecio(precio) {
    return precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="titulo-carrito"
    >
      <div className="offcanvas-header">
        <h2 className="offcanvas-title h5" id="titulo-carrito">
          Mi carrito
        </h2>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar carrito"
        ></button>
      </div>

      <div className="offcanvas-body">
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map((producto) => (
              <div key={producto.id} className="border-bottom pb-3 mb-3">
                <h3 className="h6">{producto.nombre}</h3>

                <p className="mb-1">Cantidad: {producto.cantidad}</p>

                <p className="mb-0 fw-bold">
                  {formatearPrecio(producto.precio * producto.cantidad)}
                </p>

                <button
                  className="btn btn-sm btn-outline-danger mt-2"
                  type="button"
                  onClick={() => quitarProducto(producto.id)}
                >
                  Quitar
                </button>
              </div>
            ))}

            <p className="fs-5 fw-bold">
              Subtotal: {formatearPrecio(subtotal)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default CarritoPanel;
