import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router";

import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Logout from "@/pages/Logout";
import NoAutorizado from "@/pages/Errores/NoAutorizado";
import NoEncontrado from "@/pages/Errores/NoEncontrado";
import ProtectedAdminRoute from "@/components/Mantenedor/ProtectedAdminRoute";

const Carrito = lazy(() => import("@/pages/Carrito"));
const Tienda = lazy(() => import("@/pages/Tienda"));
const Clinica = lazy(() => import("@/pages/Clinica"));
const CrearPerfil = lazy(() => import("@/pages/CrearPerfil"));
const DetalleProducto = lazy(() => import("@/pages/DetalleProducto"));
const Direccion = lazy(() => import("@/pages/Direccion"));
const MiPerfil = lazy(() => import("@/pages/MiPerfil"));
const MisCompras = lazy(() => import("@/pages/MisCompras"));
const Nosotros = lazy(() => import("@/pages/Nosotros"));
const RecuperarCuenta = lazy(() => import("@/pages/RecuperarCuenta"));

const AdminConfig = lazy(() => import("@/pages/Mantenedor/Configuracion"));
const AdminLayout = lazy(() => import("@/components/Mantenedor/Layout"));
const AdminProductos = lazy(() => import("@/pages/Mantenedor/Productos"));
const AdminUsuarios = lazy(() => import("@/pages/Mantenedor/Usuarios"));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/nosotros" element={<Nosotros />} />

        <Route path="/clinica" element={<Clinica />} />

        <Route path="/tienda" element={<Tienda />} />
        <Route path="/tienda/productos/:id" element={<DetalleProducto />} />
        <Route path="/tienda/carrito" element={<Carrito />} />
        <Route path="/tienda/mis-compras" element={<MisCompras />} />

        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/crear-perfil" element={<CrearPerfil />} />
        <Route path="/recuperar-cuenta" element={<RecuperarCuenta />} />
        <Route path="/direccion" element={<Direccion />} />
        {/* <Route path="/contacto" element={<Contacto />} /> */}

        <Route path="/no-autorizado" element={<NoAutorizado />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>

      <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/mantenedor/productos" element={<AdminProductos />} />
          <Route path="/mantenedor/usuarios" element={<AdminUsuarios />} />
          <Route path="/mantenedor/configuracion" element={<AdminConfig />} />

          <Route
            path="/mantenedor"
            element={<Navigate to="/mantenedor/productos" replace />}
          />
          <Route path="/mantenedor/*" element={<NoEncontrado />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
