import React from "react";
import { ElButton } from "../../../Shared/Button/Button.jsx";

export const LastSubContainer = ({ header, text, buttonText, btnDisabled }) => {
  return (
    <div className="col-3 mt-4 text-center">
      <div className="row ">
        <div className="card justify-content-center  align-items-center">
          <div className="card-body">
            <h3 className="card-title">{header}</h3>
            <p className="card-text">{text}</p>
          </div>
          <ElButton
            text={buttonText}
            disabled={btnDisabled}
            customWidht={"75%"}
          />
        </div>
      </div>
    </div>
  );
};
