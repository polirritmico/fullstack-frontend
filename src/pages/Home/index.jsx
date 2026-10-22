import "../../styles/legacy.css";
import { Link } from "react-router";

function Home() {
  return (
    <main className="bg-secondary">
      <section className="seccion-cards py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-5 col-xl-4 mb-4">
              <div className="card shadow h-100 rounded-10p">
                <img
                  src="img/pexels-helenalopes-7980680.jpg"
                  className="card-img-top card-img-top-css"
                  alt="Veterinarios atendiendo a un perro"
                />

                {/*<!-- no se centraba boton tuve que usar flexbox-->*/}
                <div className="card-body d-flex flex-column align-items-center">
                  <h1 className="card-title texto-fuerte">Veterinaria</h1>
                  <p className="card-text opacity-75 text-center">
                    Agenda tu hora con nuestros veterinarios y conoce nuestros
                    servicios de salud animal.
                  </p>

                  {/*<!-- Botón centrado -->*/}

                  <Link to="/clinica" className="btn btn-primary">
                    Ingresar
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 col-xl-4 mb-4">
              <div className="card shadow h-100 rounded-10p">
                <img
                  src="img/pexels-1433506698-34667593.jpg"
                  className="card-img-top card-img-top-css"
                  alt="Varios gatos comiendo juntos"
                />

                {/* <!-- tambien aca-->*/}
                <div className="card-body d-flex flex-column align-items-center">
                  <h1 className="card-title texto-fuerte">Tienda</h1>
                  <p className="card-text opacity-75 text-center">
                    Conoce nuestras tiendas a lo largo de Chile
                  </p>

                  {/* <!-- lo mismo aca -->*/}
                  {/*                   <a
                    href="pages/login.html?redirect=tienda/index.html"
                    className="btn btn-primary"
                  >
                    Ingresar
                  </a> */}
                  <Link to="/tienda" className="btn btn-primary">
                    Ingresar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container fondo-para-citas rounded-4">
        <div className="row pt-5">
          <div className="col-12 mb-3 mt-5">
            <figure className="text-center">
              <blockquote className="blockquote mt-5">
                <p className="texto-normal text-dark text-center fs-5 fst-italic">
                  “Contamos con un equipo de profesionales comprometidos <br />
                  con entregar una atención cercana y de calidad.”
                </p>
              </blockquote>

              <figcaption className="blockquote texto-fuerte text-black fs-4 text-center mx-auto p-2">
                — Dr. Nicolás Herrera,
                <cite title="Source Title"> Veterinario —</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3">
            <figure className="text-center">
              <blockquote className="blockquote mt-5">
                <p className="texto-normal text-dark text-center fs-5 fst-italic">
                  “He encontrado productos de muy buena calidad <br />
                  y una atención excelente. La tienda tiene variedad <br />
                  para mis mascotas.”
                </p>
              </blockquote>

              <figcaption className="blockquote texto-fuerte text-black fs-4 text-center mx-auto p-2">
                — Carolina Martínez,
                <cite title="Source Title"> Cliente —</cite>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* <!-- SECCIÓN 1: TIENDA Y ALIMENTOS --> */}

      <section className="container py-5 seccion-cards border border-1 border-light-subtle bg-light rounded-3">
        <div className="row px-5">
          <div className="col-7">
            {/*<!-- use dipslay 6 para tamaño-->*/}

            <h2 className="texto-fuerte display-6 text-center">
              La mejor nutrición y accesorios para tu animal
            </h2>

            {/*  <!-- articulo 1 --> */}
            <p className="texto-normal mt-3">
              En nuestra Clínica jKiltro, estamos convencidos de que la salud de
              tu compañero de cuatro patas comienza por su plato. Por eso, hemos
              seleccionado cuidadosamente una tienda con los mejores alimentos y
              artículos del mercado, pensando siempre en sus necesidades
              específicas.
            </p>

            {/*     <!-- me faltaba el colapse para poder hacerlo como foro, averiguando pude hacerlo bien y el id--> */}
            <div className="collapse" id="articuloTienda">
              <p className="texto-normal mt-2">
                Trabajamos con marcas de nutrición premium que garantizan un
                aporte equilibrado, mejorando su pelaje, su digestión y su
                energía diaria. Además, sabemos que el bienestar no es solo
                salud física, sino también mental. En nuestra sección de
                accesorios, encontrarás desde juguetes interactivos que
                estimulan su inteligencia, hasta camas ergonómicas para un
                descanso reparador y accesorios de paseo seguros. Cada producto
                que ofrecemos ha sido revisado y aprobado por nuestros
                especialistas, asegurando que te lleves a casa solo lo mejor.
                ¡Ven a descubrir todo lo que tenemos para mimar a tu animal!
              </p>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto mt-4">
              {/* <!-- AGREGADO: Los atributos data-bs-toggle y data-bs-target conectan el botón con el id "articuloTienda" --> */}
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#articuloTienda"
                aria-expanded="false"
                aria-controls="articuloTienda"
              >
                Ver más
              </button>
            </div>
          </div>
          <div className="col-5">
            <img
              className="img-fluid mx-auto d-block rounded-4"
              alt="500x500"
              src="img/comida.jpg"
            />
          </div>
        </div>
      </section>

      {/*  <!-- SEPARADOR -->
      <!-- Limpié los div mal cerrados y los puntos y comas sueltos --> */}
      <div className="col-4 mx-auto my-4"></div>

      {/* <!-- SECCIÓN 2: VETERINARIOS Y TALENTO --> */}
      <section className="container py-5 seccion-cards border border-1 border-light-subtle">
        <div className="row px-5">
          <div className="col-5">
            <img
              className="img-fluid mx-auto d-block rounded-4"
              alt="500x500"
              src="img/doctor.jpg"
            />
          </div>

          <div className="col-7">
            <h2 className="texto-fuerte display-6 text-center">
              Talento médico y calidad de atención
            </h2>

            <p className="texto-normal mt-3">
              Nuestro mayor orgullo en Clínica jKiltro es el increíble talento
              humano que nos respalda. Contamos con un equipo de médicos
              veterinarios apasionados y altamente capacitados, cuya vocación
              principal es el amor y respeto por cada animal que cruza nuestras
              puertas.
            </p>

            {/*  <!-- AGREGADO: Nuevo contenedor oculto, esta vez con id="articuloVeterinarios" --> */}
            <div className="collapse" id="articuloVeterinarios">
              <p className="texto-normal mt-2">
                Entendemos que traer a tu mascota a la clínica puede generar
                estrés, por lo que nuestros doctores se esfuerzan en brindar una
                atención empática, paciente y cercana. Se toman el tiempo
                necesario para escuchar tus dudas y examinar a tu compañero con
                la mayor delicadeza. Además, nuestro equipo está en constante
                actualización médica para ofrecer diagnósticos precisos y
                tratamientos de vanguardia. Desde chequeos preventivos hasta
                casos más complejos, trabajamos en conjunto para garantizar la
                mejor calidad de vida para tu mascota.
              </p>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto mt-4">
              {/* <!-- AGREGADO: El botón ahora apunta al id "articuloVeterinarios" --> */}
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#articuloVeterinarios"
                aria-expanded="false"
                aria-controls="articuloVeterinarios"
              >
                Ver más
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*<!-- SEPARADOR -->*/}
      <div className="col-4 mx-auto my-5"></div>

      <section className="container" id="banners">
        <div className="row justify-content-center p-5">
          <div className="col-10">
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="img/bannerUno.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="img/bannerDos.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="img/bannerTres.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
