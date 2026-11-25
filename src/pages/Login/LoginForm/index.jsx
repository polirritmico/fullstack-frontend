import SubmitButton from "@/components/SubmitButton";
import useLogin from "./useLogin";
import { Button } from "react-bootstrap";
import BackButton from "@/components/BackButton";

function LoginForm() {
  const { error, emailError, isSubmitting, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit} noValidate id="id-login-form">
      <div className="form-floating mb-3">
        <input
          type="email"
          name="email"
          className={`form-control ${emailError || error ? "is-invalid" : ""}`}
          id="id-login-email"
          placeholder="Correo"
          disabled={isSubmitting}
          required
        />
        <label htmlFor="id-login-email">Dirección de correo</label>

        <div className="invalid-feedback">{emailError}</div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          name="password"
          className={`form-control ${error ? "is-invalid" : ""}`}
          id="id-login-password"
          placeholder="Contraseña"
          disabled={isSubmitting}
          required
        />
        <label htmlFor="id-login-password">Contraseña</label>

        <div className="invalid-feedback alert alert-danger text-center fs-6 mt-3">
          {error}
        </div>
      </div>

      <div className="d-grid my-4 gap-2">
        {error ? (
          <BackButton className="fs-6" variant="info">
            <i className="bi bi-arrow-left-circle-fill "></i> Regresar
          </BackButton>
        ) : undefined}
        <SubmitButton
          type="submit"
          isLoading={isSubmitting}
          defaultText="Ingresar"
          workingText="Ingresando…"
        />
      </div>
    </form>
  );
}

export default LoginForm;
