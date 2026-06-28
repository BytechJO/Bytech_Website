import { useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Business goals & user needs",
    delay: "process-delay-0",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Roadmap & approach",
    delay: "process-delay-1",
  },
  {
    number: "03",
    title: "Design",
    description: "UX experiences users love",
    delay: "process-delay-2",
  },
  {
    number: "04",
    title: "Build",
    description: "Quality development",
    delay: "process-delay-3",
  },
  {
    number: "05",
    title: "Test",
    description: "Performance & stability",
    delay: "process-delay-4",
  },
  {
    number: "06",
    title: "Launch",
    description: "Deploy & growth support",
    delay: "process-delay-5",
  },
];

export default function ProcessSection() {
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

    const elements = document.querySelectorAll(".process-reveal");

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .process-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .process-delay-0 {
          transition-delay: 0s;
        }

        .process-delay-1 {
          transition-delay: 0.1s;
        }

        .process-delay-2 {
          transition-delay: 0.2s;
        }

        .process-delay-3 {
          transition-delay: 0.3s;
        }

        .process-delay-4 {
          transition-delay: 0.4s;
        }

        .process-delay-5 {
          transition-delay: 0.5s;
        }
      `}</style>

      <section className="border-t border-white/[0.07] bg-[#0e1c2e] px-6 py-[88px] text-white lg:px-[60px]">
        <div className="process-reveal mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
          Process
        </div>

        <h2 className="process-reveal process-delay-1 mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]">
          Clear execution.
        </h2>

        <p className="process-reveal process-delay-2 mb-12 max-w-[520px] text-sm leading-[1.75] text-white/50">
          A structured methodology from project discovery to launch.
        </p>

        <div className="relative mt-[52px] grid gap-8 md:grid-cols-3 lg:flex lg:gap-0 before:hidden lg:before:block lg:before:absolute lg:before:left-0 lg:before:right-0 lg:before:top-[19px] lg:before:h-px lg:before:bg-[linear-gradient(90deg,#F57A24,#F9B307,#2F88C4,#6CC2E9)] lg:before:opacity-[0.18]">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`process-reveal ${step.delay} group relative z-[1] flex-1`}
            >
              <div className="mb-4 flex h-[38px] w-[38px] cursor-default items-center justify-center rounded-full border border-white/[0.07] bg-[#0e1c2e] text-[11px] font-bold text-white/[0.22] transition-all duration-300 group-hover:border-[#F57A24] group-hover:bg-[#F57A24]/[0.08] group-hover:text-[#F57A24] group-hover:shadow-[0_0_0_6px_rgba(245,122,36,0.06)]">
                {step.number}
              </div>

              <h3 className="mb-[5px] text-[13px] font-bold text-white">
                {step.title}
              </h3>

              <p className="max-w-[130px] text-xs leading-[1.6] text-white/30">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
