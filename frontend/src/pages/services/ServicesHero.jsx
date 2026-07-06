import { useEffect } from "react";

export default function ServicesHero({ data = {} }) {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const image = data.image || "";
  const imageAlt = data.imageAlt || "Services";
  const badge = data.badge || "";
  const titleBefore = data.titleBefore || "";
  const titleHighlight = data.titleHighlight || "";
  const description = data.description || "";
  useEffect(() => {
    let observer;

    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
        },
      );

      document.querySelectorAll(".services-reveal").forEach((el) => {
        el.classList.remove("visible");
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [badge, titleBefore, titleHighlight, description]);
  return (
    <>
      <style>{`
       .services-reveal {
  opacity: 0;
  transform: translateY(36px);
  transition:
    opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}

.services-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.services-delay-1 {
  transition-delay: 0.1s;
}

.services-delay-2 {
  transition-delay: 0.2s;
}@keyframes servicesPulse {
  0%, 100% {
    opacity: .5;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes servicesOrb2 {
  0%,100% {
    transform: translate(0,0);
  }

  50% {
    transform: translate(-30px,40px);
  }
}
      `}</style>
      <section className="relative overflow-hidden bg-[#0e1c2e]">
        {image && (
          <img
            src={image}
            alt={imageAlt}
            className="h-[600px] w-full object-cover object-center brightness-[0.25] saturate-[0.6]"
          />
        )}

        <div className="pointer-events-none absolute bottom-[-100px] left-0 z-[1] h-[400px] w-[400px] rounded-full bg-[#2F88C4]/[0.08] blur-[80px] [animation:servicesOrb2_13s_ease-in-out_infinite]" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,#0e1c2e_0%,rgba(14,28,46,0.4)_60%)]" />

        <div className="absolute bottom-[110px] left-0 right-0 z-[2] px-6 lg:px-[60px]">
          <div className="max-w-[720px]">
            {badge && (
              <div className="services-reveal mb-6 inline-flex items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-[14px] py-[6px]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#F57A24] shadow-[0_0_0_6px_rgba(245,122,36,0.08)] [animation:servicesPulse_2s_infinite]" />

                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#F57A24]">
                  {badge}
                </span>
              </div>
            )}

            {(titleBefore || titleHighlight) && (
              <h1 className="services-reveal services-delay-1 mb-5 max-w-[520px] text-[42px] font-black leading-[1.05] tracking-[-2px] text-white sm:text-[56px] lg:text-[58px]">
                {titleBefore}{" "}
                {titleHighlight && (
                  <span className="bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent">
                    {titleHighlight}
                  </span>
                )}
              </h1>
            )}

            {description && (
              <p className="services-reveal services-delay-2 max-w-[600px] text-[15px] leading-[1.78] text-white/50 sm:text-base">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
