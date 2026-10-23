function TableHeader({ columns, action }) {
  return (
    <thead className="table-secondary">
      <tr>
        {columns.map(
          (column) =>
            !column.isHidden && (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ),
        )}
        <th key={action.key} scope="col">
          {action.label}
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
