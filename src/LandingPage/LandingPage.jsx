import React, { useState } from "react";
import { LandingPageTop } from "./SubTop/LandingPageTop";
import { LandingPageMid } from "./SubMid/LandingPageMid";
import { LandingPageBot } from "./SubBot/LandingPageBot";
import { LandingPageLast } from "./SubLast/LandingPageLast";

import { MobileLandingTop } from "./MobileLanding/MobileLandingTop";
import { MobileLandingMid } from "./MobileLanding/MobileLandingMid";

export const LandingPage = ({ mobileView }) => {
  if (mobileView)
    return (
      <>
        <MobileLandingTop /> , <MobileLandingMid />
      </>
    );
  return (
    <>
      <LandingPageTop /> <LandingPageMid /> <LandingPageBot />
      <LandingPageLast />
    </>
  );
};
