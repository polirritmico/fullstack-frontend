import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table({ data, columnas, campos, etiquetas, estados }) {
  return (
    <div className="table-responsive">
      <table className="tabla-usuarios table table-striped table-hover caption-top align-middle border">
        <caption>
          <span id="id-tabla-principal">{data.length}</span>{" "}
          {etiquetas.contador}
        </caption>

        <TableHeader columnas={columnas} etiquetas={etiquetas} />

        <tbody>
          {data.map((entry) => {
            return (
              <TableRow
                key={entry.id}
                entry={entry}
                estados={estados}
                campos={campos}
                etiquetas={etiquetas}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
