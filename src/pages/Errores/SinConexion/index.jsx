import BackButton from "@/components/BackButton";
import RetryButton from "@/components/RetryButton";

function SinConexion({ onRetry }) {
  return (
    <div className="flex-grow-1 d-flex flex-column text-center align-items-center p-5">
      <i className="bi bi-cloud-slash display-1 text-warning mb-4"></i>

      <h2>Servidor no disponible</h2>

      <p className="text-muted lead">
        Lo sentimos, estamos teniendo dificultades técnicas para procesar tu
        solicitud. <br />
        Por favor, intenta de nuevo en unos minutos.
      </p>

      <div className="d-flex flex-wrap gap-2 justify-content-center mt-2">
        {onRetry && <RetryButton onRetry={onRetry} />}
        <BackButton />
      </div>
    </div>
  );
}

export default SinConexion;
