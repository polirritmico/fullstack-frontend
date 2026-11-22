import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getDisplayValue } from "@/components/Mantenedor/utils/displayValue";

function TableDetails({
  entityName,
  fields,
  show,
  entry,
  onHide,
  onExited,
  categories,
  states,
  categoryField,
}) {
  return (
    <Modal show={show} onHide={onHide} onExited={onExited} size="lg" centered>
      <Modal.Header closeButton closeVariant="white" className="bg-secondary">
        <Modal.Title>Detalles del {entityName.toLowerCase()}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            {fields.map((field) => (
              <Col md={6} key={field.key}>
                <Form.Group className="mb-3" controlId={`view-${field.key}`}>
                  <Form.Label className="fw-bold">{field.label}</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      entry
                        ? getDisplayValue(
                            field,
                            entry,
                            categories,
                            states,
                            categoryField,
                          )
                        : ""
                    }
                    readOnly
                    disabled
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
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
