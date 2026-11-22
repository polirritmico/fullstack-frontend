// fuente: https://react-bootstrap.netlify.app/docs/components/modal/#focus-on-specific-element

import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { getInType, parseValue } from "@/components/Mantenedor/Modal/utils";

function TableAdd({ entityName, fields, show, onHide, onSave }) {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const newData = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => {
        const field = fields.find((item) => item.key === key);
        const parsedValue = parseValue(field, value);
        const finalValue =
          value === "" && field?.required !== true ? null : parsedValue;
        return [key, finalValue];
      }),
    );

    onSave(newData);
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton closeVariant="white" className="bg-secondary">
        <Modal.Title>Agregar {entityName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id={`add-${entityName}-form`}>
          <Row>
            {fields.map((field) => {
              if (!field.showInCreate) {
                return null;
              }

              const isRequired = field.required === true;

              if (field.options) {
                return (
                  <Col md={6} key={field.key}>
                    <Form.Group className="mb-3" controlId={`add-${field.key}`}>
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Select name={field.key} required={isRequired}>
                        <option value="">Seleccione...</option>
                        {field.options.map((opt) => (
                          <option value={opt.value} key={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                );
              } else {
                const fieldType = getInType(field.type);
                return (
                  <Col md={6} key={field.key}>
                    <Form.Group
                      className="mb-3"
                      controlId={`add-${field.key}`}
                      key={field.key}
                    >
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control
                        name={field.key}
                        type={fieldType}
                        min={fieldType === "number" ? 0 : undefined}
                        required={isRequired}
                      />
                    </Form.Group>
                  </Col>
                );
              }
            })}
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="primary" type="submit" form={`add-${entityName}-form`}>
          <i className="bi bi-floppy me-2 fs-5"></i>
          Crear {entityName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableAdd;
