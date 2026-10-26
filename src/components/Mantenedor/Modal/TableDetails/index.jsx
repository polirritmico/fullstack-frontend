import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function TableDetails({ entityName, fields, show, entry, onHide }) {
  if (!entry) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton closeVariant="white" className="bg-secondary">
        <Modal.Title>Detalles del {entityName.toLowerCase()}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {fields.map((field) => (
            <Form.Group
              className="mb-3"
              controlId={`view-${field.key}`}
              key={field.key}
            >
              <Form.Label className="fw-bold">{field.label}</Form.Label>
              <Form.Control
                type="text"
                defaultValue={entry[field.key] ?? "N/A"}
                readOnly
                disabled
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableDetails;
