function FiltrosTienda({
  categoria,
  onCambiarCategoria,
  precio,
  onCambiarPrecio,
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 mb-3">Filtros</h2>

        <div className="mb-3">
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

        <div>
          <label htmlFor="filtro-precio" className="form-label">
            Precio
          </label>

          <select
            id="filtro-precio"
            className="form-select"
            value={precio}
            onChange={(event) => onCambiarPrecio(event.target.value)}
          >
            <option value="Todos">Todos los precios</option>
            <option value="menos-20000">Menos de $20.000</option>
            <option value="20000-50000">Desde $20.000 hasta $50.000</option>
            <option value="mas-50000">Más de $50.000</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FiltrosTienda;
