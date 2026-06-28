import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Counter({ target, suffix = "" }) {
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
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    const elements = document.querySelectorAll(
      ".about-reveal, .about-reveal-left, .about-reveal-right",
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about-reveal-left {
          opacity: 0;
          transform: translateX(-36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .about-reveal-right {
          opacity: 0;
          transform: translateX(36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .about-delay-1 {
          transition-delay: 0.1s;
        }

        .about-delay-2 {
          transition-delay: 0.2s;
        }

        .about-delay-3 {
          transition-delay: 0.3s;
        }

        .about-delay-4 {
          transition-delay: 0.4s;
        }
      `}</style>

      <section className="grid border-t border-white/[0.07] bg-[#0e1c2e] text-white lg:grid-cols-2">
        {/* Image side */}
        <div className="about-reveal-left relative min-h-[480px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop"
            alt="Office"
            className="h-full w-full object-cover brightness-[0.6] saturate-[0.8]"
          />

          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,transparent_50%,#0e1c2e)] lg:block" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#0e1c2e_0%,transparent_25%)]" />

          <div className="absolute bottom-9 left-9 rounded-xl border border-white/[0.07] bg-[#0e1c2e]/90 px-[18px] py-3.5 backdrop-blur-[20px]">
            <div className="text-[28px] font-black leading-none text-[#F57A24]">
              2020
            </div>

            <div className="mt-[3px] text-[10px] uppercase tracking-[1px] text-white/35">
              Founded in Amman
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="about-reveal-right flex flex-col justify-center px-6 py-[72px] lg:px-[60px]">
          <div className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
            About Bytech
          </div>

          <h2 className="mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white">
            More than software.
          </h2>

          <p className="mb-6 text-sm leading-[1.82] text-white/50">
            We work as a technical and strategic partner for businesses,
            institutions, and educational organizations — turning ideas into
            scalable digital products. One team. One direction. No
            fragmentation.
          </p>

          <div className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MiniCard
              number={<Counter target={30} suffix="+" />}
              label="Projects"
              color="text-[#F57A24]"
              delay="about-delay-1"
            />

            <MiniCard
              number={<Counter target={6} suffix="+" />}
              label="Services"
              color="text-[#6CC2E9]"
              delay="about-delay-2"
            />

            <MiniCard
              number={<Counter target={4} />}
              label="Countries"
              color="text-[#F9B307]"
              delay="about-delay-3"
            />

            <MiniCard
              number={<Counter target={360} suffix="°" />}
              label="Coverage"
              color="text-[#2F88C4]"
              delay="about-delay-4"
            />
          </div>

          <Link
            to="/about"
            className="about-reveal about-delay-3 inline-block w-fit rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
          >
            Our Story →
          </Link>
        </div>
      </section>
    </>
  );
}

function MiniCard({ number, label, color, delay = "" }) {
  return (
    <div
      className={`about-reveal ${delay} rounded-[10px] border border-white/[0.07] bg-[#162840] p-[18px]`}
    >
      <div
        className={`mb-1 text-[30px] font-black leading-none tracking-[-1px] ${color}`}
      >
        {number}
      </div>

      <div className="text-[10px] uppercase tracking-[0.8px] text-white/30">
        {label}
      </div>
    </div>
  );
}
