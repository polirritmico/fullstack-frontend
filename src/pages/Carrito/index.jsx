import { useContext } from "react";
import { Link } from "react-router";
import { CarritoContext } from "@/Context/CarritoContext";

function Carrito() {
  const { carrito, quitarProducto, cambiarCantidad, vaciarCarrito } =
    useContext(CarritoContext);

  const subtotal = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0,
  );

  const despacho = carrito.length === 0 || subtotal >= 30000 ? 0 : 2990;

  const total = subtotal + despacho;

  function formatearPrecio(precio) {
    return precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }

  return (
    <section className="container my-5">
      <div className="mb-4">
        <h1 className="fw-bold">Carrito de compras</h1>

        <p className="text-body-secondary">
          Revisa los productos que agregaste.
        </p>
      </div>

      <div className="row g-4">
        {/* PRODUCTOS */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h2 className="h5 mb-0">Productos agregados</h2>
            </div>

            <div className="card-body">
              {carrito.length === 0 ? (
                <p className="mb-0">Tu carrito está vacío.</p>
              ) : (
                carrito.map((producto) => (
                  <div key={producto.id} className="border-bottom py-3">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="rounded flex-shrink-0 object-fit-contain"
                        style={{ width: "90px", height: "90px" }}
                      />

                      <h3 className="h6 mb-0">{producto.nombre}</h3>
                    </div>

                    <p className="mb-1">
                      Precio unitario: {formatearPrecio(producto.precio)}
                    </p>

                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span>Cantidad:</span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        type="button"
                        disabled={producto.cantidad <= 1}
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
                        onClick={() =>
                          cambiarCantidad(producto.id, producto.cantidad + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="fw-bold">
                      {formatearPrecio(producto.precio * producto.cantidad)}
                    </p>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => quitarProducto(producto.id)}
                    >
                      Quitar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
            <Link to="/tienda" className="btn btn-outline-primary">
              Seguir comprando
            </Link>

            <button
              className="btn btn-outline-danger"
              type="button"
              disabled={carrito.length === 0}
              onClick={vaciarCarrito}
            >
              <i className="bi bi-trash3 me-2" aria-hidden="true"></i>
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h2 className="h5 mb-0">Resumen de compra</h2>
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>{formatearPrecio(subtotal)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Despacho</span>
                <strong>{formatearPrecio(despacho)}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between fs-5">
                <strong>Total</strong>
                <strong>{formatearPrecio(total)}</strong>
              </div>

              <button
                className="btn btn-primary w-100 mt-4"
                type="button"
                disabled={carrito.length === 0}
              >
                Finalizar compra
              </button>

              <p className="small text-body-secondary mt-3 mb-0">
                Compra referencial. El pago real se implementará en una próxima
                versión.
              </p>

              <p className="small text-body-secondary mt-3 mb-0">
                Despacho gratis desde $30.000.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carrito;
