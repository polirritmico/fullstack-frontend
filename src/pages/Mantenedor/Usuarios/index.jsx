import Sidebar from "@/components/Mantenedor/Sidebar";

const roles = [
  {
    icon: "👥",
    name: "Todos los usuarios",
    amount: 1553,
  },
  {
    icon: "🐕",
    name: "Administradores",
    amount: 2,
  },
  {
    icon: "💼",
    name: "Gerentes",
    amount: 1,
  },
  {
    icon: "🏷️",
    name: "Vendedores",
    amount: 3,
  },
  {
    icon: "🚚",
    name: "Transportistas",
    amount: 5,
  },
  {
    icon: "💻",
    name: "Desarrolladores",
    amount: 5,
  },
  {
    icon: "👤",
    name: "Clientes",
    amount: 1532,
  },
];

function Usuarios() {
  return (
    <div className="row flex-grow-1 justify-content-center align-content-start align-content-md-stretch">
      <Sidebar title="Roles" data={roles} />

      <div className="col-12 col-md-8 col-lg-9 col-xl-9 col-xxl-10 p-3">
        <div className="d-flex justify-content-between gap-3 mb-1">
          <form
            className="d-flex flex-grow-1"
            role="search"
            id="id-form-busqueda"
          >
            <input
              className="form-control"
              type="search"
              placeholder="Búsqueda por nombre, correo o rol…"
              aria-label="Búsqueda por nombre o SKU"
              id="id-input-busqueda"
            />
          </form>

          <div className="d-flex gap-2">
            <select
              className="form-select"
              aria-label="Selector de estados"
              id="id-selector-estados"
            >
              <option value="todos" selected>
                Todos los estados
              </option>
              <option value="activos">Activos</option>
              <option value="inactivos">Inactivos</option>
              <option value="preparacion">En contratación</option>
            </select>
            <button
              type="button"
              className="btn btn-primary text-nowrap"
              id="boton-agregar-usuario"
            >
              + Agregar Usuario
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="tabla-usuarios table table-striped table-hover caption-top align-middle border">
            <caption>
              <span id="id-tabla-cant-usuarios">25</span>
              usuarios
            </caption>

            <thead className="table-secondary">
              <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Rol</th>
                <th scope="col">Departamento</th>
                <th scope="col">Correo</th>
                <th scope="col">Último ingreso</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr id="usuario-101">
                <td className="fw-medium">Ana Rojas</td>
                <td>Administrador</td>
                <td>Operaciones</td>
                <td>ana.rojas@empresa.cl</td>
                <td>13 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="101"
                    data-jk-nombre="Ana Rojas"
                    data-jk-rol="Administrador"
                    data-jk-correo="ana.rojas@empresa.cl"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-102">
                <td className="fw-medium">Carlos Pinto</td>
                <td>Gerente</td>
                <td>Comercial</td>
                <td>cpinto@empresa.cl</td>
                <td>12 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="102"
                    data-jk-nombre="Carlos Pinto"
                    data-jk-rol="Gerente"
                    data-jk-correo="cpinto@empresa.cl"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-103">
                <td className="fw-medium">Fernando Villalobos</td>
                <td>Desarrollador</td>
                <td>Tecnología</td>
                <td>fvillalobos@empresa.cl</td>
                <td>13 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="103"
                    data-jk-nombre="Fernando Villalobos"
                    data-jk-rol="Desarrollador"
                    data-jk-correo="fvillalobos@empresa.cl"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-104">
                <td className="fw-medium">Rodrigo Callealta</td>
                <td>Desarrollador</td>
                <td>Tecnología</td>
                <td>rcallealta@empresa.cl</td>
                <td>11 Sept 2026</td>
                <td>
                  <span className="badge text-bg-secondary">Inactivo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="104"
                    data-jk-nombre="Rodrigo Callealta"
                    data-jk-rol="Desarrollador"
                    data-jk-correo="rcallealta@empresa.cl"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-105">
                <td className="fw-medium">Camila Soto</td>
                <td>Vendedor</td>
                <td>Ventas</td>
                <td>csoto@empresa.cl</td>
                <td>13 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="105"
                    data-jk-nombre="Camila Soto"
                    data-jk-rol="Vendedor"
                    data-jk-correo="csoto@empresa.cl"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-106">
                <td className="fw-medium">Diego Tapia</td>
                <td>Vendedor</td>
                <td>Ventas</td>
                <td>dtapia@empresa.cl</td>
                <td>09 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="106"
                    data-jk-nombre="Diego Tapia"
                    data-jk-rol="Vendedor"
                    data-jk-correo="dtapia@empresa.cl"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-107">
                <td className="fw-medium">Luis Martínez</td>
                <td>Transportista</td>
                <td>Logística</td>
                <td>lmartinez@empresa.cl</td>
                <td>13 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="107"
                    data-jk-nombre="Luis Martínez"
                    data-jk-rol="Transportista"
                    data-jk-correo="lmartinez@empresa.cl"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-108">
                <td className="fw-medium">Javiera Silva</td>
                <td>Cliente</td>
                <td>N/A</td>
                <td>javi.silva@gmail.com</td>
                <td>01 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="108"
                    data-jk-nombre="Javiera Silva"
                    data-jk-rol="Cliente"
                    data-jk-correo="javi.silva@gmail.com"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-109">
                <td className="fw-medium">Matías Muñoz</td>
                <td>Cliente</td>
                <td>N/A</td>
                <td>matias.munoz@yahoo.es</td>
                <td>28 Ago 2026</td>
                <td>
                  <span className="badge text-bg-secondary">Inactivo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="109"
                    data-jk-nombre="Matías Muñoz"
                    data-jk-rol="Cliente"
                    data-jk-correo="matias.munoz@yahoo.es"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>

              <tr id="usuario-110">
                <td className="fw-medium">Valentina Parra</td>
                <td>Cliente</td>
                <td>N/A</td>
                <td>vparra99@hotmail.com</td>
                <td>12 Sept 2026</td>
                <td>
                  <span className="badge text-bg-success">Activo</span>
                </td>
                <td>
                  <button className="btn btn-sm">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-eliminar-usuario"
                    data-jk-id="110"
                    data-jk-nombre="Valentina Parra"
                    data-jk-rol="Cliente"
                    data-jk-correo="vparra99@hotmail.com"
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
