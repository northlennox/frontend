import React from "react";
import "./LandingPageTop.scss";
import { ElLink } from "../../Shared/Button/Button.jsx";

export const LandingPageTop = () => {
  const imgSrc = "./LandingPage/LandingTopPic.png";

  return (
    <div className="container pt-4 pb-4 ">
      <div className=" top mt-4 mb-4 justify-content-start">
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
            <ElLink link="/signup" text="sign up" customWidht={"55%"} />
          </div>
        </div>
        <div className="col no-phone ">
          <img src={imgSrc} alt="Picture of a House" />
        </div>
      </div>
    </div>
  );
};
