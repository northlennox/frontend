import React from "react";
import "./MidSubComponent.scss";

export const MidSubComponent = ({ imgSrc, orderName, text }) => {
  return (
    <div className="row mt-5 mb-5 justify-content-center  align-items-center">
      <div className="col-1 offset-1">
        <img src={imgSrc} alt="Icon" />
      </div>
      <div className="col-2 custom-big-text justify-self-start">
        {orderName}
      </div>
      <div className="col custom-small-text">{text}</div>
    </div>
  );
};
