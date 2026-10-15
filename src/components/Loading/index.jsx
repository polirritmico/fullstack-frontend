import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="text-center py-5 text-primary">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando…</span>
      </Spinner>
      <p className="mt-2 h4 fst-italic">Cargando…</p>
    </div>
  );
}

export default Loading;
