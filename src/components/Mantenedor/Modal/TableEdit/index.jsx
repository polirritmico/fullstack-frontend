import { Form, Modal, Row } from "react-bootstrap";

import { parseValue } from "@/components/Mantenedor/utils/parsers";
import ModalError from "../ModalError";
import ModalSubmitButton from "../ModalSubmitButton";
import TableField from "../TableField";

function TableEdit({
  entityName,
  fields,
  show,
  entry,
  error,
  isSubmitting = false,
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
        <ModalError error={error} />

        <Form onSubmit={handleSubmit} id={`edit-${entityName}-form`}>
          <Row>
            {fields.map((field) => {
              if (field.showInEdit === false) {
                return null;
              }

              return (
                <TableField
                  key={field.key}
                  field={field}
                  value={entry?.[field.key] ?? ""}
                  mode="edit"
                />
              );
            })}
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <ModalSubmitButton
          variant="primary"
          type="submit"
          form={`edit-${entityName}-form`}
          isSubmitting={isSubmitting}
          icon="bi bi-pencil-square"
        >
          Guardar los cambios
        </ModalSubmitButton>
      </Modal.Footer>
    </Modal>
  );
}

export default TableEdit;
