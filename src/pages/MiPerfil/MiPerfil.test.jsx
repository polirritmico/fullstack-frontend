import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import MiPerfil from ".";
import { useAuth } from "@/contexts/Auth/AuthContext";
import usuarioService from "@/services/usuarioService";

vi.mock("@/contexts/Auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/services/usuarioService", () => ({
  default: { getMyProfile: vi.fn(), update: vi.fn() },
}));

const perfil = {
  id: 2,
  nombre: "Ana",
  apellido: "Rojas",
  rut: "12345678",
  dv: "5",
  email: "ana@gmail.com",
  telefonoCelular: "+56912345678",
  fechaNacimiento: "1990-01-01",
  rolId: 5,
  estadoId: 1,
};

const usuario = { id: 2, nombre: "Ana Rojas", role: "Cliente" };

const refrescarUsuario = vi.fn();

async function mostrarPerfil() {
  render(
    <MemoryRouter>
      <MiPerfil />
    </MemoryRouter>,
  );

  return screen.findByLabelText("Nombre");
}

describe("MiPerfil tests", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
    vi.mocked(useAuth).mockReturnValue({ user: usuario, refrescarUsuario });
    vi.mocked(usuarioService.getMyProfile).mockResolvedValue({
      id: 2,
      nombre: "Ana Rojas",
      userData: perfil,
    });
  });

  it("debería cargar el perfil desde users-api", async () => {
    const nombre = await mostrarPerfil();

    expect(nombre).toHaveValue("Ana");
    expect(nombre).toHaveAttribute("readonly");
    expect(screen.getByLabelText("Teléfono")).toHaveValue("+56912345678");
    expect(
      screen.getByRole("heading", { name: "Ana Rojas" }),
    ).toBeInTheDocument();
    expect(usuarioService.getMyProfile).toHaveBeenCalledTimes(1);
  });

  it("debería mantener el correo como solo lectura al editar", async () => {
    await mostrarPerfil();

    fireEvent.click(screen.getByRole("button", { name: "Editar información" }));

    expect(screen.getByLabelText("Nombre")).not.toHaveAttribute("readonly");
    expect(screen.getByLabelText("Correo electrónico")).toHaveAttribute(
      "readonly",
    );
  });

  it("debería guardar los cambios en users-api y refrescar la sesión", async () => {
    const actualizado = { ...perfil, nombre: "Camila" };
    vi.mocked(usuarioService.update).mockResolvedValue(actualizado);
    vi.mocked(refrescarUsuario).mockResolvedValue({
      ...usuario,
      nombre: "Camila Rojas",
      userData: actualizado,
    });

    await mostrarPerfil();

    fireEvent.click(screen.getByRole("button", { name: "Editar información" }));
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Camila" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { value: "9 8765 4321" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Perfil actualizado correctamente.",
    );
    expect(usuarioService.update).toHaveBeenCalledWith({
      ...perfil,
      nombre: "Camila",
      telefonoCelular: "+56987654321",
    });
    expect(refrescarUsuario).toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: "Camila Rojas" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toHaveAttribute("readonly");
  });

  it("debería mostrar el error del servidor si no se pueden guardar los cambios", async () => {
    vi.mocked(usuarioService.update).mockRejectedValue({
      response: { status: 400, data: { telefonoCelular: "Teléfono inválido" } },
    });

    await mostrarPerfil();

    fireEvent.click(screen.getByRole("button", { name: "Editar información" }));
    fireEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No se pudieron guardar los cambios: Teléfono inválido.",
    );
    expect(refrescarUsuario).not.toHaveBeenCalled();
  });

  it("debería descartar los cambios al cancelar", async () => {
    await mostrarPerfil();

    fireEvent.click(screen.getByRole("button", { name: "Editar información" }));
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Camila" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.getByLabelText("Nombre")).toHaveValue("Ana");
    expect(screen.getByLabelText("Nombre")).toHaveAttribute("readonly");
    expect(usuarioService.update).not.toHaveBeenCalled();
  });

  it("debería avisar si no se puede cargar el perfil", async () => {
    vi.mocked(usuarioService.getMyProfile).mockRejectedValue({
      response: { status: 404, data: { message: "Usuario no encontrado" } },
    });

    render(
      <MemoryRouter>
        <MiPerfil />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No se pudo cargar tu perfil: Usuario no encontrado.",
    );
  });
});
