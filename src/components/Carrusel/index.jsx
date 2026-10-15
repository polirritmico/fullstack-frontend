import Carousel from "react-bootstrap/Carousel";

function Carrusel() {
  return (
    <Carousel
      interval={3000}
      pause={false}
      className="mb-4 rounded-4 overflow-hidden"
      prevLabel="Anterior"
      nextLabel="Siguiente"
    >
      <Carousel.Item>
        <img
          src="/img/Banner_oferta_1.png"
          className="d-block w-100"
          alt="Promoción de la tienda 1"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="/img/Banner_oferta_2.png"
          className="d-block w-100"
          alt="Promoción de la tienda 2"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="/img/Banner_oferta_3.png"
          className="d-block w-100"
          alt="Promoción de la tienda 3"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;