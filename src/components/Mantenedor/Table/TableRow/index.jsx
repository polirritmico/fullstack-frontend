const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function TableRow({ entry, columns }) {
  return (
    <tr>
      {columns.map((column) => {
        if (column.isHidden) return null;

        if (column.isState) {
          return (
            <td key={column.key}>
              <span
                className={`badge text-bg-${entry[column.key] === "Activo" ? "success" : "secondary"}`}
              >
                {entry[column.key]}
              </span>
            </td>
          );
        }

        if (column.type === "money") {
          return (
            <td
              key={column.key}
              className={column.highlight ? "fw-medium" : ""}
            >
              {clpFormatter.format(entry[column.key])}
            </td>
          );
        }

        return (
          <td key={column.key} className={column.highlight ? "fw-medium" : ""}>
            {entry[column.key]}
          </td>
        );
      })}
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
            columns.map((column) => [
              `data-jk-${column.key.toLowerCase()}`,
              column.type === "string"
                ? entry[column.key]
                : entry[column.key]?.toString(),
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
