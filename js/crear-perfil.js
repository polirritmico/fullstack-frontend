const formulario = document.querySelector(".formulario");
const mensajeExito = document.getElementById("mensaje-exito");

const rut = document.getElementById("rut");
const telefono = document.getElementById("telefono");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmar-password");

function validarRut() {
  const formatoRut = /^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]$/;

  if (!formatoRut.test(rut.value)) {
    rut.setCustomValidity("Ingrese un RUT válido. Ej: 12.345.678-9");
  } else {
    rut.setCustomValidity("");
  }
}

function validarTelefono() {
  const formatoTelefono = /^(\+56)?\s?9\s?[0-9]{4}\s?[0-9]{4}$/;

  if (!formatoTelefono.test(telefono.value)) {
    telefono.setCustomValidity(
      "Ingrese un teléfono válido. Ej: +56 9 1234 5678",
    );
  } else {
    telefono.setCustomValidity("");
  }
}

function validarPassword() {
  if (password.value.length < 8) {
    password.setCustomValidity(
      "La contraseña debe tener al menos 8 caracteres.",
    );
  } else {
    password.setCustomValidity("");
  }
}

function validarConfirmacion() {
  if (password.value !== confirmarPassword.value) {
    confirmarPassword.setCustomValidity("Las contraseñas no coinciden.");
  } else {
    confirmarPassword.setCustomValidity("");
  }
}

rut.addEventListener("input", validarRut);
telefono.addEventListener("input", validarTelefono);
password.addEventListener("input", validarPassword);
confirmarPassword.addEventListener("input", validarConfirmacion);

formulario.addEventListener("submit", function (event) {
  validarRut();
  validarTelefono();
  validarPassword();
  validarConfirmacion();

  if (!formulario.checkValidity()) {
    return;
  }

  event.preventDefault();
  mensajeExito.classList.remove("d-none");
  formulario.reset();
});
