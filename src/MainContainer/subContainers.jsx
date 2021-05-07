import React from "react";
import { Link } from "react-router-dom";
import "./subContainer.scss";

function SubContainer({ imgSrc, h1Text, divText, btn, order }) {
  let phoneOreder = "col-md-6 col-sm-12";
  let textOrder = "col-md-6 col-sm-12 align-self-center text-center no-gutters";

  if (order && !btn) {
    console.log(order, h1Text);
    phoneOreder += " order-md-12";
    textOrder += " order-md-1";
  } else if (!order && !btn) {
    console.log(order, h1Text);

    textOrder += " order-md-12";
    phoneOreder += " order-md-1";
  }

  return (
    <div className="row m-3">
      <div className={phoneOreder}>
        <img src={imgSrc} />
      </div>
      <div className={textOrder}>
        <h5 className="font-weight-bold mt-2 mb-2">{h1Text}</h5>
        <div id="text">{divText}</div>
        {btn && (
          <div id="btn">
            <Link to="/login" className="linkBtn">
              SIGN UP
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubContainer;
