import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import SubmitButton from ".";

describe("SubmitButton tests", () => {
  it("debería renderizar el texto por defecto cuando no está cargando", () => {
    const testCase = "Enviar";
    const expected = "Enviar";

    render(<SubmitButton defaultText={testCase} />);
    const output = screen.getByRole("button").textContent;

    expect(output).toEqual(expected);
  });

  it("debería usar el type y className por defecto", () => {
    const testCase = "Enviar";
    const expectedType = "button";
    const expectedClassName = "btn btn-primary";

    render(<SubmitButton defaultText={testCase} />);
    const output = screen.getByRole("button");

    expect(output).toHaveAttribute("type", expectedType);
    expect(output).toHaveClass(expectedClassName);
  });

  it("debería respetar el type y className provistos", () => {
    const testCase = { type: "submit", className: "btn btn-secondary" };
    const expectedType = "submit";
    const expectedClassName = "btn btn-secondary";

    render(
      <SubmitButton
        defaultText="Enviar"
        type={testCase.type}
        className={testCase.className}
      />,
    );
    const output = screen.getByRole("button");

    expect(output).toHaveAttribute("type", expectedType);
    expect(output).toHaveClass(expectedClassName);
  });

  it("debería deshabilitar el botón cuando isDisabled es true", () => {
    const testCase = true;
    const expected = true;

    render(<SubmitButton defaultText="Enviar" isDisabled={testCase} />);
    const output = screen.getByRole("button").disabled;

    expect(output).toEqual(expected);
  });

  it("debería mostrar el texto de trabajo y deshabilitar cuando está cargando", () => {
    const testCase = {
      defaultText: "Enviar",
      workingText: "Guardando…",
      isLoading: true,
    };
    const expectedText = "Guardando…";
    const expectedDisabled = true;

    render(
      <SubmitButton
        defaultText={testCase.defaultText}
        workingText={testCase.workingText}
        isLoading={testCase.isLoading}
      />,
    );
    const output = screen.getByRole("button");
    const outputStatus = screen.getByRole("status").textContent;

    expect(output.disabled).toEqual(expectedDisabled);
    expect(outputStatus).toEqual(expectedText);
    expect(screen.queryByText(testCase.defaultText)).not.toBeInTheDocument();
  });

  it("debería mostrar 'Cargando…' por defecto mientras está cargando", () => {
    const testCase = true;
    const expected = "Cargando…";

    render(<SubmitButton defaultText="Enviar" isLoading={testCase} />);
    const output = screen.getByRole("status").textContent;

    expect(output).toEqual(expected);
  });

  it("debería ocultar el spinner a los lectores de pantalla", () => {
    const testCase = true;
    const expected = "true";

    const { container } = render(
      <SubmitButton defaultText="Enviar" isLoading={testCase} />,
    );
    const output = container.querySelector(".spinner-border");

    expect(output).toHaveAttribute("aria-hidden", expected);
  });

  it("no debería mostrar el spinner cuando no está cargando", () => {
    const testCase = false;
    const expected = null;

    const { container } = render(
      <SubmitButton defaultText="Enviar" isLoading={testCase} />,
    );
    const output = container.querySelector(".spinner-border");

    expect(output).toBe(expected);
  });
});
