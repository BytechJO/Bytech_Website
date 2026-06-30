import { useEffect } from "react";
import ContactHero from "./ContactHero";
import ContactSection from "./ContactSection";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact — Bytech";
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
      .querySelectorAll(".contact-reveal, .contact-reveal-l, .contact-reveal-r")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .contact-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-reveal-l {
          opacity: 0;
          transform: translateX(-36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-reveal-r {
          opacity: 0;
          transform: translateX(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-reveal.visible,
        .contact-reveal-l.visible,
        .contact-reveal-r.visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .contact-delay-1 { transition-delay: 0.1s; }
        .contact-delay-2 { transition-delay: 0.2s; }

        @keyframes contactOrb1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
        }

        @keyframes contactOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 40px); }
        }

        @keyframes contactPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes contactTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <main className="bg-[#0e1c2e] text-white">
        <ContactHero />
        <ContactSection />
      </main>
    </>
  );
}
