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

function TableAdd({ entityName, fields, show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton closeVariant="white" className="bg-secondary">
        <Modal.Title>Agregar {entityName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {fields.map((field) => {
            if (!field.isHidden) {
              return (
                <Form.Group
                  className="mb-3"
                  controlId={`add-${field.key}`}
                  key={field.key}
                >
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control type={getInType(field.type)} required />
                </Form.Group>
              );
            }
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleClose}>
          <i className="bi bi-floppy me-2 fs-5"></i>
          Guardar los cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableAdd;
