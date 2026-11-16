import { useCallback, useEffect, useState } from "react";

import productoService from "@/services/productoService";

import Loading from "@/components/Loading";
import TableView from "@/components/Mantenedor/TableView";
import SinConexion from "@/pages/Errores/SinConexion";

function Productos() {
  const [productos, setProductos] = useState();
  const [categorias, setCategorias] = useState();
  const [metadata, setMetadata] = useState();
  const [connectionError, setConnectionError] = useState(false);

  const fetchInitialData = useCallback(() => {
    return Promise.all([
      productoService.getMetadata(),
      productoService.getCategories(),
      productoService.getAll(),
    ]);
  }, []);

  useEffect(() => {
    fetchInitialData()
      .then(([metadataRes, categoriasRes, productosRes]) => {
        setMetadata(metadataRes);
        setCategorias(categoriasRes);
        setProductos(productosRes);
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
      const [metadataRes, categoriasRes, productosRes] =
        await fetchInitialData();
      setMetadata(metadataRes);
      setCategorias(categoriasRes);
      setProductos(productosRes);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  if (connectionError) {
    return <SinConexion onRetry={handleRetry} />;
  }

  if (!metadata || !categorias || !productos) {
    return <Loading />;
  }

  const handleCreateProduct = async (newProduct) => {
    try {
      await productoService.create(newProduct);
      const updatedProducts = await productoService.getAll();
      setProductos(updatedProducts);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await productoService.update(updatedProduct);
      const updatedProducts = await productoService.getAll();
      setProductos(updatedProducts);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  const handleCreateCategory = async (newCategory) => {
    try {
      await productoService.createCategory(newCategory);
      const updatedCategories = await productoService.getCategories();
      setCategorias(updatedCategories);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productoService.delete(id);
      const updatedProducts = await productoService.getAll();
      setProductos(updatedProducts);
    } catch (err) {
      if (err.isConnectionError) {
        setConnectionError(true);
      }
    }
  };

  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <TableView
        data={productos}
        metadata={metadata}

        tableCustomClass="tabla-productos"
        sidebarCategories={categorias}
        toolbarPlaceholder="Búsqueda por producto o SKU..."
        toolbarTextoBoton="+ Agregar Productos"

        onAdd={handleCreateProduct}
        onCategoryAdd={handleCreateCategory}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
}

export default Productos;
