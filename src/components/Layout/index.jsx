import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import CarritoPanel from "@/components/CarritoPanel";

function Layout() {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <main className="flex-grow container py-4">
        <Outlet />
      </main>
      <CarritoPanel />
    </div>
  );
}

export default Layout;
