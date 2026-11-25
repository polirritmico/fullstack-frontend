// fuente: https://react-bootstrap.netlify.app/docs/components/modal/#focus-on-specific-element

import { Button, Form, Modal, Row } from "react-bootstrap";

import { parseValue } from "@/components/Mantenedor/utils/parsers";
import TableField from "../TableField";

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

              return (
                <TableField key={field.key} field={field} value="" mode="add" />
              );
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
