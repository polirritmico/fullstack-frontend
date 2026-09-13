const botonesAgregar = document.querySelectorAll(".agregar-carrito");
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("carrito-total");
const carritoPanel = document.getElementById("offcanvasRight");

let carrito = [];

function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("es-CL");
}

function actualizarCarrito() {
  carritoLista.innerHTML = "";

  if (carrito.length === 0) {
    carritoLista.innerHTML =
      '<p class="text-body-secondary">Tu carrito está vacío.</p>';
    carritoTotal.textContent = "$0";
    return;
  }

  let total = 0;

  carrito.forEach(function (producto) {
    total += producto.precio * producto.cantidad;

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

  carritoTotal.textContent = formatearPrecio(total);

  document.querySelectorAll(".eliminar-producto").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const nombre = boton.dataset.nombre;

      carrito = carrito.filter(function (producto) {
        return producto.nombre !== nombre;
      });

      actualizarCarrito();
    });
  });
}

botonesAgregar.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const nombre = boton.dataset.nombre;
    const precio = Number(boton.dataset.precio);

    const productoExistente = carrito.find(function (producto) {
      return producto.nombre === nombre;
    });

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: 1,
      });
    }

    actualizarCarrito();

    const panel = bootstrap.Offcanvas.getOrCreateInstance(carritoPanel);
    panel.show();
  });
});
