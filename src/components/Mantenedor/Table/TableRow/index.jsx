const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function TableRow({ entry, columns, onDeleteClick }) {
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
          type="button"
          className="btn btn-sm"
          aria-label="Eliminar"
          onClick={() => onDeleteClick(entry)}
        >
          <i className="bi bi-x-circle"></i>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
