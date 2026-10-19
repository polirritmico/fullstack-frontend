import { Link, Navigate } from "react-router";
import { useAuth } from "@/contexts/Auth/AuthContext";
import "./MiPerfil.css";

function MiPerfil() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: "/perfil" }} replace />;
  }

  const nombreCompleto =
    [user.nombre, user.apellido].filter(Boolean).join(" ") || user.username;

  const iniciales = nombreCompleto
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0))
    .join("")
    .toUpperCase();

  const campos = [
    {
      id: "perfil-nombre",
      etiqueta: "Nombre",
      valor: user.nombre || user.username,
      tipo: "text",
    },
    {
      id: "perfil-apellido",
      etiqueta: "Apellido",
      valor: user.apellido,
      tipo: "text",
    },
    {
      id: "perfil-correo",
      etiqueta: "Correo electrónico",
      valor: user.email,
      tipo: "email",
    },
    {
      id: "perfil-telefono",
      etiqueta: "Teléfono",
      valor: user.telefono,
      tipo: "tel",
    },
    {
      id: "perfil-direccion",
      etiqueta: "Dirección",
      valor: user.direccion,
      tipo: "text",
    },
  ];

  return (
    <section className="perfil-page py-5">
      <div className="container">
        <h1 className="mb-4 fw-bold">Mi perfil</h1>

        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <div className="card border-0 shadow-sm text-center p-4 mb-4">
              <div className="avatar-perfil mx-auto mb-3">{iniciales}</div>

              <h2 className="h4 mb-1">{nombreCompleto}</h2>

              <p className="text-body-secondary mb-2 text-break">
                {user.email || "Correo no registrado"}
              </p>

              <div className="mb-3">
                <span className="badge rounded-pill text-bg-primary">
                  {user.role}
                </span>
              </div>

              <button
                className="btn btn-outline-primary w-100"
                type="button"
                disabled
              >
                Editar perfil
              </button>
            </div>

            <nav
              className="list-group perfil-menu shadow-sm"
              aria-label="Secciones del perfil"
            >
              <a
                href="#datos-personales"
                className="list-group-item list-group-item-action active"
                aria-current="location"
              >
                <i className="bi bi-person me-2" aria-hidden="true"></i>
                Datos personales
              </a>

              <Link
                to="/tienda/mis-compras"
                className="list-group-item list-group-item-action"
              >
                <i className="bi bi-box-seam me-2" aria-hidden="true"></i>
                Mis compras
              </Link>

              <button
                className="list-group-item list-group-item-action"
                type="button"
                disabled
              >
                <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                Direcciones
              </button>

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
            <section
              id="datos-personales"
              className="card border-0 shadow-sm mb-4"
              aria-labelledby="titulo-datos"
            >
              <div className="card-header bg-white py-3">
                <h2 className="h4 mb-0" id="titulo-datos">
                  Datos personales
                </h2>
              </div>

              <div className="card-body p-4">
                <div className="row g-3">
                  {campos.map((campo) => (
                    <div
                      key={campo.id}
                      className={
                        campo.id === "perfil-direccion"
                          ? "col-12"
                          : "col-12 col-md-6"
                      }
                    >
                      <label htmlFor={campo.id} className="form-label">
                        {campo.etiqueta}
                      </label>

                      <input
                        id={campo.id}
                        className="form-control"
                        type={campo.tipo}
                        value={campo.valor || ""}
                        placeholder="No registrado"
                        readOnly
                      />
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <button className="btn btn-primary" type="button" disabled>
                  <i className="bi bi-pencil me-2" aria-hidden="true"></i>
                  Editar información
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiPerfil;
