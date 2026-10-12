import ProductCard from "@/components/ProductCard";

const productos = [
  {
    id: 1,
    nombre: "Alimento Perro Adulto",
    precio: 29990,
    categoria: "Alimentos",
    imagen: "/img/comida-perro.png",
    descripcion:
      "Alimento seco balanceado para perros adultos, ideal para mantener energía y digestión saludable.",
  },
  {
    id: 2,
    nombre: "Alimento Gato Adulto",
    precio: 24990,
    categoria: "Alimentos",
    imagen: "/img/comida-gato.png",
    descripcion:
      "Croquetas para gatos adultos con nutrientes esenciales para su pelaje y vitalidad.",
  },
  {
    id: 3,
    nombre: "Snacks Naturales",
    precio: 8990,
    categoria: "Alimentos",
    imagen: "/img/snacks-naturales.png",
    descripcion:
      "Premios saludables para perros y gatos, ideales para entrenamiento.",
  },
  {
    id: 4,
    nombre: "Juguete de Cuerda",
    precio: 6990,
    categoria: "Juguetes",
    imagen: "/img/juguete-cuerda.png",
    descripcion: "Cuerda resistente para entretener y ejercitar a tu perro.",
  },
  {
    id: 5,
    nombre: "Pelota Mordedora",
    precio: 5990,
    categoria: "Juguetes",
    imagen: "/img/pelota.png",
    descripcion:
      "Pelota texturizada para morder y estimular la actividad física.",
  },
  {
    id: 6,
    nombre: "Ratón de Peluche",
    precio: 4990,
    categoria: "Juguetes",
    imagen: "/img/juguete-raton.png",
    descripcion:
      "Juguete suave y liviano para estimular el instinto de juego de tu gato.",
  },
  {
    id: 7,
    nombre: "Collar con Correa",
    precio: 12990,
    categoria: "Accesorios y cuidado",
    imagen: "/img/collar-correa.png",
    descripcion:
      "Set ajustable de collar y correa para paseos seguros y cómodos.",
  },
  {
    id: 8,
    nombre: "Cama para Mascota",
    precio: 34990,
    categoria: "Accesorios y cuidado",
    imagen: "/img/cama-mascota.png",
    descripcion: "Cama acolchada para el descanso de perros o gatos pequeños.",
  },
  {
    id: 9,
    nombre: "Shampoo Mascotas",
    precio: 7990,
    categoria: "Accesorios y cuidado",
    imagen: "/img/shampoo.png",
    descripcion:
      "Shampoo suave para mantener el pelaje limpio y con buen aroma.",
  },
];

function Tienda() {
  function agregarAlCarrito(producto) {
    console.log("Producto agregado:", producto);
  }

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h1 className="fw-bold">Productos</h1>
        <p className="text-body-secondary">
          Encuentra alimentos, juguetes y accesorios para tu mascota.
        </p>
      </div>

      <div className="row g-4">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>
    </section>
  );
}

export default Tienda;
