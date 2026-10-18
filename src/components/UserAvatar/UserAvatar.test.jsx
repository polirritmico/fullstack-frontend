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

  it("debería mostrar el rol cuando showRole es true", () => {
    const testCaseCliente = { username: "Usuario Test1", role: "Cliente" };
    const testCaseAdmin = { username: "Usuario Test2", role: "Administrador" };
    const expectedCaseCliente = testCaseCliente.role;
    const expectedCaseAdmin = testCaseAdmin.role;

    render(
      <MemoryRouter>
        <UserAvatar userData={testCaseCliente} showRole={true} />
      </MemoryRouter>,
    );
    expect(screen.getByText(expectedCaseCliente)).toBeDefined();

    render(
      <MemoryRouter>
        <UserAvatar userData={testCaseAdmin} showRole={true} />
      </MemoryRouter>,
    );
    expect(screen.getByText(expectedCaseAdmin)).toBeDefined();
  });

  it("no debería mostrar el rol cuando showRole es no es true", () => {
    const testCaseCliente = { username: "Usuario Test1", role: "Cliente" };
    const testCaseAdmin = { username: "Usuario Test2", role: "Administrador" };
    const forbiddenCaseCliente = testCaseCliente.role;
    const forbiddenCaseAdmin = testCaseAdmin.role;

    render(
      <MemoryRouter>
        <UserAvatar userData={testCaseCliente} showRole={false} />
      </MemoryRouter>,
    );
    expect(screen.queryByText(forbiddenCaseCliente)).toBeNull();

    render(
      <MemoryRouter>
        <UserAvatar userData={testCaseAdmin} />
      </MemoryRouter>,
    );
    expect(screen.queryByText(forbiddenCaseAdmin)).toBeNull();
  });
});
