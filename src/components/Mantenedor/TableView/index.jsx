import { useState } from "react";

import Table from "@/components/Mantenedor/Table";
import TableToolbar from "@/components/Mantenedor/TableToolbar";
import Sidebar from "@/components/Mantenedor/Sidebar";

function TableView({
  data,
  tableColumnas,
  tableCampos,
  tableEtiquetas,
  tableEstados,
  toolbarPlaceholder,
  toolbarTextoBoton,
  filterSearchFields,
  sidebarCategories,
  sidebarCategoriesTitle,
}) {
  const defaultState = Object.keys(tableEstados)[0];
  const defaultCategory = sidebarCategories[0].name;

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(defaultState);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

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

    console.log("---------------------------");
    console.log("selectedCategory", selectedCategory);
    console.log("defaultCategory", defaultCategory);
    console.log("itemRow.category", itemRow.rol ?? itemRow.categoria);
    const matchesCategory =
      selectedCategory === defaultCategory ||
      (itemRow.categoria ?? itemRow.rol) === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <>
      <Sidebar
        title={sidebarCategoriesTitle}
        data={sidebarCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="col-12 col-md-8 col-lg-9 col-xl-9 col-xxl-10 p-3">
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
      </div>
    </>
  );
}

export default TableView;
