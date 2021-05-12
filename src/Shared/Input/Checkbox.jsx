import React from "react";

export const ElCheckbox = ({ options }) => (
  <div className="form-check pt-1 ">
    <input
      onClick={options.handleClick}
      type="checkbox"
      className="form-check-input"
      id={options.id}
      name={options.name}
    />
    <label className="form-check-label" htmlFor={options.id}>
      {options.text}
    </label>
  </div>
);
