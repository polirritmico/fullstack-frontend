const password = document.getElementById("password");
  const confirmarPassword = document.getElementById("confirmar-password");

  confirmarPassword.addEventListener("input", function () {
    if (confirmarPassword.value !== password.value) {
      confirmarPassword.setCustomValidity("Las contraseñas no coinciden.");
    } else {
      confirmarPassword.setCustomValidity("");
    }
  });
