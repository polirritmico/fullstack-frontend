import logoMark from "@/assets/logo-mark.svg";
import { Link } from "react-router";

function JKiltroBrand({ targetUrl = "/" }) {
  return (
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
  );
}

export default JKiltroBrand;
