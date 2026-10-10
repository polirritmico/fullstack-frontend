import { Outlet } from "react-router";
import Header from "@/components/Mantenedor/Header";
import Footer from "@/components/Mantenedor/Footer";

import "@/styles/shared/mantenedor.css";

function MantenedorLayout() {
  return (
    <div className="d-flex min-vh-100 flex-column">
      <Header />
      <main className="container-fluid d-flex flex-column flex-grow-1 border">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MantenedorLayout;
