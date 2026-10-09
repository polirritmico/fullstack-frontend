import AdminNavbar from "@/components/Mantenedor/Navbar";
import LogoMark from "@/assets/logo-mark.svg";

const userData = {
  username: "Alan Brito",
  role: "Administrador",
};

function Header() {
  return (
    <header class="btm-margin bg-white w-100">
      <div class="d-flex align-items-center justify-content-between p-2">
        <div class="d-flex align-items-center gap-3">
          <a class="navbar-brand" href="/">
            <img
              src={LogoMark}
              alt="Logo jKiltro"
              width="48"
              height="48"
              class="rounded-circle"
            />
          </a>

          <span class="fw-bold fs-4">jKiltro</span>
        </div>

        <div>
          <h1 class="fs-3 fw-semibold text-dark mb-0 jk-font-heading">
            Mantenedor • Usuarios
          </h1>
        </div>

        <div class="d-flex align-items-center gap-3">
          <div class="text-end">
            <p class="fs-7 fw-semibold mb-0">{userData.username}</p>
            <p class="fs-8 text-body-secondary fw-medium mt-0 mb-0">
              {userData.role}
            </p>
          </div>
          <div class="bg-white rounded-circle shadow d-flex align-items-center justify-content-center avatar-circle">
            <i class="bi bi-person-fill text-info fs-2 lh-1"></i>
          </div>
        </div>
      </div>

      <AdminNavbar />
    </header>
  );
}

export default Header;
