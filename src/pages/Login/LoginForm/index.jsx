import useLogin from "./useLogin";

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

        <div className="invalid-feedback text-center fs-6">{error}</div>
      </div>

      <div className="d-grid mb-4">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ingresando…" : "Ingresar"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
