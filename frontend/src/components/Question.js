import React from "react";

const Question = ({ question, onChange }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">{question.title}</div>
      <div className="card-body">
        {question.fields.map((field, index) => {
          const inputId = `field-${question.id}-${index}`;
          const inputName = `field-${question.id}-${index}`;

          if (field.element === "input") {
            return (
              <div key={index} className="form-group">
                <label htmlFor={inputId} />
                <input
                  id={inputId}
                  name={inputName}
                  type={field.type}
                  className="form-control"
                  placeholder={field.placeholder}
                  onChange={onChange}
                />
              </div>
            );
          } else if (field.element === "select") {
            return (
              <div key={index} className="form-group">
                <label htmlFor={inputId} />
                <select
                  id={inputId}
                  name={inputName}
                  className="form-control"
                  defaultValue=""
                  onChange={onChange}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
