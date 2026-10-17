import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Layout() {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <main className="flex-grow container py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
