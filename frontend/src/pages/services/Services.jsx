import { useEffect } from "react";
import { Loader2 } from "lucide-react";

import { useGetPublicCmsPage } from "../../api/cmsPages";

import ServicesHero from "./ServicesHero.jsx";
import ServiceBlocks from "./ServiceBlocks.jsx";
import PricingSection from "./PricingSection.jsx";

export default function Services() {
  const { content, loading, error } = useGetPublicCmsPage("services");

  useEffect(() => {
    document.title = "Services — Bytech";
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] text-white">
        <div className="flex items-center gap-3 text-white/45">
          <Loader2 size={22} className="animate-spin" />
          <span className="text-sm">Loading services...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] px-6 text-white">
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-200">
          Failed to load services page.
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] px-6 text-white">
        <div className="text-sm text-white/40">Services content not found.</div>
      </main>
    );
  }

  const hero = content?.hero || {};

  const serviceBlocks = Array.isArray(content?.serviceBlocks)
    ? content.serviceBlocks
    : [];

  const pricing = content?.pricing || {};

  return (
    <main className="bg-[#0e1c2e] text-white">
      <ServicesHero data={hero} />

      <ServiceBlocks data={serviceBlocks} />

      <PricingSection data={pricing} />
    </main>
  );
}
