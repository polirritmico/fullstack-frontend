import { Link } from "react-router-dom";

function NavbarBody({ paginas, carrito }) {
  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        {paginas.map(({ nombre, link, style }) => (
          <li className="nav-item" key={nombre}>
            <Link className={`nav-link ${style}`} to={link}>
              {nombre}
            </Link>
          </li>
        ))}
      </ul>

      {/* CASO CARRITO */}
      <button
        className="btn btn-outline-dark ms-lg-3 mt-3 mt-lg-0"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="bi bi-cart3"></i>
        {carrito}
      </button>
    </div>
  );
}

export default NavbarBody;
