import { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/Mantenedor/Layout";
import AdminUsuarios from "@/pages/Mantenedor/Usuarios";
import NoEncontrado from "@/pages/Errores/NoEncontrado";

import Tienda from "@/pages/Tienda";
import DetalleProducto from "@/pages/DetalleProducto";
import Carrito from "@/pages/Carrito";
import CrearPerfil from "@/pages/CrearPerfil";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/productos/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/crear-perfil" element={<CrearPerfil />} />
            {/* <Route path="/productos" element={<Productos />} /> */}
            {/* <Route path="/contacto" element={<Contacto />} /> */}
            {/* <Route path="/me" element={<Perfil />} /> */}
            <Route path="*" element={<NoEncontrado />} />
          </Route>

          <Route>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/mantenedor/usuarios" element={<AdminUsuarios />} />
            {/* <Route path="/mantenedor/productos" element={<Productos />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;

//ESTE SERIA EL NAVBAR QUE APARECE EN OTRAS SECCIONES PARA TENERLO EN CUENTA POR FAVOR COMO EN HISTORIAS Y QUIENES SOMOS, PERO NO SE USA EN ESTE MOMENTO, SOLO PARA TENERLO EN CUENTA.
// export default function App() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       {/* Se mantiene visible al cambiar de ruta. */}
//       <Navbar />
//
//       {/* Solo cambia el contenido de este main. */}
//       <main className="container py-4 flex-grow-1">
//         <Routes>
//           <Route path="/" element={<Inicio />} />
//           <Route path="/productos" element={<Productos />} />
//           <Route path="/contacto" element={<Contacto />} />
//         </Routes>
//       </main>
//
//       {/* También se mantiene visible. */}
//       <Footer />
//     </div>
//   );
// }
