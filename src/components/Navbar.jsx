function Navbar() {
  return (
    <header>
      <section>
        <nav className="navbar navbar-expand-md bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img
                src="../../img/logo-mark.svg"
                alt="Logo de la empresa"
                width="75"
                height="75"
                className="me-3"
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

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contactanos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Historia
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Servicios
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Quienes Somos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </header>
  );
}
export default Navbar;