import React from "react";
import { ElLink } from "../../Shared/Button/Button.jsx";
import "./LandingPageLast.scss";

export const LandingPageLast = () => {
  const info = [
    {
      header: "DIY",
      text: " Use your phone to collect the data for your house. Usually in 20 minutes ",
      buttonText: "SIGN UP",
      link: "/signup",
    },
    {
      header: "Ask a Realtor  ",
      text: " Energy grades are useful for house buying and selling. Realtors can often handle it",
      buttonText: "COMING SOON",
      btnDisabled: true,
      extraClasses: "custom-disabled",
    },
    {
      header: "Have Us Help",
      text: "Depending on your location, Electricasa can do the analysis for you ",
      buttonText: "CONTACT US",
    },
  ];

  const mql = window.matchMedia("(max-width: 700px)");

  return (
    <div className="background pt-4 pb-4 ">
      <h2 className="text-center pt-3 pb-3">How To Get It</h2>
      <div
        className={mql.matches ? " " : "row  pb-3 " + " justify-content-around"}
      >
        {info.map((el, i) => (
          <div
            key={i}
            className={
              mql.matches
                ? "mt-3 mb-3 pl-3 pr-3"
                : "" + " col-md-3 text-center col-sm-12 "
            }
          >
            <div className={" card align-items-center "}>
              <div className="card-body">
                <h3 className="card-title text-center">{el.header}</h3>
                <p className="card-text text-center">{el.text}</p>
              </div>
              <ElLink
                link={el.link ? el.link : "#"}
                text={el.buttonText}
                disabled={el.btnDisabled}
                customWidht={"55%"}
                extraClasses={el.extraClasses}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
