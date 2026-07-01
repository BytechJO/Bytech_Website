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

export default function ServiceBlocks({ data = [] }) {
  const services = Array.isArray(data) ? data : [];

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

    const elements = document.querySelectorAll(
      ".service-reveal, .service-reveal-left, .service-reveal-right",
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [services.length]);

  if (services.length === 0) {
    return null;
  }

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

        .service-reveal-left {
          opacity: 0;
          transform: translateX(-42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-reveal-right {
          opacity: 0;
          transform: translateX(42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-reveal.visible,
        .service-reveal-left.visible,
        .service-reveal-right.visible {
          opacity: 1;
          transform: translate(0, 0);
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
        {services.map((service, index) => {
          const features = Array.isArray(service.features)
            ? service.features
            : [];

          const sectionBg =
            index % 2 === 0 ? "bg-[#0e1c2e]" : "bg-white/[0.01]";

          return (
            <div
              key={service.id || `${service.number}-${index}`}
              id={service.id}
              className={`border-b border-white/[0.07] px-6 py-[96px] last:border-b-0 lg:px-[60px] ${sectionBg}`}
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
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.badge || service.label || "Service"}
                      className="h-full w-full object-cover brightness-[0.7] saturate-[0.85] transition-transform duration-700 hover:scale-[1.04]"
                    />
                  )}

                  {service.badge && (
                    <div className="absolute bottom-5 left-5 rounded-[10px] border border-white/[0.07] bg-[#0e1c2e]/90 px-3.5 py-2.5 backdrop-blur-2xl">
                      <span className="text-[10px] font-bold text-[#F57A24]">
                        {service.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className={`${
                    service.reverse
                      ? "service-reveal-left lg:[direction:ltr]"
                      : "service-reveal-right"
                  }`}
                >
                  {(service.number || service.label) && (
                    <div className="service-reveal service-delay-1 mb-3 text-[11px] font-bold tracking-[2px] text-white/20">
                      {service.number}
                      {service.number && service.label ? " — " : ""}
                      {service.label}
                    </div>
                  )}

                  {(service.titleLine1 || service.titleLine2) && (
                    <h2 className="service-reveal service-delay-2 mb-3.5 text-[32px] font-black leading-[1.12] tracking-[-0.8px] text-white">
                      {service.titleLine1}

                      {service.titleLine2 && (
                        <>
                          <br />
                          {service.titleLine2}
                        </>
                      )}
                    </h2>
                  )}

                  {service.description && (
                    <p className="service-reveal service-delay-3 mb-6 max-w-[620px] text-sm leading-[1.8] text-white/50">
                      {service.description}
                    </p>
                  )}

                  {features.length > 0 && (
                    <div className="mb-7 flex flex-col gap-2.5">
                      {features.map((feature, featureIndex) => (
                        <div
                          key={`${feature}-${featureIndex}`}
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
                  )}

                  <SmartLink
                    to={service.buttonUrl}
                    className="service-reveal service-delay-4 inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
                  >
                    {service.buttonLabel || "Contact Us"}
                  </SmartLink>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
