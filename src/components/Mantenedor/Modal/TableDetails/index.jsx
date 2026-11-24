import { Button, Form, Modal, Row } from "react-bootstrap";
import TableField from "../TableField";
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
            {fields.map((field) => {
              return (
                <TableField
                  key={field.key}
                  field={field}
                  value={getDisplayValue(
                    field,
                    entry,
                    categories,
                    states,
                    categoryField,
                  )}
                  mode="view"
                />
              );
            })}
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
