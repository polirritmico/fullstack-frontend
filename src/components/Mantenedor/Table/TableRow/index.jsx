const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function capitalizeFirstLetter(val) {
  // From: https://stackoverflow.com/questions/1026069
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function TableRow({
  entry,
  columns,
  onDeleteClick,
  onEditClick,
  onDetailsClick,
}) {
  return (
    <tr>
      {columns.map((column) => {
        if (column.isHidden) return null;

        if (column.isState) {
          const value = capitalizeFirstLetter(entry[column.key]);

          return (
            <td key={column.key}>
              <span
                className={`badge text-bg-${value === "Activo" ? "success" : "secondary"}`}
              >
                {value}
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
        <button className="btn btn-sm" onClick={() => onDetailsClick(entry)}>
          <i className="bi bi-eye"></i>
        </button>
        <button className="btn btn-sm" onClick={() => onEditClick(entry)}>
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
