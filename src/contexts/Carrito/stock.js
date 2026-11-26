export function stockMaximo(producto) {
  const stock = producto?.stock;

  if (stock === null || stock === undefined || stock === "") {
    return Infinity;
  }

  const numero = Number(stock);
  return Number.isFinite(numero) ? Math.max(numero, 0) : Infinity;
}

export function alcanzoStock(producto) {
  return producto.cantidad >= stockMaximo(producto);
}
