import HeroSection from "./HeroSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ProcessSection from "./ProcessSection.jsx";
import CtaSection from "./CtaSection.jsx";
import Ticker from "../../components/Ticker.jsx";
import PartnersSection from "./PartnersSection.jsx";

export default function Home() {
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
