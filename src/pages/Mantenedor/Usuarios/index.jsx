import { useEffect, useState } from "react";

import usuarioService from "@/services/usuarioService";

import Loading from "@/components/Loading";
import Sidebar from "@/components/Mantenedor/Sidebar";
import Table from "@/components/Mantenedor/Table";
import TableToolbar from "@/components/Mantenedor/TableToolbar";

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
      <Sidebar title={metadata.etiquetas.categoria} data={roles} />

      <div className="col-12 col-md-8 col-lg-9 col-xl-9 col-xxl-10 p-3">
        <TableToolbar
          placeholder="Búsqueda por nombre, correo o rol…"
          estados={metadata.estados}
          textoBoton="+ Agregar Usuario"
        />

        <Table
          data={usuarios}
          columnas={metadata.categoriasTabla}
          campos={metadata.campos}
          etiquetas={metadata.etiquetas}
          estados={metadata.estados}
        />
      </div>
    </div>
  );
}

export default Usuarios;
