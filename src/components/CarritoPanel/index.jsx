import { useContext } from "react";
import { CarritoContext } from "@/contexts/Carrito/CarritoContext";
import { useNavigate } from "react-router";

function CarritoPanel() {
  const { carrito, quitarProducto, cambiarCantidad } =
    useContext(CarritoContext);

  const navigate = useNavigate();

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
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="rounded flex-shrink-0 object-fit-contain"
                    style={{ width: "70px", height: "70px" }}
                  />

                  <h3 className="h6 mb-0">{producto.nombre}</h3>
                </div>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <span>Cantidad:</span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    disabled={producto.cantidad <= 1}
                    aria-label={`Disminuir cantidad de ${producto.nombre}`}
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad - 1)
                    }
                  >
                    −
                  </button>

                  <span>{producto.cantidad}</span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    aria-label={`Aumentar cantidad de ${producto.nombre}`}
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad + 1)
                    }
                  >
                    +
                  </button>
                </div>

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

            <button
              type="button"
              className="btn btn-primary w-100"
              data-bs-dismiss="offcanvas"
              onClick={() => navigate("/tienda/carrito")}
            >
              Ver carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CarritoPanel;
