import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";

import CarritoPanel from "@/components/CarritoPanel";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="d-flex flex-column flex-grow-1 container py-4">
        <Suspense key={pathname} fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <CarritoPanel />
      <Footer />
    </div>
  );
}

export default Layout;
