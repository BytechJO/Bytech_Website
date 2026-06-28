import { Link } from "react-router-dom";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-[#0e1c2e] pt-[108px]">
      <img
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&auto=format&fit=crop"
        alt="Services"
        className="h-[460px] w-full object-cover brightness-[0.35] saturate-[0.7]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,#0e1c2e_0%,rgba(14,28,46,0.4)_60%)]" />

      <div className="absolute bottom-0 left-0 right-0 px-6 py-[60px] lg:px-[60px]">
        <div className="mb-6 inline-flex items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-[14px] py-[6px]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#F57A24] shadow-[0_0_0_6px_rgba(245,122,36,0.08)] animate-[pulseDot_2s_infinite]" />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#F57A24]">
            What We Do
          </span>
        </div>

        <h1 className="mb-4 text-[42px] font-black leading-[1.05] tracking-[-2px] text-white sm:text-[58px]">
          Core{" "}
          <span className="bg-gradient-to-r from-[#F57A24] to-[#F9B307] bg-clip-text text-transparent">
            capabilities.
          </span>
        </h1>

        <p className="max-w-[580px] text-base leading-[1.75] text-white/50">
          Six integrated service lines — software, mobile, education, content,
          media, and growth — working together inside one professional delivery
          model.
        </p>
      </div>
    </section>
  );
}