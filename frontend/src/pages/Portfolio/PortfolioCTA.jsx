import { useEffect } from "react";

import EditableText from "../../admin/components/EditableText";
import EditableButton from "../../admin/components/EditableButton";

const fallbackCTA = {
  title: "Ready to be our next success story?",
  description:
    "Let's discuss your project and build something that makes an impact.",
  primaryLabel: "Start a Project →",
  primaryUrl: "/contact",
  secondaryLabel: "View Services",
  secondaryUrl: "/services",
};

export default function PortfolioCTA({
  data = {},
  editable = false,
  path = ["cta"],
  onChangePath,
}) {
  const cta = {
    ...fallbackCTA,
    ...data,
  };

  const revealClass = editable ? "" : "portfolio-reveal";
  const delayClass = (delay) => (editable ? "" : delay);

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

      document.querySelectorAll(".portfolio-reveal").forEach((el) => {
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
    cta.title,
    cta.description,
    cta.primaryLabel,
    cta.primaryUrl,
    cta.secondaryLabel,
    cta.secondaryUrl,
  ]);

  return (
    <section className="px-6 py-[72px] text-center sm:px-10 lg:px-[60px]">
      <EditableText
        as="h2"
        value={cta.title}
        editable={editable}
        path={[...path, "title"]}
        onChangePath={onChangePath}
        className={`${revealClass} text-[30px] font-black leading-[1.1] tracking-[-1.2px] text-white sm:text-[32px]`}
        editClassName="!text-white"
      />

      <EditableText
        as="p"
        value={cta.description}
        editable={editable}
        multiline
        path={[...path, "description"]}
        onChangePath={onChangePath}
        className={`${revealClass} ${delayClass(
          "portfolio-delay-1",
        )} mx-auto mb-8 mt-4 max-w-[500px] text-sm leading-[1.75] text-white/50`}
        editClassName="!text-white/80"
      />

      <div
        className={`${revealClass} ${delayClass(
          "portfolio-delay-2",
        )} flex flex-wrap justify-center gap-3`}
      >
        <EditableButton
          label={cta.primaryLabel}
          url={cta.primaryUrl}
          editable={editable}
          labelPath={[...path, "primaryLabel"]}
          urlPath={[...path, "primaryUrl"]}
          onChangePath={onChangePath}
          className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e06815]"
          fallbackLabel="Start a Project →"
        />

        <EditableButton
          label={cta.secondaryLabel}
          url={cta.secondaryUrl}
          editable={editable}
          labelPath={[...path, "secondaryLabel"]}
          urlPath={[...path, "secondaryUrl"]}
          onChangePath={onChangePath}
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/60 transition hover:border-white/20 hover:text-white"
          fallbackLabel="View Services"
        />
      </div>
    </section>
  );
}
