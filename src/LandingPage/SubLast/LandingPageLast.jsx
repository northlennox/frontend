import React from "react";

import { LastSubContainer } from "./LastSubContainer/LastSubContainer";

export const LandingPageLast = () => {
  const info = [
    {
      header: "DIY",
      text:
        " Use your phone to collect the data for your house. Usually in 20 minutes ",
      buttonText: "SIGN UP",
    },
    {
      header: "Ask a Realtor  ",
      text:
        " Energy grades are useful for house buying and selling. Realtors can often handle it",
      buttonText: "COMING SOON",
      btnDisabled: true,
    },
    {
      header: "Have Us Help",
      text:
        "Depending on your location, Electricasa can do the analysis for you ",
      buttonText: "CONTACT US",
    },
  ];

  const containers = info.map((el) => (
    <LastSubContainer
      header={el.header}
      text={el.text}
      buttonText={el.buttonText}
      btnDisabled={el.btnDisabled}
    />
  ));

  return (
    <div className="background ">
      <div className="container   ">
        <h2 className="text-center pt-5">How To Get It</h2>
        <div className="row  justify-content-around">{containers}</div>
      </div>
    </div>
  );
};
