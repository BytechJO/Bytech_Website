import Ticker from "../components/Ticker.jsx";

export default function Contact() {
  return (
    <main className="relative overflow-x-hidden text-white">
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl animate-orb1" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl animate-orb2" />
        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))] rounded-[32px] overflow-hidden border border-white/10 bg-slate-950/70 shadow-2xl shadow-slate-950/30">
          <img
            className="h-[500px] w-full object-cover brightness-[0.35]"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop"
            alt="Contact"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 max-w-xl rounded-[28px] border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
              Get in Touch
            </p>
            <h1 className="mt-4 text-5xl font-black text-white">
              Let's build something{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                great.
              </span>
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Ready to start your project? Reach out and we'll get back to you
              within 24 hours with a tailored response to your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8 rounded-[32px] border border-white/10 bg-slate-950/60 p-8">
          <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400">
            Contact Information
          </p>
          <h2 className="text-4xl font-black text-white">
            We're ready to talk.
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: "✉",
                title: "Email",
                value: "services@bytechjo.com",
                accent: "bg-orange-500/10",
              },
              {
                icon: "📞",
                title: "Phone",
                value: "+962 7 7995 1000",
                accent: "bg-sky-500/10",
              },
              {
                icon: "📍",
                title: "Office",
                value:
                  "8th Circle, Prince Rashid Suburb, Building #78, Amman, Jordan 11831",
                accent: "bg-yellow-500/10",
              },
              {
                icon: "🌐",
                title: "Website",
                value: "www.bytechjo.com",
                accent: "bg-cyan-500/10",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-300 transition hover:border-orange-400/30"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${item.accent} flex h-12 w-12 items-center justify-center rounded-2xl text-lg`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Response Time
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/60 p-5 text-center">
                <p className="text-3xl font-black text-orange-400">&lt;24h</p>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-500">
                  Email Response
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/60 p-5 text-center">
                <p className="text-3xl font-black text-sky-300">Free</p>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-500">
                  Consultation
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-950/60 p-8">
          <p className="text-xl font-black text-white">Send us a message</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Fill in your details and we'll prepare a tailored proposal.
          </p>
          <form className="mt-8 space-y-4 text-sm text-slate-300">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-xs uppercase tracking-[0.35em] text-slate-500">
                  Full Name
                </span>
                <input
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-2">
                <span className="block text-xs uppercase tracking-[0.35em] text-slate-500">
                  Company
                </span>
                <input
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                  placeholder="Your company"
                />
              </label>
            </div>
            <label className="space-y-2">
              <span className="block text-xs uppercase tracking-[0.35em] text-slate-500">
                Email Address
              </span>
              <input
                type="email"
                className="w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                placeholder="your@email.com"
              />
            </label>
            <label className="space-y-2">
              <span className="block text-xs uppercase tracking-[0.35em] text-slate-500">
                Service of Interest
              </span>
              <select className="w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-orange-400">
                <option value="">Select a service...</option>
                <option>Web Platform Development</option>
                <option>Mobile Application</option>
                <option>LMS System</option>
                <option>Interactive Content / E-Book</option>
                <option>Media Production</option>
                <option>Digital Growth</option>
                <option>Enterprise / Custom</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="block text-xs uppercase tracking-[0.35em] text-slate-500">
                Project Brief
              </span>
              <textarea
                rows="4"
                className="w-full rounded-3xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                placeholder="Tell us about your project, goals, and timeline..."
              />
            </label>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-3xl bg-orange-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Send Message →
            </button>
          </form>
        </div>
      </section>

      <Ticker />
    </main>
  );
}
