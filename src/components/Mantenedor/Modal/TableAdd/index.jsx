// fuente: https://react-bootstrap.netlify.app/docs/components/modal/#focus-on-specific-element

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const getInType = (type) =>
  ({
    string: "text",
    email: "email",
    int: "number",
    money: "number",
    number: "number",
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
            if (field.isHidden || field.isReadOnly) {
              return null;
            }

            if (field.options) {
              return (
                <Form.Group
                  className="mb-3"
                  controlId={`add-${field.key}`}
                  key={field.key}
                >
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Select name={field.key} required>
                    <option value="">Seleccione...</option>
                    {field.options.map((opt) => (
                      <option value={opt.value} key={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              );
            } else {
              const fieldType = getInType(field.type);
              return (
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
                    required
                  />
                </Form.Group>
              );
            }
          })}
        </Form>
        <p className="text-warning fst-italic">
          Nota: Este cambio no es persistente sin conectar al backend.
        </p>
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
