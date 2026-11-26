import { Button } from "react-bootstrap";

function ModalSubmitButton({
  children,
  icon,
  isSubmitting = false,
  disabled,
  ...props
}) {
  return (
    <Button
      {...props}
      disabled={disabled || isSubmitting}
      aria-busy={isSubmitting}
    >
      {isSubmitting ? (
        <span
          className="spinner-border spinner-border-sm me-2"
          aria-hidden="true"
        ></span>
      ) : (
        icon && <i className={`${icon} me-2 fs-5`}></i>
      )}
      {children}
    </Button>
  );
}

export default ModalSubmitButton;
