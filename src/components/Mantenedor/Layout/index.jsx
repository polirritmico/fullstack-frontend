import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "@/components/Mantenedor/Header";
import Footer from "@/components/Mantenedor/Footer";
import Loading from "@/components/Loading";

import "@/styles/shared/mantenedor.css";

function MantenedorLayout() {
  const { pathname } = useLocation();
  return (
    <div className="d-flex min-vh-100 flex-column">
      <Header />
      <main className="container-fluid d-flex flex-column flex-grow-1 border">
        <Suspense key={pathname} fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default MantenedorLayout;
