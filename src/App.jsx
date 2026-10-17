import { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router";

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

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/productos/:id" element={<DetalleProducto />} />
            <Route path="/tienda/carrito" element={<Carrito />} />
            <Route path="/tienda/mis-compras" element={<MisCompras />} />
            <Route path="/me" element={<MiPerfil />} />
            <Route path="/crear-perfil" element={<CrearPerfil />} />
            {/* <Route path="/productos" element={<Productos />} /> */}
            {/* <Route path="/contacto" element={<Contacto />} /> */}
            <Route path="*" element={<NoEncontrado />} />
          </Route>

          <Route>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/mantenedor/usuarios" element={<AdminUsuarios />} />
            <Route path="/mantenedor/productos" element={<AdminProductos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
