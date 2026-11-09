import { beforeEach, describe, expect, it } from "vitest";

import { readSession, storeSession } from "@/services/utils/session";

const STORAGE_KEY = "jKiltro-session";

describe("session tests", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("debería devolver null y borrar la sesión si está expirada", () => {
    const testCase = { token: "fake-token", exp: Date.now() - 1 };
    const expected = null;

    storeSession(testCase);
    const output = readSession();

    expect(output).toBe(expected);
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
