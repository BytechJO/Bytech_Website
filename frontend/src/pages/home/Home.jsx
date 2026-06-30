import HeroSection from "./HeroSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ProcessSection from "./ProcessSection.jsx";
import CtaSection from "./CtaSection.jsx";
import Ticker from "../../components/Ticker.jsx";
import PartnersSection from "./PartnersSection.jsx";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Bytech — Build. Launch. Grow.";
  }, []);
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
