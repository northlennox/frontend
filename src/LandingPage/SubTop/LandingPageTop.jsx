import React from "react";
import "./LandingPageTop.scss";
import { ElButton } from "../../Shared/Button/Button.jsx";

export const LandingPageTop = () => {
  const imgSrc = "./LandingPage/LandingTopPic.png";

  return (
    <div className="container mt-5 pb-4">
      <div className="row top mt-3 mb-5 justify-content-start">
        Your Home Electrification Advisor
      </div>
      <div className="row align-items-center  justify-content-center">
        <div className="col ">
          <p>
            Electricasa is an app to help homeowners understand their <br />
            energy assets by uploading photos and getting an <br />
            actionable plan for electrification
          </p>
          <div className=" row mt-5 justify-content-center align-items-center">
            <ElButton link="/signup" text="sign up" customWidht={"55%"} />
          </div>
        </div>
        <div className="col">
          <img src={imgSrc} alt="Picture of a House" />
        </div>
      </div>
    </div>
  );
};
