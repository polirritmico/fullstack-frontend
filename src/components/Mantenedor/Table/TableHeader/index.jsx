function TableHeader({ columnas, etiquetas }) {
  return (
    <thead className="table-secondary">
      <tr>
        {columnas.map((entry, index) => (
          <th key={index} scope="col">
            {entry}
          </th>
        ))}
        <th key="estado">{etiquetas.estado}</th>
        <th key="accion">{etiquetas.accion}</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
