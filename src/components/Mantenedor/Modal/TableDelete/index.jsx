import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TableDelete({ show, entry, metadata, onHide, onConfirm }) {
  const entityName = metadata.entity.singleLabel;
  const { nameKey, detailKey, detailLabel } = metadata.delete;

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton closeVariant="white" className="text-bg-danger">
        <Modal.Title className="fs-5">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Eliminar {entityName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4 text-center">
        <p className="fs-5 mb-2">
          ¿Estás seguro de que desea eliminar este {entityName.toLowerCase()}?
        </p>

        <p className="fs-5 fw-bold mb-3">
          {entry?.[nameKey]}
          <br />
          <span className="fs-6 text-body-secondary fw-normal">
            {detailLabel}: {entry?.[detailKey]}
          </span>
        </p>

        <p className="fs-5 fw-bold mb-3">
          Esta acción no se puede deshacer. El {entityName.toLowerCase()} será
          eliminado permanentemente.
        </p>
      </Modal.Body>

      <Modal.Footer className="bg-light justify-content-center">
        <Button variant="outline-secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" className="px-4" onClick={onConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TableDelete;
