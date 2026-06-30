import { useEffect } from "react";
import PortfolioHero from "./PortfolioHero";
import PortfolioProjects from "./PortfolioProjects";
import PortfolioCTA from "./PortfolioCTA";

export default function Portfolio() {
  useEffect(() => {
    document.title = "Portfolio — Bytech";
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );

    document
      .querySelectorAll(".portfolio-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .portfolio-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portfolio-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .portfolio-delay-1 { transition-delay: 0.1s; }
        .portfolio-delay-2 { transition-delay: 0.2s; }
        .portfolio-delay-3 { transition-delay: 0.3s; }

        @keyframes portfolioOrb1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
        }

        @keyframes portfolioOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 40px); }
        }

        @keyframes portfolioPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes portfolioTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <main className="bg-[#0e1c2e] text-white">
        <PortfolioHero />
        <PortfolioProjects />
        <PortfolioCTA />
      </main>
    </>
  );
}
