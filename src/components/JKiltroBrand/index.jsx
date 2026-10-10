import logoMark from "@/assets/logo-mark.svg";

function JKiltroBrand({ targetUrl }) {
  return (
    <a
      className="navbar-brand d-flex align-items-center"
      href={targetUrl || "/"}
    >
      <img
        src={logoMark}
        alt="Logo de la empresa"
        width="60"
        height="60"
        className="me-2"
      />
      jKiltro
    </a>
  );
}

export default JKiltroBrand;
