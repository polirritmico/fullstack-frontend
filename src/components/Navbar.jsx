function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container">
        <a
          className="navbar-brand d-flex align-items-center"
          href="../../index.html"
        >
          <img
            src="../../img/logo-mark.svg"
            alt="Logo de la empresa"
            width="60"
            height="60"
            className="me-2"
          />
          jKiltro
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div classNameName="NavbarEnlaces">
          <NavbarEnlaces />
        </div>
      </div>
    </nav>
  );
}

function NavbarEnlaces() {
  return (
    <>
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
          <li className="nav-item">
            <a className="nav-link" href="#">
              Contáctanos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="../nosotros/historia.html">
              Historia
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Servicios
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="../../pages/nosotros/index.html">
              Quiénes Somos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="../tienda/index.html">
              Productos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="../perfil/crear-perfil.html">
              Crear Perfil
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="../perfil/mi-perfil.html">
              Mi Perfil
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="../perfil/historial-compras.html">
              Mis Compras
            </a>
          </li>
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
    </>
  );
}

export default Navbar;

// function Navbar2() {
//   return (
//     <nav classNameName="navbar navbar-expand-md bg-light">
//       <div classNameName="container">
//         <a classNameName="navbar-brand" href="#">
//           <img
//             src="../../img/logo-mark.svg"
//             alt="Logo de la empresa"
//             width="75"
//             height="75"
//             classNameName="me-3"
//           />
//           jKiltro
//         </a>

//         <button
//           classNameName="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span classNameName="navbar-toggler-icon"></span>
//         </button>

//         <div classNameName="collapse navbar-collapse" id="navbarNav">
//           <ul classNameName="navbar-nav mx-auto">
//             <li classNameName="nav-item">
//               <a classNameName="nav-link active" aria-current="page" href="#">
//                 Inicio
//               </a>
//             </li>
//             <li classNameName="nav-item">
//               <a classNameName="nav-link" href="#">
//                 Contactanos
//               </a>
//             </li>
//             <li classNameName="nav-item">
//               <a classNameName="nav-link" href="#">
//                 Historia
//               </a>
//             </li>
//             <li classNameName="nav-item">
//               <a classNameName="nav-link" href="#">
//                 Servicios
//               </a>
//             </li>
//             <li classNameName="nav-item">
//               <a classNameName="nav-link" href="#">
//                 Quienes Somos
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
