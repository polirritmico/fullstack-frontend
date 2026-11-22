import { findCategory, findState } from "../../utils/displayValue";
import TableRowActionButtons from "./ActionButtons";

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
      <TableRowActionButtons
        entry={entry}
        onDetailsClick={onDetailsClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    </tr>
  );
}

export default TableRow;
