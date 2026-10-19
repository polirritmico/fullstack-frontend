import LogoMark from "@/assets/logo-mark.svg";
import Logo from "@/assets/logo.svg";
import { Link } from "react-router";

function JKiltroLogo({
  size = 48,
  showText = true,
  textStyle = null,
  fullLogo = false,
}) {
  return (
    <div className="d-flex align-items-center gap-1">
      <Link className="navbar-brand" to="/">
        <img
          src={fullLogo ? Logo : LogoMark}
          alt="Logo jKiltro"
          width={size}
          height={size}
          className="logo"
        />
      </Link>

      {showText && (
        <span className={textStyle ?? "fw-bold text-dark fs-4 "}>jKiltro</span>
      )}
    </div>
  );
}

export default JKiltroLogo;
