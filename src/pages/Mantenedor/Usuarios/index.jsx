import { useEffect, useState } from "react";

import usuarioService from "@/services/usuarioService";

import Loading from "@/components/Loading";
import TableView from "@/components/Mantenedor/TableView";

function Usuarios() {
  const [roles, setRoles] = useState();
  const [usuarios, setUsuarios] = useState();
  const [metadata, setMetadata] = useState();

  useEffect(() => {
    usuarioService.getMetadata().then(setMetadata);
  }, []);

  useEffect(() => {
    usuarioService.getCategories().then(setRoles);
  }, []);

  useEffect(() => {
    usuarioService.getAll().then(setUsuarios);
  }, []);

  if (!metadata || !roles || !usuarios) {
    return <Loading />;
  }

  const handleCreateUser = async (newUser) => {
    console.log("Running handleCreateUser");
    await usuarioService.create(newUser);
    const updatedUsers = await usuarioService.getAll();
    setUsuarios(updatedUsers);
  };

  const handleCreateRole = async (newRole) => {
    await usuarioService.createCategory(newRole);
    const updatedRoles = await usuarioService.getCategories();
    setRoles(updatedRoles);
  };

  const handleDeleteUser = async (id) => {
    await usuarioService.delete(id);
    const updatedUsers = await usuarioService.getAll();
    setUsuarios(updatedUsers);
  };

  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <TableView
        data={usuarios}
        metadata={metadata}

        sidebarCategories={roles}
        toolbarPlaceholder="Búsqueda por nombre, correo o rol…"
        toolbarTextoBoton="+ Agregar Usuario"

        onAdd={handleCreateUser}
        onCategoryAdd={handleCreateRole}
        onDelete={handleDeleteUser}
        // onEdit={handleEditUser}
      />
    </div>
  );
}

export default Usuarios;
