import SearchBar from "./SearchBar";

function TableToolbar({
  placeholder,
  estados,
  textoBoton,
  search,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onAddClick,
}) {
  return (
    <div className="d-flex justify-content-between gap-3 mb-1">
      <SearchBar
        search={search}
        onSearchChange={onSearchChange}
        placeholder={placeholder}
      />
      <div className="d-flex gap-2">
        <select
          className="form-select"
          aria-label="Selector de estados"
          id="id-selector-estados"
          value={selectedStatus}
          onChange={(ev) => onStatusChange(ev.target.value)}
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
          onClick={onAddClick}
        >
          {textoBoton}
        </button>
      </div>
    </div>
  );
}

export default TableToolbar;
