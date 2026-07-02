import { useEffect } from "react";

import HeroSection from "./HeroSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ProcessSection from "./ProcessSection.jsx";
import CtaSection from "./CtaSection.jsx";
import Ticker from "../../components/Ticker.jsx";
import PartnersSection from "./PartnersSection.jsx";

import { useGetPublicCmsPage } from "../../api/cmsPages.js";
import HomeDynemic from "../HomeDynemic/HomeDynemic.jsx";

function hasHomeContent(content) {
  return (
    content && typeof content === "object" && Object.keys(content).length > 0
  );
}

export default function Home() {
  const { page, loading, error } = useGetPublicCmsPage("home");

  const content = page?.content || {};
  const shouldUseDynamicHome =
    !loading && !error && page && hasHomeContent(content);

  useEffect(() => {
    document.title = "Bytech — Build. Launch. Grow.";
  }, []);

  if (shouldUseDynamicHome) {
    return <HomeDynemic/>;
  }

  return (
    <main className="home-page relative overflow-x-hidden text-white">
      <HeroSection />
      <PartnersSection />
      <Ticker />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <CtaSection />
    </main>
  );
}
