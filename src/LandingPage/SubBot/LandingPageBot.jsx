import React from "react";
import "./LandingPageBot.scss";

export const LandingPageBot = () => {
  const mql = window.matchMedia("(max-width: 700px)");

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

  //  align-items-center
  // justify-content-end

  return (
    <div className="container pt-4 pb-4">
      <h2 className="text-center pb-4">The Change You Can Achieve</h2>
      <div
        className="row  align-items-center
        justify-content-around pt-4 "
      >
        <div className="col-md-4  ">
          <img
            className="offset-3 custom-small-img "
            src={info[0].imgSrc}
            alt="House"
          />
        </div>

        <div className="col-md-2 ">
          <img src={info[1].imgSrc} alt="Arrow" />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-4  ">
          <img src={info[2].imgSrc} className="custom-small-img" alt="House" />
        </div>
        {info.map((el, i) => (
          <div key={i} className={"col-md-" + el.colSize + " pt-4"}>
            <div className="">
              <p>{el.p1Text}</p>
            </div>
            <div className="">
              <p>{el.p2Text}</p>
              <ul>
                {el.liText.length > 0
                  ? el.liText.map((text, i) => <li key={i}> {text} </li>)
                  : null}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
