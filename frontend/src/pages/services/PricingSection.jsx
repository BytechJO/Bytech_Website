import { useEffect } from "react";
import { Link } from "react-router-dom";

const pricing = [
  {
    tier: "Starter",
    price: "$2,500",
    period: "One-time project fee",
    featured: false,
    button: "Get a Quote",
    buttonType: "ghost",
    delay: "pricing-delay-0",
    features: [
      ["✓", "Custom website (up to 8 pages)", true],
      ["✓", "Mobile-responsive design", true],
      ["✓", "Basic CMS integration", true],
      ["✓", "SEO fundamentals", true],
      ["✓", "14-day post-launch support", true],
      ["✗", "Mobile app development", false],
    ],
  },
  {
    tier: "Professional",
    price: "$6,500",
    period: "One-time project fee",
    featured: true,
    badge: "MOST POPULAR",
    button: "Start This Package",
    buttonType: "orange",
    delay: "pricing-delay-1",
    features: [
      ["✓", "Full web platform (unlimited pages)", true],
      ["✓", "Mobile app (iOS + Android)", true],
      ["✓", "Advanced CMS + integrations", true],
      ["✓", "LMS or interactive content module", true],
      ["✓", "3 revision rounds", true],
      ["✓", "30-day post-launch support", true],
    ],
  },
  {
    tier: "Enterprise",
    price: "Custom",
    period: "Scoped per project",
    featured: false,
    button: "Request a Proposal",
    buttonType: "ghost",
    customPrice: true,
    delay: "pricing-delay-2",
    features: [
      ["✓", "Everything in Professional", true],
      ["✓", "Full LMS platform build", true],
      ["✓", "Interactive e-book production", true],
      ["✓", "Media production package", true],
      ["✓", "Dedicated project manager", true],
      ["✓", "90-day support", true],
    ],
  },
];

export default function PricingSection() {
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

    const elements = document.querySelectorAll(".pricing-reveal");

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        <div className="pricing-reveal mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
          Investment
        </div>

        <h2 className="pricing-reveal pricing-delay-1 mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]">
          Transparent pricing.
        </h2>

        <p className="pricing-reveal pricing-delay-2 max-w-[520px] text-sm leading-[1.75] text-white/50">
          Flexible packages designed to match your project scope. Custom quotes
          available for enterprise requirements.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.tier}
              className={`pricing-reveal ${plan.delay} pricing-card-glow relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "pricing-featured border-[#F57A24]/35 bg-[#162840] shadow-[0_18px_60px_rgba(245,122,36,0.08)]"
                  : "border-white/[0.07] bg-[#112233] hover:border-[#F57A24]/35"
              }`}
            >
              {plan.featured && (
                <div className="absolute left-1/2 top-[-1px] z-[2] -translate-x-1/2 rounded-b-lg bg-[#F57A24] px-3.5 py-1 text-[10px] font-bold tracking-[1px] text-white">
                  {plan.badge}
                </div>
              )}

              <div
                className={`relative z-[1] mb-2.5 text-[11px] font-bold uppercase tracking-[1.5px] ${
                  plan.featured ? "text-[#F57A24]" : "text-white/35"
                }`}
              >
                {plan.tier}
              </div>

              <div
                className={`relative z-[1] mb-1 font-black tracking-[-1px] text-white ${
                  plan.customPrice ? "pt-1.5 text-[30px]" : "text-[40px]"
                }`}
              >
                {plan.price}
              </div>

              <div className="relative z-[1] mb-5 text-xs text-white/35">
                {plan.period}
              </div>

              <div className="relative z-[1] mb-5 h-px bg-white/[0.07]" />

              <div className="relative z-[1] mb-7 flex flex-col gap-2.5">
                {plan.features.map(([icon, text, active], index) => (
                  <div
                    key={text}
                    className={`pricing-reveal flex gap-2 text-xs text-white/55 ${
                      index === 0
                        ? "pricing-delay-0"
                        : index === 1
                          ? "pricing-delay-1"
                          : index === 2
                            ? "pricing-delay-2"
                            : "pricing-delay-3"
                    }`}
                  >
                    <span
                      className={`shrink-0 ${
                        active ? "text-[#F57A24]" : "text-white/20"
                      }`}
                    >
                      {icon}
                    </span>

                    <span className={active ? "" : "opacity-40"}>{text}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className={`relative z-[1] inline-block w-full rounded-lg px-[22px] py-2.5 text-center text-[13px] font-semibold no-underline transition-all duration-200 ${
                  plan.buttonType === "orange"
                    ? "bg-[#F57A24] text-white hover:-translate-y-px hover:bg-[#e06815]"
                    : "border border-white/[0.18] text-white/70 hover:border-white/35 hover:text-white"
                }`}
              >
                {plan.button}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
