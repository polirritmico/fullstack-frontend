import { useEffect, useState } from "react";

import productoService from "@/services/productoService";

import Loading from "@/components/Loading";
import TableView from "@/components/Mantenedor/TableView";

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
      <TableView
        data={productos}
        tableColumnas={metadata.categoriasTabla}
        tableCampos={metadata.campos}
        tableEtiquetas={metadata.etiquetas}
        tableEstados={metadata.estados}
        toolbarPlaceholder="Búsqueda por producto o SKU…"
        toolbarTextoBoton="+ Agregar Productos"
        // filterSearchFields={metadata.buscarEn}
        filterSearchFields={["nombre", "sku"]}
        sidebarCategories={categorias}
        sidebarCategoriesTitle={metadata.etiquetas.categoria}
      />
    </div>
  );
}

export default Productos;
