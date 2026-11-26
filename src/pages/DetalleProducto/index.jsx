import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Loading from "@/components/Loading";
import SinConexion from "@/pages/Errores/SinConexion";
import productoService from "@/services/productoService";
import { CarritoContext } from "@/contexts/Carrito/CarritoContext";
import { stockMaximo } from "@/contexts/Carrito/stock";

import "@/styles/legacy.css";

function DetalleProducto() {
  const { id } = useParams();

  // undefined = cargando, null = no existe / no disponible
  const [producto, setProducto] = useState();
  const [errorConexion, setErrorConexion] = useState(false);

  const cargarProducto = useCallback(() => {
    return productoService
      .getById(id)
      .then((respuesta) => {
        // Los productos desactivados no se muestran en la tienda.
        setProducto(respuesta?.activo ? respuesta : null);
      })
      .catch((err) => {
        if (err.response?.status === 404 || err.response?.status === 400) {
          setProducto(null);
        } else {
          console.error(err);
          setErrorConexion(true);
        }
      });
  }, [id]);

  useEffect(() => {
    cargarProducto();
  }, [cargarProducto]);

  function reintentar() {
    setProducto(undefined);
    setErrorConexion(false);
    cargarProducto();
  }

  if (errorConexion) {
    return <SinConexion onRetry={reintentar} />;
  }

  if (producto === undefined) {
    return <Loading />;
  }

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
  const [cantidad, setCantidad] = useState(1);
  const { carrito, agregarProducto } = useContext(CarritoContext);

  const stock = stockMaximo(producto);
  const enCarrito =
    carrito.find((item) => item.id === producto.id)?.cantidad ?? 0;
  const disponible = Math.max(stock - enCarrito, 0);
  const conLimite = Number.isFinite(disponible);

  const precioFormateado = producto.precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

  const cantidadValida =
    Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= disponible;

  let ayudaCantidad = "";
  if (stock === 0) {
    ayudaCantidad = "Sin stock.";
  } else if (conLimite && disponible === 0) {
    ayudaCantidad = "Ya tienes en tu carrito todas las unidades disponibles.";
  } else if (conLimite) {
    ayudaCantidad =
      enCarrito > 0
        ? `Disponibles: ${disponible} (ya tienes ${enCarrito} en tu carrito).`
        : `Disponibles: ${disponible}.`;
  }

  function cambiarCantidad(event) {
    const valor = event.target.valueAsNumber;
    setCantidad(conLimite && valor > disponible ? disponible : valor);
  }

  async function manejarAgregar() {
    if (!cantidadValida) return;

    const agregado = await agregarProducto(producto, cantidad);
    if (agregado) {
      setCantidad(1);
    }
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
                step={1}
                min={1}
                max={conLimite ? disponible : undefined}
                value={Number.isNaN(cantidad) ? "" : cantidad}
                onChange={cambiarCantidad}
                disabled={disponible === 0}
                aria-describedby={
                  ayudaCantidad ? "producto-cantidad-ayuda" : undefined
                }
                style={{ maxWidth: "100px" }}
              />

              {ayudaCantidad && (
                <div id="producto-cantidad-ayuda" className="form-text">
                  {ayudaCantidad}
                </div>
              )}
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
                {stock === 0 ? "Sin stock" : "Agregar al carrito"}
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
