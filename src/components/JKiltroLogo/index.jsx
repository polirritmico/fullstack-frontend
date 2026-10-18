import LogoMark from "@/assets/logo-mark.svg";
import { Link } from "react-router";

function JKiltroLogo() {
  return (
    <div className="d-flex align-items-center gap-3">
      <Link className="navbar-brand" to="/">
        <img
          src={LogoMark}
          alt="Logo jKiltro"
          width="48"
          height="48"
          className="rounded-circle"
        />
      </Link>

      <span className="fw-bold fs-4">jKiltro</span>
    </div>
  );
}

export default JKiltroLogo;
