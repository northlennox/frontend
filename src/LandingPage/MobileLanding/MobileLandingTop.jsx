import React from "react";
import { ElButton } from "../../Shared/Button/Button";
import "./MobileLandingTop.scss";

export const MobileLandingTop = () => {
  return (
    <div className="container pl-4 pr-4">
      <h3 className="font-weight-bold ">Your Home Electrification Advisor</h3>
      <p className="pt-5">
        Electricasa is an app to help homeowners understand their enegry assets
        by uploading photos and getting an actionable plan for electrification
      </p>
      <div className="d-flex justify-content-center pt-5">
        <ElButton text={"SIGN UP"} />
      </div>
    </div>
  );
};
