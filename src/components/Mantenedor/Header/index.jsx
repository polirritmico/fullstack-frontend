import JKiltroLogo from "@/components/JKiltroLogo";
import AdminNavbar from "@/components/Mantenedor/Navbar";
import UserAvatar from "@/components/Mantenedor/UserAvatar";
import { useEffect } from "react";
import { useLocation } from "react-router";

const userData = {
  username: "Alan Brito",
  role: "Administrador",
};

function Header() {
  const location = useLocation();
  const segment = location.pathname.split("/")[2];
  const maintainerName = segment?.charAt(0).toUpperCase() + segment?.slice(1);
  const title = `jKiltro • ${maintainerName}`;

  useEffect(() => {
    document.title = title;
    return () => (document.title = "jKiltro");
  }, [title]);

  return (
    <header className="btm-margin bg-white w-100">
      <div className="d-flex align-items-center justify-content-between p-2">
        <JKiltroLogo />

        <div>
          <h1 className="fs-3 fw-semibold text-dark mb-0 jk-font-heading">
            Mantenedor • {maintainerName}
          </h1>
        </div>

        <UserAvatar userData={userData} />
      </div>
      <AdminNavbar />
    </header>
  );
}

export default Header;
