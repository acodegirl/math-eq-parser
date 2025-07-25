// ParserInput.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Vitest imports for testing and mocking
import { describe, it, expect, vi, beforeEach } from "vitest";

import ParserInput from "./ParserInput";

// Mock the processMathExp API
vi.mock("../../api/parserApi", () => ({
  processMathExp: vi.fn(),
}));

import { processMathExp } from "../../api/parserApi";

describe("ParserInput component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // reset mock before each test
  });

  it("renders input and validate button", () => {
    render(<ParserInput />);
    expect(
      screen.getByPlaceholderText(/e\.g\. 2 \* \(3 \+ 4\) != 14/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /validate/i })).toBeEnabled();
  });

  it("allows typing in the input field", async () => {
    render(<ParserInput />);
    const input = screen.getByPlaceholderText(/e\.g\. 2 \* \(3 \+ 4\) != 14/i);
    await userEvent.type(input, "1 + 1 = 2");
    expect(input).toHaveValue("1 + 1 = 2");
  });

  it("renders the label for the input field", () => {
    render(<ParserInput />);
    const label = screen.getByLabelText(/enter your mathematical expression/i);
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe("input");
  });

  it("disables button and calls processMathExp on submit", async () => {
    processMathExp.mockResolvedValueOnce({ foo: "bar" });
    render(<ParserInput />);

    const input = screen.getByPlaceholderText(/e\.g\. 2 \* \(3 \+ 4\) != 14/i);
    const button = screen.getByRole("button", { name: /validate/i });

    await userEvent.type(input, "1 + 1 = 2");

    userEvent.click(button);

    // Wait until loading state activates
    await waitFor(() => {
      expect(button).toHaveTextContent(/validating/i);
      expect(button).toBeDisabled();
    });

    // Wait until after processMathExp resolves and loading ends
    await waitFor(() => {
      expect(button).toHaveTextContent(/validate/i);
      expect(button).toBeEnabled();
    });

    // Confirm processMathExp called with correct argument
    expect(processMathExp).toHaveBeenCalledWith("1 + 1 = 2");
  });
});
