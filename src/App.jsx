import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Navbar from "./components/navbar.jsx";

const title = "react";

export default function App() {
  return (Navbar());
}




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
