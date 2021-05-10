import React from "react";
import { ElButton } from "../../Shared/Button/Button.jsx";
import "./MobileLandingMid.scss";

export const MobileLandingMid = () => {
  const info = [
    {
      imgSrc: "./LandingPage/LandingPageMid1.png",
      orderName: "1. Photos",
      text:
        "Use your smart phone to take and upload photos of key factors that impact emergy performance",
    },
    {
      imgSrc: "./LandingPage/LandingPageMid2.png",
      orderName: "2. Grades",
      text:
        "Receive analysis of your house with grades on building efficiency and electrification",
    },
    {
      imgSrc: "./LandingPage/LandingPageMid3.png",
      orderName: "3. Plan",
      text:
        "Plan for upgrades, before emergencies, and stay up to date on incentives and rebates",
    },
  ];

  return (
    <div className="background">
      <div className="container">
        <h3 className="text-center">How It Works</h3>
        <div className="col"></div>
      </div>
    </div>
  );
};

const MobileMidSub = ({ imgSrc, orderName, text }) => {
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
