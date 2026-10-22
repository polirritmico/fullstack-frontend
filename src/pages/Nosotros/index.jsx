import "@/styles/legacy.css";

function Nosotros() {
  const titulo = [
    "Estamos para ayudar",
    "Estamos contigo",
    "En que podemos ayudarte",
  ];

  const parrafaUno = [
    `Todo comenzó frente al resplandor de pantallas encendidas a
                  deshora, entre tazas de café frío y la rabia compartida al ver
                  a tantos animales abandonados a su suerte en las esquinas más
                  heladas de la ciudad. Rodrigo, Eduardo y Fernando no tenían en
                  mente una corporación tradicional; lo que tenían era la
                  urgencia visceral de actuar y una combinación única de
                  instinto técnico, visión de diseño y calle. Sin medir las
                  dimensiones de lo que estaban por desatar, comenzaron a
                  escribir código kilométrico, levantar bases de datos y
                  estructurar plataformas con la precisión de quienes proyectan
                  una multinacional, pero guiados únicamente por la promesa de
                  que ningún animal volvería a tiritar bajo un cartón mojado.`,
  ];

  const parrafaDos = [
    `         Aquellas madrugadas de commits interminables, prototipos de
                  automatización y refugios construidos a pulso terminaron
                  cobrando vida propia. Lo que nació como una trinchera de
                  desarrollo entre amigos se transformó en los cimientos de una
                  corporación real: hoy, con Rodrigo, Eduardo y Fernando
                  consolidados como los accionistas mayoritarios, lideran un
                  ecosistema integral que profesionalizó para siempre la ayuda
                  comunitaria.`,
  ];

  const parrafoTres = [
    `                 Esa arquitectura inicial creció hasta convertir a jKiltro en
                  una empresa de vanguardia respaldada por un equipo de médicos
                  veterinarios de primer nivel, garantizando diagnósticos
                  certeros, cirugías complejas y una atención clínica de máxima
                  calidad para cada paciente rescatado. Al mismo tiempo, la
                  compañía dio el salto comercial levantando su propia red de
                  tiendas de productos para mascotas, donde comercializan
                  alimentos especializados, insumos médicos y accesorios de
                  primera categoría. De este modo, cada compra en la tienda y
                  cada servicio clínico prestado no es solo comercio, sino un
                  motor financiero que sostiene los rescates y la rehabilitación
                  de los animales más vulnerables. Lo que tres amigos
                  programaron a oscuras sin pensarlo dos veces, es hoy una gran
                  empresa que demuestra que el talento técnico y la salud animal
                  pueden unirse para transformar una realidad entera.`,
  ];

  const historia = [parrafaUno, parrafaDos, parrafoTres];
  return (
    <main className="pt-5 fondo-completo">
      <section className="container d-flex">
        <div className="row justify-content-between">
          <div className="col-5" style={{ marginTop: "250px" }}>
            <img
              src="/img/pexels-helenalopes-7980680.jpg"
              className="img-fluid img-thumbnail shadow w-100"
              alt="..."
              style={{ maxWidth: "500px" }}
            />
          </div>

          <div className="col-7">
            <h1 className="display-1 texto-fuerte mb-5 text-light">
              {titulo[1]}
            </h1>
            <div className="bg-danger bg-opacity-75 text-light fw-light fst-italic fs-5 p-4 mb-4">
              {historia.map((parrafo, index) => (
                <p key={index}>{parrafo}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Nosotros;
