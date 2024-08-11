import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Question from "../components/Question";

// Mock data for an input question
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

// Mock data for a select question
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
  test("renders input fields for first and last name with correct attributes", () => {
    render(<Question question={mockQuestionInput} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/What is your name?/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the first name input field is rendered with the correct placeholder
    const firstNameInputElement = screen.getByPlaceholderText(/e.g John/i);
    expect(firstNameInputElement).toBeInTheDocument();
    expect(firstNameInputElement).toHaveAttribute("type", "text");
    expect(firstNameInputElement).toHaveAttribute("id", "field-1-0-first");
    expect(firstNameInputElement).toHaveAttribute("name", "field-1-0-first");

    // Check if the last name input field is rendered with the correct placeholder
    const lastNameInputElement = screen.getByPlaceholderText(/Smith/i);
    expect(lastNameInputElement).toBeInTheDocument();
    expect(lastNameInputElement).toHaveAttribute("type", "text");
    expect(lastNameInputElement).toHaveAttribute("id", "field-1-0-last");
    expect(lastNameInputElement).toHaveAttribute("name", "field-1-0-last");
  });

  test("renders select field with correct options", () => {
    render(<Question question={mockQuestionSelect} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/What is your favorite color?/i);
    expect(titleElement).toBeInTheDocument();

    // Open the dropdown
    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);
    fireEvent.keyDown(selectElement, { key: "ArrowDown", code: 40 });

    // Check if the options are rendered after opening the dropdown
    const optionRed = screen.getByText(/Red/i);
    const optionGreen = screen.getByText(/Green/i);
    const optionBlue = screen.getByText(/Blue/i);

    expect(optionRed).toBeInTheDocument();
    expect(optionGreen).toBeInTheDocument();
    expect(optionBlue).toBeInTheDocument();
  });

  test("handles missing fields", () => {
    render(
      <Question question={{ id: 3, title: "No fields question", fields: [] }} />
    );

    // Check if the title is rendered
    const titleElement = screen.getByText(/No fields question/i);
    expect(titleElement).toBeInTheDocument();

    // Ensure no input or select elements are rendered
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});
