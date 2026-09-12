const formulario = document.querySelector(".formulario");
  const mensaje = document.getElementById("mensaje-exito");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    mensaje.classList.remove("d-none");
    formulario.reset();
  });