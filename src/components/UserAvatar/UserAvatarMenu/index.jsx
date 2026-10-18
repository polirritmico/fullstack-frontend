import { Link } from "react-router";

const ADMIN_ROLE = "Administrador";

function UserAvatarMenu({ userData }) {
  return (
    <ul className="dropdown-menu dropdown-menu-end mt-2">
      <li>
        <Link className="dropdown-item" to="/perfil">
          <i className="bi bi-person me-2"></i>
          Mi perfil
        </Link>
      </li>
      <li>
        <Link className="dropdown-item" to="/tienda/carrito">
          <i className="bi bi-cart me-2"></i>
          Mi carrito
        </Link>
      </li>
      {userData.role === ADMIN_ROLE && (
        <li>
          <Link className="dropdown-item" to="/mantenedor">
            <i className="bi bi-gear me-2"></i>
            Administración
          </Link>
        </li>
      )}
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <Link className="dropdown-item text-danger" to="/logout">
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </Link>
      </li>
    </ul>
  );
}

export default UserAvatarMenu;
