import React from "react";
import { ElInput } from "../Input/Input";
import { ElCheckbox } from "../Input/Checkbox";
import { ElButton } from "../Button/Button";

export const ElForm = ({ options }) => {
  return (
    <div className="row no-gutters justify-content-center  align-items-center mt-5 mb-5  ">
      <form
        className="bordered custom-width pl-3 pr-3"
        onSubmit={options.handleSubmit}
      >
        {options.inputs.map((el, i) => (
          <ElInput options={el} key={i} />
        ))}

        {options.checkboxes.map((el, i) => (
          <ElCheckbox options={el} key={i} />
        ))}
        <div className="row  no-gutters justify-content-center  align-items-center">
          <ElButton
            extraClasses={
              (options.errors ? "disabled" : "") + " mt-2 pl-3 pr-3"
            }
            disabled={options.errors ? "disabled" : ""}
            text={options.submitButtonText || "No Text"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};
