import JKiltroBrand from "@/components/JKiltroBrand";
import NavbarBody from "./NavbarBody";

function Navbar() {
  const pages = [
    { nombre: "Inicio", link: "/", style: "active" },
    { nombre: "Contáctanos", link: "#" },
    // { nombre: "Servicios", link: "#" },
    { nombre: "Quiénes Somos", link: "/nosotros" },
    { nombre: "Tienda", link: "/tienda" },
    { nombre: "Mis Compras", link: "/perfil" },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container">
        <JKiltroBrand targetUrl="/" />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <NavbarBody paginas={pages} carrito={"Carrito"} />
      </div>
    </nav>
  );
}

export default Navbar;
