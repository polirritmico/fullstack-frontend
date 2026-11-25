import { useCallback, useEffect, useState } from "react";

import productoService from "@/services/productoService";
import { resolveErrorType } from "@/components/Mantenedor/utils/errors";

import Loading from "@/components/Loading";
import TableView from "@/components/Mantenedor/TableView";
import SinConexion from "@/pages/Errores/SinConexion";
import ErrorInesperado from "@/pages/Errores/Inesperado";

function Productos() {
  const [productos, setProductos] = useState();
  const [categorias, setCategorias] = useState();
  const [metadata, setMetadata] = useState();
  const [errorType, setErrorType] = useState(null);

  const fetchInitialData = useCallback(() => {
    return Promise.all([
      productoService.getMetadata(),
      productoService.getCategories(),
      productoService.getAll(),
    ]);
  }, []);

  const refreshProductosAndCategorias = useCallback(async () => {
    const [updatedProductos, updatedCategorias] = await Promise.all([
      productoService.getAll(),
      productoService.getCategories(),
    ]);

    setProductos(updatedProductos);
    setCategorias(updatedCategorias);
  }, []);

  useEffect(() => {
    fetchInitialData()
      .then(([metadataRes, categoriasRes, productosRes]) => {
        setMetadata(metadataRes);
        setCategorias(categoriasRes);
        setProductos(productosRes);
      })
      .catch((err) => {
        setErrorType(resolveErrorType(err));
      });
  }, [fetchInitialData]);

  const handleRetry = async () => {
    setErrorType(null);

    try {
      const [metadataRes, categoriasRes, productosRes] =
        await fetchInitialData();
      setMetadata(metadataRes);
      setCategorias(categoriasRes);
      setProductos(productosRes);
    } catch (err) {
      setErrorType(resolveErrorType(err));
    }
  };

  if (errorType === "connection") {
    return <SinConexion onRetry={handleRetry} />;
  }

  if (errorType === "unexpected") {
    return <ErrorInesperado onRetry={handleRetry} />;
  }

  if (!metadata || !categorias || !productos) {
    return <Loading />;
  }

  const handleCreateProduct = async (newProduct) => {
    try {
      await productoService.create(newProduct);
      await refreshProductosAndCategorias();
    } catch (err) {
      setErrorType(resolveErrorType(err));
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await productoService.update(updatedProduct);
      await refreshProductosAndCategorias();
    } catch (err) {
      setErrorType(resolveErrorType(err));
    }
  };

  const handleCreateCategory = async (newCategory) => {
    try {
      await productoService.createCategory(newCategory);
      const updatedCategories = await productoService.getCategories();
      setCategorias(updatedCategories);
    } catch (err) {
      setErrorType(resolveErrorType(err));
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productoService.delete(id);
      await refreshProductosAndCategorias();
    } catch (err) {
      setErrorType(resolveErrorType(err));
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
