import { useEffect, useState } from "react";

import usuarioService from "@/services/usuarioService";

import Loading from "@/components/Loading";
import Sidebar from "@/components/Mantenedor/Sidebar";
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
      <Sidebar title={metadata.etiquetas.categoria} data={roles} />

      <div className="col-12 col-md-8 col-lg-9 col-xl-9 col-xxl-10 p-3">
        <TableView
          data={usuarios}
          tableColumnas={metadata.categoriasTabla}
          tableCampos={metadata.campos}
          tableEtiquetas={metadata.etiquetas}
          tableEstados={metadata.estados}
          toolbarPlaceholder="Búsqueda por nombre, correo o rol…"
          toolbarTextoBoton="+ Agregar Usuario"
          // filterSearchFields={metadata.buscarEn}
          filterSearchFields={["nombre", "email", "rol"]}
        />
      </div>
    </div>
  );
}

export default Usuarios;
