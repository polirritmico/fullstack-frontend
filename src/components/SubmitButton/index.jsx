function SubmitButton({
  defaultText,
  isLoading,
  isDisabled = false,
  className = "btn btn-primary",
  type = "button",
  workingText = "Cargando…",
}) {
  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
          ></span>
          <span role="status">{workingText}</span>
        </>
      ) : (
        defaultText
      )}
    </button>
  );
}

export default SubmitButton;
