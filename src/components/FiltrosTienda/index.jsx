function FiltrosTienda({ categoria, onCambiarCategoria }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-3">Filtros</h2>

        <label htmlFor="filtro-categoria" className="form-label">
          Categoría
        </label>

        <select
          id="filtro-categoria"
          className="form-select"
          value={categoria}
          onChange={(event) => onCambiarCategoria(event.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Juguetes">Juguetes</option>
          <option value="Accesorios y cuidado">Accesorios y cuidado</option>
        </select>
      </div>
    </div>
  );
}

export default FiltrosTienda;
