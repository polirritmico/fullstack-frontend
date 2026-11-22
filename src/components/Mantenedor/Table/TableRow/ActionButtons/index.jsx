function TableRowActionButtons({
  entry,
  onDetailsClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
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
  );
}

export default TableRowActionButtons;
