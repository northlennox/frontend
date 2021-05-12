import React from "react";
import { Link } from "react-router-dom";

import "../Button/Button.scss";
export const ElLink = (options) => {
  console.log(options);
  options = options ? options : {};

  const buttonWidth = { width: options.customWidht || "100%" };

  return (
    <Link
      to={options.link || "#"}
      className={
        "custom btn btn-success  text-uppercase mb-4 pb-2 " +
          options.extraClasses || ""
      }
      style={buttonWidth}
      disabled={options.disabled || null}
    >
      {options.text || "NO TEXT GIVEN"}
    </Link>
  );
};

export const ElButton = (options) => {
  options = options ? options : {};
  const buttonWidth = { width: options.customWidht || "100%" };

  return (
    <button
      className={
        "custom btn btn-success  text-uppercase mb-4 pb-2 " +
          options.extraClasses || ""
      }
      style={buttonWidth}
      disabled={options.disabled || null}
      type={options.type || "button"}
    >
      {options.text || "NO TEXT GIVEN"}
    </button>
  );
};
