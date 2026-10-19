import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./AuthContext";
import authService from "@/services/authService";

vi.mock("@/services/authService", () => ({
  default: {
    login: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
  },
}));

describe("AuthProvider tests", () => {
  const mockAdminUser = {
    id: 1,
    username: "Test User",
    role: "Administrador",
    token: "fake-jwt-admin-token",
  };

  it("debería inicializar sin usuario logeado", () => {
    const testCase = null;
    const expected = null;

    vi.mocked(authService.getCurrentUser).mockReturnValue(testCase);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const output = result.current.user;

    expect(output).toBe(expected);
  });

  it("debería lanzar error si no se usa dentro del provider", () => {
    const expected1 = "AuthProvider";

    let output = "";
    try {
      renderHook(() => useAuth());
    } catch (err) {
      output = err.message;
    }

    expect(output.includes(expected1)).toBe(true);
  });

  it("debería inicializar con el usuario que devuelva el authService", () => {
    const testCase = mockAdminUser;
    const expected = mockAdminUser.username;

    vi.mocked(authService.getCurrentUser).mockReturnValue(testCase);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const output = result.current.user;

    expect(output).not.toBeNull();
    expect(output.username).toEqual(expected);
  });

  it("debería actualizar el contexto tras un login válido", async () => {
    const testCaseCredentials = { email: "test@correo.cl", password: "mock" };
    const testCaseUser = mockAdminUser;
    const expectedAfter = mockAdminUser.username;

    vi.mocked(authService.getCurrentUser).mockReturnValue(null);
    vi.mocked(authService.login).mockResolvedValue(testCaseUser);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const outputBefore = result.current.user;

    await act(async () => await result.current.login(testCaseCredentials));
    const outputAfter = result.current.user;

    expect(outputBefore).toBeNull();
    expect(outputAfter).not.toBeNull();
    expect(outputAfter.username).toEqual(expectedAfter);
    expect(authService.login).toHaveBeenCalledWith(testCaseCredentials);
  });

  it("debería quitar del contexto al usuario al deslogearse", async () => {
    const testCaseUser = mockAdminUser;
    const expectedBefore = mockAdminUser.username;
    const expectedAfter = null;
    const expectedLogoutCalls = 1;

    vi.mocked(authService.getCurrentUser).mockReturnValue(testCaseUser);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const outputBefore = result.current.user;

    await act(async () => await result.current.logout());
    const outputAfter = result.current.user;

    expect(outputBefore).not.toBeNull();
    expect(outputBefore.username).toEqual(expectedBefore);
    expect(outputAfter).toBe(expectedAfter);
    expect(authService.logout).toHaveBeenCalledTimes(expectedLogoutCalls);
  });

  it("debería propagar excepciones y setear a null si hay un error de logeo", async () => {
    const testCaseCredentials = { email: "falso@correo.cl", password: "mock" };
    const testCaseError = { status: 401, error: "Unauthorized" };
    const expected = testCaseError.status;
    const expectedUser = null;
    const expectedLoginCalls = 1;

    vi.mocked(authService.getCurrentUser).mockReturnValue(null);
    vi.mocked(authService.login).mockRejectedValue(testCaseError);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    const outputBefore = result.current.user;

    let output = null;
    try {
      await act(async () => await result.current.login(testCaseCredentials));
    } catch (err) {
      output = err;
    }
    const outputUser = result.current.user;

    expect(outputBefore).toBeNull();
    expect(output).not.toBeNull();
    expect(output.status).toEqual(expected);
    expect(outputUser).toBe(expectedUser);
    expect(authService.login).toHaveBeenCalledTimes(expectedLoginCalls);
  });
});
