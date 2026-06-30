import { useEffect } from "react";

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

export default function Portfolio() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );

    document
      .querySelectorAll(".portfolio-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .portfolio-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portfolio-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .portfolio-delay-1 {
          transition-delay: 0.1s;
        }

        .portfolio-delay-2 {
          transition-delay: 0.2s;
        }

        .portfolio-delay-3 {
          transition-delay: 0.3s;
        }

        @keyframes portfolioOrb1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -30px);
          }
        }

        @keyframes portfolioOrb2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 40px);
          }
        }

        @keyframes portfolioPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes portfolioTicker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <main className="bg-[#0e1c2e] text-white">
        <PortfolioHero />
        <PortfolioProjects />
        <PortfolioCTA />
      </main>
    </>
  );
}

function PortfolioHero() {
  return (
    <section className="relative overflow-hidden bg-[#0e1c2e]">
      <img
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop"
        alt="Portfolio"
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-[0.25] saturate-[0.6]"
      />

      <div className="pointer-events-none absolute -right-[100px] -top-[150px] z-[1] h-[500px] w-[500px] rounded-full bg-[#F57A24]/[0.09] blur-[100px] [animation:portfolioOrb1_10s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute bottom-[-100px] left-0 z-[1] h-[400px] w-[400px] rounded-full bg-[#2F88C4]/[0.08] blur-[80px] [animation:portfolioOrb2_13s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(0deg,#0e1c2e_0%,rgba(14,28,46,0.4)_60%)]" />

      <div className="relative z-[2] px-6 pb-20 pt-[140px] sm:px-10 lg:px-[60px]">
        <div className="max-w-[720px]">
          <div className="portfolio-reveal mb-6 inline-flex items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F57A24] [animation:portfolioPulse_2s_infinite]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#F57A24]">
              Selected Work
            </span>
          </div>

          <h1 className="portfolio-reveal portfolio-delay-1 mb-[18px] text-[42px] font-black leading-[1.05] tracking-[-2px] text-white sm:text-[56px]">
            Brands that trust{" "}
            <span className="bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent">
              Bytech.
            </span>
          </h1>

          <p className="portfolio-reveal portfolio-delay-2 max-w-[600px] text-[15px] leading-[1.78] text-white/50 sm:text-base">
            Organizations that value structured execution, modern digital
            solutions, and long-term technical partnership — across education,
            business, publishing, and e-commerce.
          </p>
        </div>
      </div>
    </section>
  );
}

function PortfolioProjects() {
  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`portfolio-reveal portfolio-delay-${Math.min(
              index,
              3,
            )} group relative min-h-[280px] cursor-pointer overflow-hidden rounded-[18px] border border-white/[0.07] transition-transform duration-300 hover:-translate-y-1`}
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

              <h3 className="mb-2 text-xl font-bold text-white">
                {project.title}
              </h3>

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
        ))}
      </div>
    </section>
  );
}

function PortfolioCTA() {
  return (
    <section className="px-6 py-[72px] text-center sm:px-10 lg:px-[60px]">
      <h2 className="portfolio-reveal text-[30px] font-black leading-[1.1] tracking-[-1.2px] text-white sm:text-[32px]">
        Ready to be our next success story?
      </h2>

      <p className="portfolio-reveal portfolio-delay-1 mx-auto mb-8 mt-4 max-w-[500px] text-sm leading-[1.75] text-white/50">
        Let&apos;s discuss your project and build something that makes an
        impact.
      </p>

      <div className="portfolio-reveal portfolio-delay-2 flex flex-wrap justify-center gap-3">
        <a
          href="/contact"
          className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e06815]"
        >
          Start a Project →
        </a>

        <a
          href="/services"
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/60 transition hover:border-white/20 hover:text-white"
        >
          View Services
        </a>
      </div>
    </section>
  );
}


