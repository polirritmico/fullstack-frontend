import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ModalSubmitButton from ".";

describe("ModalSubmitButton", () => {
  it("debería mostrar el texto y el ícono cuando no está enviando", () => {
    const testCase = { text: "Guardar", icon: "bi bi-floppy" };
    const expectedAttribute = ["aria-busy", "false"];
    const expectedContent = ".bi-floppy";

    render(
      <ModalSubmitButton icon={testCase.icon}>
        {testCase.text}
      </ModalSubmitButton>,
    );

    const button = screen.getByRole("button", { name: testCase.text });

    expect(button).toBeEnabled();
    expect(button).toHaveAttribute(...expectedAttribute);
    expect(button.querySelector(expectedContent)).toBeInTheDocument();
  });

  it("debería mostrar un spinner y deshabilitar mientras está enviando", () => {
    const testCase = { text: "Guardar", icon: "bi bi-floppy" };
    const expectedSpinner = ".spinner-border";
    const expectedAria = ["aria-busy", "true"];
    const expectedIcon = testCase.icon;

    render(
      <ModalSubmitButton icon={testCase.icon} isSubmitting>
        {testCase.text}
      </ModalSubmitButton>,
    );
    const button = screen.getByRole("button", { name: testCase.text });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute(...expectedAria);
    expect(button.querySelector(expectedSpinner)).toBeInTheDocument();
    expect(button.querySelector(expectedIcon)).not.toBeInTheDocument();
  });

  it("no debería renderizar ícono cuando no se proporciona uno", () => {
    const testCase = <ModalSubmitButton>Guardar</ModalSubmitButton>;
    const expected = "i";

    render(testCase);
    const button = screen.getByRole("button", { name: "Guardar" });

    expect(button.querySelector(expected)).not.toBeInTheDocument();
  });

  it("debería respetar la prop disabled", () => {
    const testCase = <ModalSubmitButton disabled>Guardar</ModalSubmitButton>;
    const expected = { name: "Guardar" };

    render(testCase);

    expect(screen.getByRole("button", expected)).toBeDisabled();
  });

  it("debería pasar las props adicionales al botón", () => {
    const testCase = (
      <ModalSubmitButton type="submit" form="test-form" variant="danger">
        TestCase
      </ModalSubmitButton>
    );
    const expectedButton = { name: "TestCase" };
    const expectedType = "submit";
    const expectedForm = "test-form";
    const expectedClass = "btn-danger";

    render(testCase);
    const button = screen.getByRole("button", expectedButton);

    expect(button).toHaveAttribute("type", expectedType);
    expect(button).toHaveAttribute("form", expectedForm);
    expect(button).toHaveClass(expectedClass);
  });
});
