import { useEffect } from "react";
import AboutHero from "./AboutHero";
import AboutStory from "./AboutStory";
import AboutValues from "./AboutValues";
import AboutLocation from "./AboutLocation";

export default function About() {
  useEffect(() => {
    document.title = "About — Bytech";
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
      .querySelectorAll(".about-reveal, .about-reveal-l, .about-reveal-r")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-reveal-l {
          opacity: 0;
          transform: translateX(-36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-reveal-r {
          opacity: 0;
          transform: translateX(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-reveal.visible,
        .about-reveal-l.visible,
        .about-reveal-r.visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .about-delay-1 { transition-delay: 0.1s; }
        .about-delay-2 { transition-delay: 0.2s; }
        .about-delay-3 { transition-delay: 0.3s; }
        .about-delay-4 { transition-delay: 0.4s; }

        @keyframes aboutOrb1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
        }

        @keyframes aboutOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 40px); }
        }

        @keyframes aboutPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes aboutTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }.about-timeline-item {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-reveal-r.visible .about-timeline-item {
  opacity: 1;
  transform: translateY(0);
}
      `}</style>

      <main className="bg-[#0e1c2e] text-white">
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutLocation />
      </main>
    </>
  );
}
