import { useContext, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Carrusel from "@/components/Carrusel";
import FiltrosTienda from "@/components/FiltrosTienda";
import { productos } from "@/data/productos";
import { CarritoContext } from "@/contexts/CarritoContext";

function Tienda() {
  const { agregarProducto } = useContext(CarritoContext);
  const [categoria, setCategoria] = useState("Todas");
  const [precio, setPrecio] = useState("Todos");

  function agregarAlCarrito(producto) {
    agregarProducto(producto);
  }

  const productosFiltrados = productos.filter((producto) => {
    const cumpleCategoria =
      categoria === "Todas" || producto.categoria === categoria;

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
