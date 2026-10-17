import { StrictMode } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Layout from "@/components/Layout";
import NoEncontrado from "@/pages/Errores/NoEncontrado";

import Tienda from "@/pages/Tienda";
import DetalleProducto from "@/pages/DetalleProducto";
import Carrito from "@/pages/Carrito";
import CrearPerfil from "@/pages/CrearPerfil";
import MiPerfil from "@/pages/MiPerfil";
import MisCompras from "@/pages/MisCompras";

import AdminLayout from "@/components/Mantenedor/Layout";
import AdminUsuarios from "@/pages/Mantenedor/Usuarios";
import AdminProductos from "@/pages/Mantenedor/Productos";
import AdminConfig from "./pages/Mantenedor/Configuracion";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/productos/:id" element={<DetalleProducto />} />
            <Route path="/tienda/carrito" element={<Carrito />} />
            <Route path="/tienda/mis-compras" element={<MisCompras />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/crear-perfil" element={<CrearPerfil />} />
            {/* <Route path="/productos" element={<Productos />} /> */}
            {/* <Route path="/contacto" element={<Contacto />} /> */}
            <Route path="*" element={<NoEncontrado />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/mantenedor/productos" element={<AdminProductos />} />
            <Route path="/mantenedor/usuarios" element={<AdminUsuarios />} />
            <Route path="/mantenedor/configuracion" element={<AdminConfig />} />
            <Route path="/mantenedor/*" element={<NoEncontrado />} />

            <Route
              path="/mantenedor"
              element={<Navigate to="/mantenedor/productos" replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
