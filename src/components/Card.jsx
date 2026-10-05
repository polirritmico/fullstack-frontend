function Card() {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 rounded-5 text-center producto-card position-relative">
        <img
          src="../../img/comida-perro.png"
          className="card-img-top producto-card__imagen"
          alt="Producto 1"
        />
        <div className="card-body">
          <p>algo mientras tanto</p>
        </div>
      </div>
    </div>
  );
}

function CardBody() {
  return (
    <>
      <h5 className="card-title">
        <a
          href="./detalle-productos.html?id=1"
          className="stretched-link text-decoration-none text-dark"
        >
          Alimento Perro Adulto
        </a>
      </h5>
      <p className="card-text">
        Alimento seco balanceado para perros adultos, ideal para mantener
        energía y digestión saludable.
      </p>
      <p className="fw-bold text-primary mb-3">$29.990</p>
      <button
        className="btn btn-primary agregar-carrito"
        type="button"
        data-nombre="Alimento Perro Adulto"
        data-precio="29990"
      >
        Agregar al carro
      </button>
    </>
  );
}
