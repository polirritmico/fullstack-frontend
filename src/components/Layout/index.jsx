import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import CarritoPanel from "@/components/CarritoPanel";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>
      <CarritoPanel />
      <Footer />
    </div>
  );
}

export default Layout;
