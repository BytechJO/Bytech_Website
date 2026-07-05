import { useEffect } from "react";
import { Link } from "react-router-dom";

function SmartLink({ to, className, children }) {
  if (!to) {
    return null;
  }

  const isExternal = /^https?:\/\//i.test(to);

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function normalizeFeature(feature) {
  if (Array.isArray(feature)) {
    return {
      icon: feature[0],
      text: feature[1],
      active: typeof feature[2] === "boolean" ? feature[2] : true,
    };
  }

  return {
    icon: feature?.icon,
    text: feature?.text || "",
    active: typeof feature?.active === "boolean" ? feature.active : true,
  };
}

export default function PricingSection({ data = {} }) {
  const plans = Array.isArray(data.plans) ? data.plans : [];
  const featuresSignature = plans
    .map((plan) => (Array.isArray(plan.features) ? plan.features.length : 0))
    .join("|");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const elements = document.querySelectorAll(".pricing-reveal");

    elements.forEach((el) => {
      el.classList.remove("visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [plans.length, featuresSignature]);
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const eyebrow = data.eyebrow || "";
  const title = data.title || "";
  const description = data.description || "";

  return (
    <>
      <style>{`
        .pricing-reveal {
          opacity: 0;
          transform: translateY(38px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pricing-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pricing-delay-0 {
          transition-delay: 0s;
        }

        .pricing-delay-1 {
          transition-delay: 0.12s;
        }

        .pricing-delay-2 {
          transition-delay: 0.24s;
        }

        .pricing-delay-3 {
          transition-delay: 0.36s;
        }

        .pricing-card-glow::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(
            circle at top,
            rgba(245, 122, 36, 0.22),
            transparent 42%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .pricing-card-glow:hover::before {
          opacity: 1;
        }

        .pricing-featured {
          transform: translateY(0);
        }

        .pricing-featured.visible {
          transform: translateY(-8px);
        }

        @media (max-width: 1024px) {
          .pricing-featured.visible {
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="border-y border-white/[0.07] bg-[#112233] px-6 py-[72px] text-white lg:px-[60px]">
        {eyebrow && (
          <div className="pricing-reveal mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
            {eyebrow}
          </div>
        )}

        {title && (
          <h2 className="pricing-reveal pricing-delay-1 mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]">
            {title}
          </h2>
        )}

        {description && (
          <p className="pricing-reveal pricing-delay-2 max-w-[520px] text-sm leading-[1.75] text-white/50">
            {description}
          </p>
        )}

        {plans.length > 0 && (
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const features = Array.isArray(plan.features)
                ? plan.features
                : [];

              const isCustomPrice =
                plan.customPrice ||
                String(plan.price).toLowerCase() === "custom";

              return (
                <div
                  key={plan.tier || index}
                  className={`pricing-reveal pricing-delay-${Math.min(
                    index,
                    2,
                  )} pricing-card-glow relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    plan.featured
                      ? "pricing-featured border-[#F57A24]/35 bg-[#162840] shadow-[0_18px_60px_rgba(245,122,36,0.08)]"
                      : "border-white/[0.07] bg-[#112233] hover:border-[#F57A24]/35"
                  }`}
                >
                  {plan.featured && plan.badge && (
                    <div className="absolute left-1/2 top-[-1px] z-[2] -translate-x-1/2 rounded-b-lg bg-[#F57A24] px-3.5 py-1 text-[10px] font-bold tracking-[1px] text-white">
                      {plan.badge}
                    </div>
                  )}

                  {plan.tier && (
                    <div
                      className={`relative z-[1] mb-2.5 text-[11px] font-bold uppercase tracking-[1.5px] ${
                        plan.featured ? "text-[#F57A24]" : "text-white/35"
                      }`}
                    >
                      {plan.tier}
                    </div>
                  )}

                  {plan.price && (
                    <div
                      className={`relative z-[1] mb-1 font-black tracking-[-1px] text-white ${
                        isCustomPrice ? "pt-1.5 text-[30px]" : "text-[40px]"
                      }`}
                    >
                      {plan.price}
                    </div>
                  )}

                  {plan.period && (
                    <div className="relative z-[1] mb-5 text-xs text-white/35">
                      {plan.period}
                    </div>
                  )}

                  <div className="relative z-[1] mb-5 h-px bg-white/[0.07]" />

                  {features.length > 0 && (
                    <div className="relative z-[1] mb-7 flex flex-col gap-2.5">
                      {features.map((rawFeature, featureIndex) => {
                        const feature = normalizeFeature(rawFeature);
                        const active = feature.active;

                        return (
                          <div
                            key={`${feature.text}-${featureIndex}`}
                            className={`pricing-reveal flex gap-2 text-xs text-white/55 ${
                              featureIndex === 0
                                ? "pricing-delay-0"
                                : featureIndex === 1
                                  ? "pricing-delay-1"
                                  : featureIndex === 2
                                    ? "pricing-delay-2"
                                    : "pricing-delay-3"
                            }`}
                          >
                            <span
                              className={`shrink-0 ${
                                active ? "text-[#F57A24]" : "text-white/20"
                              }`}
                            >
                              {feature.icon || (active ? "✓" : "✗")}
                            </span>

                            <span className={active ? "" : "opacity-40"}>
                              {feature.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <SmartLink
                    to={plan.buttonUrl || "/contact"}
                    className={`relative z-[1] inline-block w-full rounded-lg px-[22px] py-2.5 text-center text-[13px] font-semibold no-underline transition-all duration-200 ${
                      plan.buttonType === "orange" || plan.featured
                        ? "bg-[#F57A24] text-white hover:-translate-y-px hover:bg-[#e06815]"
                        : "border border-white/[0.18] text-white/70 hover:border-white/35 hover:text-white"
                    }`}
                  >
                    {plan.buttonLabel || plan.button || "Get a Quote"}
                  </SmartLink>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
