function TableToolbar() {
  return (
    <div className="d-flex justify-content-between gap-3 mb-1">
      <form className="d-flex flex-grow-1" role="search" id="id-form-busqueda">
        <input
          className="form-control"
          type="search"
          placeholder="Búsqueda por nombre, correo o rol…"
          aria-label="Búsqueda por nombre o SKU"
          id="id-input-busqueda"
        />
      </form>

      <div className="d-flex gap-2">
        <select
          className="form-select"
          aria-label="Selector de estados"
          id="id-selector-estados"
        >
          <option value="todos" selected>
            Todos los estados
          </option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
          <option value="preparacion">En contratación</option>
        </select>
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          id="boton-agregar-usuario"
        >
          + Agregar Usuario
        </button>
      </div>
    </div>
  );
}

export default TableToolbar;
