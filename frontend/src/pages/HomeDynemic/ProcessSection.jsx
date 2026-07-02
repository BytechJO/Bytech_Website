import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackProcess = {
  eyebrow: "Process",
  title: "Clear execution.",
  description: "A structured methodology from project discovery to launch.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description: "Business goals & user needs",
    },
    {
      number: "02",
      title: "Strategy",
      description: "Roadmap & approach",
    },
    {
      number: "03",
      title: "Design",
      description: "UX experiences users love",
    },
    {
      number: "04",
      title: "Build",
      description: "Quality development",
    },
    {
      number: "05",
      title: "Test",
      description: "Performance & stability",
    },
    {
      number: "06",
      title: "Launch",
      description: "Deploy & growth support",
    },
  ],
};

export default function ProcessSection({
  data = {},
  editable = false,
  path = ["process"],
  onChangePath,
}) {
  const process = {
    ...fallbackProcess,
    ...data,
  };

  const steps = Array.isArray(process.steps) ? process.steps : [];

  const { confirm } = useConfirm();

  useEffect(() => {
    if (editable) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );

    const frame = requestAnimationFrame(() => {
      document.querySelectorAll(".process-reveal").forEach((el) => {
        el.classList.remove("visible");
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [editable, steps.length]);

  function addStep() {
    onChangePath?.(
      [...path, "steps"],
      [
        ...steps,
        {
          number: String(steps.length + 1).padStart(2, "0"),
          title: "New Step",
          description: "Write step description here.",
        },
      ],
    );
  }

  async function deleteStep(index) {
    const ok = await confirm({
      title: "Delete step?",
      message: "This process step will be removed.",
      confirmText: "Delete Step",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "steps"],
      steps.filter((_, i) => i !== index),
    );
  }

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

        .process-delay-0 { transition-delay: 0s; }
        .process-delay-1 { transition-delay: 0.1s; }
        .process-delay-2 { transition-delay: 0.2s; }
        .process-delay-3 { transition-delay: 0.3s; }
        .process-delay-4 { transition-delay: 0.4s; }
        .process-delay-5 { transition-delay: 0.5s; }
      `}</style>

      <section className="border-t border-white/[0.07] bg-[#0e1c2e] px-6 py-[88px] text-white lg:px-[60px]">
        <EditableText
          as="div"
          value={process.eyebrow}
          editable={editable}
          path={[...path, "eyebrow"]}
          onChangePath={onChangePath}
          className={`${editable ? "" : "process-reveal"} mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]`}
          editClassName="!text-[#F57A24]"
        />

        <EditableText
          as="h2"
          value={process.title}
          editable={editable}
          path={[...path, "title"]}
          onChangePath={onChangePath}
          className={`${editable ? "" : "process-reveal process-delay-1"} mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]`}
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={process.description}
          editable={editable}
          multiline
          path={[...path, "description"]}
          onChangePath={onChangePath}
          className={`${editable ? "" : "process-reveal process-delay-2"} mb-12 max-w-[520px] text-sm leading-[1.75] text-white/50`}
          editClassName="!text-white/80"
        />

        {editable && (
          <button
            type="button"
            onClick={addStep}
            className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24]"
          >
            <Plus size={13} />
            Add Step
          </button>
        )}

        <div className="relative mt-[52px] grid gap-8 md:grid-cols-3 lg:flex lg:gap-0 before:hidden lg:before:block lg:before:absolute lg:before:left-0 lg:before:right-0 lg:before:top-[19px] lg:before:h-px lg:before:bg-[linear-gradient(90deg,#F57A24,#F9B307,#2F88C4,#6CC2E9)] lg:before:opacity-[0.18]">
          {steps.map((step, index) => (
            <div
              key={`${step.number}-${index}`}
              className={`${editable ? "" : "process-reveal"} process-delay-${Math.min(
                index,
                5,
              )} group relative z-[1] flex-1`}
            >
              {editable && (
                <button
                  type="button"
                  onClick={() => deleteStep(index)}
                  className="absolute right-3 top-0 z-[30] inline-flex h-7 w-7 items-center justify-center rounded-md bg-red-500/20 text-red-300"
                  title="Delete step"
                >
                  <Trash2 size={13} />
                </button>
              )}

              <EditableText
                as="div"
                value={step.number}
                editable={editable}
                path={[...path, "steps", index, "number"]}
                onChangePath={onChangePath}
                className="mb-4 flex h-[38px] w-[38px] cursor-default items-center justify-center rounded-full border border-white/[0.07] bg-[#0e1c2e] text-[11px] font-bold text-white/[0.22] transition-all duration-300 group-hover:border-[#F57A24] group-hover:bg-[#F57A24]/[0.08] group-hover:text-[#F57A24] group-hover:shadow-[0_0_0_6px_rgba(245,122,36,0.06)]"
                editClassName="!text-white"
              />

              <EditableText
                as="h3"
                value={step.title}
                editable={editable}
                path={[...path, "steps", index, "title"]}
                onChangePath={onChangePath}
                className="mb-[5px] text-[13px] font-bold text-white"
                editClassName="!text-white"
              />

              <EditableText
                as="p"
                value={step.description}
                editable={editable}
                multiline
                path={[...path, "steps", index, "description"]}
                onChangePath={onChangePath}
                className="max-w-[130px] text-xs leading-[1.6] text-white/30"
                editClassName="!text-white/70"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
