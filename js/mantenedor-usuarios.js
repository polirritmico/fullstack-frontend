// --- Fecha actual -----------------------------------------------------------
currentDate = new Intl.DateTimeFormat("es-CL", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date());

document.getElementById("id-date").textContent = currentDate;

// --- Seleccionar solo 1 categoría -------------------------------------------
const categorias = document.querySelectorAll(".panel-categorias .btn");

categorias.forEach((categoria) => {
  categoria.addEventListener("click", () => {
    categorias.forEach((item) => item.classList.remove("active"));
    categoria.classList.add("active");
  });
});

// --- Eliminar producto ------------------------------------------------------
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

// --- Agregar categoría ------------------------------------------------------
const formGuardarCategoria = document.getElementById("form-agregar-categoria");

if (formGuardarCategoria) {
  formGuardarCategoria.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const inputNombre = document.getElementById("input-cat-nombre");
    const nombreCategoria = inputNombre.value.trim();

    const iconoSeleccionado = document.querySelector(
      'input[name="icono-categoria"]:checked',
    );
    icoDefault = "🐾";
    const valorIcono = iconoSeleccionado ? iconoSeleccionado.value : icoDefault;

    if (nombreCategoria === "") {
      alert("Por favor, ingresa un nombre para la categoría.");
      return;
    }

    console.log(
      `Guardando nueva categoría: "${valorIcono} ${nombreCategoria}"`,
    );

    formGuardarCategoria.reset();

    const btnCerrar = document.getElementById("boton-cerrar-nueva-categoria");
    if (btnCerrar) {
      btnCerrar.click();
    }
  });
}
