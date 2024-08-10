import React from "react";
import { render, screen } from "@testing-library/react";
import Question from "./Question";

const mockQuestionInput = {
  id: 1,
  title: "What is your name?",
  fields: [
    {
      element: "input",
      type: "text",
      placeholder: "e.g John Smith",
    },
  ],
};

const mockQuestionSelect = {
  id: 2,
  title: "What is your favorite color?",
  fields: [
    {
      element: "select",
      placeholder: "Select a color",
      options: [
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
      ],
    },
  ],
};

describe("Question Component", () => {
  test("renders input field with correct attributes", () => {
    render(<Question question={mockQuestionInput} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/What is your name?/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the input field is rendered with the correct placeholder
    const inputElement = screen.getByPlaceholderText(/e.g John Smith/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("id", "field-1-0");
    expect(inputElement).toHaveAttribute("name", "field-1-0");
  });

  test("renders select field with correct options", () => {
    render(<Question question={mockQuestionSelect} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/What is your favorite color?/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the select field is rendered with the correct placeholder
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute("id", "field-2-0");
    expect(selectElement).toHaveAttribute("name", "field-2-0");

    // Check if the placeholder option is rendered and selected by default
    const placeholderOption = screen.getByText(/Select a color/i);
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toBeDisabled();
    expect(selectElement.value).toBe("");

    // Check if all options are rendered correctly
    const optionRed = screen.getByText(/Red/i);
    const optionGreen = screen.getByText(/Green/i);
    const optionBlue = screen.getByText(/Blue/i);

    expect(optionRed).toBeInTheDocument();
    expect(optionGreen).toBeInTheDocument();
    expect(optionBlue).toBeInTheDocument();
  });
});
