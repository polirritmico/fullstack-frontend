function RetryButton({ onRetry }) {
  return (
    <button type="button" className="btn btn-primary fs-5" onClick={onRetry}>
      <i className="bi bi-arrow-clockwise me-2"></i>
      Reintentar
    </button>
  );
}

export default RetryButton;
