// fuente: https://react-bootstrap.netlify.app/docs/components/modal/#focus-on-specific-element

import { Form, Modal, Row } from "react-bootstrap";

import { parseValue } from "@/components/Mantenedor/utils/parsers";
import ModalError from "../ModalError";
import ModalSubmitButton from "../ModalSubmitButton";
import TableField from "../TableField";

function TableAdd({
  entityName,
  fields,
  show,
  error,
  isSubmitting = false,
  onHide,
  onSave,
}) {
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
        <ModalError error={error} />

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
        <ModalSubmitButton
          variant="primary"
          type="submit"
          form={`add-${entityName}-form`}
          isSubmitting={isSubmitting}
          icon="bi bi-floppy"
        >
          Crear {entityName}
        </ModalSubmitButton>
      </Modal.Footer>
    </Modal>
  );
}

export default TableAdd;
