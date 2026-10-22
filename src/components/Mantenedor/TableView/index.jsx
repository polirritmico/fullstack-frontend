import { useState } from "react";

import Table from "@/components/Mantenedor/Table";
import TableToolbar from "@/components/Mantenedor/TableToolbar";

function TableView({
  data,
  tableColumnas,
  tableCampos,
  tableEtiquetas,
  tableEstados,
  toolbarPlaceholder,
  toolbarTextoBoton,
  filterSearchFields,
}) {
  const defaultState = Object.keys(tableEstados)[0];

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(defaultState);

  const statusLabel = tableEstados[selectedStatus];

  const filteredData = data.filter((itemRow) => {
    const matchesSearch =
      !search ||
      filterSearchFields.some((field) =>
        String(itemRow[field] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    const matchesStatus =
      selectedStatus === defaultState || itemRow.estado === statusLabel;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <TableToolbar
        placeholder={toolbarPlaceholder}
        estados={tableEstados}
        textoBoton={toolbarTextoBoton}
        search={search}
        onSearchChange={setSearch}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <Table
        data={filteredData}
        columnas={tableColumnas}
        campos={tableCampos}
        etiquetas={tableEtiquetas}
        estados={tableEstados}
      />
    </>
  );
}

export default TableView;
