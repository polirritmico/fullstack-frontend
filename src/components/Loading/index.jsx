import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-primary">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando…</span>
      </Spinner>
      <p className="mt-2 h4 fst-italic">Cargando…</p>
    </div>
  );
}

export default Loading;
