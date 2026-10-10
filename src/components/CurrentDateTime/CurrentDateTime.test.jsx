import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CurrentDateTime from ".";

describe("DurrentDateTime tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debería retornar el tiempo actual con el formato correcto", async () => {
    const test_case = "2026-09-25T21:12:00-03:00";
    const expected = "25 sept 2026, 21:12";

    vi.setSystemTime(new Date(test_case));
    render(<CurrentDateTime />);

    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
