function EnConstruccion() {
  return (
    <div>
      <i className="bi bi-cone-striped display-1 text-warning"></i>
      <h2>Sección en Construcción</h2>
      <p>Lo sentimos, esta página sigue en desarrollo.</p>
      <button className="btn" onClick={() => window.history.back()}>
        <i className="bi bi-arrow-left me-2"></i>
        Volver
      </button>
    </div>
  );
}

export default EnConstruccion;
