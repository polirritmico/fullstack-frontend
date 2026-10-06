import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Navbar from "./components/navbar.jsx";

const title = "react";

export default function App() {
  return (Navbar());
}



//ESTE SERIA EL NAVBAR QUE APARECE EN OTRAS SECCIONES PARA TENERLO EN CUENTA POR FAVOR COMO EN HISTORIAS Y QUIENES SOMOS, PERO NO SE USA EN ESTE MOMENTO, SOLO PARA TENERLO EN CUENTA.
// export default function App() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       {/* Se mantiene visible al cambiar de ruta. */}
//       <Navbar />

//       {/* Solo cambia el contenido de este main. */}
//       <main className="container py-4 flex-grow-1">
//         <Routes>
//           <Route path="/" element={<Inicio />} />
//           <Route path="/productos" element={<Productos />} />
//           <Route path="/contacto" element={<Contacto />} />
//         </Routes>
//       </main>

//       {/* También se mantiene visible. */}
//       <Footer />
//     </div>
//   );
// }
