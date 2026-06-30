import { useEffect } from "react";
import EducationAiSection from "./EducationAiSection";
import EducationHero from "./EducationHero";
import EducationInteractiveSection from "./EducationInteractiveSection";
import EducationLmsSection from "./EducationLmsSection";

export default function Education() {
  useEffect(() => {
    document.title = "Education — Bytech";
  }, []);
  return (
    <>
      <EducationHero />
      <EducationLmsSection />
      <EducationInteractiveSection />
      <EducationAiSection />
    </>
  );
}
