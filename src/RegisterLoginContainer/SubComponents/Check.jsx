import React from "react";

export const ElCheck = ({ text, id }) => {
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id={id} />
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
    </div>
  );
};
