function TableToolbar({ placeholder, states, buttonText }) {
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
          defaultValue={states[0]}
        >
          {states.map((state) => (
            <option
              value={state.toLowerCase().replaceAll(" ", "-")}
              key={state.toLowerCase().replaceAll(" ", "-")}
            >
              {state}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          id="boton-agregar"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TableToolbar;
