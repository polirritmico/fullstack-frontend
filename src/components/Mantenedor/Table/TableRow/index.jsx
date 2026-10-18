function TableRow({ entry, estados, campos, etiquetas }) {
  return (
    <tr>
      {Object.entries(campos).map(([key]) => {
        if (key === "id" || key === "estado") return;
        if (key === etiquetas.objeto) {
          return (
            <td key={key} className="fw-medium">
              {entry[key]}
            </td>
          );
        }
        return <td key={key}>{entry[key]}</td>;
      })}
      <td>
        <span
          className={`badge text-bg-${entry.estado === estados.activo ? "success" : "secondary"}`}
        >
          {entry.estado}
        </span>
      </td>
      <td>
        <button className="btn btn-sm">
          <i className="bi bi-eye"></i>
        </button>
        <button className="btn btn-sm">
          <i className="bi bi-pencil"></i>
        </button>
        <button
          className="btn btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modal-eliminar-usuario"

          {...Object.fromEntries(
            Object.entries(campos).map(([campo, campoType]) => [
              `data-jk-${campo.toLowerCase()}`,
              campoType === "string" ? entry[campo] : entry[campo]?.toString(),
            ]),
          )}
        >
          <i className="bi bi-x-circle"></i>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
