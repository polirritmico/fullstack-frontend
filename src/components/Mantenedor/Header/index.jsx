import JKiltroLogo from "@/components/JKiltroLogo";
import AdminNavbar from "@/components/Mantenedor/Navbar";
import UserAvatar from "@/components/Mantenedor/UserAvatar";

const userData = {
  username: "Alan Brito",
  role: "Administrador",
};

function Header() {
  return (
    <header className="btm-margin bg-white w-100">
      <div className="d-flex align-items-center justify-content-between p-2">
        <JKiltroLogo />

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
