const featuredPost = {
  category: "EdTech",
  date: "June 15, 2026 · 6 min read",
  title: "Why LMS platforms fail — and how to build one that doesn't",
  desc: "Most LMS platforms are designed for administrators, not learners. Here's what we've learned from building scalable learning systems across the Arab region.",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop",
};

const sidePosts = [
  {
    category: "AI",
    date: "May 28, 2026",
    title: "Integrating RAG into education platforms — a practical guide",
    desc: "How we built a content knowledge base for PMAA using GPT-4o and retrieval-augmented generation.",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop",
    color: "blue",
  },
  {
    category: "Design",
    date: "May 10, 2026",
    title: "The case for integrated digital delivery in 2026",
    desc: "Why the agency model is broken and what a unified ecosystem actually looks like in practice.",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop",
    color: "orange",
  },
];

const smallPosts = [
  {
    title: "Choosing the right mobile stack in 2026",
    desc: "React Native vs Flutter — an honest comparison for product teams.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&auto=format&fit=crop",
    alt: "Mobile",
  },
  {
    title: "B2B social media for publishers in the Arab world",
    desc: "What AIM Ambition taught us about bilingual content strategy.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    alt: "Growth",
  },
  {
    title: "Interactive e-books — lessons from Mindful Kids G1",
    desc: "How we converted a children's book into a full digital experience.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop",
    alt: "Education",
  },
];

export default function BlogPosts() {
  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <FeaturedPost />
        <SidePosts />
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {smallPosts.map((post, index) => (
          <SmallPostCard key={post.title} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}

function FeaturedPost() {
  return (
    <article className="blog-reveal group relative min-h-[320px] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.07]">
      <img
        src={featuredPost.image}
        alt="Blog"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.55] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,28,46,0.98)_0%,rgba(14,28,46,0.1)_50%)]" />

      <div className="absolute left-5 top-5">
        <span className="rounded-full bg-[#F57A24] px-3 py-1 text-[10px] font-bold text-white">
          {featuredPost.category}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7">
        <div className="mb-2.5 text-[11px] text-white/35">
          {featuredPost.date}
        </div>

        <h2 className="mb-2.5 text-[22px] font-bold leading-[1.3] text-white">
          {featuredPost.title}
        </h2>

        <p className="text-xs leading-[1.6] text-white/50">
          {featuredPost.desc}
        </p>
      </div>
    </article>
  );
}

function SidePosts() {
  return (
    <div className="flex flex-col gap-4">
      {sidePosts.map((post, index) => (
        <article
          key={post.title}
          className={`blog-reveal blog-delay-${index + 1} group cursor-pointer overflow-hidden rounded-[14px] border border-white/[0.07] transition duration-300 hover:-translate-y-0.5`}
        >
          <img
            src={post.image}
            alt={post.category}
            className="h-[140px] w-full object-cover brightness-[0.6] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
          />

          <div className="bg-[#112233] px-5 py-[18px]">
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-[3px] text-[10px] font-bold ${
                  post.color === "blue"
                    ? "bg-[#2F88C4]/20 text-[#6CC2E9]"
                    : "bg-[#F57A24]/15 text-[#F57A24]"
                }`}
              >
                {post.category}
              </span>

              <span className="text-[10px] text-white/30">{post.date}</span>
            </div>

            <h3 className="mb-1.5 text-sm font-bold leading-[1.3] text-white">
              {post.title}
            </h3>

            <p className="text-[11px] leading-[1.6] text-white/50">
              {post.desc}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function SmallPostCard({ post, index }) {
  const delayClass =
    index === 1 ? "blog-delay-1" : index === 2 ? "blog-delay-2" : "";

  return (
    <article
      className={`blog-reveal ${delayClass} group cursor-pointer overflow-hidden rounded-xl border border-white/[0.07] transition duration-300 hover:-translate-y-0.5`}
    >
      <img
        src={post.image}
        alt={post.alt}
        className="h-[120px] w-full object-cover brightness-[0.6] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
      />

      <div className="bg-[#112233] p-[18px]">
        <h3 className="mb-1.5 text-[13px] font-bold text-white">
          {post.title}
        </h3>

        <p className="text-[11px] leading-[1.6] text-white/50">{post.desc}</p>
      </div>
    </article>
  );
}
