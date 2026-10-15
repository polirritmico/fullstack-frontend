import { useEffect, useState } from "react";

import usuarioService from "@/services/usuarioService";

import Loading from "@/components/Loading";
import Sidebar from "@/components/Mantenedor/Sidebar";
import Table from "@/components/Mantenedor/Table";
import TableToolbar from "@/components/Mantenedor/TableToolbar";

function Usuarios() {
  const [roles, setRoles] = useState();
  const [users, setUsers] = useState();
  const [metadata, setMetadata] = useState();

  useEffect(() => {
    usuarioService.getMetadata().then(setMetadata);
  }, []);

  useEffect(() => {
    usuarioService.getCategories().then(setRoles);
  }, []);

  useEffect(() => {
    usuarioService.getAll().then(setUsers);
  }, []);

  if (!metadata || !roles || !users) {
    return <Loading />;
  }

  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <Sidebar title="Roles" data={roles} />

      <div className="col-12 col-md-8 col-lg-9 col-xl-9 col-xxl-10 p-3">
        <TableToolbar
          placeholder="Búsqueda por nombre, correo o rol…"
          states={metadata.states}
          buttonText="+ Agregar Usuario"
        />

        <Table
          data={users}
          metadata={metadata.categories}
          summaryLabel="usuarios"
        />
      </div>
    </div>
  );
}

export default Usuarios;
