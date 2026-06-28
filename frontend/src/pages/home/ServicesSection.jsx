import { useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    name: "Web Platforms",
    description:
      "Advanced websites, portals, e-commerce, and custom systems built for scale.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop",
    to: "/services#web",
    line: "after:bg-[#F57A24]",
    revealDelay: "delay-0",
  },
  {
    number: "02",
    name: "Mobile Applications",
    description: "Android and iOS apps with strong UX and technical stability.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop",
    to: "/services#mobile",
    line: "after:bg-[#2F88C4]",
    revealDelay: "delay-1",
  },
  {
    number: "03",
    name: "LMS Systems",
    description:
      "Learning platforms and digital assessments for schools and institutions.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop",
    to: "/education",
    line: "after:bg-[#F9B307]",
    revealDelay: "delay-2",
  },
  {
    number: "04",
    name: "Interactive Content",
    description:
      "Books transformed into digital experiences with multimedia and activities.",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop",
    to: "/education#ebooks",
    line: "after:bg-[#6CC2E9]",
    revealDelay: "delay-0",
  },
  {
    number: "05",
    name: "Media Production",
    description:
      "AI video creation, editing, and branded content for business and education.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop",
    to: "/services#media",
    line: "after:bg-[#F57A24]",
    revealDelay: "delay-1",
  },
  {
    number: "06",
    name: "Digital Growth",
    description: "Social media, Google Ads, Meta Ads with measurable outcomes.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    to: "/services#growth",
    line: "after:bg-[#2F88C4]",
    revealDelay: "delay-2",
  },
];

export default function ServicesSection() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".services-reveal");

    elements.forEach((el) => reveal.observe(el));

    return () => reveal.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .services-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .services-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .services-reveal.delay-0 {
          transition-delay: 0s;
        }

        .services-reveal.delay-1 {
          transition-delay: 0.1s;
        }

        .services-reveal.delay-2 {
          transition-delay: 0.2s;
        }

        .services-reveal.delay-3 {
          transition-delay: 0.3s;
        }
      `}</style>

      <section className="bg-[#0e1c2e] px-6 py-[88px] text-white lg:px-[60px]">
        <div className="mb-11 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="services-reveal mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
              Services
            </div>

            <h2 className="services-reveal delay-1 mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]">
              Core capabilities.
            </h2>

            <p className="services-reveal delay-2 max-w-[520px] text-sm leading-[1.75] text-white/50">
              Software, design, content, media, and marketing — inside one
              delivery framework.
            </p>
          </div>

          <Link
            to="/services"
            className="services-reveal delay-2 inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-[22px] py-2.5 text-[13px] font-medium text-white/60 no-underline transition-all duration-200 hover:border-white/20 hover:text-white"
          >
            View All Services →
          </Link>
        </div>

        <div className="grid overflow-hidden rounded-[18px] bg-white/[0.07] gap-px md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.to}
              className={`services-reveal ${service.revealDelay} group relative block overflow-hidden bg-[#112233] pb-12 no-underline transition-colors duration-300 hover:bg-[#162840]
              after:absolute after:left-0 after:right-0 after:top-0 after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${service.line}`}
            >
              <img
                src={service.image}
                alt={service.name}
                className="h-[170px] w-full object-cover brightness-[0.65] saturate-[0.8] transition-[filter] duration-500 group-hover:brightness-[0.85] group-hover:saturate-100"
              />

              <div className="px-7 pt-6">
                <div className="mb-2 text-[10px] font-bold tracking-[2px] text-white/[0.12]">
                  {service.number}
                </div>

                <h3 className="mb-2 text-base font-bold text-white">
                  {service.name}
                </h3>

                <p className="text-xs leading-[1.65] text-white/40">
                  {service.description}
                </p>
              </div>

              <div className="absolute bottom-5 right-[22px] text-[11px] font-bold text-[#F57A24] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                View Service →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
