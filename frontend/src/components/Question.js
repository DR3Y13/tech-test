import React from "react";
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
  placeholder: (provided) => ({
    ...provided,
    color: "#000000",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    boxShadow: "0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    border: "0.125rem solid #a4c8e0",
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

  const renderInputFields = (field, index) => {
    const inputId = `field-${question.id}-${index}`;
    const inputName = `field-${question.id}-${index}`;
    const titleLowerCase = question.title.toLowerCase();
    if (
      titleLowerCase.includes("your name") ||
      titleLowerCase.includes("full name")
    ) {
      let firstNamePlaceholder = "e.g. First Name";
      let lastNamePlaceholder = "Last Name";

      if (field.placeholder) {
        const nameParts = field.placeholder.split(" ");
        if (nameParts.length >= 3) {
          firstNamePlaceholder = `${nameParts[0]} ${nameParts[1]}`;
          lastNamePlaceholder = nameParts.slice(2).join(" ");
        }
      }

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
            return renderInputFields(field, index);
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
                  onChange={(selectedOption) => {
                    onChange({
                      target: {
                        name: inputName,
                        value: selectedOption ? selectedOption.value : "",
                      },
                    });
                  }}
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

export default Question;
