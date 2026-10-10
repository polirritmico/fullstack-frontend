import LogoMark from "@/assets/logo-mark.svg";

function JKiltroLogo() {
  return (
    <div className="d-flex align-items-center gap-3">
      <a className="navbar-brand" href="/">
        <img
          src={LogoMark}
          alt="Logo jKiltro"
          width="48"
          height="48"
          className="rounded-circle"
        />
      </a>

      <span className="fw-bold fs-4">jKiltro</span>
    </div>
  );
}

export default JKiltroLogo;
