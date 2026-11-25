import FotoPolaroid from "@/components/FotoPolaroid";
import JKiltroLogo from "@/components/JKiltroLogo";

import "@/styles/shared/nosotros.css";
import { contenido } from "./data";

function Nosotros() {
  return (
    <main className="py-4 nosotros-bg d-flex rounded-5">
      <section className="container">
        <div className="row align-items-center justify-content-center g-4 g-lg-5">
          <FotoPolaroid
            photo={contenido.foto.imagen}
            caption={contenido.foto.caption}
            alt="Equipo veterinario junto a gatitos comiendo."
          />

          <div className="col-12 col-lg-7 order-1 order-lg-2 px-3 px-lg-4 px-sm-5">
            <div className="bg-danger text-light p-4 p-md-5 rounded-3 nosotros-card-shadow me-lg-4">
              <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <h1 className="display-4 fw-bold mb-0 text-light font-handwritten">
                  {contenido.titulo}
                </h1>
                <JKiltroLogo showText={false} withLink={false} size={87} />
              </div>
              {contenido.parrafos.map((parrafo, index) => (
                <p
                  key={index}
                  className={`fw-light fs-5 ${
                    index === contenido.parrafos.length - 1 ? "mb-0" : "mb-3"
                  }`}
                >
                  {parrafo}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Nosotros;
