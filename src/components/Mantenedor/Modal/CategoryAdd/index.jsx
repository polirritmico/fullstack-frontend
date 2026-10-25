import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function CategoryAdd({ show, onHide, onSave, title, icons }) {
  const formId = "add-category-form";

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const newData = Object.fromEntries(new FormData(ev.target).entries());

    onSave(newData);
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton closeVariant="white" className="bg-secondary">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Form id={formId} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="add-category-name">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              name="name"
              placeholder="Ej: Accesorios, Juguetes, etc."
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold mb-3">
              Selecciona un ícono
            </Form.Label>

            <ToggleButtonGroup
              type="radio"
              name="icon"
              defaultValue={icons[0]}
              className="category-icons"
            >
              {icons.map((icon, index) => (
                <ToggleButton
                  key={icon}
                  id={`category-icon-${index}`}
                  value={icon}
                  variant="outline-secondary"
                  className="fs-4 p-2 lh-1"
                >
                  {icon}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="outline-secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" form={formId} className="px-4">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryAdd;
