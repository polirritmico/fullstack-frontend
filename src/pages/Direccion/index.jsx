import { useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "@/contexts/Auth/AuthContext";

function cargarDireccion(clave) {
  try {
    const guardado = localStorage.getItem(clave);

    if (!guardado) {
      return { direccion: null, error: "" };
    }

    const direccion = JSON.parse(guardado);

    const camposValidos = [
      "destinatario",
      "telefono",
      "direccion",
      "referencia",
    ].every((campo) => typeof direccion?.[campo] === "string");

    if (!camposValidos) {
      throw new Error("Datos inválidos");
    }

    return { direccion, error: "" };
  } catch {
    return {
      direccion: null,
      error:
        "No se pudo leer la dirección guardada. Los datos no se eliminaron.",
    };
  }
}

function Direccion() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: "/direccion" }} replace />;
  }

  return <FormularioDireccion key={user.id} usuario={user} />;
}

function FormularioDireccion({ usuario }) {
  const clave = `jk-direccion-${usuario.id}`;
  const [carga] = useState(() => cargarDireccion(clave));
  const [guardada, setGuardada] = useState(carga.direccion);
  const [editando, setEditando] = useState(!carga.direccion);
  const [error, setError] = useState(carga.error);
  const [mensaje, setMensaje] = useState("");

  const [datos, setDatos] = useState(
    carga.direccion || {
      destinatario:
        [usuario.nombre, usuario.apellido].filter(Boolean).join(" ") ||
        usuario.username ||
        "",
      telefono: usuario.telefono || "",
      direccion: usuario.direccion || "",
      referencia: "",
    },
  );

  const campos = [
    {
      nombre: "destinatario",
      etiqueta: "Nombre del destinatario",
      maximo: 150,
      tipo: "text",
      autocompletar: "name",
      obligatorio: true,
    },
    {
      nombre: "telefono",
      etiqueta: "Teléfono",
      maximo: 20,
      tipo: "tel",
      autocompletar: "tel",
      obligatorio: true,
    },
    {
      nombre: "direccion",
      etiqueta: "Dirección",
      maximo: 300,
      tipo: "text",
      autocompletar: "street-address",
      obligatorio: true,
    },
    {
      nombre: "referencia",
      etiqueta: "Referencia de entrega (opcional)",
      maximo: 200,
      tipo: "text",
      autocompletar: "off",
      obligatorio: false,
    },
  ];

  function cambiarCampo(event) {
    const { name, value } = event.target;

    setDatos((actual) => ({ ...actual, [name]: value }));
    setError("");
    setMensaje("");
  }

  function guardar(event) {
    event.preventDefault();
    setError("");
    setMensaje("");

    const direccion = {
      destinatario: datos.destinatario.trim(),
      telefono: datos.telefono.trim(),
      direccion: datos.direccion.trim(),
      referencia: datos.referencia.trim(),
    };

    if (
      !direccion.destinatario ||
      direccion.destinatario.length > 150 ||
      !direccion.direccion ||
      direccion.direccion.length > 300 ||
      direccion.referencia.length > 200
    ) {
      setError("Revisa los campos obligatorios y sus límites de caracteres.");
      return;
    }

    if (!/^(\+56)?\s?9\s?[0-9]{4}\s?[0-9]{4}$/.test(direccion.telefono)) {
      setError("Ingresa un teléfono válido. Ejemplo: +56 9 1234 5678.");
      return;
    }

    try {
      localStorage.setItem(clave, JSON.stringify(direccion));
      setGuardada(direccion);
      setDatos(direccion);
      setEditando(false);
      setMensaje("Dirección guardada correctamente.");
    } catch {
      setError("No se pudo guardar la dirección. Inténtalo nuevamente.");
    }
  }

  function cancelar() {
    setDatos({ ...guardada });
    setEditando(false);
    setError("");
    setMensaje("");
  }

  function eliminar() {
    setError("");
    setMensaje("");

    try {
      localStorage.removeItem(clave);
      setGuardada(null);
      setDatos({
        destinatario: "",
        telefono: "",
        direccion: "",
        referencia: "",
      });
      setEditando(true);
      setMensaje("Dirección eliminada correctamente.");
    } catch {
      setError("No se pudo eliminar la dirección.");
    }
  }

  return (
    <section className="py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <Link to="/perfil" className="btn btn-outline-primary mb-4">
            <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
            Mi perfil
          </Link>

          <h1 className="fw-bold mb-4">Mi dirección</h1>

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

          {!carga.error && (
            <form className="border rounded bg-white p-4" onSubmit={guardar}>
              <div className="row g-3">
                {campos.map((campo) => (
                  <div
                    key={campo.nombre}
                    className={
                      campo.nombre === "destinatario" ||
                      campo.nombre === "telefono"
                        ? "col-12 col-md-6"
                        : "col-12"
                    }
                  >
                    <label
                      htmlFor={`direccion-${campo.nombre}`}
                      className="form-label"
                    >
                      {campo.etiqueta}
                    </label>

                    <input
                      id={`direccion-${campo.nombre}`}
                      name={campo.nombre}
                      type={campo.tipo}
                      className="form-control"
                      value={datos[campo.nombre]}
                      onChange={cambiarCampo}
                      maxLength={campo.maximo}
                      autoComplete={campo.autocompletar}
                      required={campo.obligatorio}
                      readOnly={!editando}
                    />
                  </div>
                ))}
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                {editando ? (
                  <>
                    <button className="btn btn-primary" type="submit">
                      <i className="bi bi-save me-2" aria-hidden="true"></i>
                      Guardar dirección
                    </button>

                    {guardada && (
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={cancelar}
                      >
                        Cancelar
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        setEditando(true);
                        setMensaje("");
                        setError("");
                      }}
                    >
                      <i className="bi bi-pencil me-2" aria-hidden="true"></i>
                      Editar
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={eliminar}
                    >
                      <i className="bi bi-trash me-2" aria-hidden="true"></i>
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Direccion;
