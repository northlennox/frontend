import React from "react";

export const MobileMidSub = ({ imgSrc, orderName, text }) => {
  return (
    <div className="col">
      <div className="row">
        <img src={imgSrc} alt="picture" />
      </div>
      <div className="row">
        <h4>{orderName}</h4>
      </div>
      <div className="row">
        <p>{text}</p>
      </div>
    </div>
  );
};
