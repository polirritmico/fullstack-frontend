import { useState } from "react";

import Table from "@/components/Mantenedor/Table";
import TableToolbar from "@/components/Mantenedor/TableToolbar";
import Sidebar from "@/components/Mantenedor/Sidebar";
import TableAdd from "@/components/Mantenedor/Modal/TableAdd";
import CategoryAdd from "@/components/Mantenedor/Modal/CategoryAdd";
import TableDelete from "@/components/Mantenedor/Modal/TableDelete";

function TableView({
  data,
  metadata,
  sidebarCategories,
  toolbarPlaceholder,
  toolbarTextoBoton,
  onAdd,
  onCategoryAdd,
  onDelete,
}) {
  const defaultState = metadata.states.find((state) => state.isDefault);
  const defaultCategory = sidebarCategories.find((cat) => cat.isDefault).value;

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(defaultState.key);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

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

  async function handleSave(newData) {
    if (onAdd) {
      await onAdd(newData);
    }
    setShowAddModal(false);
  }

  async function handleCategorySave(newData) {
    if (onCategoryAdd) {
      await onCategoryAdd(newData);
    }
    setShowCategoryModal(false);
  }

  async function handleDelete() {
    if (onDelete && entryToDelete) {
      await onDelete(entryToDelete.id);
    }
    setEntryToDelete(null);
  }

  const singleLabel = metadata.entity.singleLabel;

  const formFields = metadata.columns.map((col) => {
    let options = null;

    if (col.key === metadata.category.field) {
      options = sidebarCategories
        .filter((cat) => cat.value !== "todos")
        .map((cat) => ({ value: cat.value, label: cat.name }));
    } else if (col.isState) {
      options = metadata.states
        .filter((state) => state.key !== "todos")
        .map((state) => ({ value: state.label, label: state.label }));
    }

    return { ...col, options };
  });

  return (
    <>
      <Sidebar
        title={metadata.category.label}
        data={sidebarCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onAddClick={() => setShowCategoryModal(true)}
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
        <Table
          data={filteredData}
          metadata={metadata}
          onDeleteClick={setEntryToDelete}
        />
      </div>

      <TableAdd
        entityName={singleLabel}
        fields={formFields}
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleSave}
      />

      <CategoryAdd
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        onSave={handleCategorySave}
        title={metadata.category.addTitle}
        icons={metadata.category.icons}
      />

      <TableDelete
        show={Boolean(entryToDelete)}
        entry={entryToDelete}
        metadata={metadata}
        onHide={() => setEntryToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default TableView;
