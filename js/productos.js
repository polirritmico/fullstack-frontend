currentDate = new Intl.DateTimeFormat("es-CL", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date());

document.getElementById("id-date").textContent = currentDate;

const modalEliminarProducto = document.getElementById(
  "modal-eliminar-producto",
);
const btnConfirmarEliminar = document.getElementById(
  "modal-eliminar-producto-btn-confirmar",
);

if (modalEliminarProducto && btnConfirmarEliminar) {
  modalEliminarProducto.addEventListener("show.bs.modal", (ev) => {
    const botonTrigger = ev.relatedTarget;
    const idProducto = botonTrigger.getAttribute("data-jk-id");

    btnConfirmarEliminar.setAttribute("data-target-id", idProducto);
  });

  btnConfirmarEliminar.addEventListener("click", (ev) => {
    const idProducto = ev.target.getAttribute("data-target-id");
    console.log(`Eliminando producto ID: ${idProducto}`);

    const fila = document.getElementById(idProducto);
    if (fila) {
      fila.remove();
    }
  });
}
