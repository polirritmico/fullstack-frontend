import { useState } from "react";

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
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  function manejarEnvio(event) {
    event.preventDefault();
    setError("");
    setExito(false);

    const datos = new FormData(event.currentTarget);
    const nombre = datos.get("nombre").trim();
    const apellido = datos.get("apellido").trim();
    const run = datos.get("rut").trim().toUpperCase();
    const correo = datos.get("correo").trim().toLowerCase();
    const direccion = datos.get("direccion").trim();

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

    if (!direccion || direccion.length > 300) {
      setError("Ingresa una dirección, con un máximo de 300 caracteres.");
      return;
    }

    if (password.length < 8 || password !== confirmarPassword) {
      setError(
        "Las contraseñas deben coincidir y tener al menos 8 caracteres.",
      );
      return;
    }

    setExito(true);
    event.currentTarget.reset();
    setPassword("");
    setConfirmarPassword("");
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6">
            {exito && (
              <div className="alert alert-success" role="status">
                Datos validados correctamente. Este registro es de demostración;
                todavía no se guarda una cuenta.
              </div>
            )}

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

                <div className="col-12">
                  <label htmlFor="direccion" className="form-label">
                    Dirección
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    maxLength={300}
                    autoComplete="street-address"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="comuna" className="form-label">
                    Comuna
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="comuna"
                    name="comuna"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="region" className="form-label">
                    Región
                  </label>

                  <select
                    className="form-select"
                    id="region"
                    name="region"
                    defaultValue=""
                    required
                  >
                    <option value="">Selecciona una región</option>
                    <option value="metropolitana">Región Metropolitana</option>
                    <option value="valparaiso">Valparaíso</option>
                    <option value="biobio">Biobío</option>
                    <option value="araucania">La Araucanía</option>
                    <option value="los-lagos">Los Lagos</option>
                    <option value="otra">Otra</option>
                  </select>
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
                      setExito(false);
                    }}
                    required
                  />

                  <div className="form-text">Mínimo 8 caracteres.</div>
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
                      setExito(false);
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
                  <button className="btn btn-primary w-100" type="submit">
                    Registrar
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
