import Ticker from "../components/Ticker.jsx";

export default function Portfolio() {
  const projects = [
    {
      name: "PMAA Education Group",
      title: "LMS Platform & Domain Migration",
      description:
        "Ground-up LMS rebuild replacing legacy Moodle system — 5-phase architecture with AI knowledge base layer.",
      tags: ["LMS", "AI Integration", "Education"],
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop",
    },
    {
      name: "AIM Ambition",
      title: "Social Media Strategy & Content Plan",
      description:
        "Bilingual B2B social media — 20 images + 8 reels monthly across Instagram and Facebook.",
      tags: ["Social Media", "B2B", "Bilingual"],
      image:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format&fit=crop",
    },
    {
      name: "Ruwad Al Hayah",
      title: "Educational Services Website",
      description:
        "Bilingual website targeting Gulf school owners — clean architecture modeled on BESA standards.",
      tags: ["Web Design", "Arabic/English", "Gulf Market"],
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop",
    },
    {
      name: "Mindful Kids G1",
      title: "Interactive E-Book Production",
      description:
        "Children's book converted to interactive e-book with 3D characters and dual-voiceover promotional video.",
      tags: ["Interactive Content", "3D Design", "Video"],
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&auto=format&fit=crop",
    },
  ];

  return (
    <main className="relative overflow-x-hidden text-white">
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl animate-orb1" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl animate-orb2" />
        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))] rounded-[32px] overflow-hidden border border-white/10 bg-slate-950/70 shadow-2xl shadow-slate-950/30">
          <img
            className="h-[500px] w-full object-cover brightness-[0.35]"
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop"
            alt="Portfolio"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 max-w-xl rounded-[28px] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
              Selected Work
            </p>
            <h1 className="mt-4 text-5xl font-black text-white">
              Brands that trust{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Bytech.
              </span>
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Organizations that value structured execution, modern digital
              solutions, and long-term technical partnership — across education,
              business, publishing, and e-commerce.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] space-y-16 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.name}
              className="reveal group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/50 transition hover:-translate-y-1 hover:bg-slate-950/80"
            >
              <div className="relative overflow-hidden">
                <img
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 brightness-[0.65]"
                  src={project.image}
                  alt={project.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              </div>
              <div className="space-y-4 p-7">
                <div className="text-[10px] uppercase tracking-[0.35em] text-orange-400">
                  {project.name}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm leading-7 text-slate-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/50 p-10 text-center">
          <h2 className="text-3xl font-black text-white">
            Ready to be our next success story?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-7 text-slate-400">
            Let's discuss your project and build something that makes an impact.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Start a Project →
            </a>
            <a
              href="/services"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      <Ticker />
    </main>
  );
}
