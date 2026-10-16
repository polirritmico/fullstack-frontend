function TableToolbar({ placeholder, estados, textoBoton }) {
  return (
    <div className="d-flex justify-content-between gap-3 mb-1">
      <form className="d-flex flex-grow-1" role="search" id="id-form-busqueda">
        <input
          className="form-control"
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          id="id-input-busqueda"
        />
      </form>

      <div className="d-flex gap-2">
        <select
          className="form-select"
          aria-label="Selector de estados"
          id="id-selector-estados"
          defaultValue="todos"
        >
          {Object.entries(estados).map(([key, value]) => (
            <option value={key} key={key}>
              {value}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          id="boton-agregar"
        >
          {textoBoton}
        </button>
      </div>
    </div>
  );
}

export default TableToolbar;
