import Ticker from "../components/Ticker.jsx";

export default function Blog() {
  const posts = [
    {
      title: "Why LMS platforms fail — and how to build one that doesn't",
      category: "EdTech",
      date: "June 15, 2026",
      duration: "6 min read",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop",
      description:
        "Most LMS platforms are designed for administrators, not learners. Here's what we've learned from building scalable learning systems across the Arab region.",
    },
    {
      title: "Integrating RAG into education platforms — a practical guide",
      category: "AI",
      date: "May 28, 2026",
      duration: "",
      image:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop",
      description:
        "How we built a content knowledge base for PMAA using GPT-4o and retrieval-augmented generation.",
    },
    {
      title: "The case for integrated digital delivery in 2026",
      category: "Design",
      date: "May 10, 2026",
      duration: "",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&auto=format&fit=crop",
      description:
        "Why the agency model is broken and what a unified ecosystem actually looks like in practice.",
    },
    {
      title: "Choosing the right mobile stack in 2026",
      category: "Mobile",
      date: "",
      duration: "",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=900&auto=format&fit=crop",
      description:
        "React Native vs Flutter — an honest comparison for product teams.",
    },
    {
      title: "B2B social media for publishers in the Arab world",
      category: "Growth",
      date: "",
      duration: "",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop",
      description:
        "What AIM Ambition taught us about bilingual content strategy.",
    },
    {
      title: "Interactive e-books — lessons from Mindful Kids G1",
      category: "Education",
      date: "",
      duration: "",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop",
      description:
        "How we converted a children's book into a full digital experience.",
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
            src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1400&auto=format&fit=crop"
            alt="Blog"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 max-w-xl rounded-[28px] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
              Insights
            </p>
            <h1 className="mt-4 text-5xl font-black text-white">
              Insights &{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                ideas.
              </span>
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Thoughts on digital transformation, EdTech, software development,
              and building scalable digital products — from the Bytech team.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] space-y-8 pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/60 transition hover:-translate-y-1">
            <div className="relative overflow-hidden">
              <img
                className="h-[320px] w-full object-cover brightness-[0.55]"
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop"
                alt="Blog"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full bg-orange-400 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-950">
                EdTech
              </div>
            </div>
            <div className="p-8">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                June 15, 2026 · 6 min read
              </p>
              <h2 className="mt-4 text-3xl font-black text-white">
                Why LMS platforms fail — and how to build one that doesn't
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Most LMS platforms are designed for administrators, not
                learners. Here’s what we've learned from building scalable
                learning systems across the Arab region.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {posts.slice(1, 3).map((post) => (
              <div
                key={post.title}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/60 transition hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    className="h-[140px] w-full object-cover brightness-[0.6]"
                    src={post.image}
                    alt={post.title}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-slate-400">
                    <span className="rounded-full bg-slate-800 px-3 py-1">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {posts.slice(3).map((post) => (
            <div
              key={post.title}
              className="group overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/60 transition hover:-translate-y-1"
            >
              <img
                className="h-40 w-full object-cover brightness-[0.6]"
                src={post.image}
                alt={post.title}
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Ticker />
    </main>
  );
}
