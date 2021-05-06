import React from "react";

export const BotSubComponent = ({ p1Text, p2Text, liText, colSize }) => {
  const liComponents =
    liText.length > 0
      ? liText.map((text, i) => <li key={i}> {text} </li>)
      : null;

  return (
    <div className={"col-" + colSize + " pt-4"}>
      <div className="row">
        <p>{p1Text}</p>
      </div>
      <div className="row">
        <p>{p2Text}</p>
        <ul>{liComponents}</ul>
      </div>
    </div>
  );
};
