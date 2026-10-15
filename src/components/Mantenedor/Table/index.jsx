function Table({ data, metadata, summaryLabel }) {
  return (
    <div className="table-responsive">
      <table className="tabla-usuarios table table-striped table-hover caption-top align-middle border">
        <caption>
          <span id="id-tabla-principal">{data.length}</span> {summaryLabel}
        </caption>

        <thead className="table-secondary">
          <tr>
            {metadata.map((entry, index) => (
              <th key={index} scope="col">
                {entry}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td className="fw-medium">{user.name}</td>
              <td>{user.role}</td>
              <td>{user.department}</td>
              <td>{user.email}</td>
              <td>{user.lastLogin}</td>
              <td>
                <span
                  className={`badge text-bg-${user.state === "Activo" ? "success" : "secondary"}`}
                >
                  {user.state}
                </span>
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
                  data-jk-id={user.id}
                  data-jk-nombre={user.name}
                  data-jk-rol={user.role}
                  data-jk-correo={user.mail}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
