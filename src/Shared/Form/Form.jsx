import React from "react";
import { ElInput } from "../Input/Input";
import { ElCheckbox } from "../Input/Checkbox";
import { ElButton } from "../Button/Button";

export const ElForm = ({ options }) => {
  if (!options) options = { options };
  return (
    <div className="row no-gutters justify-content-center  align-items-center mt-5 mb-5  ">
      <form
        className="bordered custom-width pl-3 pr-3"
        onSubmit={options.handleSubmit ? options.handleSubmit : () => {}}
      >
        {options.inputs
          ? options.inputs.map((el, i) => <ElInput options={el} key={i} />)
          : null}

        {options.checkboxes
          ? options.checkboxes.map((el, i) => (
              <ElCheckbox options={el} key={i} />
            ))
          : null}
        <div className="row  no-gutters justify-content-center  align-items-center">
          <ElButton
            extraClasses={
              (options.errors || false ? "disabled" : "") + " mt-2 pl-3 pr-3"
            }
            disabled={options.errors || false ? "disabled" : ""}
            text={options.submitButtonText || "No Text"}
            type="submit"
          />
        </div>
        {options.extraAfterSubmit ? options.extraAfterSubmit : null}
      </form>
    </div>
  );
};
