import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Counter({ target, suffix = "", className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return;
        setDone(true);

        let cur = 0;
        const duration = 1800;
        const frame = 16;
        const step = target / (duration / frame);

        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          setValue(Math.floor(cur));

          if (cur >= target) {
            clearInterval(timer);
          }
        }, frame);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target, done]);

  return (
    <div ref={ref} className={`tabular-nums ${className}`}>
      {value}
      {suffix}
    </div>
  );
}

function StatCard({ number, label, color, lineColor }) {
  return (
    <div
      className={`group relative overflow-hidden border-b border-white/[0.07] px-5 py-6 transition-all duration-300 last:border-b-0 hover:bg-white/[0.03] sm:border-r sm:last:border-r-0 lg:px-[60px] lg:py-8
      after:absolute after:left-0 after:right-0 after:top-0 after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100 ${lineColor}`}
    >
      <div
        className={`text-[34px] font-black leading-none tracking-[-1.5px] sm:text-[40px] ${color}`}
      >
        {number}
      </div>

      <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.8px] text-white/30 transition-colors group-hover:text-white/50">
        {label}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <>
      <section className="relative grid min-h-screen grid-cols-1 items-center overflow-hidden bg-[#0e1c2e] px-4 pb-14 pt-[110px] text-white sm:px-6 lg:grid-cols-2 lg:px-[60px] lg:pb-20 lg:pt-[130px]">
        {/* Background Effects */}
        <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[460px] w-[460px] rounded-full bg-[#F57A24]/10 blur-[90px] animate-[orb1_10s_ease-in-out_infinite] sm:right-[-100px] sm:top-[-150px] sm:h-[600px] sm:w-[600px] sm:blur-[100px]" />

        <div className="pointer-events-none absolute bottom-[-140px] left-[-140px] h-[380px] w-[380px] rounded-full bg-[#2F88C4]/10 blur-[75px] animate-[orb2_13s_ease-in-out_infinite] sm:bottom-[-100px] sm:left-[-50px] sm:h-[500px] sm:w-[500px] sm:blur-[80px]" />

        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:42px_42px] sm:bg-[length:54px_54px]" />

        <div className="pointer-events-none absolute left-0 right-0 h-[120px] bg-[linear-gradient(180deg,transparent,rgba(47,136,196,0.04),transparent)] animate-[scan_7s_linear_infinite]" />

        {/* Left Content */}
        <div className="relative z-10">
          <div
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-[12px] py-[6px] animate-fade-in-up sm:mb-7 sm:px-[14px]"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#F57A24] animate-[pulseDot_2s_infinite]" />

            <span className="truncate text-[9px] font-bold uppercase tracking-[1.3px] text-[#F57A24] sm:text-[10px] sm:tracking-[1.5px]">
              Integrated Digital Ecosystem
            </span>
          </div>

          <h1
            className="mb-5 text-[46px] font-black leading-[0.95] tracking-[-2px] sm:text-[64px] lg:mb-6 lg:text-[72px] lg:tracking-[-2.5px] animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="block bg-gradient-to-r from-[#F57A24] to-[#F9B307] bg-clip-text text-transparent">
              Build.
            </span>

            <span className="block text-white">Launch.</span>

            <span className="block text-white/25 [-webkit-text-stroke:1px_rgba(255,255,255,0.1)]">
              Grow.
            </span>
          </h1>

          <p
            className="mb-8 max-w-[440px] text-[14px] leading-[1.75] text-white/50 sm:text-[15px] lg:mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            One team. One direction. Bytech delivers software, mobile apps,
            educational systems, interactive content, media production, and
            digital growth — all inside one professional ecosystem.
          </p>

          <div
            className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/services"
              className="inline-flex justify-center rounded-lg bg-[#F57A24] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(245,122,36,0.3)] transition-all duration-300 animate-[glow_3s_infinite] hover:-translate-y-1 hover:bg-[#e06815] hover:shadow-[0_0_30px_rgba(245,122,36,0.5)]"
            >
              Explore Services
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-[22px] py-3 text-[13px] font-medium text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:text-white"
            >
              Book a Call →
            </Link>
          </div>

          <div
            className="flex flex-wrap items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex shrink-0">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
              ].map((src, index) => (
                <div
                  key={src}
                  className={`h-8 w-8 overflow-hidden rounded-full border-2 border-[#0e1c2e] transition-transform hover:z-10 hover:scale-110 ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt="Team member"
                    className="h-full w-full object-cover grayscale-[0.3]"
                  />
                </div>
              ))}
            </div>

            <span className="max-w-[250px] text-xs leading-relaxed text-white/40 sm:max-w-none">
              Trusted by <strong className="text-[#F57A24]">30+</strong>{" "}
              organizations across the region
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div
          className="relative z-10 mt-12 h-[430px] sm:h-[500px] lg:mt-0 lg:h-[520px] animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="absolute inset-x-0 bottom-[70px] top-8 overflow-hidden rounded-[20px] transition-transform duration-700 hover:scale-[1.02] sm:bottom-[60px] sm:left-10 sm:right-0 sm:top-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop"
              alt="Bytech team collaborating on digital solutions"
              className="h-full w-full object-cover brightness-[0.65] saturate-[0.85]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,28,46,0.65),transparent_60%)]" />

            <div className="absolute inset-0 rounded-[20px] border border-white/[0.09]" />
          </div>

          {/* Card 1 */}
          <div className="absolute left-0 top-0 w-[165px] rounded-[14px] border border-white/[0.08] bg-[#0e1c2e]/[0.9] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[20px] animate-[float_6s_ease-in-out_infinite] transition-all duration-300 hover:border-[#F57A24]/30 hover:shadow-[0_8px_32px_rgba(245,122,36,0.1)] sm:top-[-16px] sm:w-[210px] sm:p-[18px]">
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[1px] text-white/30">
              Active Projects
            </p>

            <p className="text-[22px] font-black text-[#F57A24] sm:text-[26px]">
              30<span className="text-base">+</span>
            </p>

            <p className="mt-[3px] text-[10px] text-white/35">
              Delivered this year
            </p>

            <div className="mt-2.5 h-[3px] overflow-hidden rounded-sm bg-white/[0.06]">
              <div className="h-full w-[78%] rounded-sm bg-gradient-to-r from-[#F57A24] to-[#F9B307]" />
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-[pulseDot_1.8s_infinite]" />
              <span className="text-[9px] text-white/35">Live tracking</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="absolute bottom-[35px] left-0 w-[155px] rounded-[14px] border border-white/[0.08] bg-[#0e1c2e]/[0.9] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[20px] animate-[floatR_7.5s_ease-in-out_infinite] transition-all duration-300 hover:border-[#6CC2E9]/30 hover:shadow-[0_8px_32px_rgba(108,194,233,0.1)] sm:bottom-[50px] sm:left-[-10px] sm:w-[185px]">
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[1px] text-white/30">
              Satisfaction Rate
            </p>

            <p className="text-[22px] font-black text-[#6CC2E9] sm:text-[26px]">
              98%
            </p>

            <div className="mt-2 flex h-7 items-end gap-[3px]">
              <span className="h-[40%] w-2.5 rounded-t-sm bg-[#6CC2E9]/30" />
              <span className="h-[65%] w-2.5 rounded-t-sm bg-[#6CC2E9]/40" />
              <span className="h-[80%] w-2.5 rounded-t-sm bg-[#6CC2E9]/50" />
              <span className="h-full w-2.5 rounded-t-sm bg-[#6CC2E9]" />
              <span className="h-[85%] w-2.5 rounded-t-sm bg-[#6CC2E9]/40" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="absolute right-0 top-[85px] w-[135px] rounded-[14px] border border-white/[0.08] bg-[#0e1c2e]/[0.9] p-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[20px] animate-[float_5.5s_1s_ease-in-out_infinite] transition-all duration-300 hover:border-[#F9B307]/30 hover:shadow-[0_8px_32px_rgba(249,179,7,0.1)] sm:right-[-16px] sm:top-[60px] sm:w-[155px]">
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[1px] text-white/30">
              Coverage
            </p>

            <p className="text-[20px] font-black text-[#F9B307] sm:text-[22px]">
              360°
            </p>

            <p className="mt-1 text-[9px] text-white/30">
              Full digital journey
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 border-y border-white/[0.07] bg-[#0e1c2e] shadow-[0_-15px_40px_rgba(0,0,0,0.4)] sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          number={<Counter target={30} suffix="+" />}
          label="Projects Delivered"
          color="text-[#F57A24]"
          lineColor="after:bg-[#F57A24]"
        />

        <StatCard
          number={<Counter target={6} suffix="+" />}
          label="Core Service Areas"
          color="text-[#6CC2E9]"
          lineColor="after:bg-[#6CC2E9]"
        />

        <StatCard
          number={<Counter target={360} suffix="°" />}
          label="Digital Coverage"
          color="text-white"
          lineColor="after:bg-[#F9B307]"
        />

        <StatCard
          number={<Counter target={4} />}
          label="Countries Served"
          color="text-[#F9B307]"
          lineColor="after:bg-[#2F88C4]"
        />
      </div>
    </>
  );
}
