import { useEffect } from "react";

const cards = [
  {
    title: "Interactive E-Books",
    description:
      "PDFs and printed books converted into HTML5 e-books with embedded activities, audio narration, and visual media.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop",
    alt: "E-Books",
    delay: "interactive-delay-0",
  },
  {
    title: "3D Character Animation",
    description:
      "2D illustrations converted to 3D animated characters for promotional videos and interactive learning experiences.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop",
    alt: "Children",
    delay: "interactive-delay-1",
  },
  {
    title: "Digital Assessments",
    description:
      "Interactive quizzes, exams, and graded activities integrated directly into the learning flow.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&auto=format&fit=crop",
    alt: "Assessment",
    delay: "interactive-delay-2",
  },
];

export default function EducationInteractiveSection() {
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
      .querySelectorAll(".interactive-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .interactive-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .interactive-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .interactive-delay-0 {
          transition-delay: 0s;
        }

        .interactive-delay-1 {
          transition-delay: 0.12s;
        }

        .interactive-delay-2 {
          transition-delay: 0.24s;
        }
      `}</style>

      <section
        id="ebooks"
        className="border-b border-white/[0.07] bg-[#0e1c2e] px-6 py-[88px] text-white lg:px-[60px]"
      >
        <div className="interactive-reveal mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
          Interactive Content
        </div>

        <h2 className="interactive-reveal interactive-delay-1 mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]">
          Books, reimagined.
        </h2>

        <p className="interactive-reveal interactive-delay-2 mb-12 max-w-[520px] text-sm leading-[1.75] text-white/50">
          Printed educational materials transformed into rich digital
          experiences that make learning more engaging and effective.
        </p>

        <div className="grid gap-4 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`interactive-reveal ${card.delay} group overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#112233] transition-all duration-300 hover:-translate-y-1 hover:border-[#F57A24]/35`}
            >
              <img
                src={card.image}
                alt={card.alt}
                className="h-[180px] w-full object-cover brightness-[0.65] saturate-[0.8] transition-transform duration-700 group-hover:scale-[1.04]"
              />

              <div className="px-6 py-[22px]">
                <h3 className="mb-2 text-[15px] font-bold text-white">
                  {card.title}
                </h3>

                <p className="text-xs leading-[1.65] text-white/50">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
