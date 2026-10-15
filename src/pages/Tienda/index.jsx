import { useContext, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Carrusel from "@/components/Carrusel";
import FiltrosTienda from "@/components/FiltrosTienda";
import { productos } from "@/data/productos";
import { CarritoContext } from "@/Context/CarritoContext";

function Tienda() {
  const { agregarProducto } = useContext(CarritoContext);
  const [categoria, setCategoria] = useState("Todas");

  function agregarAlCarrito(producto) {
    agregarProducto(producto);
  }

  const productosFiltrados = productos.filter(
    (producto) => categoria === "Todas" || producto.categoria === categoria,
  );

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
          />
        </aside>

        <div className="col-12 col-lg-9">
          <p className="text-body-secondary">
            Productos encontrados: {productosFiltrados.length}
          </p>

          <div className="row g-4">
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onAgregar={agregarAlCarrito}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tienda;
