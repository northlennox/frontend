import React from "react";
import "./LandingPageMid.scss";
import { ElButton } from "../../Shared/Button/Button.jsx";
import { MidSubComponent } from "./MidSubComponents/MidSubComponents.jsx";
const imgSrc = "";

export const LandingPageMid = () => {
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

  const compoents = info.map((el, i) => (
    <MidSubComponent
      key={i}
      imgSrc={el.imgSrc}
      orderName={el.orderName}
      text={el.text}
    />
  ));

  return (
    <div className="background">
      <div className="container mt-5">
        <h2 className="text-center font-weight-bold pt-4">How It Works</h2>
        {compoents}
        <div className="row justify-content-center">
          <ElButton link="/login" text="sign up" customWidht={"28%"} />
        </div>
      </div>
    </div>
  );
};
