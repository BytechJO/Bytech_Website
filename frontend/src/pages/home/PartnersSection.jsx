import { Link } from "react-router-dom";

const partners = [
  {
    icon: "🎓",
    name: "PMAA Education",
    type: "Education Group",
    bg: "bg-[#F57A24]/[0.12]",
  },
  {
    icon: "📷",
    name: "AIM Ambition",
    type: "Digital Printing",
    bg: "bg-[#2F88C4]/[0.12]",
  },
  {
    icon: "📚",
    name: "Ruwad Al Hayah",
    type: "Educational Services",
    bg: "bg-[#6CC2E9]/[0.12]",
  },
  {
    icon: "🤖",
    name: "Mindful Kids",
    type: "EdTech Publishing",
    bg: "bg-[#F9B307]/[0.12]",
  },
  {
    icon: "🌹",
    name: "Al Oud Perfumes",
    type: "E-Commerce",
    bg: "bg-[#F57A24]/[0.12]",
  },
  {
    icon: "🏢",
    name: "Gulf Publishers",
    type: "Publishing",
    bg: "bg-[#2F88C4]/[0.12]",
  },
];

export default function PartnersSection() {
  return (
    <section className="border-b border-white/[0.07] bg-[#0e1c2e] px-6 py-8 text-white lg:px-[60px]">
      <div className="mb-[22px] flex items-center gap-4 text-center text-[10px] font-bold uppercase tracking-[2px] text-white/20 before:h-px before:flex-1 before:bg-white/[0.06] after:h-px after:flex-1 after:bg-white/[0.06]">
        Trusted by leading organizations
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {partners.map((partner) => (
          <Link
            key={partner.name}
            to="/portfolio"
            className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F57A24]/30 hover:bg-white/[0.06]"
          >
            <div
              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg text-[15px] ${partner.bg}`}
            >
              {partner.icon}
            </div>

            <div>
              <div className="text-[11px] font-bold leading-[1.3] text-white">
                {partner.name}
              </div>
              <div className="mt-0.5 text-[9px] text-white/30">
                {partner.type}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
