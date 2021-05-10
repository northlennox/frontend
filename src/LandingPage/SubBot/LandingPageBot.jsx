import React from "react";
import { BotSubComponent } from "./BotSubComponents/BotSubComponent.jsx";
import "./LandingPageBot.scss";

export const LandingPageBot = () => {
  const info = [
    {
      imgSrc: "./LandingPage/House1.svg",
      p1Text:
        " Technologies in our lives have advanced, but many of our 74 million houses are still old, uncomfortable and dependent on fossil fuels. They produce 20% of carbon emissions today. ",
      p2Text: " The equipment in American houses includes:",
      liText: [
        "69 million furnaces (fossil fuels) ",
        " 63 million gas water heaters",
        "41 million gas ranges ",
        "19 million gas dryers ",
      ],
      colSize: "4",
    },

    {
      imgSrc: "./LandingPage/LandingPageBot2.png",
      p1Text: "",
      p2Text: "",
      liText: [],
      colSize: "3",
    },
    {
      imgSrc: "./LandingPage/House2.svg",
      p1Text: `New houses are all-electric and produce zero emissions. Existing houses can be retrofitted. 
        `,
      p2Text: `Electricasa will help you identify customized energy improvements and create a plan to switch to all-electric solutions for:
        `,
      liText: [
        `Heat pump heating and cooling`,
        `Heat pump water heating`,
        `Induction ranges`,
        `Heat pump drying`,
      ],
      colSize: "4",
    },
  ];

  const components = info.map((el, i) => (
    <BotSubComponent
      key={i}
      p1Text={el.p1Text}
      p2Text={el.p2Text}
      liText={el.liText}
      colSize={el.colSize}
    />
  ));
  //  align-items-center
  // justify-content-end

  return (
    <div className="container mt-5">
      <h2 className="text-center pb-4">The Change You Can Achieve</h2>
      <div
        className="row  align-items-center
        justify-content-around pt-4 "
      >
        <div className="col-4  ">
          <img
            className="offset-3 custom-small-img "
            src={info[0].imgSrc}
            alt="House"
          />
        </div>

        <div className="col-2 ">
          <img src={info[1].imgSrc} alt="Arrow" />
        </div>
        <div className="col-1"></div>
        <div className="col-4  ">
          <img src={info[2].imgSrc} className="custom-small-img" alt="House" />
        </div>
        {components}
      </div>
    </div>
  );
};
