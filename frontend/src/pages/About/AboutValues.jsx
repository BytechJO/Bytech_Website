const values = [
  {
    number: "01",
    title: "Integration over isolation.",
    desc: "The best digital outcomes happen when software, design, content, media, and marketing are built together — not handed off between separate vendors. Bytech exists to collapse that fragmentation into one unified team.",
    large: true,
  },
  {
    number: "02",
    title: "Architecture before speed.",
    desc: "We build for tomorrow, not just today. Every platform is designed to scale technically and commercially.",
  },
  {
    number: "03",
    title: "Craft meets function.",
    desc: "Design isn't decoration — every pixel serves a purpose, building trust and guiding users with precision.",
  },
  {
    number: "04",
    title: "Honest partnership.",
    desc: "We scope carefully, deliver what we promise, and stay honest when the path needs to change.",
  },
  {
    number: "05",
    title: "Education at the core.",
    desc: "EdTech is one of our deepest specializations — building learning systems that actually work.",
  },
];

export default function AboutValues() {
  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <div className="about-reveal mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
        Our Values
      </div>

      <h2 className="about-reveal about-delay-1 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]">
        What drives everything we do.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        {values.map((value, index) => (
          <article
            key={value.number}
            className={`about-reveal ${
              index > 0 ? `about-delay-${Math.min(index, 4)}` : ""
            } rounded-[14px] border border-white/[0.07] bg-[#112233] p-7 ${
              value.large ? "lg:col-span-2" : ""
            }`}
          >
            <div className="mb-2.5 text-[10px] font-bold tracking-[2px] text-white/[0.15]">
              {value.number}
            </div>

            <h3
              className={`mb-3 font-bold text-white ${
                value.large
                  ? "text-xl font-extrabold tracking-[-0.5px]"
                  : "text-[15px]"
              }`}
            >
              {value.title}
            </h3>

            <p
              className={`text-white/50 ${
                value.large
                  ? "text-[13px] leading-[1.75]"
                  : "text-xs leading-[1.65]"
              }`}
            >
              {value.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
