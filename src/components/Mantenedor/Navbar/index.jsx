import { NavLink } from "react-router-dom";

import CurrentDateTime from "@/components/CurrentDateTime";

import "@/styles/shared/mantenedor.css";

const sections = {
  Usuarios: "/mantenedor/usuarios",
  Productos: "/mantenedor/productos",
  // Roles: "/mantenedor/roles",
  // Correos: "/mantenedor/correos",
  Configuración: "/mantenedor/configuracion",
};

function Navbar() {
  return (
    <nav className="navbar border-top py-0">
      <div className="container-fluid">
        <ul className="nav nav-underline align-items-center w-100 gap-2">
          {Object.entries(sections).map(([section, path]) => (
            <li key={path} className="nav-item">
              <NavLink
                className={({ isActive, isPending }) =>
                  `nav-link px-3 ${isPending ? "pending" : isActive ? "active" : ""}`
                }
                to={path}
                // add end so this kind of endpoints doesnt get the active mark:
                // /mantenedor/usuarios/foo /mantenedor/usuarios/edit/5
                end
              >
                {section}
              </NavLink>
            </li>
          ))}
          <CurrentDateTime />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
