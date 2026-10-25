import { NavLink } from "react-router";

import { useAuth } from "@/contexts/Auth/AuthContext";

const ADMIN_ROLE = "Administrador";

export default function NavbarBody() {
  const pages = [
    { nombre: "Inicio", link: "/" },
    { nombre: "Tienda", link: "/tienda" },
    { nombre: "Nosotros", link: "/nosotros" },
  ];
  const { user } = useAuth();

  return (
    <>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          {pages.map(({ nombre, link }) => (
            <li className="nav-item" key={nombre}>
              <NavLink className="nav-link" to={link}>
                {nombre}
              </NavLink>
            </li>
          ))}

          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/crear-perfil">
                Crear perfil
              </NavLink>
            </li>
          )}

          {user?.role == ADMIN_ROLE && (
            <li className="nav-item" key="mantenedor">
              <NavLink className="nav-link" to="/mantenedor">
                Administración
              </NavLink>
            </li>
          )}
        </ul>

        <button
          className="btn btn-light my-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <i className="bi bi-cart3"></i>
          Carrito
        </button>
      </div>

      <button
        className="navbar-toggler my-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </>
  );
}
