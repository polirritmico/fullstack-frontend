import JKiltroBrand from "../JKiltroBrand";
import { Link } from "react-router";
import NavbarBody from "./NavbarBody";
export default function Navbar() {
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavbarBody />
        </div>
      </div>
    </nav>
  );
}
