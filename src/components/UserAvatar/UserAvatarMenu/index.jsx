import { Link } from "react-router";

function UserAvatarMenu({ userData }) {
  return (
    <ul className="dropdown-menu dropdown-menu-end mt-2">
      {userData ? (
        <>
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
          {/* <li> */}
          {/*   <Link className="dropdown-item" to="/configuracion"> */}
          {/*     <i className="bi bi-gear me-2"></i> */}
          {/*     Configuración */}
          {/*   </Link> */}
          {/* </li> */}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item text-danger" type="button">
              <i className="bi bi-box-arrow-right me-2"></i>
              Cerrar sesión
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link className="dropdown-item" to="/login">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Iniciar sesión
          </Link>
        </li>
      )}
    </ul>
  );
}

export default UserAvatarMenu;
