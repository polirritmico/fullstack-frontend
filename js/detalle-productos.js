const productos = {
  1: {
    nombre: "Alimento Perro Adulto",
    precio: "$29.990",
    categoria: "Alimentos",
    imagen: "../../img/comida-perro.png",
    descripcion:
      "Alimento seco balanceado para perros adultos, ideal para mantener energia y digestion saludable.",
    caracteristicas:
      "Formato seco para perros adultos. Ayuda a mantener energia diaria, digestion saludable y una alimentacion equilibrada.",
  },
  2: {
    nombre: "Alimento Gato Adulto",
    precio: "$24.990",
    categoria: "Alimentos",
    imagen: "../../img/comida-gato.png",
    descripcion:
      "Croquetas para gatos adultos con nutrientes esenciales para pelaje brillante y vitalidad diaria.",
    caracteristicas:
      "Alimento seco para gatos adultos. Aporta nutrientes esenciales para el cuidado del pelaje y la energia diaria.",
  },
  3: {
    nombre: "Snacks Naturales",
    precio: "$8.990",
    categoria: "Alimentos",
    imagen: "../../img/snacks-naturales.png",
    descripcion:
      "Premios saludables para perros y gatos, perfectos para entrenamiento o regalonear a tu mascota.",
    caracteristicas:
      "Snacks en porciones pequenas, ideales como premio durante entrenamiento o como recompensa ocasional.",
  },
  4: {
    nombre: "Juguete de Cuerda",
    precio: "$6.990",
    categoria: "Juguetes",
    imagen: "../../img/juguete-cuerda.png",
    descripcion:
      "Cuerda resistente para juegos de fuerza, ayuda a entretener y ejercitar a tu perro.",
    caracteristicas:
      "Juguete resistente para morder y tirar. Recomendado para actividad fisica y juego supervisado.",
  },
  5: {
    nombre: "Pelota Mordedora",
    precio: "$5.990",
    categoria: "Juguetes",
    imagen: "../../img/pelota.png",
    descripcion:
      "Pelota texturizada para morder y jugar, disenada para estimular la actividad fisica.",
    caracteristicas:
      "Pelota con textura para morder. Favorece el juego activo y la entretencion diaria.",
  },
  6: {
    nombre: "Raton de Peluche",
    precio: "$4.990",
    categoria: "Juguetes",
    imagen: "../../img/juguete-raton.png",
    descripcion:
      "Juguete suave para gatos, liviano y entretenido para estimular su instinto de juego.",
    caracteristicas:
      "Peluche pequeno y liviano para gatos. Facil de mover, perseguir y empujar durante el juego.",
  },
  7: {
    nombre: "Collar con Correa",
    precio: "$12.990",
    categoria: "Accesorios y cuidado",
    imagen: "../../img/collar-correa.png",
    descripcion:
      "Set ajustable de collar y correa, comodo y seguro para paseos diarios con tu mascota.",
    caracteristicas:
      "Collar ajustable con correa a juego. Incluye broche seguro y material resistente para paseos.",
  },
  8: {
    nombre: "Cama para Mascota",
    precio: "$34.990",
    categoria: "Accesorios y cuidado",
    imagen: "../../img/cama-mascota.png",
    descripcion:
      "Cama acolchada y comoda para perros o gatos pequenos, ideal para un descanso tranquilo.",
    caracteristicas:
      "Cama acolchada con borde suave. Recomendada para mascotas pequenas que necesitan un espacio de descanso.",
  },
  9: {
    nombre: "Shampoo Mascotas",
    precio: "$7.990",
    categoria: "Accesorios y cuidado",
    imagen: "../../img/shampoo.png",
    descripcion:
      "Shampoo suave para perros y gatos, ayuda a mantener el pelaje limpio y con buen aroma.",
    caracteristicas:
      "Producto de higiene para mascotas. Ayuda a limpiar el pelaje y mantener una sensacion fresca.",
  },
};

const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id") || "1";
const producto = productos[idProducto] || productos[1];

document.title = `${producto.nombre} | jKiltro`;
document.getElementById("producto-imagen").src = producto.imagen;
document.getElementById("producto-imagen").alt = producto.nombre;
document.getElementById("producto-categoria").textContent = producto.categoria;
document.getElementById("producto-nombre").textContent = producto.nombre;
document.getElementById("producto-precio").textContent = producto.precio;
document.getElementById("producto-descripcion").textContent =
  producto.descripcion;
document.getElementById("producto-caracteristicas").textContent =
  producto.caracteristicas;
document.getElementById("breadcrumb-producto").textContent = producto.nombre;
