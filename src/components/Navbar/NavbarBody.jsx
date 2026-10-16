export default function NavbarBody() {
  const pages = [
    { nombre: "Contáctanos", link: "#" },
    { nombre: "Historia", link: "../nosotros/historia.html" },
    { nombre: "Servicios", link: "#" },
    { nombre: "Quiénes Somos", link: "../../pages/nosotros/index.html" },
    { nombre: "Productos", link: "../tienda/index.html" },
    { nombre: "Crear Perfil", link: "../perfil/crear-perfil.html" },
    { nombre: "Mi Perfil", link: "../perfil/mi-perfil.html" },
    { nombre: "Mis Compras", link: "../perfil/historial-compras.html" },
  ];

  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="../../index.html"
          >
            Inicio
          </a>
        </li>

        {pages.map(({ nombre, link }) => (
          <li className="nav-item" key={nombre}>
            <a className="nav-link" href={link}>
              {nombre}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-outline-dark ms-lg-3 mt-3 mt-lg-0"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="bi bi-cart3"></i>
        Carrito
      </button>
    </div>
  );
}
