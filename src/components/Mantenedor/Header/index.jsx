import AdminNavbar from "@/components/Mantenedor/Navbar";
import LogoMark from "@/assets/logo-mark.svg";
import UserAvatar from "@/components/Mantenedor/UserAvatar";

const userData = {
  username: "Alan Brito",
  role: "Administrador",
};

function Header() {
  return (
    <header className="btm-margin bg-white w-100">
      <div className="d-flex align-items-center justify-content-between p-2">
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

        <div>
          <h1 className="fs-3 fw-semibold text-dark mb-0 jk-font-heading">
            Mantenedor • Usuarios
          </h1>
        </div>

        <UserAvatar userData={userData} />
      </div>
      <AdminNavbar />
    </header>
  );
}

export default Header;
