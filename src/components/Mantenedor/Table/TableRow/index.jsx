import {
  findCategory,
  findState,
} from "@/components/Mantenedor/utils/displayValue";
import TableRowActionButtons from "./ActionButtons";

const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function truncateText(value, maxLength = 60) {
  if (value == null) {
    return "";
  }
  const str = String(value).trim();

  if (str.length > maxLength) {
    return `${str.slice(0, maxLength).trimEnd()}…`;
  }
  return str.endsWith(".") ? str : `${str}.`;
}

function TableRow({
  entry,
  columns,
  onDeleteClick,
  onEditClick,
  onDetailsClick,
  categories,
  states,
  categoryField,
}) {
  return (
    <tr>
      {columns.map((column) => {
        if (column.isHidden) return null;

        if (column.isState) {
          const value = entry[column.key];
          const label = findState(states, value)?.label ?? value;

          return (
            <td key={column.key}>
              <span
                className={`badge text-bg-${label === "Activo" ? "success" : "secondary"}`}
              >
                {label}
              </span>
            </td>
          );
        }

        if (column.key === categoryField) {
          const value = entry[column.key];
          return (
            <td
              key={column.key}
              className={column.highlight ? "fw-medium" : ""}
            >
              {findCategory(categories, value)?.value ?? value}
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

        if (column.type === "text") {
          return (
            <td
              key={column.key}
              className={`w-30 text-wrap ${column.highlight ? "fw-medium" : ""}`}
            >
              {truncateText(entry[column.key])}
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
