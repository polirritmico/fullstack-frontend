import ProductCard from "@/components/ProductCard";
import { productos } from "@/data/productos";
import { useContext } from "react";
import { CarritoContext } from "@/Context/CarritoContext";

function Tienda() {
  const { agregarProducto } = useContext(CarritoContext);

  function agregarAlCarrito(producto) {
    agregarProducto(producto);
  }

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h1 className="fw-bold">Productos</h1>
        <p className="text-body-secondary">
          Encuentra alimentos, juguetes y accesorios para tu mascota.
        </p>
      </div>

      <div className="row g-4">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>
    </section>
  );
}

export default Tienda;
