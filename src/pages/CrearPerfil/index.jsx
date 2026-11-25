import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/Auth/AuthContext";
import authService from "@/services/authService";
import usuarioService from "@/services/usuarioService";
import { getApiErrorMessage } from "@/services/utils/apiError";

const ROL_CLIENTE_ID = 5;
const ESTADO_ACTIVO_ID = 1;

function validarPassword(password) {
  return (
    password.length >= 8 &&
    /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-zÁÉÍÓÚáéíóúÑñ\d\s]/.test(password)
  );
}

function normalizarTelefono(telefono) {
  const digitos = telefono.replace(/\D/g, "");
  return digitos.startsWith("56") ? `+${digitos}` : `+56${digitos}`;
}

function validarRun(run) {
  if (!/^[1-9][0-9]{5,7}[0-9K]$/.test(run)) return false;

  const cuerpo = run.slice(0, -1);
  const digito = run.slice(-1);
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resultado = 11 - (suma % 11);
  const esperado =
    resultado === 11 ? "0" : resultado === 10 ? "K" : String(resultado);

  return digito === esperado;
}

function CrearPerfil() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function manejarEnvio(event) {
    event.preventDefault();
    setError("");

    const datos = new FormData(event.currentTarget);
    const nombre = datos.get("nombre").trim();
    const apellido = datos.get("apellido").trim();
    const run = datos.get("rut").trim().toUpperCase();
    const telefono = datos.get("telefono").trim();
    const correo = datos.get("correo").trim().toLowerCase();

    if (!nombre || nombre.length > 50) {
      setError("Ingresa tu nombre, con un máximo de 50 caracteres.");
      return;
    }

    if (!apellido || apellido.length > 100) {
      setError("Ingresa tus apellidos, con un máximo de 100 caracteres.");
      return;
    }

    if (!validarRun(run)) {
      setError("Ingresa un RUN válido, sin puntos ni guion.");
      return;
    }

    if (
      correo.length > 100 ||
      !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)
    ) {
      setError("Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas deben coincidir.");
      return;
    }

    if (!validarPassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres e incluir letras, números y un carácter especial.",
      );
      return;
    }

    const credenciales = { email: correo, password };
    setEnviando(true);

    try {
      await authService.register(credenciales);
    } catch (err) {
      setError(
        err.response?.status === 409
          ? "Ya existe una cuenta con este correo. Inicia sesión o usa otro correo."
          : getApiErrorMessage(err),
      );
      setEnviando(false);
      return;
    }

    try {
      await authService.login(credenciales);
      await usuarioService.create({
        nombre,
        apellido,
        rut: run.slice(0, -1),
        dv: run.slice(-1),
        email: correo,
        telefonoCelular: normalizarTelefono(telefono),
        rolId: ROL_CLIENTE_ID,
        estadoId: ESTADO_ACTIVO_ID,
      });
      await login(credenciales);
    } catch (err) {
      authService.logout();
      setError(
        `Tu cuenta se creó, pero no se pudo completar el perfil: ${getApiErrorMessage(err)}`,
      );
      setEnviando(false);
      return;
    }

    navigate("/tienda", { replace: true });
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            <form
              className="card shadow-sm rounded-4 p-4"
              onSubmit={manejarEnvio}
            >
              <h1 className="h2 text-center mb-4">Crear perfil</h1>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    maxLength={50}
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    maxLength={100}
                    autoComplete="family-name"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="rut" className="form-label">
                    RUN
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    name="rut"
                    placeholder="123456785"
                    minLength={7}
                    maxLength={9}
                    aria-describedby="ayuda-run"
                    required
                  />
                  <div id="ayuda-run" className="form-text">
                    Sin puntos ni guion. Incluye el dígito verificador.
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    placeholder="+56 9 1234 5678"
                    autoComplete="tel"
                    pattern="(\+56)?\s?9\s?[0-9]{4}\s?[0-9]{4}"
                    title="Ejemplo: +56 9 1234 5678 o 912345678"
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="correo" className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    maxLength={100}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    required
                  />

                  <div className="form-text">
                    Mínimo 8 caracteres, con letras, números y un carácter
                    especial.
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="confirmar-password" className="form-label">
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="confirmar-password"
                    name="confirmarPassword"
                    minLength={8}
                    autoComplete="new-password"
                    value={confirmarPassword}
                    onChange={(event) => {
                      setConfirmarPassword(event.target.value);
                      setError("");
                    }}
                    required
                  />
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terminos"
                      name="terminos"
                      required
                    />

                    <label className="form-check-label" htmlFor="terminos">
                      Acepto los términos y condiciones.
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={enviando}
                  >
                    {enviando ? "Creando cuenta..." : "Registrar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrearPerfil;
