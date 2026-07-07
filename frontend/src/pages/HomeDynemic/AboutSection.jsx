import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import EditableButton from "../../admin/components/EditableButton";
import { useConfirm } from "../../admin/components/ConfirmProvider";

function Counter({ value = "", className = "" }) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [done, setDone] = useState(false);

  const valueText = String(value || "0");

  const numberMatch = valueText.match(/[\d.]+/);
  const targetNumber = numberMatch ? Number(numberMatch[0]) : 0;

  const prefix = numberMatch ? valueText.slice(0, numberMatch.index) : "";

  const suffix = numberMatch
    ? valueText.slice(numberMatch.index + numberMatch[0].length)
    : "";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayValue("0");
    setDone(false);
  }, [valueText]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (done) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return;

        setDone(true);

        let cur = 0;
        const duration = 1800;
        const frame = 16;
        const step = targetNumber / (duration / frame);

        const timer = setInterval(() => {
          cur = Math.min(cur + step, targetNumber);

          if (Number.isInteger(targetNumber)) {
            setDisplayValue(String(Math.floor(cur)));
          } else {
            setDisplayValue(cur.toFixed(1));
          }

          if (cur >= targetNumber) {
            clearInterval(timer);
          }
        }, frame);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [targetNumber, done]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

const fallbackAbout = {
  image:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop",
  imageAlt: "Office",
  foundedYear: "2020",
  foundedLabel: "Founded in Amman",
  eyebrow: "About Bytech",
  title: "More than software.",
  description:
    "We work as a technical and strategic partner for businesses, institutions, and educational organizations — turning ideas into scalable digital products. One team. One direction. No fragmentation.",
  buttonLabel: "Our Story →",
  buttonUrl: "/about",
  stats: [
    {
      value: "30+",
      label: "Projects",
      color: "orange",
    },
    {
      value: "6+",
      label: "Services",
      color: "cyan",
    },
    {
      value: "4",
      label: "Countries",
      color: "yellow",
    },
    {
      value: "360°",
      label: "Coverage",
      color: "blue",
    },
  ],
};

const textColors = {
  orange: "text-[#F57A24]",
  cyan: "text-[#6CC2E9]",
  yellow: "text-[#F9B307]",
  blue: "text-[#2F88C4]",
  white: "text-white",
};

const colorOrder = ["orange", "cyan", "yellow", "blue", "white"];

function normalizeStat(stat, index) {
  return {
    value: stat?.value ?? `${stat?.target ?? index + 1}${stat?.suffix ?? ""}`,
    label: stat?.label || `Stat ${index + 1}`,
    color: stat?.color || "orange",
  };
}

export default function AboutSection({
  data = {},
  editable = false,
  path = ["about"],
  onChangePath,
}) {
  const about = {
    ...fallbackAbout,
    ...data,
  };

  const stats = Array.isArray(about.stats)
    ? about.stats.filter(Boolean).map(normalizeStat)
    : fallbackAbout.stats;

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
      document
        .querySelectorAll(
          ".home-about-reveal, .home-about-reveal-left, .home-about-reveal-right",
        )
        .forEach((el) => {
          el.classList.remove("visible");
          observer.observe(el);
        });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [editable, stats.length]);

  function addStat() {
    onChangePath?.(
      [...path, "stats"],
      [
        ...stats,
        {
          value: "1+",
          label: "New Stat",
          color: "orange",
        },
      ],
    );
  }

  async function deleteStat(index) {
    const ok = await confirm({
      title: "Delete stat?",
      message: "This stat card will be removed.",
      confirmText: "Delete Stat",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "stats"],
      stats.filter((_, i) => i !== index),
    );
  }

  function cycleColor(index) {
    const nextStats = stats.map((stat, i) => {
      if (i !== index) return stat;

      const currentIndex = colorOrder.indexOf(stat.color || "orange");
      const nextColor = colorOrder[(currentIndex + 1) % colorOrder.length];

      return {
        ...stat,
        color: nextColor,
      };
    });

    onChangePath?.([...path, "stats"], nextStats);
  }

  return (
    <>
      <style>{`
        .home-about-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-about-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .home-about-reveal-left {
          opacity: 0;
          transform: translateX(-36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-about-reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .home-about-reveal-right {
          opacity: 0;
          transform: translateX(36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-about-reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .home-about-delay-1 { transition-delay: 0.1s; }
        .home-about-delay-2 { transition-delay: 0.2s; }
        .home-about-delay-3 { transition-delay: 0.3s; }
        .home-about-delay-4 { transition-delay: 0.4s; }
      `}</style>

      <section className="grid border-t border-white/[0.07] bg-[#0e1c2e] text-white lg:grid-cols-2">
        <div
          className={`${editable ? "" : "home-about-reveal-left"} relative min-h-[340px] overflow-hidden sm:min-h-[420px] lg:min-h-[480px]`}
        >
          <EditableImage
            src={about.image}
            alt={about.imageAlt || "Office"}
            editable={editable}
            path={[...path, "image"]}
            onChangePath={onChangePath}
            className="h-full w-full object-cover brightness-[0.6] saturate-[0.8]"
          />

          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,transparent_50%,#0e1c2e)] lg:block" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#0e1c2e_0%,transparent_25%)]" />

          <div className="absolute bottom-5 left-5 rounded-xl border border-white/[0.07] bg-[#0e1c2e]/90 px-4 py-3 backdrop-blur-[20px] sm:bottom-9 sm:left-9 sm:px-[18px] sm:py-3.5">
            <EditableText
              as="div"
              value={about.foundedYear}
              editable={editable}
              path={[...path, "foundedYear"]}
              onChangePath={onChangePath}
              className="text-[24px] font-black leading-none text-[#F57A24] sm:text-[28px]"
              editClassName="!text-[#F57A24]"
            />

            <EditableText
              as="div"
              value={about.foundedLabel}
              editable={editable}
              path={[...path, "foundedLabel"]}
              onChangePath={onChangePath}
              className="mt-[3px] text-[9px] uppercase tracking-[1px] text-white/35 sm:text-[10px]"
              editClassName="!text-white/70"
            />
          </div>
        </div>

        <div
          className={`${editable ? "" : "home-about-reveal-right"} flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-16 lg:px-[60px] lg:py-[72px]`}
        >
          <EditableText
            as="div"
            value={about.eyebrow}
            editable={editable}
            path={[...path, "eyebrow"]}
            onChangePath={onChangePath}
            className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24] sm:mb-3.5 sm:tracking-[2.5px]"
            editClassName="!text-[#F57A24]"
          />

          <EditableText
            as="h2"
            value={about.title}
            editable={editable}
            path={[...path, "title"]}
            onChangePath={onChangePath}
            className="mb-3 text-[30px] font-black leading-[1.08] tracking-[-1.2px] text-white sm:text-[34px] sm:tracking-[-1.5px]"
            editClassName="!text-white"
          />

          <EditableText
            as="p"
            value={about.description}
            editable={editable}
            multiline
            path={[...path, "description"]}
            onChangePath={onChangePath}
            className="mb-6 text-[13px] leading-[1.8] text-white/50 sm:text-sm sm:leading-[1.82]"
            editClassName="!text-white/80"
          />

          {editable && (
            <button
              type="button"
              onClick={addStat}
              className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24]"
            >
              <Plus size={13} />
              Add Stat
            </button>
          )}

          <div className="my-6 grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <MiniCard
                key={`${stat.label}-${index}`}
                stat={stat}
                editable={editable}
                path={[...path, "stats", index]}
                onChangePath={onChangePath}
                onDelete={() => deleteStat(index)}
                onCycleColor={() => cycleColor(index)}
                delay={`home-about-delay-${Math.min(index + 1, 4)}`}
              />
            ))}
          </div>

          <EditableButton
            label={about.buttonLabel}
            url={about.buttonUrl}
            editable={editable}
            labelPath={[...path, "buttonLabel"]}
            urlPath={[...path, "buttonUrl"]}
            onChangePath={onChangePath}
            className={`${editable ? "" : "home-about-reveal home-about-delay-3"} inline-flex w-full justify-center rounded-lg bg-[#F57A24] px-6 py-3 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815] sm:w-fit sm:py-2.5`}
            fallbackLabel="Our Story →"
          />
        </div>
      </section>
    </>
  );
}

function MiniCard({
  stat,
  editable,
  path,
  onChangePath,
  onDelete,
  onCycleColor,
  delay = "",
}) {
  const color = textColors[stat.color] || textColors.orange;

  return (
    <div
      className={`${editable ? "" : "home-about-reveal"} ${delay} relative flex min-h-[112px] flex-col items-center justify-center rounded-[12px] border border-white/[0.07] bg-[#162840] p-4 text-center sm:min-h-[120px] sm:p-[18px] lg:items-start lg:text-left`}
    >
      {editable && (
        <div className="absolute right-2 top-2 z-[50] flex gap-1">
          <button
            type="button"
            onClick={onCycleColor}
            className="rounded-md bg-white/[0.06] px-1.5 py-1 text-[8px] font-bold text-white/40 sm:px-2 sm:text-[9px]"
          >
            {stat.color || "orange"}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-red-500/20 text-red-300"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      {editable ? (
        <EditableText
          as="div"
          value={stat.value || ""}
          editable
          path={[...path, "value"]}
          onChangePath={onChangePath}
          className={`mb-1 text-center text-[28px] font-black leading-none tracking-[-1px] sm:text-[30px] lg:text-left ${color}`}
          editClassName="!text-white"
        />
      ) : (
        <Counter
          value={stat.value || "0"}
          className={`mb-1 text-center text-[28px] font-black leading-none tracking-[-1px] sm:text-[30px] lg:text-left ${color}`}
        />
      )}

      <EditableText
        as="div"
        value={stat.label}
        editable={editable}
        path={[...path, "label"]}
        onChangePath={onChangePath}
        className="text-center text-[10px] uppercase leading-[1.4] tracking-[0.8px] text-white/30 lg:text-left"
        editClassName="!text-white/60"
      />
    </div>
  );
}
