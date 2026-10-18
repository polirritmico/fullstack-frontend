import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import BackButton from ".";
import { RouterTestWrapper } from "@/test/utils";

describe("BackButton tests", () => {
  it("debería navegar a la ruta previa en el historial al hacer click", async () => {
    const testCase = ["/antes", "/ahora"];
    const expected = "/antes";

    render(<RouterTestWrapper Component={BackButton} testRoutes={testCase} />);
    expect(screen.getByTestId("aqui").textContent).toBe(testCase.at(-1));
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("aqui").textContent).toBe(expected);
  });

  it("debería navegar a / al hacer click si no hay rutas en el historial", async () => {
    const testCase = ["/ahora"];
    const expected = "/";

    render(<RouterTestWrapper Component={BackButton} testRoutes={testCase} />);
    expect(screen.getByTestId("aqui").textContent).toBe(testCase[0]);
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("aqui").textContent).toBe(expected);
  });
});
