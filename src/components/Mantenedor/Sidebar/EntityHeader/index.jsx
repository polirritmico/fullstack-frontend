function EntityHeader({ title }) {
  return (
    <div
      class="d-flex py-2 px-3 justify-content-between align-items-center"
      id="id-rol-panel-header"
    >
      <h2 class="text-muted my-0 fs-6">{title}</h2>
      <button
        class="btn btn-primary btn-sm"
        data-bs-target="#modal-agregar-rol"
        data-bs-toggle="modal"
      >
        + Nuevo
      </button>
    </div>
  );
}

export default EntityHeader;
