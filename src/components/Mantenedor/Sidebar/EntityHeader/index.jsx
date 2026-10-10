function EntityHeader({ title }) {
  return (
    <div
      className="d-flex py-2 px-3 justify-content-between align-items-center"
      id="id-rol-panel-header"
    >
      <h2 className="text-muted my-0 fs-6">{title}</h2>
      <button
        className="btn btn-primary btn-sm"
        data-bs-target="#modal-agregar-rol"
        data-bs-toggle="modal"
      >
        + Nuevo
      </button>
    </div>
  );
}

export default EntityHeader;
