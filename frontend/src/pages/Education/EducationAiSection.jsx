import { useEffect } from "react";
import { Link } from "react-router-dom";

const features = [
  "RAG-powered content knowledge base (GPT-4o)",
  "Personalized learning paths",
  "Automated grading & feedback",
  "Learning analytics dashboard",
];

export default function EducationAiSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".ai-reveal, .ai-reveal-left, .ai-reveal-right")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .ai-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ai-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ai-reveal-left {
          opacity: 0;
          transform: translateX(-42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ai-reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .ai-reveal-right {
          opacity: 0;
          transform: translateX(42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ai-reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .ai-delay-1 {
          transition-delay: 0.1s;
        }

        .ai-delay-2 {
          transition-delay: 0.2s;
        }

        .ai-delay-3 {
          transition-delay: 0.3s;
        }

        .ai-delay-4 {
          transition-delay: 0.4s;
        }
      `}</style>

      <section
        id="ai-education"
        className="border-b border-white/[0.07] bg-white/[0.01] px-6 py-[88px] text-white lg:px-[60px]"
      >
        <div className="grid items-center gap-[60px] lg:grid-cols-2">
          <div className="ai-reveal-right">
            <div className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
              AI in Education
            </div>

            <h2 className="mb-3.5 text-[32px] font-black leading-[1.1] tracking-[-1.5px] text-white">
              Intelligence layer
              <br />
              for learning.
            </h2>

            <p className="mb-6 text-sm leading-[1.8] text-white/50">
              We integrate AI into educational platforms — from personalized
              learning paths to intelligent content recommendations and
              automated assessment feedback.
            </p>

            <div className="mb-8 flex flex-col gap-2.5">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className={`ai-reveal flex gap-2.5 text-[13px] text-white/55 ${
                    index === 0
                      ? "ai-delay-1"
                      : index === 1
                        ? "ai-delay-2"
                        : index === 2
                          ? "ai-delay-3"
                          : "ai-delay-4"
                  }`}
                >
                  <span className="shrink-0 text-[#F57A24]">→</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="ai-reveal ai-delay-4 inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
            >
              Explore AI Solutions →
            </Link>
          </div>

          <div className="ai-reveal-left">
            <div className="group h-[380px] overflow-hidden rounded-[18px]">
              <img
                src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop"
                alt="AI"
                className="h-full w-full object-cover brightness-[0.6] saturate-[0.7] transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}