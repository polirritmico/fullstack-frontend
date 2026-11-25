import { Button, Form, Modal, Row } from "react-bootstrap";

import { parseValue } from "@/components/Mantenedor/utils/parsers";
import TableField from "../TableField";

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
