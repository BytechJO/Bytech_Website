import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";

const fallbackData = {
  id: "ebooks",
  eyebrow: "Interactive Content",
  title: "Books, reimagined.",
  description:
    "Printed educational materials transformed into rich digital experiences that make learning more engaging and effective.",
  cards: [
    {
      title: "Interactive E-Books",
      description:
        "PDFs and printed books converted into HTML5 e-books with embedded activities, audio narration, and visual media.",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop",
      alt: "E-Books",
    },
  ],
};

export default function EducationInteractiveSection({
  data = {},
  editable = false,
  path = ["interactive"],
  onChangePath,
}) {
  const section = {
    ...fallbackData,
    ...data,
  };

  const cards = Array.isArray(section.cards) ? section.cards : [];

  const revealClass = editable ? "" : "interactive-reveal";

  function getCardDelayClass(index) {
    if (editable) return "";
    if (index === 0) return "interactive-delay-0";
    if (index === 1) return "interactive-delay-1";
    return "interactive-delay-2";
  }

  function addCard() {
    onChangePath?.(
      [...path, "cards"],
      [
        ...cards,
        {
          title: "New Card",
          description: "Write card description here.",
          image: "",
          alt: "New Card",
        },
      ],
    );
  }

  function deleteCard(cardIndex) {
    onChangePath?.(
      [...path, "cards"],
      cards.filter((_, index) => index !== cardIndex),
    );
  }

  useEffect(() => {
    if (editable) return;

    let observer;

    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      const elements = document.querySelectorAll(".interactive-reveal");

      elements.forEach((el) => {
        el.classList.remove("visible");
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [
    editable,
    section.eyebrow,
    section.title,
    section.description,
    cards.length,
  ]);

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

        .interactive-delay-0 { transition-delay: 0s; }
        .interactive-delay-1 { transition-delay: 0.12s; }
        .interactive-delay-2 { transition-delay: 0.24s; }
      `}</style>

      <section
        id={section.id || "ebooks"}
        className="border-b border-white/[0.07] bg-[#0e1c2e] px-6 py-[88px] text-white lg:px-[60px]"
      >
        <EditableText
          as="div"
          value={section.eyebrow}
          editable={editable}
          path={[...path, "eyebrow"]}
          onChangePath={onChangePath}
          className={`${revealClass} mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]`}
          editClassName="!text-[#F57A24]"
        />

        <EditableText
          as="h2"
          value={section.title}
          editable={editable}
          path={[...path, "title"]}
          onChangePath={onChangePath}
          className={`${revealClass} interactive-delay-1 mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]`}
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={section.description}
          editable={editable}
          multiline
          path={[...path, "description"]}
          onChangePath={onChangePath}
          className={`${revealClass} interactive-delay-2 mb-12 max-w-[520px] text-sm leading-[1.75] text-white/50`}
          editClassName="!text-white/80"
        />

        {editable && (
          <button
            type="button"
            onClick={addCard}
            className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
          >
            <Plus size={13} />
            Add Card
          </button>
        )}

        <div className="grid gap-4 lg:grid-cols-3">
          {cards.map((card, index) => {
            const cardPath = [...path, "cards", index];

            return (
              <div
                key={`${card.title}-${index}`}
                className={`${revealClass} ${getCardDelayClass(
                  index,
                )} group overflow-hidden rounded-[14px] border border-white/[0.07] bg-[#112233] transition-all duration-300 hover:-translate-y-1 hover:border-[#F57A24]/35`}
              >
                <div className="relative h-[180px]">
                  <EditableImage
                    src={card.image}
                    alt={card.alt || card.title}
                    editable={editable}
                    path={[...cardPath, "image"]}
                    onChangePath={onChangePath}
                    className="h-[180px] w-full object-cover brightness-[0.65] saturate-[0.8] transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  {editable && (
                    <button
                      type="button"
                      onClick={() => deleteCard(index)}
                      title="Delete card"
                      className="absolute bottom-3 right-3 z-[60] inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/80 text-white transition hover:bg-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div className="px-6 py-[22px]">
                  <EditableText
                    as="h3"
                    value={card.title}
                    editable={editable}
                    path={[...cardPath, "title"]}
                    onChangePath={onChangePath}
                    className="mb-2 text-[15px] font-bold text-white"
                    editClassName="!text-white"
                  />

                  <EditableText
                    as="p"
                    value={card.description}
                    editable={editable}
                    multiline
                    path={[...cardPath, "description"]}
                    onChangePath={onChangePath}
                    className="text-xs leading-[1.65] text-white/50"
                    editClassName="!text-white/80"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
