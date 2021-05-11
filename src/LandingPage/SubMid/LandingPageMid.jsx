import React, { useState } from "react";
import "./LandingPageMid.scss";
import { ElButton } from "../../Shared/Button/Button.jsx";

export const LandingPageMid = () => {
  const info = [
    {
      imgSrc: "./LandingPage/LandingPageMid1.png",
      orderName: "1. Photos",
      text: "Use your smart phone to take and upload photos of key factors that impact emergy performance",
    },
    {
      imgSrc: "./LandingPage/LandingPageMid2.png",
      orderName: "2. Grades",
      text: "Receive analysis of your house with grades on building efficiency and electrification",
    },
    {
      imgSrc: "./LandingPage/LandingPageMid3.png",
      orderName: "3. Plan",
      text: "Plan for upgrades, before emergencies, and stay up to date on incentives and rebates",
    },
  ];

  const mql = window.matchMedia("(max-width: 800px)");
  console.log(mql.matches);

  const [mobileView, setMobieView] = useState(mql.matches);

  console.log({ mobileView });

  return (
    <div className="background pt-4 pb-4">
      <div className="container mt-5">
        <h2 className="text-center  pt-4">How It Works</h2>
        {info.map((el, i) => (
          <div
            key={i}
            className="row mt-5 mb-5 justify-content-center  align-items-center"
          >
            <div
              className={
                (mobileView ? " pt-2 pb-2 " : " ") +
                " col-md-1 offset-md-1 col-sm-12 "
              }
            >
              <img src={el.imgSrc} alt="Icon" className="m-auto" />
            </div>
            <h3
              className={
                mobileView
                  ? " text-center "
                  : "" + "  col-md-2 custom-big-text  col-sm-12"
              }
            >
              {el.orderName}
            </h3>
            <div
              className={
                mobileView ? "text-center " : "" + "   col-md col-sm-12 "
              }
            >
              <p>{el.text}</p>
            </div>
          </div>
        ))}
        <div className="row justify-content-center">
          {mql.matches ? (
            <ElButton link="/signup" text="sign up" customWidht={"85%"} />
          ) : (
            <ElButton link="/signup" text="sign up" customWidht={"28%"} />
          )}
        </div>
      </div>
    </div>
  );
};
