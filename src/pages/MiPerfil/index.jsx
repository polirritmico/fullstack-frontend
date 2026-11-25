import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "@/contexts/Auth/AuthContext";
import Loading from "@/components/Loading";
import usuarioService from "@/services/usuarioService";
import { getApiErrorMessage } from "@/services/utils/apiError";
import "./MiPerfil.css";

function cargarDireccion(usuarioId) {
  try {
    const guardada = localStorage.getItem(`jk-direccion-${usuarioId}`);
    const direccion = guardada ? JSON.parse(guardada) : null;

    return typeof direccion?.direccion === "string" ? direccion.direccion : "";
  } catch {
    return "";
  }
}

function normalizarTelefono(telefono) {
  const digitos = telefono.replace(/\D/g, "");
  return digitos.startsWith("56") ? `+${digitos}` : `+56${digitos}`;
}

function aFormulario(perfil) {
  return {
    nombre: perfil.nombre || "",
    apellido: perfil.apellido || "",
    email: perfil.email || "",
    telefono: perfil.telefonoCelular || "",
  };
}

function MiPerfil() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: "/perfil" }} replace />;
  }

  return <ContenidoPerfil key={user.id} user={user} />;
}

function ContenidoPerfil({ user }) {
  const { refrescarUsuario } = useAuth();
  const [direccion] = useState(() => cargarDireccion(user.id));
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [datos, setDatos] = useState(aFormulario({}));
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    usuarioService
      .getMyProfile()
      .then((respuesta) => {
        setPerfil(respuesta.userData);
        setDatos(aFormulario(respuesta.userData));
      })
      .catch((err) => setErrorCarga(getApiErrorMessage(err)))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <Loading />;
  }

  if (errorCarga) {
    return (
      <section className="perfil-page py-5">
        <div className="container">
          <h1 className="mb-4 fw-bold">Mi perfil</h1>
          <div className="alert alert-danger" role="alert">
            No se pudo cargar tu perfil: {errorCarga}
          </div>
        </div>
      </section>
    );
  }

  const guardado = aFormulario(perfil);

  const nombreCompleto =
    [guardado.nombre, guardado.apellido].filter(Boolean).join(" ") ||
    user.nombre;

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
      soloLectura: true,
      ayuda: "Es tu usuario de acceso y no se puede cambiar.",
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

  async function guardar(event) {
    event.preventDefault();
    setError("");
    setMensaje("");

    const cambios = {
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      telefono: datos.telefono.trim(),
    };

    if (!cambios.nombre || cambios.nombre.length > 50) {
      setError("Ingresa tu nombre, con un máximo de 50 caracteres.");
      return;
    }

    if (!cambios.apellido || cambios.apellido.length > 100) {
      setError("Ingresa tus apellidos, con un máximo de 100 caracteres.");
      return;
    }

    if (!/^(\+56)?\s?9\s?[0-9]{4}\s?[0-9]{4}$/.test(cambios.telefono)) {
      setError("Ingresa un teléfono válido. Ejemplo: +56 9 1234 5678.");
      return;
    }

    const telefonoCelular = normalizarTelefono(cambios.telefono);
    setGuardando(true);

    try {
      await usuarioService.update({
        ...perfil,
        nombre: cambios.nombre,
        apellido: cambios.apellido,
        telefonoCelular,
      });

      const actualizado = await refrescarUsuario();
      const perfilActualizado = actualizado?.userData ?? {
        ...perfil,
        nombre: cambios.nombre,
        apellido: cambios.apellido,
        telefonoCelular,
      };

      setPerfil(perfilActualizado);
      setDatos(aFormulario(perfilActualizado));
      setEditando(false);
      setMensaje("Perfil actualizado correctamente.");
    } catch (err) {
      setError(
        `No se pudieron guardar los cambios: ${getApiErrorMessage(err)}`,
      );
    } finally {
      setGuardando(false);
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
                disabled={editando}
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
                        readOnly={!editando || campo.soloLectura}
                        aria-describedby={
                          campo.ayuda ? `ayuda-${campo.nombre}` : undefined
                        }
                        required
                      />

                      {campo.ayuda && (
                        <div id={`ayuda-${campo.nombre}`} className="form-text">
                          {campo.ayuda}
                        </div>
                      )}
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
                      value={direccion}
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
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={guardando}
                    >
                      <i className="bi bi-save me-2" aria-hidden="true"></i>
                      {guardando ? "Guardando..." : "Guardar cambios"}
                    </button>

                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={cancelar}
                      disabled={guardando}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={iniciarEdicion}
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
