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

  it.each([
    { username: "Usuario Test", role: "Cliente" },
    { username: "Usuario Test", role: "Administrador" },
  ])("debería mostrar el rol cuando showRole es true", (testCase) => {
    render(
      <MemoryRouter>
        <UserAvatar userData={testCase} showRole={true} />
      </MemoryRouter>,
    );

    expect(screen.getByText(testCase.role)).toBeDefined();
  });

  it.each([
    {
      scenario: "es false (rol Cliente)",
      testCase: { username: "Usuario Test", role: "Cliente" },
      props: { showRole: false },
    },
    {
      scenario: "no está definido (rol Cliente)",
      testCase: { username: "Usuario Test", role: "Cliente" },
      props: {},
    },
    {
      scenario: "es false (rol Administrador)",
      testCase: { username: "Usuario Test", role: "Administrador" },
      props: { showRole: false },
    },
    {
      scenario: "no está definido (rol Adminsitrador)",
      testCase: { username: "Usuario Test", role: "Administrador" },
      props: {},
    },
  ])(
    "no debería mostrar el rol cuando showRole $scenario",
    ({ testCase, props }) => {
      render(
        <MemoryRouter>
          <UserAvatar userData={testCase} {...props} />
        </MemoryRouter>,
      );

      // usar queryByText cuando el objeto no debería existir
      expect(screen.queryByText(testCase.role)).toBeNull();
    },
  );
});
