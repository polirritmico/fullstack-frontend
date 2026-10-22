function SearchBar({ placeholder, search, onSearchChange }) {
  return (
    <form className="d-flex flex-grow-1" role="search" id="id-form-busqueda">
      <input
        type="text"
        value={search}
        className="form-control"
        placeholder={placeholder}
        aria-label={placeholder}
        id="id-input-busqueda"
        onChange={(ev) => onSearchChange(ev.target.value)}
      />
    </form>
  );
}

export default SearchBar;
