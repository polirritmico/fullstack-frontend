import { useCallback, useEffect, useState } from "react";

import usuarioService from "@/services/usuarioService";

import Loading from "@/components/Loading";
import TableView from "@/components/Mantenedor/TableView";
import SinConexion from "@/pages/Errores/SinConexion";

function Usuarios() {
  const [roles, setRoles] = useState();
  const [usuarios, setUsuarios] = useState();
  const [metadata, setMetadata] = useState();
  const [connectionError, setConnectionError] = useState(false);

  const fetchInitialData = useCallback(() => {
    return Promise.all([
      usuarioService.getMetadata(),
      usuarioService.getCategories(),
      usuarioService.getAll(),
    ]);
  }, []);

  useEffect(() => {
    fetchInitialData()
      .then(([metadataRes, rolesRes, usuariosRes]) => {
        setMetadata(metadataRes);
        setRoles(rolesRes);
        setUsuarios(usuariosRes);
      })
      .catch((err) => {
        if (err.isConnectionError) {
          setConnectionError(true);
        }
      });
  }, [fetchInitialData]);

  const handleRetry = async () => {
    setConnectionError(false);

    try {
      const [metadataRes, rolesRes, usuariosRes] = await fetchInitialData();
      setMetadata(metadataRes);
      setRoles(rolesRes);
      setUsuarios(usuariosRes);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  if (connectionError) {
    return <SinConexion onRetry={handleRetry} />;
  }

  if (!metadata || !roles || !usuarios) {
    return <Loading />;
  }

  const handleCreateUser = async (newUser) => {
    try {
      await usuarioService.create(newUser);
      const updatedUsers = await usuarioService.getAll();
      setUsuarios(updatedUsers);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      await usuarioService.update(updatedUser);
      const updatedUsers = await usuarioService.getAll();
      setUsuarios(updatedUsers);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  const handleCreateRole = async (newRole) => {
    try {
      await usuarioService.createCategory(newRole);
      const updatedRoles = await usuarioService.getCategories();
      setRoles(updatedRoles);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await usuarioService.delete(id);
      const updatedUsers = await usuarioService.getAll();
      setUsuarios(updatedUsers);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <TableView
        data={usuarios}
        metadata={metadata}

        tableCustomClass="tabla-usuarios"
        sidebarCategories={roles}
        toolbarPlaceholder="Búsqueda por nombre, correo o rol…"
        toolbarTextoBoton="+ Agregar Usuario"

        onAdd={handleCreateUser}
        onCategoryAdd={handleCreateRole}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />
    </div>
  );
}

export default Usuarios;
