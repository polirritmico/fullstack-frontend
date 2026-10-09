import { Outlet } from "react-router";
import Header from "@/components/Mantenedor/Header";

import "@/styles/shared/mantenedor.css";

function MantenedorLayout() {
  return (
    <div className="d-flex flex-column">
      <Header />
      <main className="flex-grow container py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default MantenedorLayout;
