import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table({
  data,
  metadata,
  customClass,
  onDeleteClick,
  onEditClick,
  onDetailsClick,
  categories,
  states,
  categoryField,
}) {
  return (
    <div className="table-responsive">
      <table
        className={`${customClass} table table-striped table-hover caption-top align-middle border`}
      >
        <caption>
          <span id="id-tabla-principal">{data.length}</span>{" "}
          {metadata.entity.pluralLabel.toLowerCase()}
        </caption>

        <TableHeader columns={metadata.columns} action={metadata.action} />
        <tbody>
          {data.map((entry) => {
            return (
              <TableRow
                key={entry.id}
                entry={entry}
                columns={metadata.columns}
                onDeleteClick={onDeleteClick}
                onEditClick={onEditClick}
                onDetailsClick={onDetailsClick}
                categories={categories}
                states={states}
                categoryField={categoryField}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
