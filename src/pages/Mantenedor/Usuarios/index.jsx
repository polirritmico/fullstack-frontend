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

  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <TableView
        data={usuarios}
        metadata={metadata}
        sidebarCategories={roles}
        toolbarPlaceholder="Búsqueda por nombre, correo o rol…"
        toolbarTextoBoton="+ Agregar Usuario"
      />
    </div>
  );
}

export default Usuarios;
