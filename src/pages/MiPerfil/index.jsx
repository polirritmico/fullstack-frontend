import "./MiPerfil.css";

const usuario = {
  nombre: "Armando",
  apellido: "Mesas Quito",
  correo: "armando.mesas@email.com",
  telefono: "+56 9 1234 5678",
  direccion: "Av. Los Pinos 123, Santiago",
};

function MiPerfil() {
  const iniciales = usuario.nombre.charAt(0) + usuario.apellido.charAt(0);

  return (
    <section className="perfil-page py-5">
      <div className="container">
        <h1 className="mb-4 fw-bold">Mi perfil</h1>

        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <div className="card border-0 shadow-sm text-center p-4 mb-4">
              <div className="avatar-perfil mx-auto mb-3">{iniciales}</div>

              <h2 className="h4 mb-1">
                {usuario.nombre} {usuario.apellido}
              </h2>

              <p className="text-body-secondary mb-2 text-break">
                {usuario.correo}
              </p>

              <div className="mb-3">
                <span className="badge rounded-pill text-bg-primary">
                  Cliente jKiltro
                </span>
              </div>

              <button
                className="btn btn-outline-primary w-100"
                type="button"
                disabled
              >
                Editar perfil
              </button>
            </div>

            <nav
              className="list-group perfil-menu shadow-sm"
              aria-label="Secciones del perfil"
            >
              <a
                href="#datos-personales"
                className="list-group-item list-group-item-action active"
                aria-current="location"
              >
                <i className="bi bi-person me-2" aria-hidden="true"></i>
                Datos personales
              </a>

              <button
                className="list-group-item list-group-item-action"
                type="button"
                disabled
              >
                <i className="bi bi-box-seam me-2" aria-hidden="true"></i>
                Mis pedidos
              </button>

              <button
                className="list-group-item list-group-item-action"
                type="button"
                disabled
              >
                <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                Direcciones
              </button>

              <button
                className="list-group-item list-group-item-action"
                type="button"
                disabled
              >
                <i
                  className="bi bi-box-arrow-right me-2"
                  aria-hidden="true"
                ></i>
                Cerrar sesión
              </button>
            </nav>
          </aside>

          <div className="col-12 col-lg-9">
            <section
              id="datos-personales"
              className="card border-0 shadow-sm mb-4"
              aria-labelledby="titulo-datos"
            >
              <div className="card-header bg-white py-3">
                <h2 className="h4 mb-0" id="titulo-datos">
                  Datos personales
                </h2>
              </div>

              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="perfil-nombre" className="form-label">
                      Nombre
                    </label>

                    <input
                      id="perfil-nombre"
                      className="form-control"
                      type="text"
                      value={usuario.nombre}
                      readOnly
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="perfil-apellido" className="form-label">
                      Apellido
                    </label>

                    <input
                      id="perfil-apellido"
                      className="form-control"
                      type="text"
                      value={usuario.apellido}
                      readOnly
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="perfil-correo" className="form-label">
                      Correo electrónico
                    </label>

                    <input
                      id="perfil-correo"
                      className="form-control"
                      type="email"
                      value={usuario.correo}
                      readOnly
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="perfil-telefono" className="form-label">
                      Teléfono
                    </label>

                    <input
                      id="perfil-telefono"
                      className="form-control"
                      type="tel"
                      value={usuario.telefono}
                      readOnly
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="perfil-direccion" className="form-label">
                      Dirección
                    </label>

                    <input
                      id="perfil-direccion"
                      className="form-control"
                      type="text"
                      value={usuario.direccion}
                      readOnly
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <button className="btn btn-primary" type="button" disabled>
                  <i className="bi bi-pencil me-2" aria-hidden="true"></i>
                  Editar información
                </button>
              </div>
            </section>

            <p className="small text-body-secondary">
              Datos y resumen de demostración.
            </p>

            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="icono-resumen">
                      <i className="bi bi-box-seam" aria-hidden="true"></i>
                    </div>

                    <div>
                      <p className="mb-1">Pedidos realizados</p>
                      <strong className="fs-3">5</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="icono-resumen">
                      <i className="bi bi-truck" aria-hidden="true"></i>
                    </div>

                    <div>
                      <p className="mb-1">Pedido en camino</p>
                      <strong className="fs-3">1</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="icono-resumen">
                      <i className="bi bi-geo-alt" aria-hidden="true"></i>
                    </div>

                    <div>
                      <p className="mb-1">Dirección guardada</p>
                      <strong className="fs-3">1</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiPerfil;
