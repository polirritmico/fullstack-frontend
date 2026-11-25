import { useCallback, useContext, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Carrusel from "@/components/Carrusel";
import FiltrosTienda from "@/components/FiltrosTienda";
import Loading from "@/components/Loading";
import SinConexion from "@/pages/Errores/SinConexion";
import productoService from "@/services/productoService";
import { CarritoContext } from "@/contexts/Carrito/CarritoContext";

export const TODAS_LAS_CATEGORIAS = "todos";

function Tienda() {
  const { agregarProducto } = useContext(CarritoContext);
  const [categoria, setCategoria] = useState(TODAS_LAS_CATEGORIAS);
  const [precio, setPrecio] = useState("Todos");

  // Datos que llegan desde product-api (a través del API Gateway).
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const cargarCatalogo = useCallback(() => {
    return Promise.all([
      productoService.getCatalogo(),
      productoService.getCategories(),
    ])
      .then(([productosRes, categoriasRes]) => {
        setProductos(productosRes);
        // La opción "Todos los productos" la maneja el propio filtro.
        setCategorias(categoriasRes.filter((cat) => !cat.isDefault));
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    cargarCatalogo();
  }, [cargarCatalogo]);

  function reintentar() {
    setCargando(true);
    setError(false);
    cargarCatalogo();
  }

  function agregarAlCarrito(producto) {
    agregarProducto(producto);
  }

  if (cargando) {
    return <Loading />;
  }

  if (error) {
    return <SinConexion onRetry={reintentar} />;
  }

  const productosFiltrados = productos.filter((producto) => {
    const cumpleCategoria =
      categoria === TODAS_LAS_CATEGORIAS ||
      String(producto.categoriaId) === categoria;

    let cumplePrecio = true;

    if (precio === "menos-20000") {
      cumplePrecio = producto.precio < 20000;
    } else if (precio === "20000-50000") {
      cumplePrecio = producto.precio >= 20000 && producto.precio <= 50000;
    } else if (precio === "mas-50000") {
      cumplePrecio = producto.precio > 50000;
    }

    return cumpleCategoria && cumplePrecio;
  });

  return (
    <section className="container py-5">
      <Carrusel />

      <div className="mb-4">
        <h1 className="fw-bold">Productos</h1>

        <p className="text-body-secondary">
          Encuentra alimentos, juguetes y accesorios para tu mascota.
        </p>
      </div>

      <div className="row g-4">
        <aside className="col-12 col-lg-3">
          <FiltrosTienda
            categorias={categorias}
            categoria={categoria}
            onCambiarCategoria={setCategoria}
            precio={precio}
            onCambiarPrecio={setPrecio}
          />
        </aside>

        <div className="col-12 col-lg-9">
          <p className="text-body-secondary">
            Productos encontrados: {productosFiltrados.length}
          </p>

          {productosFiltrados.length === 0 ? (
            <p>No hay productos que coincidan con los filtros.</p>
          ) : (
            <div className="row g-4">
              {productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onAgregar={agregarAlCarrito}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Tienda;
