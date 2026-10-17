import { useContext, useState } from "react";
import { Link, useParams } from "react-router";
import { productos } from "@/data/productos";
import { CarritoContext } from "@/contexts/CarritoContext";

import "../../../css/detalle-producto.css";

function DetalleProducto() {
  const { id } = useParams();

  const producto = productos.find((item) => String(item.id) === id);

  if (!producto) {
    return (
      <section className="container py-5 text-center">
        <h1>Producto no encontrado</h1>

        <p>El producto solicitado no existe en el catálogo.</p>

        <Link to="/tienda" className="btn btn-primary">
          Volver a la tienda
        </Link>
      </section>
    );
  }

  return <ContenidoProducto key={producto.id} producto={producto} />;
}

function ContenidoProducto({ producto }) {
  const [cantidad, setCantidad] = useState("1");
  const { agregarProducto } = useContext(CarritoContext);

  const precioFormateado = producto.precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

  const cantidadNumerica = Number(cantidad);

  const cantidadValida =
    Number.isInteger(cantidadNumerica) && cantidadNumerica >= 1;

  function manejarAgregar() {
    if (!cantidadValida) return;

    agregarProducto(producto, cantidadNumerica);
  }

  return (
    <section className="detalle-producto py-5">
      <div className="container">
        {/* NAVEGACIÓN */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>

            <li className="breadcrumb-item">
              <Link to="/tienda">Productos</Link>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              {producto.nombre}
            </li>
          </ol>
        </nav>

        <div className="row g-5 align-items-start">
          {/* IMAGEN */}
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm p-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid detalle-producto__imagen"
              />
            </div>
          </div>

          {/* INFORMACIÓN */}
          <div className="col-12 col-lg-6">
            <span className="badge text-bg-primary mb-3">
              {producto.categoria}
            </span>

            <h1 className="mb-3">{producto.nombre}</h1>

            <p className="fs-2 fw-bold text-primary">{precioFormateado}</p>

            <p className="text-body-secondary">{producto.descripcion}</p>

            <hr />

            <div className="mb-4">
              <label htmlFor="producto-cantidad" className="form-label">
                Cantidad
              </label>

              <input
                id="producto-cantidad"
                className="form-control"
                type="number"
                min="1"
                step="1"
                value={cantidad}
                onChange={(event) => setCantidad(event.target.value)}
                style={{ maxWidth: "100px" }}
              />
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2">
              <button
                className="btn btn-primary btn-lg"
                type="button"
                disabled={!cantidadValida}
                onClick={manejarAgregar}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <i className="bi bi-cart-plus me-2" aria-hidden="true"></i>
                Agregar al carrito
              </button>

              <Link to="/tienda" className="btn btn-outline-secondary btn-lg">
                Volver a la tienda
              </Link>
            </div>
          </div>
        </div>

        {/* CARACTERÍSTICAS */}
        <section className="mt-5">
          <div className="accordion" id="informacionProducto">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#caracteristicas"
                  aria-expanded="true"
                  aria-controls="caracteristicas"
                >
                  Características
                </button>
              </h2>

              <div
                id="caracteristicas"
                className="accordion-collapse collapse show"
                data-bs-parent="#informacionProducto"
              >
                <div className="accordion-body">{producto.caracteristicas}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default DetalleProducto;
