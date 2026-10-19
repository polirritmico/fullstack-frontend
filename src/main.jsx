import { BrowserRouter } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "@/contexts/Auth/AuthProvider";
import CarritoProvider from "@/contexts/Carrito/CarritoProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

/* Estilos globales del proyecto (el orden importa) */
import "@/styles/globals.css";
import "@/styles/theme.css";

import App from "@/App";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>,
);
