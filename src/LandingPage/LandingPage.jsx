import React, { useState } from "react";
import Footer from "../Footer/index";
import { LandingPageTop } from "./SubTop/LandingPageTop";
import { LandingPageMid } from "./SubMid/LandingPageMid";
import { LandingPageBot } from "./SubBot/LandingPageBot";
import { LandingPageLast } from "./SubLast/LandingPageLast";

import { MobileLandingBot } from "./MobileLanding/MobileLandingBot";

import "./MobileLanding/MobileLanding.scss";

export const LandingPage = () => {
  const mql = window.matchMedia("(max-width: 700px)");

  const [mobileView, setMobileView] = useState(mql.matches);

  return (
    <>
      <LandingPageTop />
      <LandingPageMid />
      {mobileView ? <MobileLandingBot /> : <LandingPageBot />}
      <LandingPageLast />
      <Footer />
    </>
  );
};
