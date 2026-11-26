function ModalError({ error }) {
  if (!error) {
    return null;
  }

  return (
    <div
      className="alert alert-danger text-center fs-6 mb-3"
      role="alert"
      aria-live="polite"
    >
      <i className="bi bi-exclamation-circle-fill me-2"></i>
      {error}
    </div>
  );
}

export default ModalError;
