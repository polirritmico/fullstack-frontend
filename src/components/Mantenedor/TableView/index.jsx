import { useState } from "react";

import Table from "@/components/Mantenedor/Table";
import TableToolbar from "@/components/Mantenedor/TableToolbar";
import Sidebar from "@/components/Mantenedor/Sidebar";
import TableAdd from "@/components/Mantenedor/Modal/TableAdd";

function TableView({
  data,
  metadata,
  sidebarCategories,
  toolbarPlaceholder,
  toolbarTextoBoton,
}) {
  const defaultState = metadata.states.find((state) => state.isDefault);
  const defaultCategory = sidebarCategories.find((cat) => cat.isDefault).value;

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(defaultState.key);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const [showAddModal, setShowAddModal] = useState(false);

  const searchFields = metadata.columns
    .filter((col) => col.isSearchable)
    .map((col) => col.key);

  const filteredData = data.filter((itemRow) => {
    const matchesSearch =
      !search ||
      searchFields.some((field) =>
        String(itemRow[field] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      );

    const activeState = metadata.states.find(
      (state) => state.key === selectedStatus,
    );
    const matchesStatus =
      activeState.isDefault || itemRow.estado === activeState.label;

    const matchesCategory =
      selectedCategory === defaultCategory ||
      itemRow[metadata.category.field] === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const estadosToolbar = Object.fromEntries(
    metadata.states.map((state) => [state.key, state.label]),
  );

  return (
    <>
      <Sidebar
        title={metadata.category.label}
        data={sidebarCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="col-12 col-md-8 col-lg-9 col-xl-9 col-xxl-10 p-3">
        <TableToolbar
          placeholder={toolbarPlaceholder}
          estados={estadosToolbar}
          textoBoton={toolbarTextoBoton}
          search={search}
          onSearchChange={setSearch}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onAddClick={() => setShowAddModal(true)}
        />
        <Table data={filteredData} metadata={metadata} />
      </div>

      <TableAdd
        entityName={metadata.entity.singleLabel}
        fields={metadata.columns}
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </>
  );
}

export default TableView;
