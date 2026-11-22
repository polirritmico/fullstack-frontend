import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { getInType, parseValue } from "@/components/Mantenedor/Modal/utils";

function TableEdit({
  entityName,
  fields,
  show,
  entry,
  onHide,
  onSave,
  onExited,
}) {
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const updatedData = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => {
        const field = fields.find((item) => item.key === key);
        return [key, parseValue(field, value)];
      }),
    );

    onSave({ ...entry, ...updatedData });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={onExited}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton closeVariant="white" className="bg-secondary">
        <Modal.Title>Editar {entityName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} id={`edit-${entityName}-form`}>
          <Row>
            {fields.map((field) => {
              if (field.showInEdit === false) {
                return null;
              }

              const isReadOnly = field.isReadOnly === true;

              if (field.options) {
                return (
                  <Col md={6} key={field.key}>
                    <Form.Group className="mb-3" controlId={`add-${field.key}`}>
                      <Form.Label>{field.label}</Form.Label>

                      <Form.Select
                        name={field.key}
                        defaultValue={entry?.[field.key] ?? ""}
                        required={field.required === true && !isReadOnly}
                        disabled={isReadOnly}
                      >
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
                    <Form.Group className="mb-3" controlId={`add-${field.key}`}>
                      <Form.Label>{field.label}</Form.Label>
                      <Form.Control
                        name={field.key}
                        type={fieldType}
                        defaultValue={entry?.[field.key] ?? ""}
                        min={fieldType === "number" ? 0 : undefined}
                        required={field.required === true && !isReadOnly}
                        disabled={isReadOnly}
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
        <Button
          variant="primary"
          type="submit"
          form={`edit-${entityName}-form`}
        >
          <i className="bi bi-pencil-square me-2 fs-5"></i>
          Guardar los cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableEdit;
