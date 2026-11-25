import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { AuthContext } from "@/contexts/Auth/AuthContext";
import authService from "@/services/authService";
import usuarioService from "@/services/usuarioService";

import CrearPerfil from ".";

vi.mock("@/services/authService", () => ({
  default: { register: vi.fn(), login: vi.fn(), logout: vi.fn() },
}));

vi.mock("@/services/usuarioService", () => ({
  default: { create: vi.fn() },
}));

const login = vi.fn();

function mostrarCrearPerfil() {
  render(
    <AuthContext value={{ user: null, login }}>
      <MemoryRouter initialEntries={["/crear-perfil"]}>
        <Routes>
          <Route path="/crear-perfil" element={<CrearPerfil />} />
          <Route path="/tienda" element={<h1>Tienda</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthContext>,
  );
}

function completarFormulario(cambios = {}) {
  const datos = {
    Nombre: "Ana",
    Apellido: "Rojas",
    RUN: "123456785",
    Teléfono: "9 1234 5678",
    "Correo electrónico": "Ana@gmail.com",
    Contraseña: "Clave123!",
    "Confirmar contraseña": "Clave123!",
    ...cambios,
  };

  for (const [etiqueta, valor] of Object.entries(datos)) {
    fireEvent.change(screen.getByLabelText(etiqueta), {
      target: { value: valor },
    });
  }

  fireEvent.click(
    screen.getByRole("checkbox", { name: /acepto los términos/i }),
  );
}

function enviar() {
  fireEvent.click(screen.getByRole("button", { name: "Registrar" }));
}

describe("CrearPerfil tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("no pide dirección, comuna ni región", () => {
    mostrarCrearPerfil();

    expect(screen.queryByLabelText("Dirección")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Comuna")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Región")).not.toBeInTheDocument();
  });

  it("debería registrar la cuenta, crear el perfil, iniciar sesión e ir a la tienda", async () => {
    mostrarCrearPerfil();
    completarFormulario();

    enviar();

    expect(
      await screen.findByRole("heading", { name: "Tienda" }),
    ).toBeInTheDocument();

    const credenciales = { email: "ana@gmail.com", password: "Clave123!" };
    expect(authService.register).toHaveBeenCalledWith(credenciales);
    expect(authService.login).toHaveBeenCalledWith(credenciales);
    expect(usuarioService.create).toHaveBeenCalledWith({
      nombre: "Ana",
      apellido: "Rojas",
      rut: "12345678",
      dv: "5",
      email: "ana@gmail.com",
      telefonoCelular: "+56912345678",
      rolId: 5,
      estadoId: 1,
    });
    expect(login).toHaveBeenCalledWith(credenciales);
  });

  it("debería mostrar el error del servidor si el correo ya está registrado", async () => {
    vi.mocked(authService.register).mockRejectedValue({
      response: {
        status: 409,
        data: { message: "User already exists: ana@gmail.com" },
      },
    });
    mostrarCrearPerfil();
    completarFormulario();

    enviar();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Ya existe una cuenta con este correo. Inicia sesión o usa otro correo.",
    );
    expect(usuarioService.create).not.toHaveBeenCalled();
    expect(login).not.toHaveBeenCalled();
  });

  it("debería avisar y cerrar la sesión temporal si falla la creación del perfil", async () => {
    vi.mocked(usuarioService.create).mockRejectedValue({
      response: { status: 400, data: { rut: "El RUT no es válido" } },
    });
    mostrarCrearPerfil();
    completarFormulario();

    enviar();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Tu cuenta se creó, pero no se pudo completar el perfil: El RUT no es válido.",
    );
    expect(authService.logout).toHaveBeenCalled();
    expect(login).not.toHaveBeenCalled();
  });

  it("debería rechazar un RUN con dígito verificador incorrecto", () => {
    mostrarCrearPerfil();
    completarFormulario({ RUN: "123456789" });

    enviar();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Ingresa un RUN válido, sin puntos ni guion.",
    );
    expect(authService.register).not.toHaveBeenCalled();
  });

  it("debería rechazar contraseñas que no coinciden", () => {
    mostrarCrearPerfil();
    completarFormulario({ "Confirmar contraseña": "OtraClave123!" });

    enviar();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Las contraseñas deben coincidir.",
    );
    expect(authService.register).not.toHaveBeenCalled();
  });

  it("debería exigir letras, números y un carácter especial en la contraseña", () => {
    mostrarCrearPerfil();
    completarFormulario({
      Contraseña: "Clave1234",
      "Confirmar contraseña": "Clave1234",
    });

    enviar();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "La contraseña debe tener al menos 8 caracteres e incluir letras, números y un carácter especial.",
    );
    expect(authService.register).not.toHaveBeenCalled();
  });
});
