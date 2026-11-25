import { jkiltroApi } from "@/services/api";

function mapProductoResponseToProducto(productoResponse) {
  if (!productoResponse) {
    return null;
  }

  return {
    id: productoResponse.id,
    nombre: productoResponse.nombre,
    sku: productoResponse.sku,
    descripcion: productoResponse.descripcion,
    caracteristicas: productoResponse.caracteristicas,
    imagen: productoResponse.imagen,
    categoriaId: productoResponse.categoriaId,
    categoria: productoResponse.categoria,
    // BigDecimal llega como número JSON; Number() asegura el formateo CLP.
    precio: Number(productoResponse.precio),
    stock: productoResponse.stock,
    estadoId: productoResponse.estadoId,
    estado: productoResponse.estado,
    activo: productoResponse.activo,
  };
}

function mapNewCategoriaToNewCategoriaRequest(newCategoria) {
  if (!newCategoria) {
    return null;
  }

  return {
    nombreCategoria: newCategoria.nombre,
    nombreMostrar: newCategoria.nombreMostrar,
    icon: newCategoria.icon,
    descripcion: newCategoria.descripcion,
  };
}

function mapProductoToRequest(producto) {
  if (!producto) {
    return null;
  }

  return {
    nombre: producto.nombre,
    sku: producto.sku,
    descripcion: producto.descripcion,
    caracteristicas: producto.caracteristicas,
    imagen: producto.imagen,
    precio: Number(producto.precio),
    stock: Number(producto.stock),
    categoriaId: Number(producto.categoriaId),
    estadoId: Number(producto.estadoId),
  };
}

const productoService = {
  async getMetadata() {
    const res = await jkiltroApi.get("/api/v1/products/metadata");
    return res.data;
  },

  // ---------------------------------------------------------------------------

  async create(newProducto) {
    const req = mapProductoToRequest(newProducto);
    const res = await jkiltroApi.post("/api/v1/products", req);
    return res.data;
  },

  async getAll() {
    const res = await jkiltroApi.get("/api/v1/products");
    return res.data;
  },

  // Catálogo público de la tienda: solo productos activos (no requiere token).
  async getCatalogo() {
    const res = await jkiltroApi.get("/api/v1/products/active");
    return res.data.map(mapProductoResponseToProducto);
  },

  async getById(id) {
    const res = await jkiltroApi.get(`/api/v1/products/${id}`);
    return mapProductoResponseToProducto(res.data);
  },

  async update(updatedProducto) {
    const req = mapProductoToRequest(updatedProducto);
    const res = await jkiltroApi.put(
      `/api/v1/products/${updatedProducto.id}`,
      req,
    );
    return res.data;
  },

  async delete(id) {
    await jkiltroApi.delete(`/api/v1/products/${id}`);
    return true;
  },

  // ---------------------------------------------------------------------------

  async getCategories() {
    const res = await jkiltroApi.get("/api/v1/products/categories");
    return res.data;
  },

  async createCategory(newCategoria) {
    const body = mapNewCategoriaToNewCategoriaRequest(newCategoria);
    const res = await jkiltroApi.post("/api/v1/products/categories", body);
    return res.data;
  },
};

export default productoService;
