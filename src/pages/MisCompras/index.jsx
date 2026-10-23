import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { useAuth } from "@/contexts/Auth/AuthContext";
import compraService from "@/services/compraService";

function MisCompras() {
  const { user } = useAuth();
  const location = useLocation();

  const [estado, setEstado] = useState("Todos");
  const [mostrarExito, setMostrarExito] = useState(
    Boolean(location.state?.compraCreada),
  );

  if (!user) {
    return (
      <Navigate to="/login" state={{ from: "/tienda/mis-compras" }} replace />
    );
  }

  let compras = [];
  let error = "";

  try {
    compras = compraService.obtenerCompras(user.id);
  } catch {
    error =
      "No se pudo cargar tu historial de compras. Los datos guardados no se han eliminado.";
  }

  const comprasFiltradas = compras.filter(
    (compra) => estado === "Todos" || compra.estado === estado,
  );

  const nombreCompleto =
    [user.nombre, user.apellido].filter(Boolean).join(" ") || user.username;

  function formatearPrecio(precio) {
    return precio.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }

  function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function colorEstado(estadoCompra) {
    if (estadoCompra === "Entregado") return "text-bg-success";
    if (estadoCompra === "En camino") return "text-bg-info";
    if (estadoCompra === "Cancelado") return "text-bg-danger";

    return "text-bg-warning";
  }

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-4 fw-bold">Historial de compras</h1>

        {mostrarExito && (
          <div className="alert alert-success alert-dismissible" role="status">
            Tu compra simulada se registró correctamente. No se realizó ningún
            cobro.
            <button
              className="btn-close"
              type="button"
              aria-label="Cerrar aviso"
              onClick={() => setMostrarExito(false)}
            ></button>
          </div>
        )}

        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <div className="card border-0 shadow-sm text-center p-4 mb-4">
              <i
                className="bi bi-person-circle fs-1 mb-3"
                aria-hidden="true"
              ></i>

              <h2 className="h4">{nombreCompleto}</h2>

              <p className="text-body-secondary text-break">
                {user.email || "Correo no registrado"}
              </p>

              <div>
                <span className="badge rounded-pill text-bg-primary">
                  {user.role}
                </span>
              </div>
            </div>

            <nav
              className="list-group shadow-sm"
              aria-label="Secciones del perfil"
            >
              <Link
                to="/perfil"
                className="list-group-item list-group-item-action"
              >
                <i className="bi bi-person me-2" aria-hidden="true"></i>
                Datos personales
              </Link>

              <Link
                to="/tienda/mis-compras"
                className="list-group-item list-group-item-action active"
                aria-current="page"
              >
                <i className="bi bi-box-seam me-2" aria-hidden="true"></i>
                Mis compras
              </Link>

              <Link
                to="/direccion"
                className="list-group-item list-group-item-action"
                aria-current="page"
              >
                <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                Direcciones
              </Link>

              <Link
                to="/logout"
                className="list-group-item list-group-item-action"
              >
                <i
                  className="bi bi-box-arrow-right me-2"
                  aria-hidden="true"
                ></i>
                Cerrar sesión
              </Link>
            </nav>
          </aside>

          <div className="col-12 col-lg-9">
            <div className="row g-3 align-items-center mb-4">
              <div className="col-12 col-md-8">
                <h2 className="h3 mb-1">Mis compras</h2>

                <p className="text-body-secondary mb-0">
                  Pedidos simulados guardados en este navegador.
                </p>
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="estado-compra" className="visually-hidden">
                  Filtrar pedidos por estado
                </label>

                <select
                  id="estado-compra"
                  className="form-select"
                  value={estado}
                  onChange={(event) => setEstado(event.target.value)}
                >
                  <option value="Todos">Todos los pedidos</option>
                  <option value="En preparación">En preparación</option>
                  <option value="En camino">En camino</option>
                  <option value="Entregado">Entregados</option>
                  <option value="Cancelado">Cancelados</option>
                </select>
              </div>
            </div>

            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : compras.length === 0 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p>Todavía no has realizado compras.</p>

                  <Link to="/tienda" className="btn btn-primary">
                    Ir a la tienda
                  </Link>
                </div>
              </div>
            ) : comprasFiltradas.length === 0 ? (
              <p>No hay compras con ese estado.</p>
            ) : (
              comprasFiltradas.map((compra) => (
                <article
                  key={compra.id}
                  className="card border-0 shadow-sm mb-4"
                >
                  <div className="card-header bg-white p-3">
                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                      <div className="text-break">
                        <strong>Pedido #{compra.id}</strong>

                        <p className="text-body-secondary small mb-0">
                          Realizado el {formatearFecha(compra.fecha)}
                        </p>
                      </div>

                      <div>
                        <span className={`badge ${colorEstado(compra.estado)}`}>
                          {compra.estado}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    {compra.productos.map((producto) => (
                      <div
                        key={producto.id}
                        className="d-flex align-items-center gap-3 border-bottom py-3"
                      >
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="rounded-3 object-fit-contain flex-shrink-0"
                          style={{ width: "80px", height: "80px" }}
                        />

                        <div>
                          <h3 className="h6 mb-1">{producto.nombre}</h3>

                          <p className="text-body-secondary mb-1">
                            Cantidad: {producto.cantidad}
                          </p>

                          <p className="small mb-1">
                            Precio unitario: {formatearPrecio(producto.precio)}
                          </p>

                          <p className="fw-bold mb-0">
                            {formatearPrecio(
                              producto.precio * producto.cantidad,
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer bg-white p-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>{formatearPrecio(compra.subtotal)}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Despacho</span>
                      <span>{formatearPrecio(compra.despacho)}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <strong>Total</strong>

                      <strong className="fs-5">
                        {formatearPrecio(compra.total)}
                      </strong>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MisCompras;
