import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // Or from 'jest' if you use Jest
import ResultDisplay from "./ResultDisplay";

describe("ResultDisplay Component", () => {
  it("renders parsed result and AST when success is true", () => {
    const mockResultData = {
      success: true,
      data: {
        result: 42,
        ast: { type: "number", value: 42 },
      },
    };

    render(<ResultDisplay resultData={mockResultData} />);

    expect(screen.getByText(/Parsed result:/i)).toBeInTheDocument();
    expect(
      screen.getByText(mockResultData.data.result.toString())
    ).toBeInTheDocument();

    expect(screen.getByText(/Abstract Syntax Tree:/i)).toBeInTheDocument();

    // Instead of matching entire JSON string, match a key-value pair inside the AST JSON:
    expect(screen.getByText(/"type": "number"/i)).toBeInTheDocument();
    expect(screen.getByText(/"value": 42/)).toBeInTheDocument();
  });

  it("renders error message when success is false", () => {
    const mockResultData = {
      success: false,
      error: "Invalid expression",
    };

    render(<ResultDisplay resultData={mockResultData} />);

    // Check for error message text
    expect(screen.getByText(/Error: Invalid expression/i)).toBeInTheDocument();
  });
});
