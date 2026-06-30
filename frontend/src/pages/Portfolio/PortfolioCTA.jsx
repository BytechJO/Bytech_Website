import { Link } from "react-router-dom";

export default function PortfolioCTA() {
  return (
    <section className="px-6 py-[72px] text-center sm:px-10 lg:px-[60px]">
      <h2 className="portfolio-reveal text-[30px] font-black leading-[1.1] tracking-[-1.2px] text-white sm:text-[32px]">
        Ready to be our next success story?
      </h2>

      <p className="portfolio-reveal portfolio-delay-1 mx-auto mb-8 mt-4 max-w-[500px] text-sm leading-[1.75] text-white/50">
        Let&apos;s discuss your project and build something that makes an
        impact.
      </p>

      <div className="portfolio-reveal portfolio-delay-2 flex flex-wrap justify-center gap-3">
        <Link
          to="/contact"
          className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e06815]"
        >
          Start a Project →
        </Link>

        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/60 transition hover:border-white/20 hover:text-white"
        >
          View Services
        </Link>
      </div>
    </section>
  );
}