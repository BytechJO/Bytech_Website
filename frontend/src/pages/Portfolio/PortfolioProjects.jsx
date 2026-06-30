const projects = [
  {
    company: "PMAA Education Group",
    title: "LMS Platform & Domain Migration",
    desc: "Ground-up LMS rebuild replacing legacy Moodle system — 5-phase architecture with AI knowledge base layer.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop",
    tags: ["LMS", "AI Integration", "Education"],
  },
  {
    company: "AIM Ambition",
    title: "Social Media Strategy & Content Plan",
    desc: "Bilingual B2B social media — 20 images + 8 reels monthly across Instagram and Facebook.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format&fit=crop",
    tags: ["Social Media", "B2B", "Bilingual"],
  },
  {
    company: "Ruwad Al Hayah",
    title: "Educational Services Website",
    desc: "Bilingual website targeting Gulf school owners — clean architecture modeled on BESA standards.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop",
    tags: ["Web Design", "Arabic/English", "Gulf Market"],
  },
  {
    company: "Mindful Kids G1",
    title: "Interactive E-Book Production",
    desc: "Children's book converted to interactive e-book with 3D characters and dual-voiceover promotional video.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&auto=format&fit=crop",
    tags: ["Interactive Content", "3D Design", "Video"],
  },
];

export default function PortfolioProjects() {
  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <PortfolioProjectCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function PortfolioProjectCard({ project, index }) {
  const delayClass =
    index === 1
      ? "portfolio-delay-1"
      : index === 2
        ? "portfolio-delay-2"
        : index === 3
          ? "portfolio-delay-3"
          : "";

  return (
    <article
      className={`portfolio-reveal ${delayClass} group relative min-h-[280px] cursor-pointer overflow-hidden rounded-[18px] border border-white/[0.07] transition-transform duration-300 hover:-translate-y-1`}
    >
      <img
        src={project.image}
        alt={project.company}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.55] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,28,46,0.98)_0%,rgba(14,28,46,0.2)_50%)]" />

      <div className="absolute inset-x-0 bottom-0 p-7">
        <div className="mb-2 text-[9px] font-bold uppercase tracking-[1.5px] text-[#F57A24]">
          {project.company}
        </div>

        <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>

        <p className="mb-3.5 text-xs leading-[1.6] text-white/50">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-[3px] text-[10px] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
