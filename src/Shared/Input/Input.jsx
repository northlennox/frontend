import React, { useState } from "react";
import "./input.scss";

export const ElInput = ({ options }) => {
  const [validationError, setValidationError] = useState(false);

  return (
    <div className="form-group  pt-1 ">
      <label htmlFor={options.id}>{options.text}</label>
      <input
        onChange={options.handleChange}
        onBlur={(e) => setValidationError(options.handleBlur(e))}
        name={options.id}
        type={options.type ? options.type : "text"}
        id={options.id}
        className={(validationError ? "border-danger " : "") + " form-control "}
        aria-describedby={options.errorId}
      />
      {validationError ? (
        <small id={options.errorId} className="form-text text-danger">
          <i className="bi bi-exclamation-circle"> </i>
          {options.errorText || "No Text Given"}
        </small>
      ) : null}
    </div>
  );
};
