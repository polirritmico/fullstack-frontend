import useHandleBack from "./useHandleBack";

function BackButton({ fallbackPath }) {
  const handleBack = useHandleBack(fallbackPath);

  return (
    <button className="btn btn-primary mt-2 fs-5" onClick={handleBack}>
      <i className="bi bi-arrow-left me-2"></i>
      Volver
    </button>
  );
}

export default BackButton;
