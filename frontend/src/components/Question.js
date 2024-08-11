import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.375rem",
    backgroundColor: state.isFocused ? "#ffffff" : "#e6f0fa",
    border: "0.06rem solid #a4c8e0",
    boxShadow: state.isFocused
      ? "0 0 0 0.25rem rgba(0, 116, 217, 0.25)"
      : "inset 0 0.06rem 0.2rem rgba(0, 0, 0, 0.1)",
    padding: "0.625rem",
    cursor: "pointer",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#1a3d6e",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isHovered ? "#0e4a8e" : provided.color,
    ":hover": {
      color: "#0e4a8e",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000000",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e6f0fa" : "#ffffff",
    color: "#1a3d6e",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#1a3d6e",
      color: "#ffffff",
    },
  }),
};

const Question = ({ question, onChange }) => {
  if (!question || !question.fields) {
    return null;
  }

  const renderInputFields = (field, index, inputId, inputName) => {
    const titleLowerCase = question.title.toLowerCase();
    if (
      titleLowerCase.includes("your name") ||
      titleLowerCase.includes("full name")
    ) {
      const [firstNamePlaceholder, lastNamePlaceholder] = field.placeholder
        ? field.placeholder.split(" ").length >= 3
          ? [
              field.placeholder.split(" ").slice(0, 2).join(" "),
              field.placeholder.split(" ").slice(2).join(" "),
            ]
          : ["e.g. First Name", "Last Name"]
        : ["e.g. First Name", "Last Name"];

      return (
        <div key={index} className="form-group name-fields">
          <div className="first-name-container">
            <label htmlFor={`${inputId}-first`}>First Name</label>
            <input
              id={`${inputId}-first`}
              name={`${inputName}-first`}
              type={field.type}
              className="form-control"
              placeholder={firstNamePlaceholder}
              onChange={onChange}
              aria-label="First Name"
              required
            />
          </div>
          <div className="last-name-container">
            <label htmlFor={`${inputId}-last`}>Last Name</label>
            <input
              id={`${inputId}-last`}
              name={`${inputName}-last`}
              type={field.type}
              className="form-control"
              placeholder={lastNamePlaceholder}
              onChange={onChange}
              aria-label="Last Name"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className="form-group">
          <input
            id={inputId}
            name={inputName}
            type={field.type}
            className="form-control"
            placeholder={field.placeholder}
            onChange={onChange}
            aria-label={field.placeholder}
          />
        </div>
      );
    }
  };

  return (
    <div className="question-container">
      <h2 className="question-title">{question.title}</h2>
      <div className="question-description">{question.description}</div>
      <div className="question-fields">
        {question.fields.map((field, index) => {
          const inputId = `field-${question.id}-${index}`;
          const inputName = `field-${question.id}-${index}`;

          if (field.element === "input") {
            return renderInputFields(field, index, inputId, inputName);
          } else if (field.element === "select") {
            const options = field.options.map((option) => ({
              value: option.value,
              label: option.label,
            }));

            return (
              <div key={index} className="form-group">
                <Select
                  id={inputId}
                  name={inputName}
                  options={options}
                  onChange={(selectedOption) =>
                    onChange({
                      target: {
                        name: inputName,
                        value: selectedOption?.value || "",
                      },
                    })
                  }
                  placeholder={field.placeholder}
                  aria-label={field.placeholder}
                  isClearable={true}
                  styles={customStyles}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        element: PropTypes.oneOf(["input", "select"]).isRequired,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Question;
