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
    <div ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {displayValue}
      {suffix}
    </div>
  );
}

const fallbackHero = {
  badge: "Integrated Digital Ecosystem",
  titleLine1: "Build.",
  titleLine2: "Launch.",
  titleLine3: "Grow.",
  description:
    "One team. One direction. Bytech delivers software, mobile apps, educational systems, interactive content, media production, and digital growth — all inside one professional ecosystem.",
  primaryLabel: "Explore Services",
  primaryUrl: "/services",
  secondaryLabel: "Book a Call →",
  secondaryUrl: "/contact",
  trustedText: "Trusted by",
  trustedCount: "30+",
  trustedSuffix: "organizations across the region",
  teamImages: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
  ],
  mainImage:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop",
  mainImageAlt: "Bytech team collaborating on digital solutions",
  floatingCards: [
    {
      eyebrow: "Active Projects",
      value: "30+",
      description: "Delivered this year",
      color: "orange",
      progress: 78,
      footer: "Live tracking",
    },
    {
      eyebrow: "Satisfaction Rate",
      value: "98%",
      description: "",
      color: "cyan",
      progress: 98,
      footer: "",
    },
    {
      eyebrow: "Coverage",
      value: "360°",
      description: "Full digital journey",
      color: "yellow",
      progress: 100,
      footer: "",
    },
  ],
  stats: [
    {
      value: "30+",
      label: "Projects Delivered",
      color: "orange",
    },
    {
      value: "6+",
      label: "Core Service Areas",
      color: "cyan",
    },
    {
      value: "360°",
      label: "Digital Coverage",
      color: "white",
    },
    {
      value: "4",
      label: "Countries Served",
      color: "yellow",
    },
  ],
};

const colorText = {
  orange: "text-[#F57A24]",
  cyan: "text-[#6CC2E9]",
  yellow: "text-[#F9B307]",
  blue: "text-[#2F88C4]",
  white: "text-white",
};

const lineColor = {
  orange: "after:bg-[#F57A24]",
  cyan: "after:bg-[#6CC2E9]",
  yellow: "after:bg-[#F9B307]",
  blue: "after:bg-[#2F88C4]",
  white: "after:bg-white",
};

const colorOrder = ["orange", "cyan", "yellow", "blue", "white"];

export default function HeroSection({
  data = {},
  editable = false,
  path = ["hero"],
  onChangePath,
}) {
  const hero = {
    ...fallbackHero,
    ...data,
  };

  const teamImages = Array.isArray(hero.teamImages) ? hero.teamImages : [];

  const floatingCards = Array.isArray(hero.floatingCards)
    ? hero.floatingCards
    : [];

  const stats = Array.isArray(hero.stats) ? hero.stats : [];

  const { confirm } = useConfirm();

  function addTeamImage() {
    onChangePath?.(
      [...path, "teamImages"],
      [
        ...teamImages,
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
      ],
    );
  }

  async function deleteTeamImage(index) {
    const ok = await confirm({
      title: "Delete team image?",
      message: "This team image will be removed.",
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "teamImages"],
      teamImages.filter((_, i) => i !== index),
    );
  }

  function addFloatingCard() {
    onChangePath?.(
      [...path, "floatingCards"],
      [
        ...floatingCards,
        {
          eyebrow: "New Card",
          value: "10+",
          description: "New description",
          color: "orange",
          progress: 50,
          footer: "",
        },
      ],
    );
  }

  async function deleteFloatingCard(index) {
    const ok = await confirm({
      title: "Delete floating card?",
      message: "This floating card will be removed.",
      confirmText: "Delete Card",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "floatingCards"],
      floatingCards.filter((_, i) => i !== index),
    );
  }

  function cycleFloatingColor(index) {
    const nextCards = floatingCards.map((card, i) => {
      if (i !== index) return card;

      const currentIndex = colorOrder.indexOf(card.color || "orange");
      const nextColor = colorOrder[(currentIndex + 1) % colorOrder.length];

      return {
        ...card,
        color: nextColor,
      };
    });

    onChangePath?.([...path, "floatingCards"], nextCards);
  }

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

  function cycleStatColor(index) {
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
      <section className="relative grid min-h-screen grid-cols-1 items-center overflow-hidden bg-[#0e1c2e] px-4 pb-14 pt-[110px] text-white sm:px-6 lg:grid-cols-2 lg:px-[60px] lg:pb-20 lg:pt-[130px]">
        <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[460px] w-[460px] rounded-full bg-[#F57A24]/10 blur-[90px] animate-[orb1_10s_ease-in-out_infinite] sm:right-[-100px] sm:top-[-150px] sm:h-[600px] sm:w-[600px] sm:blur-[100px]" />

        <div className="pointer-events-none absolute bottom-[-140px] left-[-140px] h-[380px] w-[380px] rounded-full bg-[#2F88C4]/10 blur-[75px] animate-[orb2_13s_ease-in-out_infinite] sm:bottom-[-100px] sm:left-[-50px] sm:h-[500px] sm:w-[500px] sm:blur-[80px]" />

        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:42px_42px] sm:bg-[length:54px_54px]" />

        <div className="pointer-events-none absolute left-0 right-0 h-[120px] bg-[linear-gradient(180deg,transparent,rgba(47,136,196,0.04),transparent)] animate-[scan_7s_linear_infinite]" />

        <div className="relative z-10">
          <div
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-[12px] py-[6px] animate-fade-in-up sm:mb-7 sm:px-[14px]"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#F57A24] animate-[pulseDot_2s_infinite]" />

            <EditableText
              as="span"
              value={hero.badge}
              editable={editable}
              path={[...path, "badge"]}
              onChangePath={onChangePath}
              className="truncate text-[9px] font-bold uppercase tracking-[1.3px] text-[#F57A24] sm:text-[10px] sm:tracking-[1.5px]"
              editClassName="!text-[#F57A24]"
            />
          </div>

          <h1
            className="mb-5 text-[46px] font-black leading-[0.95] tracking-[-2px] sm:text-[64px] lg:mb-6 lg:text-[72px] lg:tracking-[-2.5px] animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <EditableText
              as="span"
              value={hero.titleLine1}
              editable={editable}
              path={[...path, "titleLine1"]}
              onChangePath={onChangePath}
              className="block bg-gradient-to-r from-[#F57A24] to-[#F9B307] bg-clip-text text-transparent"
              editClassName="!text-[#F57A24]"
            />

            <EditableText
              as="span"
              value={hero.titleLine2}
              editable={editable}
              path={[...path, "titleLine2"]}
              onChangePath={onChangePath}
              className="block text-white"
              editClassName="!text-white"
            />

            <EditableText
              as="span"
              value={hero.titleLine3}
              editable={editable}
              path={[...path, "titleLine3"]}
              onChangePath={onChangePath}
              className="block text-white/25 [-webkit-text-stroke:1px_rgba(255,255,255,0.1)]"
              editClassName="!text-white"
            />
          </h1>

          <EditableText
            as="p"
            value={hero.description}
            editable={editable}
            multiline
            path={[...path, "description"]}
            onChangePath={onChangePath}
            className="mb-8 max-w-[440px] text-[14px] leading-[1.75] text-white/50 sm:text-[15px] lg:mb-10 animate-fade-in-up"
            editClassName="!text-white/80"
          />

          <div
            className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <EditableButton
              label={hero.primaryLabel}
              url={hero.primaryUrl}
              editable={editable}
              labelPath={[...path, "primaryLabel"]}
              urlPath={[...path, "primaryUrl"]}
              onChangePath={onChangePath}
              className="inline-flex justify-center rounded-lg bg-[#F57A24] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(245,122,36,0.3)] transition-all duration-300 animate-[glow_3s_infinite] hover:-translate-y-1 hover:bg-[#e06815] hover:shadow-[0_0_30px_rgba(245,122,36,0.5)]"
              fallbackLabel="Explore Services"
            />

            <EditableButton
              label={hero.secondaryLabel}
              url={hero.secondaryUrl}
              editable={editable}
              labelPath={[...path, "secondaryLabel"]}
              urlPath={[...path, "secondaryUrl"]}
              onChangePath={onChangePath}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-[22px] py-3 text-[13px] font-medium text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:text-white"
              fallbackLabel="Book a Call →"
            />
          </div>

          <div
            className="flex flex-wrap items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex shrink-0">
              {teamImages.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className={`relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#0e1c2e] transition-transform hover:z-10 hover:scale-110 ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                >
                  <EditableImage
                    src={src}
                    alt="Team member"
                    editable={editable}
                    path={[...path, "teamImages", index]}
                    onChangePath={onChangePath}
                    className="h-full w-full object-cover grayscale-[0.3]"
                  />

                  {editable && (
                    <button
                      type="button"
                      onClick={() => deleteTeamImage(index)}
                      className="absolute inset-0 z-[30] bg-red-500/70 text-[10px] font-bold text-white opacity-0 transition hover:opacity-100"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {editable && (
              <button
                type="button"
                onClick={addTeamImage}
                className="rounded-md border border-[#F57A24]/25 bg-[#F57A24]/10 px-2 py-1 text-[10px] font-bold text-[#F57A24]"
              >
                Add Image
              </button>
            )}

            <span className="max-w-[250px] text-xs leading-relaxed text-white/40 sm:max-w-none">
              <EditableText
                as="span"
                value={hero.trustedText}
                editable={editable}
                path={[...path, "trustedText"]}
                onChangePath={onChangePath}
                className="text-white/40"
                editClassName="!text-white/70"
              />{" "}
              <EditableText
                as="strong"
                value={hero.trustedCount}
                editable={editable}
                path={[...path, "trustedCount"]}
                onChangePath={onChangePath}
                className="text-[#F57A24]"
                editClassName="!text-[#F57A24]"
              />{" "}
              <EditableText
                as="span"
                value={hero.trustedSuffix}
                editable={editable}
                path={[...path, "trustedSuffix"]}
                onChangePath={onChangePath}
                className="text-white/40"
                editClassName="!text-white/70"
              />
            </span>
          </div>
        </div>

        <div
          className="relative z-10 mt-12 h-[430px] animate-fade-in-up sm:h-[500px] lg:mt-0 lg:h-[520px]"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="absolute inset-x-0 bottom-[70px] top-8 overflow-hidden rounded-[20px] transition-transform duration-700 hover:scale-[1.02] sm:bottom-[60px] sm:left-10 sm:right-0 sm:top-0">
            <EditableImage
              src={hero.mainImage}
              alt={hero.mainImageAlt || "Bytech team"}
              editable={editable}
              path={[...path, "mainImage"]}
              onChangePath={onChangePath}
              className="h-full w-full object-cover brightness-[0.65] saturate-[0.85]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,28,46,0.65),transparent_60%)]" />
            <div className="absolute inset-0 rounded-[20px] border border-white/[0.09]" />
          </div>

          {editable && (
            <button
              type="button"
              onClick={addFloatingCard}
              className="absolute right-0 top-[-42px] z-[60] rounded-md border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24]"
            >
              <Plus size={13} className="mr-1 inline" />
              Add Floating Card
            </button>
          )}

          {floatingCards.map((card, index) => (
            <FloatingCard
              key={`${card.eyebrow}-${index}`}
              card={card}
              editable={editable}
              path={[...path, "floatingCards", index]}
              onChangePath={onChangePath}
              index={index}
              onDelete={() => deleteFloatingCard(index)}
              onCycleColor={() => cycleFloatingColor(index)}
            />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 border-y border-white/[0.07] bg-[#0e1c2e] shadow-[0_-15px_40px_rgba(0,0,0,0.4)] lg:grid-cols-4">
        {" "}
        {stats.map((stat, index) => (
          <StatCard
            key={`${stat.label}-${index}`}
            stat={stat}
            editable={editable}
            path={[...path, "stats", index]}
            onChangePath={onChangePath}
            onDelete={() => deleteStat(index)}
            onCycleColor={() => cycleStatColor(index)}
          />
        ))}
        {editable && (
          <button
            type="button"
            onClick={addStat}
            className="flex min-h-[110px] items-center justify-center border-b border-white/[0.07] bg-white/[0.03] px-5 py-6 text-center text-[12px] font-bold text-[#F57A24] transition hover:bg-white/[0.06] sm:border-r lg:min-h-[120px] lg:px-6 lg:py-8"
          >
            <Plus size={15} className="mr-1" />
            Add Stat
          </button>
        )}
      </div>
    </>
  );
}

function FloatingCard({
  card,
  editable,
  path,
  onChangePath,
  index,
  onDelete,
  onCycleColor,
}) {
  const positions = [
    "absolute left-0 top-0 w-[165px] animate-[float_6s_ease-in-out_infinite] sm:top-[-16px] sm:w-[210px]",
    "absolute bottom-[35px] left-0 w-[155px] animate-[floatR_7.5s_ease-in-out_infinite] sm:bottom-[50px] sm:left-[-10px] sm:w-[185px]",
    "absolute right-0 top-[85px] w-[135px] animate-[float_5.5s_1s_ease-in-out_infinite] sm:right-[-16px] sm:top-[60px] sm:w-[155px]",
  ];

  const color = colorText[card.color] || colorText.orange;

  return (
    <div
      className={`${positions[index] || positions[index % positions.length]} rounded-[14px] border border-white/[0.08] bg-[#0e1c2e]/[0.9] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[20px] transition-all duration-300 hover:border-[#F57A24]/30 hover:shadow-[0_8px_32px_rgba(245,122,36,0.1)] sm:p-[18px]`}
    >
      {editable && (
        <div className="absolute right-2 top-2 z-[70] flex gap-1">
          <button
            type="button"
            onClick={onCycleColor}
            className="rounded-md bg-white/[0.08] px-2 py-1 text-[9px] font-bold text-white/45"
          >
            {card.color || "orange"}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-red-500/80 text-white"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      <EditableText
        as="p"
        value={card.eyebrow}
        editable={editable}
        path={[...path, "eyebrow"]}
        onChangePath={onChangePath}
        className="mb-1.5 text-[9px] font-bold uppercase tracking-[1px] text-white/30"
        editClassName="!text-white/60"
      />

      <EditableText
        as="p"
        value={card.value || "0"}
        editable={editable}
        path={[...path, "value"]}
        onChangePath={onChangePath}
        className={`text-[22px] font-black sm:text-[26px] ${color}`}
        editClassName="!text-white"
      />

      {card.description ? (
        <EditableText
          as="p"
          value={card.description}
          editable={editable}
          path={[...path, "description"]}
          onChangePath={onChangePath}
          className="mt-[3px] text-[10px] text-white/35"
          editClassName="!text-white/60"
        />
      ) : null}

      {index === 0 && (
        <>
          <div className="mt-2.5 h-[3px] overflow-hidden rounded-sm bg-white/[0.06]">
            <div
              className="h-full rounded-sm bg-gradient-to-r from-[#F57A24] to-[#F9B307]"
              style={{ width: `${card.progress || 78}%` }}
            />
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-[pulseDot_1.8s_infinite]" />

            <EditableText
              as="span"
              value={card.footer || "Live tracking"}
              editable={editable}
              path={[...path, "footer"]}
              onChangePath={onChangePath}
              className="text-[9px] text-white/35"
              editClassName="!text-white/60"
            />
          </div>
        </>
      )}

      {index === 1 && (
        <div className="mt-2 flex h-7 items-end gap-[3px]">
          <span className="h-[40%] w-2.5 rounded-t-sm bg-[#6CC2E9]/30" />
          <span className="h-[65%] w-2.5 rounded-t-sm bg-[#6CC2E9]/40" />
          <span className="h-[80%] w-2.5 rounded-t-sm bg-[#6CC2E9]/50" />
          <span className="h-full w-2.5 rounded-t-sm bg-[#6CC2E9]" />
          <span className="h-[85%] w-2.5 rounded-t-sm bg-[#6CC2E9]/40" />
        </div>
      )}
    </div>
  );
}

function StatCard({
  stat,
  editable,
  path,
  onChangePath,
  onDelete,
  onCycleColor,
}) {
  const color = colorText[stat.color] || colorText.orange;
  const line = lineColor[stat.color] || lineColor.orange;

  return (
    <div
      className={`group relative flex min-h-[110px] flex-col items-center justify-center overflow-hidden border-b border-white/[0.07] px-5 py-6 text-center transition-all duration-300 last:border-b-0 hover:bg-white/[0.03] sm:min-h-[120px] sm:border-r sm:last:border-r-0 lg:px-[60px] lg:py-8
      after:absolute after:left-0 after:right-0 after:top-0 after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100 ${line}`}
    >
      {editable && (
        <div className="absolute right-3 top-3 z-[50] flex gap-1">
          <button
            type="button"
            onClick={onCycleColor}
            className="rounded-md bg-white/[0.06] px-2 py-1 text-[9px] font-bold text-white/40"
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
          className={`text-center text-[34px] font-black leading-none tracking-[-1.5px] sm:text-[40px] ${color}`}
          editClassName="!text-white"
        />
      ) : (
        <Counter
          value={stat.value || "0"}
          className={`text-center text-[34px] font-black leading-none tracking-[-1.5px] sm:text-[40px] ${color}`}
        />
      )}

      <EditableText
        as="div"
        value={stat.label}
        editable={editable}
        path={[...path, "label"]}
        onChangePath={onChangePath}
        className="mt-2 text-center text-[11px] font-medium uppercase tracking-[0.8px] text-white/30 transition-colors group-hover:text-white/50"
        editClassName="!text-white/60"
      />
    </div>
  );
}
