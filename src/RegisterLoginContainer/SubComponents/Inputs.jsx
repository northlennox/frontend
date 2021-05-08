import React from "react";

export const ElInput = ({ text, type, des }) => {
  return (
    <div className="">
      <label for={text} className="form-label">
        {des}
      </label>
      <input
        type={type}
        className="form-control"
        id={text}
        aria-describedby={des}
      />
    </div>
  );
};
