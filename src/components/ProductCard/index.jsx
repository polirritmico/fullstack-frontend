import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

function ProductCard({ producto, onAgregar }) {
  const precioFormateado = producto.precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

  function manejarAgregar() {
    onAgregar(producto);
  }

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article
        className={`card h-100 text-center position-relative ${styles["producto-card"]}`}
      >
        <img
          src={producto.imagen}
          className={`card-img-top ${styles["producto-card__imagen"]}`}
          alt={producto.nombre}
        />

        <div className="card-body d-flex flex-column">
          <h2 className="card-title h5">
            <Link
              to={`/tienda/productos/${producto.id}`}
              className="stretched-link text-decoration-none text-dark"
            >
              {producto.nombre}
            </Link>
          </h2>

          <p className="card-text">{producto.descripcion}</p>

          <p className="fw-bold text-primary fs-5 mt-auto mb-3">
            {precioFormateado}
          </p>

          <button
            className="btn btn-primary position-relative"
            type="button"
            onClick={manejarAgregar}
          >
            <i className="bi bi-cart-plus me-2" aria-hidden="true"></i>
            Agregar al carro
          </button>
        </div>
      </article>
    </div>
  );
}

export default ProductCard;