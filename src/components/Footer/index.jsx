import JKiltroLogo from "@/components/JKiltroLogo";

function Footer() {
  return (
    <footer className="bg-secondary bottom-0">
      <div className="container row my-4 align-items-start">
        <div className="col-12 col-md-3 d-none d-md-flex align-items-center justify-content-center align-self-center">
          <JKiltroLogo fullLogo={true} showText={false} size={150} />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <h3>Ayuda</h3>
          <p className="mb-2">Preguntas frecuentes</p>
          <p className="mb-2">Seguimiento de compra</p>
          <p className="mb-2">Contacto</p>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <h3>Nosotros</h3>
          <p className="mb-2">Quiénes somos</p>
          <p className="mb-2">Ventas corporativas</p>
          <p className="mb-2">Términos y condiciones</p>
          <p className="mb-2">Políticas de privacidad</p>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <h3>Comunidad jKiltro</h3>
          <p className="mb-2">Instagram</p>
          <p className="mb-2">GitHub</p>
          <p className="mb-2">Blog</p>
        </div>
      </div>
      <div className="bg-dark">
        <p className="px-3 py-1 mb-0 small text-light text-center">
          © {new Date().getFullYear()} jKiltro | Todos los derechos reservados.
          | Desarrollado por el equipo{" "}
          <i className="bi bi-cup-hot-fill text-info"></i> jKiltro
        </p>
      </div>
    </footer>
  );
}

export default Footer;
