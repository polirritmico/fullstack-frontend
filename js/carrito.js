const botonesAgregar = document.querySelectorAll(".agregar-carrito");

const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("carrito-total");
const carritoPanel = document.getElementById("offcanvasRight");

const paginaCarritoLista = document.getElementById("pagina-carrito-lista");
const paginaCarritoSubtotal = document.getElementById(
  "pagina-carrito-subtotal",
);
const paginaCarritoDespacho = document.getElementById(
  "pagina-carrito-despacho",
);
const paginaCarritoTotal = document.getElementById("pagina-carrito-total");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("es-CL");
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerPrecioDesdeTexto(texto) {
  return Number(texto.replace(/\D/g, ""));
}

function calcularSubtotal() {
  return carrito.reduce(function (total, producto) {
    return total + producto.precio * producto.cantidad;
  }, 0);
}

function actualizarOffcanvas() {
  if (!carritoLista || !carritoTotal) {
    return;
  }

  carritoLista.innerHTML = "";

  if (carrito.length === 0) {
    carritoLista.innerHTML =
      '<p class="text-body-secondary">Tu carrito está vacío.</p>';
    carritoTotal.textContent = "$0";
    return;
  }

  carrito.forEach(function (producto) {
    carritoLista.innerHTML += `
      <div class="d-flex justify-content-between gap-3 mb-3">
        <div>
          <strong>${producto.nombre}</strong>
          <p class="mb-0 small">
            ${formatearPrecio(producto.precio)} x ${producto.cantidad}
          </p>
        </div>

        <div class="text-end">
          <strong>${formatearPrecio(producto.precio * producto.cantidad)}</strong>
          <button
            class="btn btn-sm btn-outline-danger d-block mt-2 eliminar-producto"
            type="button"
            data-nombre="${producto.nombre}"
          >
            Quitar
          </button>
        </div>
      </div>
    `;
  });

  carritoTotal.textContent = formatearPrecio(calcularSubtotal());
}

function actualizarPaginaCarrito() {
  if (!paginaCarritoLista) {
    return;
  }

  paginaCarritoLista.innerHTML = "";

  if (carrito.length === 0) {
    paginaCarritoLista.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-cart-x fs-1 text-body-secondary"></i>
        <p class="text-body-secondary mt-3 mb-0">
          Tu carrito está vacío.
        </p>
      </div>
    `;

    paginaCarritoSubtotal.textContent = "$0";
    paginaCarritoDespacho.textContent = "$0";
    paginaCarritoTotal.textContent = "$0";
    return;
  }

  carrito.forEach(function (producto) {
    paginaCarritoLista.innerHTML += `
      <div class="row align-items-center border-bottom py-3">
        <div class="col-12 col-md-5">
          <h3 class="h6 mb-1">${producto.nombre}</h3>
          <p class="text-body-secondary small mb-0">
            Precio unitario: ${formatearPrecio(producto.precio)}
          </p>
        </div>

        <div class="col-6 col-md-3 mt-3 mt-md-0">
          <div class="input-group input-group-sm">
            <button
              class="btn btn-outline-secondary disminuir-cantidad"
              type="button"
              data-nombre="${producto.nombre}"
            >
              -
            </button>

            <input
              type="text"
              class="form-control text-center"
              value="${producto.cantidad}"
              readonly
            />

            <button
              class="btn btn-outline-secondary aumentar-cantidad"
              type="button"
              data-nombre="${producto.nombre}"
            >
              +
            </button>
          </div>
        </div>

        <div class="col-6 col-md-2 mt-3 mt-md-0 text-end">
          <strong>${formatearPrecio(producto.precio * producto.cantidad)}</strong>
        </div>

        <div class="col-12 col-md-2 mt-3 mt-md-0 text-md-end">
          <button
            class="btn btn-sm btn-outline-danger eliminar-producto"
            type="button"
            data-nombre="${producto.nombre}"
          >
            Quitar
          </button>
        </div>
      </div>
    `;
  });

  const subtotal = calcularSubtotal();
  const despacho = subtotal >= 30000 ? 0 : 2990;
  const total = subtotal + despacho;

  paginaCarritoSubtotal.textContent = formatearPrecio(subtotal);
  paginaCarritoDespacho.textContent = formatearPrecio(despacho);
  paginaCarritoTotal.textContent = formatearPrecio(total);
}

function actualizarCarrito() {
  guardarCarrito();
  actualizarOffcanvas();
  actualizarPaginaCarrito();
  activarBotonesCarrito();
}

function activarBotonesCarrito() {
  document.querySelectorAll(".eliminar-producto").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const nombre = boton.dataset.nombre;

      carrito = carrito.filter(function (producto) {
        return producto.nombre !== nombre;
      });

      actualizarCarrito();
    });
  });

  document.querySelectorAll(".aumentar-cantidad").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const nombre = boton.dataset.nombre;

      const producto = carrito.find(function (producto) {
        return producto.nombre === nombre;
      });

      if (producto) {
        producto.cantidad++;
      }

      actualizarCarrito();
    });
  });

  document.querySelectorAll(".disminuir-cantidad").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const nombre = boton.dataset.nombre;

      const producto = carrito.find(function (producto) {
        return producto.nombre === nombre;
      });

      if (producto && producto.cantidad > 1) {
        producto.cantidad--;
      }

      actualizarCarrito();
    });
  });
}

botonesAgregar.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const nombre =
      boton.dataset.nombre ||
      document.getElementById("producto-nombre").textContent.trim();

    const precio =
      Number(boton.dataset.precio) ||
      obtenerPrecioDesdeTexto(
        document.getElementById("producto-precio").textContent,
      );

    const cantidadInput = document.getElementById(boton.dataset.cantidadId);
    const cantidad = cantidadInput
      ? Math.max(1, Number(cantidadInput.value))
      : 1;

    const productoExistente = carrito.find(function (producto) {
      return producto.nombre === nombre;
    });

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
      });
    }

    actualizarCarrito();

    if (carritoPanel && typeof bootstrap !== "undefined") {
      const panel = bootstrap.Offcanvas.getOrCreateInstance(carritoPanel);
      panel.show();
    }
  });
});

if (botonVaciarCarrito) {
  botonVaciarCarrito.addEventListener("click", function () {
    carrito = [];
    actualizarCarrito();
  });
}

actualizarCarrito();
