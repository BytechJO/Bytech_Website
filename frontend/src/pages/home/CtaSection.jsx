import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="relative mx-6 mb-[88px] overflow-hidden rounded-[22px] bg-[#0e1c2e] lg:mx-[60px]">
      <img
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop"
        alt="CTA"
        className="h-[300px] w-full object-cover brightness-[0.28] saturate-50"
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,122,36,0.35),rgba(14,28,46,0.88))]" />

      <div className="absolute inset-0 flex flex-col justify-center gap-8 p-6 md:flex-row md:items-center md:justify-between lg:p-[60px]">
        <div>
          <h2 className="mb-2 text-[30px] font-black leading-[1.1] tracking-[-1px] text-white md:text-[36px]">
            Ready to build
            <br />
            something great?
          </h2>

          <p className="text-sm text-white/50">
            Let's discuss your project and create solutions that drive real
            impact.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="inline-block rounded-lg border border-white/[0.18] bg-transparent px-[22px] py-2.5 text-[13px] font-semibold text-white/70 no-underline transition-all duration-200 hover:border-white/35 hover:text-white"
          >
            View Our Work
          </Link>

          <Link
            to="/contact"
            className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
