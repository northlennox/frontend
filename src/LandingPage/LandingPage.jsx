import React, { useState } from "react";
import { LandingPageTop } from "./SubTop/LandingPageTop";
import { LandingPageMid } from "./SubMid/LandingPageMid";
import { LandingPageBot } from "./SubBot/LandingPageBot";
import { LandingPageLast } from "./SubLast/LandingPageLast";

export const LandingPage = () => {
  let mql = window.matchMedia("(max-width: 600px)");
  const [mobileView, setMobileView] = useState(mql.matches);

  console.log(mql);

  mql.addEventListener("change", (e) => {
    setMobileView(e.matches);
  });

  if (mobileView) {
    return <LandingPageMid />;
  } else {
    return (
      <>
        <LandingPageTop /> <LandingPageMid /> <LandingPageBot />
        <LandingPageLast />
      </>
    );
  }
};
