import React from "react";
import { Link } from "react-router-dom";

import "../Button/Button.scss";
export const ElButton = ({
  text,
  link = "#",
  disabled,
  classes,
  customWidht = "100%",
}) => {
  let extraClasses = disabled ? "disabled" : "";
  const buttonWidth = { width: customWidht };

  return (
    <Link
      to={link}
      className={
        "custom btn btn-success  text-uppercase mb-4 pb-2 " + extraClasses
      }
      style={buttonWidth}
      disabled={disabled}
    >
      {text}
    </Link>
  );
};
