// fuente: https://react-bootstrap.netlify.app/docs/components/modal/#focus-on-specific-element

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const getInType = (type) =>
  ({
    string: "text",
    email: "email",
    int: "number",
  })[type] ?? "text";

function TableAdd({ entityName, fields, show, onHide, onSave }) {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const newData = Object.fromEntries(formData.entries());

    onSave(newData);
  };
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton closeVariant="white" className="bg-secondary">
        <Modal.Title>Agregar {entityName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id={`add-${entityName}-form`}>
          {fields.map((field) => {
            if (!field.isHidden) {
              return (
                <Form.Group
                  className="mb-3"
                  controlId={`add-${field.key}`}
                  key={field.key}
                >
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    name={field.key}
                    type={getInType(field.type)}
                    required
                  />
                </Form.Group>
              );
            }
          })}
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="primary" type="submit" form={`add-${entityName}-form`}>
          <i className="bi bi-floppy me-2 fs-5"></i>
          Guardar los cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableAdd;
