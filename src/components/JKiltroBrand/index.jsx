import logoMark from "@/assets/logo-mark.svg";
import { Link } from "react-router";

function JKiltroBrand({ targetUrl = "/" }) {
  return (
    <div className="col-md-2 d-flex px-0">
      <Link
        className="navbar-brand d-flex align-items-center text-decoration-none"
        to={targetUrl}
      >
        <img
          src={logoMark}
          alt="jKiltro"
          width="60"
          height="60"
          className="me-2"
        />
        jKiltro
      </Link>
    </div>
  );
}

export default JKiltroBrand;
