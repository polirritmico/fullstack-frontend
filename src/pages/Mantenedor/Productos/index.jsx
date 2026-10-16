import { useEffect, useState } from "react";

import productoService from "@/services/productoService";

import Loading from "@/components/Loading";
import Sidebar from "@/components/Mantenedor/Sidebar";
import Table from "@/components/Mantenedor/Table";
import TableToolbar from "@/components/Mantenedor/TableToolbar";

function Productos() {
  const [productos, setProductos] = useState();
  const [categorias, setCategorias] = useState();
  const [metadata, setMetadata] = useState();

  useEffect(() => {
    productoService.getMetadata().then(setMetadata);
  }, []);

  useEffect(() => {
    productoService.getCategories().then(setCategorias);
  }, []);

  useEffect(() => {
    productoService.getAll().then(setProductos);
  }, []);

  if (!metadata || !categorias || !productos) {
    return <Loading />;
  }

  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <Sidebar title={metadata.etiquetas.categoria} data={categorias} />

      <div className="col-12 col-md-8 col-lg-9 col-xl-9 col-xxl-10 p-3">
        <TableToolbar
          placeholder="Búsqueda por producto o SKU…"
          estados={metadata.estados}
          textoBoton="+ Agregar Productos"
        />

        <Table
          data={productos}
          columnas={metadata.categoriasTabla}
          campos={metadata.campos}
          etiquetas={metadata.etiquetas}
          estados={metadata.estados}
        />
      </div>
    </div>
  );
}

export default Productos;
