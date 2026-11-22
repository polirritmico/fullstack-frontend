import { useState } from "react";

import CategoryAdd from "@/components/Mantenedor/Modal/CategoryAdd";
import Sidebar from "@/components/Mantenedor/Sidebar";
import Table from "@/components/Mantenedor/Table";
import TableAdd from "@/components/Mantenedor/Modal/TableAdd";
import TableDelete from "@/components/Mantenedor/Modal/TableDelete";
import TableDetails from "@/components/Mantenedor/Modal/TableDetails";
import TableEdit from "@/components/Mantenedor/Modal/TableEdit";
import TableToolbar from "@/components/Mantenedor/TableToolbar";

function TableView({
  data,
  metadata,
  sidebarCategories,
  tableCustomClass,
  toolbarPlaceholder,
  toolbarTextoBoton,
  onAdd,
  onEdit,
  onCategoryAdd,
  onDelete,
}) {
  const defaultState = metadata.states.find((state) => state.isDefault);
  const defaultCategory = sidebarCategories.find((cat) => cat.isDefault).id;

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(defaultState.id);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [entryToDetails, setEntryToDetails] = useState(null);

  const searchFields = metadata.columns
    .filter((col) => col.isSearchable)
    .map((col) => col.key);

  const filteredData = data.filter((itemRow) => {
    const matchesSearch =
      !search ||
      searchFields.some((field) => {
        const rawValue = itemRow[field];
        let values = [rawValue];

        if (field === metadata.category.field) {
          const category = sidebarCategories.find((cat) => cat.id === rawValue);
          values = [category?.value, category?.name, rawValue];
        }
        return values.some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()),
        );
      });

    const stateField = metadata.columns.find((col) => col.isState)?.key;

    const activeState = metadata.states.find(
      (state) => state.id === selectedStatus,
    );

    const matchesStatus =
      activeState.isDefault || itemRow[stateField] === selectedStatus;

    const matchesCategory =
      selectedCategory === defaultCategory ||
      itemRow[metadata.category.field] === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const estadosToolbar = Object.fromEntries(
    metadata.states.map((state) => [state.id, state.label]),
  );

  async function handleSave(newData) {
    if (onAdd) {
      await onAdd(newData);
    }
    setShowAddModal(false);
  }

  async function handleEditSave(updatedData) {
    if (onEdit) {
      await onEdit(updatedData);
    }
    setEntryToEdit(null);
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
        .filter((cat) => !cat.isDefault)
        .map((cat) => ({ value: cat.id, label: cat.name }));
    } else if (col.isState) {
      options = metadata.states
        .filter((state) => !state.isDefault)
        .map((state) => ({ value: state.id, label: state.label }));
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
          customClass={tableCustomClass}
          onDeleteClick={setEntryToDelete}
          onEditClick={setEntryToEdit}
          onDetailsClick={setEntryToDetails}

          categories={sidebarCategories}
          states={metadata.states}
          categoryField={metadata.category.field}
        />
      </div>

      <TableDetails
        entityName={singleLabel}
        fields={metadata.columns}
        show={Boolean(entryToDetails)}
        entry={entryToDetails}
        onHide={() => setEntryToDetails(null)}

        categories={sidebarCategories}
        states={metadata.states}
        categoryField={metadata.category.field}
      />

      <TableAdd
        entityName={singleLabel}
        fields={formFields}
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleSave}
      />

      <TableEdit
        entityName={singleLabel}
        fields={formFields}
        show={Boolean(entryToEdit)}
        entry={entryToEdit}
        onHide={() => setEntryToEdit(null)}
        onSave={handleEditSave}
      />

      <TableDelete
        show={Boolean(entryToDelete)}
        entry={entryToDelete}
        metadata={metadata}
        onHide={() => setEntryToDelete(null)}
        onConfirm={handleDelete}
      />

      <CategoryAdd
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        onSave={handleCategorySave}
        title={metadata.category.addTitle}
        icons={metadata.category.icons}
      />
    </>
  );
}

export default TableView;
