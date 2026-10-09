import logoSvg from "@/assets/logo.svg";

function Login() {
  return (
    <main>
      <div class="container min-vh-100 d-flex flex-column justify-content-center">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div class="card rounded-3 p-4 shadow">
              <div class="text-center mb-4">
                <img src={logoSvg} alt="Logo jKiltro" class="img-fluid max" />
              </div>

              <p>Por favor ingrese a su cuenta</p>

              <form action="submit" id="id-login-form">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="id-login-email"
                    placeholder="Correo"
                  />
                  <label for="id-login-email">Dirección de correo</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="id-login-password"
                    placeholder="Contraseña"
                  />
                  <label for="id-login-password">Contraseña</label>
                  <div class="invalid-feedback text-center fs-6">
                    Correo o contraseña incorrectos
                  </div>
                </div>

                <div class="d-grid mb-4">
                  <button class="btn btn-primary" type="submit">
                    Ingresar
                  </button>
                </div>
              </form>

              <div class="text-center mb-2">
                <a
                  href="#"
                  class="text-body-secondary text-decoration-none small"
                >
                  ¿Olvidaste la contraseña?
                </a>
              </div>

              <div class="text-center">
                <p class="text-body-secondary small mb-0">
                  ¿No tienes cuenta?{" "}
                  <a
                    class="text-primary text-decoration-none"
                    href="./perfil/crear-perfil.html"
                  >
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
