import Ticker from "../components/Ticker.jsx";

export default function About() {
  const timeline = [
    {
      year: "2020",
      title: "Bytech Founded",
      description:
        "Established in Amman with a focus on integrated digital delivery.",
    },
    {
      year: "2021",
      title: "EdTech Specialization",
      description:
        "Expanded into LMS platforms and interactive educational content.",
    },
    {
      year: "2023",
      title: "AI Integration Layer",
      description:
        "Launched AI-powered services including LLM integration and automated media workflows.",
    },
    {
      year: "2026 — Now",
      title: "One Ecosystem. Full Circle.",
      description:
        "Web, mobile, LMS, content, media, and growth — all connected inside one professional framework.",
    },
  ];

  const values = [
    {
      number: "01",
      title: "Integration over isolation.",
      description:
        "The best digital outcomes happen when software, design, content, media, and marketing are built together — not handed off between separate vendors.",
    },
    {
      number: "02",
      title: "Architecture before speed.",
      description:
        "We build for tomorrow, not just today. Every platform is designed to scale technically and commercially.",
    },
    {
      number: "03",
      title: "Craft meets function.",
      description:
        "Design isn't decoration — every pixel serves a purpose, building trust and guiding users with precision.",
    },
    {
      number: "04",
      title: "Honest partnership.",
      description:
        "We scope carefully, deliver what we promise, and stay honest when the path needs to change.",
    },
    {
      number: "05",
      title: "Education at the core.",
      description:
        "EdTech is one of our deepest specializations — building learning systems that actually work.",
    },
  ];

  return (
    <main className="relative overflow-x-hidden text-white">
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl animate-orb1" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl animate-orb2" />
        <div className="absolute inset-0 bg-[length:54px_54px] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />
        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/30">
            <div className="relative h-[500px] overflow-hidden">
              <img
                className="h-full w-full object-cover brightness-[0.35]"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop"
                alt="About Bytech"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute right-0 top-0 rounded-bl-[32px] rounded-tr-[32px] border border-white/10 bg-slate-950/80 p-6 text-slate-300 backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
                  Our Story
                </p>
                <h1 className="mt-4 max-w-2xl text-5xl font-black tracking-[-0.05em] text-white">
                  More than{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    software.
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                  Bytech was built on one belief — great digital products come
                  from connected teams, not disconnected vendors. We build
                  ecosystems, not isolated services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] space-y-20 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="sec-eyebrow text-[11px] uppercase tracking-[0.35em] text-orange-400">
              The Beginning
            </p>
            <h2 className="text-4xl font-black text-white">
              Started with one question.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Why is digital delivery so fragmented? Every organization we spoke
              to had the same problem — five different vendors, no single source
              of truth, no consistent vision.
            </p>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Bytech was the answer. One team. One direction. One ecosystem
              handling everything from concept to growth. Today we serve
              businesses, educational institutions, and publishers across Jordan
              and the Arab region.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Founded 2020",
                "Amman, Jordan",
                "30+ Projects",
                "4 Countries",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="relative rounded-3xl border border-white/10 bg-slate-950/60 p-6 pl-16"
              >
                <div className="absolute left-6 top-6 h-11 w-11 rounded-2xl border border-orange-400/20 bg-slate-900 text-center text-sm font-black leading-11 text-orange-400">
                  {item.year.slice(-2)}
                </div>
                <p className="text-xs uppercase tracking-[0.35em] text-orange-400">
                  {item.year}
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <p className="sec-eyebrow text-[11px] uppercase tracking-[0.35em] text-orange-400">
            Our Values
          </p>
          <h2 className="text-4xl font-black text-white">
            What drives everything we do.
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {values.map((item) => (
              <div
                key={item.number}
                className="rounded-3xl border border-white/10 bg-slate-950/60 p-7"
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                  {item.number}
                </p>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/60 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop"
              alt="Office"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400">
              Location
            </p>
            <h2 className="text-4xl font-black text-white">
              Based in Amman, serving the region.
            </h2>
            <p className="text-sm leading-7 text-slate-400">
              Our headquarters is in Amman, Jordan — strategically positioned to
              serve clients across the Arab world with on-site, hybrid, and
              fully remote delivery models.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                <span className="text-lg">📍</span>
                <span>8th Circle, Prince Rashid Suburb, Amman</span>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                <span className="text-lg">✉</span>
                <span>services@bytechjo.com</span>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                <span className="text-lg">🌍</span>
                <span>Jordan · Palestine · Saudi Arabia · Qatar</span>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Start a Conversation →
            </a>
          </div>
        </div>
      </section>

      <Ticker />
    </main>
  );
}
