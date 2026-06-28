import { useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    id: "web",
    number: "01",
    label: "WEB PLATFORMS",
    badge: "Web Platforms",
    badgeColor: "text-[#F57A24]",
    title: (
      <>
        Advanced websites,
        <br />
        built for scale.
      </>
    ),
    description:
      "We build websites, portals, e-commerce solutions, and custom web systems that combine strong UX design with technical architecture — ready to grow with your business from day one.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&auto=format&fit=crop",
    features: [
      "Custom website design & development",
      "E-commerce platforms & payment integration",
      "Admin portals & internal dashboards",
      "CMS integration (WordPress, Headless, custom)",
      "Performance optimization & SEO foundation",
    ],
    button: "Start a Web Project →",
    reverse: false,
    bg: "bg-[#0e1c2e]",
  },
  {
    id: "mobile",
    number: "02",
    label: "MOBILE APPLICATIONS",
    badge: "Mobile Apps",
    badgeColor: "text-[#2F88C4]",
    title: (
      <>
        Android & iOS,
        <br />
        polished to perfection.
      </>
    ),
    description:
      "Native and cross-platform mobile applications built with React Native or Flutter — delivering a seamless user experience across both platforms without compromising on quality or performance.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&auto=format&fit=crop",
    features: [
      "iOS & Android development",
      "React Native / Flutter cross-platform",
      "UI/UX design for mobile-first users",
      "API integration & backend connectivity",
      "App Store & Google Play submission",
    ],
    button: "Start a Mobile Project →",
    reverse: true,
    bg: "bg-white/[0.01]",
  },
  {
    id: "media",
    number: "05",
    label: "MEDIA PRODUCTION",
    badge: "Media Production",
    badgeColor: "text-[#F9B307]",
    title: (
      <>
        Visual storytelling
        <br />
        at scale.
      </>
    ),
    description:
      "From AI-assisted video creation to live production and branded content — we help organizations communicate their message through powerful visual media that drives results.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&auto=format&fit=crop",
    features: [
      "Corporate video production & editing",
      "AI-powered video generation",
      "Motion graphics & animation",
      "Social media video content",
      "Branded visual identity assets",
    ],
    button: "Start a Media Project →",
    reverse: false,
    bg: "bg-[#0e1c2e]",
  },
  {
    id: "growth",
    number: "06",
    label: "DIGITAL GROWTH",
    badge: "Digital Growth",
    badgeColor: "text-[#6CC2E9]",
    title: (
      <>
        Measurable growth,
        <br />
        data-driven results.
      </>
    ),
    description:
      "We manage your digital presence across all channels — from SEO and social media to paid campaigns on Google and Meta — with full transparency and measurable KPIs tied to your business goals.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop",
    features: [
      "Social media management & content planning",
      "Google Ads & Meta Ads campaign management",
      "SEO strategy & implementation",
      "Monthly performance reporting & analytics",
      "Email marketing & automation",
    ],
    button: "Start Growing →",
    reverse: true,
    bg: "bg-white/[0.01]",
  },
];

export default function ServiceBlocks() {
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
      ".service-reveal, .service-reveal-left, .service-reveal-right",
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .service-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .service-reveal-left {
          opacity: 0;
          transform: translateX(-42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .service-reveal-right {
          opacity: 0;
          transform: translateX(42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .service-delay-1 {
          transition-delay: 0.1s;
        }

        .service-delay-2 {
          transition-delay: 0.2s;
        }

        .service-delay-3 {
          transition-delay: 0.3s;
        }

        .service-delay-4 {
          transition-delay: 0.4s;
        }

        .service-delay-5 {
          transition-delay: 0.5s;
        }
      `}</style>

      <section className="bg-[#0e1c2e] text-white">
        {services.map((service, index) => (
          <div
            key={index}
            id={service.id}
            className={`border-b border-white/[0.07] px-6 py-[96px] last:border-b-0 lg:px-[60px] ${service.bg}`}
          >
            <div
              className={`service-reveal grid items-center gap-[60px] lg:grid-cols-2 ${
                service.reverse ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div
                className={`${
                  service.reverse
                    ? "service-reveal-right lg:[direction:ltr]"
                    : "service-reveal-left"
                } relative h-[380px] overflow-hidden rounded-2xl`}
              >
                <img
                  src={service.image}
                  alt={service.badge}
                  className="h-full w-full object-cover brightness-[0.7] saturate-[0.85] transition-transform duration-700 hover:scale-[1.04]"
                />

                <div className="absolute bottom-5 left-5 rounded-[10px] border border-white/[0.07] bg-[#0e1c2e]/90 px-3.5 py-2.5 backdrop-blur-2xl">
                  <span
                    className={`text-[10px] font-bold ${service.badgeColor}`}
                  >
                    {service.badge}
                  </span>
                </div>
              </div>

              <div
                className={`${
                  service.reverse
                    ? "service-reveal-left lg:[direction:ltr]"
                    : "service-reveal-right"
                }`}
              >
                <div className="service-reveal service-delay-1 mb-3 text-[11px] font-bold tracking-[2px] text-white/20">
                  {service.number} — {service.label}
                </div>

                <h2 className="service-reveal service-delay-2 mb-3.5 text-[32px] font-black leading-[1.12] tracking-[-0.8px] text-white">
                  {service.title}
                </h2>

                <p className="service-reveal service-delay-3 mb-6 max-w-[620px] text-sm leading-[1.8] text-white/50">
                  {service.description}
                </p>

                <div className="mb-7 flex flex-col gap-2.5">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={feature}
                      className={`service-reveal flex items-start gap-2.5 text-[13px] text-white/55 before:mt-px before:shrink-0 before:text-[#F57A24] before:content-['→'] ${
                        featureIndex === 0
                          ? "service-delay-1"
                          : featureIndex === 1
                            ? "service-delay-2"
                            : featureIndex === 2
                              ? "service-delay-3"
                              : featureIndex === 3
                                ? "service-delay-4"
                                : "service-delay-5"
                      }`}
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="service-reveal service-delay-4 inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
                >
                  {service.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
