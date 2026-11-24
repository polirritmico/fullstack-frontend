import { Button } from "react-bootstrap";
import useHandleBack from "./useHandleBack";

function BackButton({
  fallbackPath,
  className = "btn-primary fs-5",
  classNameIcon = "bi bi-arrow-left me-2",
  ...props
}) {
  const handleBack = useHandleBack(fallbackPath);

  return (
    <Button className={className} onClick={handleBack} {...props}>
      <i className={classNameIcon}></i>
      Volver
    </Button>
  );
}

export default BackButton;
