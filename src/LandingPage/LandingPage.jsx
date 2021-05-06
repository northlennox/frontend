import React from "react";
import { LandingPageTop } from "./SubTop/LandingPageTop";
import { LandingPageMid } from "./SubMid/LandingPageMid";
import { LandingPageBot } from "./SubBot/LandingPageBot";
import { LandingPageLast } from "./SubLast/LandingPageLast";

export const LandingPage = () => {
  return (
    <>
      <LandingPageTop /> <LandingPageMid /> <LandingPageBot />
      <LandingPageLast />
    </>
  );
};
