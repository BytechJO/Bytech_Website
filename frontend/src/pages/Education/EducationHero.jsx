import { useEffect } from "react";

export default function EducationHero() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    document
      .querySelectorAll(".edu-hero-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .edu-hero-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .edu-hero-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .edu-delay-1 {
          transition-delay: 0.1s;
        }

        .edu-delay-2 {
          transition-delay: 0.2s;
        }

        @keyframes eduOrb1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -30px);
          }
        }

        @keyframes eduOrb2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 40px);
          }
        }

        @keyframes eduPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#0e1c2e]">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&auto=format&fit=crop"
          alt="Education"
          className="h-[600px] w-full object-cover object-center brightness-[0.25] saturate-[0.6]"
        />

        <div className="pointer-events-none absolute bottom-[-100px] left-0 z-[1] h-[400px] w-[400px] rounded-full bg-[#2F88C4]/[0.08] blur-[80px] [animation:eduOrb2_13s_ease-in-out_infinite]" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,#0e1c2e_0%,rgba(14,28,46,0.4)_60%)]" />

        <div className="absolute bottom-[20px] left-0 right-0 z-[2] px-6 lg:px-[60px]">
          <div className="max-w-[720px]">
            <div className="edu-hero-reveal mb-6 inline-flex items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-[14px] py-[6px]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#F57A24] shadow-[0_0_0_6px_rgba(245,122,36,0.08)] [animation:eduPulse_2s_infinite]" />

              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#F57A24]">
                EdTech
              </span>
            </div>
            <h1 className="edu-hero-reveal edu-delay-1 mb-5 max-w-[620px] text-[42px] font-black leading-[1.05] tracking-[-2px] text-white sm:text-[56px] lg:text-[58px]">
              A strong{" "}
              <span className="bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent">
                EdTech focus.
              </span>
            </h1>
            <p className="edu-hero-reveal edu-delay-2 max-w-[600px] text-[15px] leading-[1.78] text-white/50 sm:text-base">
              Education is one of Bytech&apos;s core specializations. We build
              LMS platforms, academic systems, digital assessments, and
              interactive learning environments for schools, institutions, and
              publishers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
