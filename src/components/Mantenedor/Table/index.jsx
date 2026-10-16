function Table({ data, columnas, campos, etiquetas, estados }) {
  return (
    <div className="table-responsive">
      <table className="tabla-usuarios table table-striped table-hover caption-top align-middle border">
        <caption>
          <span id="id-tabla-principal">{data.length}</span>{" "}
          {etiquetas.contador}
        </caption>

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

        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
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
                      `data-jk-${campo}`,
                      campoType === "string"
                        ? entry[campo]
                        : entry[campo]?.toString(),
                    ]),
                  )}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
