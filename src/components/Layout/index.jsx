import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";

function Layout() {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <main className="flex-grow container py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
