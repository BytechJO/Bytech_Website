import Ticker from "../components/Ticker.jsx";

export default function Education() {
  return (
    <main className="relative overflow-x-hidden text-white">
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl animate-orb1" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl animate-orb2" />
        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))] rounded-[32px] overflow-hidden border border-white/10 bg-slate-950/70 shadow-2xl shadow-slate-950/30">
          <img
            className="h-[500px] w-full object-cover brightness-[0.35]"
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&auto=format&fit=crop"
            alt="Education"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 max-w-xl rounded-[28px] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
              EdTech
            </p>
            <h1 className="mt-4 text-5xl font-black text-white">
              A strong{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                EdTech focus.
              </span>
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Education is one of Bytech's core specializations. We build LMS
              platforms, academic systems, digital assessments, and interactive
              learning environments for schools, institutions, and publishers.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-[min(1200px,calc(100%-2rem))] space-y-20 pb-20">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/60 overflow-hidden">
            <img
              className="h-[420px] w-full object-cover brightness-[0.65]"
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop"
              alt="LMS"
            />
          </div>
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
              LMS Systems
            </p>
            <h2 className="text-4xl font-black text-white">
              Learning platforms that actually work.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              We design and build custom LMS platforms for schools,
              universities, and training institutes — architected for scale,
              ease of management, and a seamless learner experience.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              {[
                "Custom course builder & content management",
                "Student progress tracking & analytics",
                "Teacher productivity tools",
                "AI-powered content knowledge base",
                "Mobile-first responsive design",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-orange-400" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href="/contact"
              className="inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Build Your LMS →
            </a>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-950/40 p-8">
          <p className="sec-eyebrow text-[11px] uppercase tracking-[0.35em] text-orange-400">
            Interactive Content
          </p>
          <h2 className="mt-4 text-4xl font-black text-white">
            Books, reimagined.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Printed educational materials transformed into rich digital
            experiences that make learning more engaging and effective.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Interactive E-Books",
                description:
                  "PDFs and printed books converted into HTML5 e-books with embedded activities, audio narration, and visual media.",
                image:
                  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop",
              },
              {
                title: "3D Character Animation",
                description:
                  "2D illustrations converted to 3D animated characters for promotional videos and interactive learning experiences.",
                image:
                  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop",
              },
              {
                title: "Digital Assessments",
                description:
                  "Interactive quizzes, exams, and graded activities integrated directly into the learning flow.",
                image:
                  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&auto=format&fit=crop",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-950/60 overflow-hidden"
              >
                <img
                  className="h-44 w-full object-cover brightness-[0.65]"
                  src={item.image}
                  alt={item.title}
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] rounded-[32px] border border-white/10 bg-slate-950/40 p-8">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
              AI in Education
            </p>
            <h2 className="text-4xl font-black text-white">
              Intelligence layer for learning.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              We integrate AI into educational platforms — from personalized
              learning paths to intelligent content recommendations and
              automated assessment feedback.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              {[
                "RAG-powered content knowledge base (GPT-4o)",
                "Personalized learning paths",
                "Automated grading & feedback",
                "Learning analytics dashboard",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-orange-400" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href="/contact"
              className="inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Explore AI Solutions →
            </a>
          </div>
          <div className="rounded-[32px] overflow-hidden border border-white/10 bg-slate-950/60">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop"
              alt="AI in Education"
            />
          </div>
        </section>
      </div>

      <Ticker />
    </main>
  );
}
