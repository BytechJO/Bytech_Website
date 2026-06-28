import ServicesHero from "./ServicesHero.jsx";
import ServiceBlocks from "./ServiceBlocks.jsx";
import PricingSection from "./PricingSection.jsx";

export default function Services() {
  return (
    <main className="bg-[#0e1c2e] text-white">
      <ServicesHero />
      <ServiceBlocks />
      <PricingSection />
    </main>
  );
}
