import { Outlet } from "react-router";
import Navbar from "@/components/Mantenedor/Navbar";

function MantenedorLayout() {
  return (
    <div className="d-flex flex-column">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow container py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MantenedorLayout;
