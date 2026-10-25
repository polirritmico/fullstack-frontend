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

  const handleCreateProduct = async (newProduct) => {
    console.log("Running handleCreateProduct");
    await productoService.create(newProduct);
    const updatedProducts = await productoService.getAll();
    setProductos(updatedProducts);
  };

  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <TableView
        data={productos}
        metadata={metadata}

        sidebarCategories={categorias}
        toolbarPlaceholder="Búsqueda por producto o SKU..."
        toolbarTextoBoton="+ Agregar Productos"

        onAdd={handleCreateProduct}
      />
    </div>
  );
}

export default Productos;
