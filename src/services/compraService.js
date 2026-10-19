function obtenerCompras(usuarioId) {
  const guardado = localStorage.getItem(`jk-compras-${usuarioId}`);

  if (!guardado) return [];

  const compras = JSON.parse(guardado);

  if (!Array.isArray(compras)) {
    throw new Error("El historial de compras guardado no es válido.");
  }

  return compras;
}

function registrarCompra(usuarioId, carrito) {
  if (usuarioId === null || usuarioId === undefined) {
    throw new Error("Debes iniciar sesión para finalizar la compra.");
  }

  if (carrito.length === 0) {
    throw new Error("No puedes finalizar una compra con el carrito vacío.");
  }

  const productosInvalidos = carrito.some(
    (producto) =>
      !Number.isFinite(producto.precio) ||
      producto.precio < 0 ||
      !Number.isInteger(producto.cantidad) ||
      producto.cantidad < 1,
  );

  if (productosInvalidos) {
    throw new Error("Revisa los precios y cantidades del carrito.");
  }

  const subtotal = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0,
  );

  const despacho = subtotal >= 30000 ? 0 : 2990;

  const compra = {
    id: crypto.randomUUID(),
    usuarioId,
    fecha: new Date().toISOString(),
    estado: "En preparación",
    productos: carrito.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio,
      cantidad: producto.cantidad,
    })),
    subtotal,
    despacho,
    total: subtotal + despacho,
  };

  const compras = obtenerCompras(usuarioId);

  localStorage.setItem(
    `jk-compras-${usuarioId}`,
    JSON.stringify([compra, ...compras]),
  );

  return compra;
}

export default {
  obtenerCompras,
  registrarCompra,
};
