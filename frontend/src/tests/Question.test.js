import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Question from "../components/Question";

// Mock input question
const mockQuestionInput = {
  id: 1,
  title: "What is your full name?",
  fields: [
    {
      element: "input",
      type: "text",
      placeholder: "e.g John Smith",
    },
  ],
};

// Mock select question
const mockQuestionSelect = {
  id: 2,
  title: "What is your favourite color?",
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
  const mockOnChange = jest.fn();

  test("renders input fields for first and last name with correct attributes", () => {
    render(<Question question={mockQuestionInput} onChange={mockOnChange} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/What is your full name?/i);
    expect(titleElement).toBeInTheDocument();

    // Check first name input field is rendered with correct placeholder
    const firstNameInputElement = screen.getByPlaceholderText(/e.g John/i);
    expect(firstNameInputElement).toBeInTheDocument();
    expect(firstNameInputElement).toHaveAttribute("type", "text");
    expect(firstNameInputElement).toHaveAttribute("id", "field-1-0-first");
    expect(firstNameInputElement).toHaveAttribute("name", "field-1-0-first");

    // Check last name input field is rendered with the correct placeholder
    const lastNameInputElement = screen.getByPlaceholderText(/Smith/i);
    expect(lastNameInputElement).toBeInTheDocument();
    expect(lastNameInputElement).toHaveAttribute("type", "text");
    expect(lastNameInputElement).toHaveAttribute("id", "field-1-0-last");
    expect(lastNameInputElement).toHaveAttribute("name", "field-1-0-last");
  });

  test("renders select field with correct options", () => {
    render(<Question question={mockQuestionSelect} onChange={mockOnChange} />);

    // Check title is rendered
    const titleElement = screen.getByText(/What is your favourite color?/i);
    expect(titleElement).toBeInTheDocument();

    // Open dropdown
    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);
    fireEvent.keyDown(selectElement, { key: "ArrowDown", code: 40 });

    // Check options are rendered after opening the dropdown
    const optionRed = screen.getByText(/Red/i);
    const optionGreen = screen.getByText(/Green/i);
    const optionBlue = screen.getByText(/Blue/i);

    expect(optionRed).toBeInTheDocument();
    expect(optionGreen).toBeInTheDocument();
    expect(optionBlue).toBeInTheDocument();
  });

  test("handles missing fields", () => {
    render(
      <Question
        question={{ id: 3, title: "No fields question", fields: [] }}
        onChange={mockOnChange}
      />
    );

    // Check title is rendered
    const titleElement = screen.getByText(/No fields question/i);
    expect(titleElement).toBeInTheDocument();

    // no input or select elements rendered
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});
