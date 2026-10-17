import BackButton from "@/components/BackButton";

function EnConstruccion() {
  return (
    <div className="flex-grow-1 d-flex flex-column text-center align-items-center p-5">
      <i className="bi bi-cone-striped display-1 text-warning mb-4"></i>

      <h2>Sección en Construcción</h2>

      <p className="text-muted lead">
        Lo sentimos, esta página sigue en desarrollo.
      </p>

      <BackButton />
    </div>
  );
}

export default EnConstruccion;
