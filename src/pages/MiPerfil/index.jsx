import { useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "@/contexts/Auth/AuthContext";
import "./MiPerfil.css";

function cargarPerfil(usuario) {
  const perfilInicial = {
    nombre: usuario.nombre || usuario.username || "",
    apellido: usuario.apellido || "",
    email: usuario.email || "",
    telefono: usuario.telefono || "",
  };

  try {
    const guardado = localStorage.getItem(`jk-perfil-${usuario.id}`);
    const perfil = guardado ? JSON.parse(guardado) : perfilInicial;

    const valido = ["nombre", "apellido", "email", "telefono"].every(
      (campo) => typeof perfil?.[campo] === "string",
    );

    if (!valido) {
      throw new Error("Perfil inválido");
    }

    const direccionGuardada = localStorage.getItem(
      `jk-direccion-${usuario.id}`,
    );

    const direccion = direccionGuardada ? JSON.parse(direccionGuardada) : null;

    if (direccion && typeof direccion.direccion !== "string") {
      throw new Error("Dirección inválida");
    }

    return {
      perfil,
      direccion: direccion?.direccion || "",
      error: "",
    };
  } catch {
    return {
      perfil: perfilInicial,
      direccion: "",
      error: "No se pudieron leer tus datos guardados. No se han eliminado.",
    };
  }
}

function MiPerfil() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: "/perfil" }} replace />;
  }

  return <ContenidoPerfil key={user.id} user={user} />;
}

function ContenidoPerfil({ user }) {
  const [carga] = useState(() => cargarPerfil(user));
  const [guardado, setGuardado] = useState(carga.perfil);
  const [datos, setDatos] = useState(carga.perfil);
  const [editando, setEditando] = useState(false);
  const [error, setError] = useState(carga.error);
  const [mensaje, setMensaje] = useState("");

  const nombreCompleto =
    [guardado.nombre, guardado.apellido].filter(Boolean).join(" ") ||
    user.username;

  const iniciales = nombreCompleto
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0))
    .join("")
    .toUpperCase();

  const campos = [
    {
      nombre: "nombre",
      etiqueta: "Nombre",
      tipo: "text",
      maximo: 50,
      autoComplete: "given-name",
    },
    {
      nombre: "apellido",
      etiqueta: "Apellido",
      tipo: "text",
      maximo: 100,
      autoComplete: "family-name",
    },
    {
      nombre: "email",
      etiqueta: "Correo electrónico",
      tipo: "email",
      maximo: 100,
      autoComplete: "email",
    },
    {
      nombre: "telefono",
      etiqueta: "Teléfono",
      tipo: "tel",
      maximo: 20,
      autoComplete: "tel",
    },
  ];

  function iniciarEdicion() {
    setDatos({ ...guardado });
    setEditando(true);
    setError("");
    setMensaje("");
  }

  function cambiarCampo(event) {
    const { name, value } = event.target;

    setDatos((actual) => ({
      ...actual,
      [name]: value,
    }));

    setError("");
    setMensaje("");
  }

  function cancelar() {
    setDatos({ ...guardado });
    setEditando(false);
    setError("");
    setMensaje("");
  }

  function guardar(event) {
    event.preventDefault();
    setError("");
    setMensaje("");

    const perfil = {
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      email: datos.email.trim().toLowerCase(),
      telefono: datos.telefono.trim(),
    };

    if (!perfil.nombre || perfil.nombre.length > 50) {
      setError("Ingresa tu nombre, con un máximo de 50 caracteres.");
      return;
    }

    if (!perfil.apellido || perfil.apellido.length > 100) {
      setError("Ingresa tus apellidos, con un máximo de 100 caracteres.");
      return;
    }

    if (
      perfil.email.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.email)
    ) {
      setError("Ingresa un correo válido, de hasta 100 caracteres.");
      return;
    }

    if (!/^(\+56)?\s?9\s?[0-9]{4}\s?[0-9]{4}$/.test(perfil.telefono)) {
      setError("Ingresa un teléfono válido. Ejemplo: +56 9 1234 5678.");
      return;
    }

    try {
      localStorage.setItem(`jk-perfil-${user.id}`, JSON.stringify(perfil));

      setGuardado(perfil);
      setDatos(perfil);
      setEditando(false);
      setMensaje("Perfil actualizado correctamente.");
    } catch {
      setError("No se pudieron guardar los cambios. Inténtalo nuevamente.");
    }
  }

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
                {guardado.email || "Correo no registrado"}
              </p>

              <div className="mb-3">
                <span className="badge rounded-pill text-bg-primary">
                  {user.role}
                </span>
              </div>

              <button
                className="btn btn-outline-primary w-100"
                type="button"
                onClick={iniciarEdicion}
                disabled={editando || Boolean(carga.error)}
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

              <Link
                to="/direccion"
                className="list-group-item list-group-item-action"
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

              <form className="card-body p-4" onSubmit={guardar}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {mensaje && (
                  <div className="alert alert-success" role="status">
                    {mensaje}
                  </div>
                )}

                <div className="row g-3">
                  {campos.map((campo) => (
                    <div key={campo.nombre} className="col-12 col-md-6">
                      <label
                        htmlFor={`perfil-${campo.nombre}`}
                        className="form-label"
                      >
                        {campo.etiqueta}
                      </label>

                      <input
                        id={`perfil-${campo.nombre}`}
                        name={campo.nombre}
                        className="form-control"
                        type={campo.tipo}
                        value={datos[campo.nombre]}
                        onChange={cambiarCampo}
                        maxLength={campo.maximo}
                        autoComplete={campo.autoComplete}
                        placeholder="No registrado"
                        readOnly={!editando}
                        required
                      />
                    </div>
                  ))}

                  <div className="col-12">
                    <label htmlFor="perfil-direccion" className="form-label">
                      Dirección de entrega
                    </label>

                    <input
                      id="perfil-direccion"
                      className="form-control"
                      type="text"
                      value={carga.direccion}
                      placeholder="No registrada"
                      readOnly
                    />

                    <Link to="/direccion" className="d-inline-block mt-2">
                      Administrar dirección
                    </Link>
                  </div>
                </div>

                <hr className="my-4" />

                {editando ? (
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-primary" type="submit">
                      <i className="bi bi-save me-2" aria-hidden="true"></i>
                      Guardar cambios
                    </button>

                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={cancelar}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={iniciarEdicion}
                    disabled={Boolean(carga.error)}
                  >
                    <i className="bi bi-pencil me-2" aria-hidden="true"></i>
                    Editar información
                  </button>
                )}
              </form>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiPerfil;
