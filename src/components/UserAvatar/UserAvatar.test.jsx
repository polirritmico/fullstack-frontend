import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import UserAvatar from ".";

describe("UserAvatar tests", () => {
  it("debería mostrar iniciar sesión si no hay usuario logeado", () => {
    const testCase = null;
    const expected = "/login";

    render(
      <MemoryRouter>
        <UserAvatar userData={testCase} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByRole("link").getAttribute("href")).toBe(expected);
  });

  it("debería mostrar el nombre del usuario al estar logeado", () => {
    const testCase = { username: "Usuario test", role: "Cliente" };
    const expected = testCase.username;

    render(
      <MemoryRouter>
        <UserAvatar userData={testCase} />
      </MemoryRouter>,
    );

    expect(screen.getByText(expected)).toBeDefined();
  });

  it("no debería mostrar el menú administración si el usuario no es administrador", () => {
    const testCase = { username: "Usuario test", role: "Cliente" };
    const forbidden = "Administración";

    render(
      <MemoryRouter>
        <UserAvatar userData={testCase} />
      </MemoryRouter>,
    );

    expect(screen.queryByText(forbidden)).toBeNull();
  });

  it("debería mostrar el botón de administración si el usuario es administrador", () => {
    const testCase = { username: "Usuario test", role: "Administrador" };
    const expected = "Administración";

    render(
      <MemoryRouter>
        <UserAvatar userData={testCase} />
      </MemoryRouter>,
    );

    expect(screen.queryByText(expected)).toBeDefined();
  });
});
