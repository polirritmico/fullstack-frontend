import BackButton from "@/components/BackButton";

function NoAutorizado({ fallbackPath }) {
  return (
    <div className="flex-grow-1 d-flex flex-column text-center align-items-center p-5">
      <i className="bi bi-shield-lock display-1 text-warning mb-4"></i>

      <h2 className="mb-3">Acceso no autorizado</h2>

      <p className="text-muted lead mb-2">
        Lo sentimos, no tienes los permisos necesarios para acceder a esta
        sección.
      </p>

      <p className="text-muted fst-italic mb-4">
        Si crees que esto es un error, te sugerimos contactar a un
        administrador.
      </p>

      <BackButton fallbackPath={fallbackPath} />
    </div>
  );
}
export default NoAutorizado;
