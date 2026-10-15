import { useState } from "react";

function CrearPerfil() {
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  function manejarEnvio(event) {
    event.preventDefault();

    setError("");
    setExito(false);

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
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
                    autoComplete="family-name"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="rut" className="form-label">
                    RUT
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    name="rut"
                    placeholder="12.345.678-9"
                    pattern="[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]"
                    title="Ejemplo: 12.345.678-9 o 12345678-9"
                    required
                  />
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
