const badges = ["Founded 2020", "Amman, Jordan", "30+ Projects", "4 Countries"];

const timeline = [
  {
    short: "20",
    year: "2020",
    title: "Bytech Founded",
    desc: "Established in Amman with a focus on integrated digital delivery.",
    active: "orange",
  },
  {
    short: "21",
    year: "2021",
    title: "EdTech Specialization",
    desc: "Expanded into LMS platforms and interactive educational content.",
  },
  {
    short: "23",
    year: "2023",
    title: "AI Integration Layer",
    desc: "Launched AI-powered services including LLM integration and automated media workflows.",
  },
  {
    short: "26",
    year: "2026 — Now",
    title: "One Ecosystem. Full Circle.",
    desc: "Web, mobile, LMS, content, media, and growth — all connected inside one professional framework.",
    active: "yellow",
  },
];

export default function AboutStory() {
  return (
    <section className="grid grid-cols-1 gap-14 border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-[60px]">
      <div className="about-reveal-l">
        <div className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
          The Beginning
        </div>

        <h2 className="mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white">
          Started with one
          <br />
          question.
        </h2>

        <p className="mb-4 text-sm leading-[1.82] text-white/50">
          Why is digital delivery so fragmented? Every organization we spoke to
          had the same problem — five different vendors, no single source of
          truth, no consistent vision.
        </p>

        <p className="mb-6 text-sm leading-[1.82] text-white/50">
          Bytech was the answer. One team. One direction. One ecosystem handling
          everything from concept to growth. Today we serve businesses,
          educational institutions, and publishers across Jordan and the Arab
          region.
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/[0.07] bg-white/[0.04] px-4 py-[7px] text-[11px] font-semibold text-white/50"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="about-reveal-r relative flex flex-col pl-7">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-[linear-gradient(180deg,#F57A24,#2F88C4,transparent)] opacity-30" />

        {timeline.map((item, index) => (
          <div
            key={item.year}
            className={`about-timeline-item relative flex gap-6 ${
              index !== timeline.length - 1 ? "pb-8" : ""
            }`}
            style={{
              transitionDelay: `${index * 0.18}s`,
            }}
          >
            <div
              className={`z-[1] mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border bg-[#0e1c2e] text-[9px] font-bold ${
                item.active === "orange"
                  ? "border-[#F57A24] text-[#F57A24]"
                  : item.active === "yellow"
                    ? "border-[#F9B307] text-[#F9B307]"
                    : "border-white/[0.07] text-white/30"
              }`}
            >
              {item.short}
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold tracking-[1px] text-[#F57A24]">
                {item.year}
              </div>

              <h3 className="mb-1 text-sm font-bold text-white">
                {item.title}
              </h3>

              <p className="text-xs leading-[1.6] text-white/50">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
