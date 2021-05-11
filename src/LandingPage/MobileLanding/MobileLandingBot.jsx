import React from "react";

export const MobileLandingBot = () => {
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
      customPicClass: "pl-5",
    },
    {
      imgSrc: "./LandingPage/ElectricasaDownArrow.svg",
      p1Text: "",
      p2Text: "",
      liText: [],
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
    },
  ];

  return (
    <div className="container pt-4 pb-4">
      <h3 className="text-center">The Change You Can Achieve </h3>
      {info.map((el, i) => (
        <div key={i} className="col pt-4 pl-4 pr-4">
          <div className="row justify-content-center pt-2 pb-2">
            <img
              className={"custom-small-img " + el.customPicClass}
              src={el.imgSrc}
              alt="House"
            />
          </div>
          {el.p1Text ? (
            <div className="row justify-content-center pt-2 pb-2">
              <p>{el.p1Text}</p>
            </div>
          ) : null}
          {el.p2Text ? (
            <div className="row justify-content-center pt-2 pb-2">
              <p>{el.p2Text}</p>
              <ul>
                {el.liText.length > 0
                  ? el.liText.map((text, i) => <li key={i}> {text} </li>)
                  : null}
              </ul>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
