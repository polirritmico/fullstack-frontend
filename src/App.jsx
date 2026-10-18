import { Routes, Route, Navigate } from "react-router";

import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Logout from "@/pages/Logout";
import NoAutorizado from "@/pages/Errores/NoAutorizado";
import NoEncontrado from "@/pages/Errores/NoEncontrado";

import Carrito from "@/pages/Carrito";
import CrearPerfil from "@/pages/CrearPerfil";
import DetalleProducto from "@/pages/DetalleProducto";
import MiPerfil from "@/pages/MiPerfil";
import MisCompras from "@/pages/MisCompras";
import Tienda from "@/pages/Tienda";

import ProtectedAdminRoute from "./components/Mantenedor/ProtectedAdminRoute";
import AdminConfig from "@/pages/Mantenedor/Configuracion";
import AdminLayout from "@/components/Mantenedor/Layout";
import AdminProductos from "@/pages/Mantenedor/Productos";
import AdminUsuarios from "@/pages/Mantenedor/Usuarios";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/nosotros" element={<Nosotros />} /> */}

        <Route path="/tienda" element={<Tienda />} />
        <Route path="/tienda/productos/:id" element={<DetalleProducto />} />
        <Route path="/tienda/carrito" element={<Carrito />} />
        <Route path="/tienda/mis-compras" element={<MisCompras />} />

        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/crear-perfil" element={<CrearPerfil />} />
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
