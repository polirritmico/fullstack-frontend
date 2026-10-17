import BackButton from "@/components/BackButton";

function NoEncontrado({ fallbackPath }) {
  return (
    <div className="flex-grow-1 d-flex flex-column text-center align-items-center p-5">
      <i className="bi bi-window-x display-1 text-danger mb-4"></i>

      <h2>404 - Página no encontrada</h2>

      <p className="text-muted lead">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>

      <BackButton fallbackPath={fallbackPath} />
    </div>
  );
}
export default NoEncontrado;
