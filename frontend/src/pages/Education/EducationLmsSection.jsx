import { useEffect } from "react";
import { Link } from "react-router-dom";

const features = [
  "Custom course builder & content management",
  "Student progress tracking & analytics",
  "Teacher productivity tools",
  "AI-powered content knowledge base",
  "Mobile-first responsive design",
];

export default function EducationLmsSection() {
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
      .querySelectorAll(".lms-reveal-left, .lms-reveal-right, .lms-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .lms-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lms-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .lms-reveal-left {
          opacity: 0;
          transform: translateX(-42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lms-reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .lms-reveal-right {
          opacity: 0;
          transform: translateX(42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lms-reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .lms-delay-1 {
          transition-delay: 0.1s;
        }

        .lms-delay-2 {
          transition-delay: 0.2s;
        }

        .lms-delay-3 {
          transition-delay: 0.3s;
        }

        .lms-delay-4 {
          transition-delay: 0.4s;
        }

        .lms-delay-5 {
          transition-delay: 0.5s;
        }
      `}</style>

      <section
        id="lms"
        className="grid items-center gap-[60px] border-b border-white/[0.07] bg-[#0e1c2e] px-6 py-[88px] text-white lg:grid-cols-2 lg:px-[60px]"
      >
        <div className="lms-reveal-left">
          <div className="group relative h-[420px] overflow-hidden rounded-[18px]">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop"
              alt="LMS"
              className="h-full w-full object-cover brightness-[0.65] saturate-[0.8] transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,28,46,0.8)_0%,transparent_50%)]" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[1.2px] text-[#6CC2E9]">
                LMS Platform
              </div>

              <div className="text-base font-bold text-white">
                Scalable learning management built from the ground up
              </div>
            </div>
          </div>
        </div>

        <div className="lms-reveal-right">
          <div className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
            LMS Systems
          </div>

          <h2 className="mb-3.5 text-[32px] font-black leading-[1.1] tracking-[-1.5px] text-white">
            Learning platforms
            <br />
            that actually work.
          </h2>

          <p className="mb-6 text-sm leading-[1.8] text-white/50">
            We design and build custom LMS platforms for schools, universities,
            and training institutes — architected for scale, ease of management,
            and a seamless learner experience.
          </p>

          <div className="mb-7 flex flex-col gap-2.5">
            {features.map((feature, index) => (
              <div
                key={feature}
                className={`lms-reveal flex gap-2.5 text-[13px] text-white/55 ${
                  index === 0
                    ? "lms-delay-1"
                    : index === 1
                      ? "lms-delay-2"
                      : index === 2
                        ? "lms-delay-3"
                        : index === 3
                          ? "lms-delay-4"
                          : "lms-delay-5"
                }`}
              >
                <span className="shrink-0 text-[#F57A24]">→</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="lms-reveal lms-delay-4 inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
          >
            Build Your LMS →
          </Link>
        </div>
      </section>
    </>
  );
}
