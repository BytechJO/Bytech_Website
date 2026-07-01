import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import EditableButton from "../../admin/components/EditableButton";

const fallbackData = {
  id: "ai-education",
  eyebrow: "AI in Education",
  titleLine1: "Intelligence layer",
  titleLine2: "for learning.",
  description:
    "We integrate AI into educational platforms — from personalized learning paths to intelligent content recommendations and automated assessment feedback.",
  features: [
    "RAG-powered content knowledge base (GPT-4o)",
    "Personalized learning paths",
    "Automated grading & feedback",
    "Learning analytics dashboard",
  ],
  buttonLabel: "Explore AI Solutions →",
  buttonUrl: "/contact",
  image:
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop",
  imageAlt: "AI",
};

export default function EducationAiSection({
  data = {},
  editable = false,
  path = ["ai"],
  onChangePath,
}) {
  const section = {
    ...fallbackData,
    ...data,
  };

  const features = Array.isArray(section.features) ? section.features : [];

  const revealClass = editable ? "" : "ai-reveal";
  const revealLeftClass = editable ? "" : "ai-reveal-left";
  const revealRightClass = editable ? "" : "ai-reveal-right";

  function getFeatureDelayClass(index) {
    if (editable) return "";
    if (index === 0) return "ai-delay-1";
    if (index === 1) return "ai-delay-2";
    if (index === 2) return "ai-delay-3";
    return "ai-delay-4";
  }

  function addFeature() {
    onChangePath?.([...path, "features"], [...features, "New feature"]);
  }

  function deleteFeature(featureIndex) {
    onChangePath?.(
      [...path, "features"],
      features.filter((_, index) => index !== featureIndex),
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

      const elements = document.querySelectorAll(
        ".ai-reveal, .ai-reveal-left, .ai-reveal-right",
      );

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
    section.titleLine1,
    section.titleLine2,
    section.description,
    section.image,
    section.buttonLabel,
    section.buttonUrl,
    features.length,
  ]);
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

        .ai-delay-1 { transition-delay: 0.1s; }
        .ai-delay-2 { transition-delay: 0.2s; }
        .ai-delay-3 { transition-delay: 0.3s; }
        .ai-delay-4 { transition-delay: 0.4s; }
      `}</style>

      <section
        id={section.id || "ai-education"}
        className="border-b border-white/[0.07] bg-white/[0.01] px-6 py-[88px] text-white lg:px-[60px]"
      >
        <div className="grid items-center gap-[60px] lg:grid-cols-2">
          <div className={revealRightClass}>
            <EditableText
              as="div"
              value={section.eyebrow}
              editable={editable}
              path={[...path, "eyebrow"]}
              onChangePath={onChangePath}
              className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]"
              editClassName="!text-[#F57A24]"
            />

            <h2 className="mb-3.5 text-[32px] font-black leading-[1.1] tracking-[-1.5px] text-white">
              <EditableText
                as="span"
                value={section.titleLine1}
                editable={editable}
                path={[...path, "titleLine1"]}
                onChangePath={onChangePath}
                className="text-white"
                editClassName="!text-white"
              />
              <br />
              <EditableText
                as="span"
                value={section.titleLine2}
                editable={editable}
                path={[...path, "titleLine2"]}
                onChangePath={onChangePath}
                className="text-white"
                editClassName="!text-white"
              />
            </h2>

            <EditableText
              as="p"
              value={section.description}
              editable={editable}
              multiline
              path={[...path, "description"]}
              onChangePath={onChangePath}
              className="mb-6 text-sm leading-[1.8] text-white/50"
              editClassName="!text-white/80"
            />

            <div className="mb-8 flex flex-col gap-2.5">
              {editable && (
                <button
                  type="button"
                  onClick={addFeature}
                  className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
                >
                  <Plus size={13} />
                  Add Feature
                </button>
              )}

              {features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className={`${revealClass} ${getFeatureDelayClass(
                    index,
                  )} flex gap-2.5 text-[13px] text-white/55`}
                >
                  <span className="shrink-0 text-[#F57A24]">→</span>

                  <EditableText
                    as="span"
                    value={feature}
                    editable={editable}
                    path={[...path, "features", index]}
                    onChangePath={onChangePath}
                    className="text-white/55"
                    editClassName="!text-white/80"
                  />

                  {editable && (
                    <button
                      type="button"
                      onClick={() => deleteFeature(index)}
                      title="Delete feature"
                      className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <EditableButton
              label={section.buttonLabel}
              url={section.buttonUrl}
              editable={editable}
              labelPath={[...path, "buttonLabel"]}
              urlPath={[...path, "buttonUrl"]}
              onChangePath={onChangePath}
              className={`${revealClass} ai-delay-4 inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]`}
              fallbackLabel="Explore AI Solutions →"
            />
          </div>

          <div className={revealLeftClass}>
            <div className="group h-[380px] overflow-hidden rounded-[18px]">
              <EditableImage
                src={section.image}
                alt={section.imageAlt || "AI"}
                editable={editable}
                path={[...path, "image"]}
                onChangePath={onChangePath}
                className="h-full w-full object-cover brightness-[0.6] saturate-[0.7] transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
