import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

/* Estilos globales del proyecto (el orden importa) */
import "@/styles/globals.css";
import "@/styles/theme.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
