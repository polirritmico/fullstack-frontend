import useHandleBack from "./useHandleBack.js";

function NoEncontrado() {
  const handleBack = useHandleBack();

  return (
    <div>
      <i className="bi bi-file-earmark-x display-1 text-secondary"></i>
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
      <button className="btn btn-primary" onClick={handleBack}>
        <i className="bi bi-arrow-left"></i>
        Volver
      </button>
    </div>
  );
}
export default NoEncontrado;
