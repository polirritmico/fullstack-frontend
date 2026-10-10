import { useLocation } from "react-router-dom";
import "@/styles/shared/mantenedor.css";
import CurrentDateTime from "@/components/CurrentDateTime";

const sections = {
  Usuarios: "/mantenedor/usuarios",
  Roles: "/mantenedor/roles",
  Correos: "/mantenedor/correos",
  Configuración: "/mantenedor/configuracion",
};

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar border-top py-0">
      <div className="container-fluid">
        <ul className="nav nav-underline align-items-center w-100 gap-2">
          {Object.entries(sections).map(([section, path]) => {
            const isCurrent = pathname === path;

            return (
              <li className="nav-item">
                <a
                  className={`nav-link px-3 ${isCurrent ? "active" : ""}`}
                  data-bs-toggle="tab"
                  aria-current="page"
                  href={path}
                >
                  {section}
                </a>
              </li>
            );
          })}
          <CurrentDateTime />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
