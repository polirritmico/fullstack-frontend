import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchBar from ".";

describe("SearchBar", () => {
  const placeholderText = "BuscarTest";

  it("renders with placeholder", () => {
    render(
      <SearchBar
        placeholder={placeholderText}
        search=""
        onSearchChange={() => {}}
      />,
    );
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  it("calls onSearchChange on input", () => {
    const handleSearch = vi.fn();

    render(
      <SearchBar
        placeholder={placeholderText}
        search=""
        onSearchChange={handleSearch}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(placeholderText), {
      target: { value: "abc" },
    });

    expect(handleSearch).toHaveBeenCalledWith("abc");
  });

  it("shows controlled value", () => {
    render(
      <SearchBar
        placeholder={placeholderText}
        search="texto"
        onSearchChange={() => {}}
      />,
    );
    expect(screen.getByDisplayValue("texto")).toBeInTheDocument();
  });
});
