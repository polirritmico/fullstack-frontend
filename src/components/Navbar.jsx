function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-secondary">
      <div class="container">
        <a
          class="navbar-brand d-flex align-items-center"
          href="../../index.html"
        >
          <img
            src="../../img/logo-mark.svg"
            alt="Logo de la empresa"
            width="60"
            height="60"
            class="me-2"
          />
          jKiltro
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="../../index.html"
              >
                Inicio
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Contáctanos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../nosotros/historia.html">
                Historia
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Servicios
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../../pages/nosotros/index.html">
                Quiénes Somos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../tienda/index.html">
                Productos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../perfil/crear-perfil.html">
                Crear Perfil
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../perfil/mi-perfil.html">
                Mi Perfil
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../perfil/historial-compras.html">
                Mis Compras
              </a>
            </li>
          </ul>
          <button
            class="btn btn-outline-dark ms-lg-3 mt-3 mt-lg-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i class="bi bi-cart3"></i>
            Carrito
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

// function Navbar2() {
//   return (
//     <nav className="navbar navbar-expand-md bg-light">
//       <div className="container">
//         <a className="navbar-brand" href="#">
//           <img
//             src="../../img/logo-mark.svg"
//             alt="Logo de la empresa"
//             width="75"
//             height="75"
//             className="me-3"
//           />
//           jKiltro
//         </a>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="#">
//                 Inicio
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Contactanos
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Historia
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Servicios
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">
//                 Quienes Somos
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
