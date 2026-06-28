import EducationAiSection from "./EducationAiSection";
import EducationHero from "./EducationHero";
import EducationInteractiveSection from "./EducationInteractiveSection";
import EducationLmsSection from "./EducationLmsSection";

export default function Education() {
  return (
    <>
      <EducationHero />
      <EducationLmsSection />
      <EducationInteractiveSection />
      <EducationAiSection />
    </>
  );
}
