import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import EditableButton from "../../admin/components/EditableButton";

const fallbackData = {
  id: "lms",
  image:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop",
  imageAlt: "LMS",
  imageBadge: "LMS Platform",
  imageTitle: "Scalable learning management built from the ground up",
  eyebrow: "LMS Systems",
  titleLine1: "Learning platforms",
  titleLine2: "that actually work.",
  description:
    "We design and build custom LMS platforms for schools, universities, and training institutes — architected for scale, ease of management, and a seamless learner experience.",
  features: [
    "Custom course builder & content management",
    "Student progress tracking & analytics",
    "Teacher productivity tools",
    "AI-powered content knowledge base",
    "Mobile-first responsive design",
  ],
  buttonLabel: "Build Your LMS →",
  buttonUrl: "/contact",
};

export default function EducationLmsSection({
  data = {},
  editable = false,
  path = ["lms"],
  onChangePath,
}) {
  const section = {
    ...fallbackData,
    ...data,
  };

  const features = Array.isArray(section.features) ? section.features : [];

  const revealClass = editable ? "" : "lms-reveal";
  const revealLeftClass = editable ? "" : "lms-reveal-left";
  const revealRightClass = editable ? "" : "lms-reveal-right";
  const delayClass = (delay) => (editable ? "" : delay);

  function getFeatureDelayClass(index) {
    if (editable) return "";
    if (index === 0) return "lms-delay-1";
    if (index === 1) return "lms-delay-2";
    if (index === 2) return "lms-delay-3";
    if (index === 3) return "lms-delay-4";
    return "lms-delay-5";
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
        ".lms-reveal-left, .lms-reveal-right, .lms-reveal",
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
    section.imageBadge,
    section.imageTitle,
    section.buttonLabel,
    section.buttonUrl,
    features.length,
  ]);
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

        .lms-delay-1 { transition-delay: 0.1s; }
        .lms-delay-2 { transition-delay: 0.2s; }
        .lms-delay-3 { transition-delay: 0.3s; }
        .lms-delay-4 { transition-delay: 0.4s; }
        .lms-delay-5 { transition-delay: 0.5s; }
      `}</style>

      <section
        id={section.id || "lms"}
        className="grid items-center gap-[60px] border-b border-white/[0.07] bg-[#0e1c2e] px-6 py-[88px] text-white lg:grid-cols-2 lg:px-[60px]"
      >
        <div className={revealLeftClass}>
          <div className="group relative h-[420px] overflow-hidden rounded-[18px]">
            <EditableImage
              src={section.image}
              alt={section.imageAlt || "LMS"}
              editable={editable}
              path={[...path, "image"]}
              onChangePath={onChangePath}
              className="h-full w-full object-cover brightness-[0.65] saturate-[0.8] transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,28,46,0.8)_0%,transparent_50%)]" />

            <div className="absolute bottom-6 left-6 right-6">
              <EditableText
                as="div"
                value={section.imageBadge}
                editable={editable}
                path={[...path, "imageBadge"]}
                onChangePath={onChangePath}
                className="mb-1.5 text-[10px] font-bold uppercase tracking-[1.2px] text-[#6CC2E9]"
                editClassName="!text-[#6CC2E9]"
              />

              <EditableText
                as="div"
                value={section.imageTitle}
                editable={editable}
                path={[...path, "imageTitle"]}
                onChangePath={onChangePath}
                className="text-base font-bold text-white"
                editClassName="!text-white"
              />
            </div>
          </div>
        </div>

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

          <div className="mb-7 flex flex-col gap-2.5">
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
                )} flex items-start gap-2.5 text-[13px] text-white/55`}
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
            className={`${revealClass} ${delayClass(
              "lms-delay-4",
            )} inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]`}
            fallbackLabel="Build Your LMS →"
          />
        </div>
      </section>
    </>
  );
}
