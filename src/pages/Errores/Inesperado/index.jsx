import BackButton from "@/components/BackButton";
import RetryButton from "@/components/RetryButton";

function ErrorInesperado({ onRetry, fallbackPath }) {
  return (
    <div className="flex-grow-1 d-flex flex-column text-center align-items-center p-5">
      <i className="bi bi-exclamation-octagon display-1 text-warning mb-4"></i>

      <h2>Algo salió mal</h2>

      <p className="text-muted lead">
        Lo sentimos, ocurrió un error inesperado al cargar esta sección. <br />
        Por favor, intenta nuevamente.
      </p>

      <div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
        {onRetry && <RetryButton onRetry={onRetry} />}
        <BackButton fallbackPath={fallbackPath} />
      </div>
    </div>
  );
}

export default ErrorInesperado;
