import { Link } from "react-router";

import LogoJKiltroSvg from "@/assets/logo.svg";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <main>
      <div className="container min-vh-100 d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card rounded-3 p-4 shadow">
              <div className="text-center mb-4">
                <img
                  src={LogoJKiltroSvg}
                  alt="Logo jKiltro"
                  className="img-fluid max"
                />
              </div>

              <p>Por favor ingrese a su cuenta</p>

              <LoginForm />

              <div className="text-center mb-2">
                <Link
                  to="/recuperar-cuenta"
                  className="text-primary text-decoration-none small"
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </div>

              <div className="text-center">
                <p className="text-body-secondary small mb-0">
                  ¿No tienes cuenta?{" "}
                  <Link
                    className="text-primary text-decoration-none"
                    to="/crear-perfil"
                  >
                    Regístrate aquí
                  </Link>
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
