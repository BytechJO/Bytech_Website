import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import EditableButton from "../../admin/components/EditableButton";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackServices = {
  eyebrow: "Services",
  title: "Core capabilities.",
  description:
    "Software, design, content, media, and marketing — inside one delivery framework.",
  buttonLabel: "View All Services →",
  buttonUrl: "/services",
  items: [
    {
      number: "01",
      name: "Web Platforms",
      description:
        "Advanced websites, portals, e-commerce, and custom systems built for scale.",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop",
      to: "/services#web",
      color: "orange",
      ctaLabel: "View Service →",
    },
    {
      number: "02",
      name: "Mobile Applications",
      description:
        "Android and iOS apps with strong UX and technical stability.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop",
      to: "/services#mobile",
      color: "blue",
      ctaLabel: "View Service →",
    },
  ],
};

const lineColors = {
  orange: "after:bg-[#F57A24]",
  blue: "after:bg-[#2F88C4]",
  yellow: "after:bg-[#F9B307]",
  cyan: "after:bg-[#6CC2E9]",
};

const colorOrder = ["orange", "blue", "yellow", "cyan"];

function normalizeService(service, index) {
  return {
    number: service?.number || String(index + 1).padStart(2, "0"),
    name: service?.name || `Service ${index + 1}`,
    description: service?.description || "Write service description here.",
    image:
      service?.image ||
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop",
    to: service?.to || "/services",
    color: service?.color || "orange",
    ctaLabel: service?.ctaLabel || "View Service →",
  };
}

export default function ServicesSection({
  data = {},
  editable = false,
  path = ["services"],
  onChangePath,
}) {
  const section = {
    ...fallbackServices,
    ...data,
  };

  const services = Array.isArray(section.items)
    ? section.items.filter(Boolean).map(normalizeService)
    : fallbackServices.items;

  const { confirm } = useConfirm();

  useEffect(() => {
    if (editable) return;

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );

    const frame = requestAnimationFrame(() => {
      document.querySelectorAll(".services-reveal").forEach((el) => {
        el.classList.remove("visible");
        reveal.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      reveal.disconnect();
    };
  }, [editable, services.length]);

  function addService() {
    onChangePath?.(
      [...path, "items"],
      [
        ...services,
        {
          number: String(services.length + 1).padStart(2, "0"),
          name: "New Service",
          description: "Write service description here.",
          image:
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop",
          to: "/services",
          color: "orange",
          ctaLabel: "View Service →",
        },
      ],
    );
  }

  async function deleteService(index) {
    const ok = await confirm({
      title: "Delete service?",
      message: "This service card will be removed.",
      confirmText: "Delete Service",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "items"],
      services.filter((_, i) => i !== index),
    );
  }

  function cycleColor(index) {
    const next = services.map((service, i) => {
      if (i !== index) return service;

      const currentIndex = colorOrder.indexOf(service.color || "orange");
      const nextColor = colorOrder[(currentIndex + 1) % colorOrder.length];

      return {
        ...service,
        color: nextColor,
      };
    });

    onChangePath?.([...path, "items"], next);
  }

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

        .services-reveal.delay-0 { transition-delay: 0s; }
        .services-reveal.delay-1 { transition-delay: 0.1s; }
        .services-reveal.delay-2 { transition-delay: 0.2s; }
        .services-reveal.delay-3 { transition-delay: 0.3s; }
      `}</style>

      <section className="bg-[#0e1c2e] px-4 py-16 text-white sm:px-6 sm:py-[76px] lg:px-[60px] lg:py-[88px]">
        <div className="mb-9 flex flex-col gap-6 lg:mb-11 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[680px]">
            <EditableText
              as="div"
              value={section.eyebrow}
              editable={editable}
              path={[...path, "eyebrow"]}
              onChangePath={onChangePath}
              className={`${editable ? "" : "services-reveal"} mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24] sm:mb-3.5 sm:tracking-[2.5px]`}
              editClassName="!text-[#F57A24]"
            />

            <EditableText
              as="h2"
              value={section.title}
              editable={editable}
              path={[...path, "title"]}
              onChangePath={onChangePath}
              className={`${editable ? "" : "services-reveal delay-1"} mb-3 text-[30px] font-black leading-[1.08] tracking-[-1.2px] text-white sm:text-[38px] lg:text-[42px] lg:tracking-[-1.5px]`}
              editClassName="!text-white"
            />

            <EditableText
              as="p"
              value={section.description}
              editable={editable}
              multiline
              path={[...path, "description"]}
              onChangePath={onChangePath}
              className={`${editable ? "" : "services-reveal delay-2"} max-w-[520px] text-[13px] leading-[1.75] text-white/50 sm:text-sm`}
              editClassName="!text-white/80"
            />
          </div>

          <EditableButton
            label={section.buttonLabel}
            url={section.buttonUrl}
            editable={editable}
            labelPath={[...path, "buttonLabel"]}
            urlPath={[...path, "buttonUrl"]}
            onChangePath={onChangePath}
            className={`${editable ? "" : "services-reveal delay-2"} inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.04] px-[22px] py-3 text-[13px] font-medium text-white/60 no-underline transition-all duration-200 hover:border-white/20 hover:text-white sm:w-fit sm:justify-start sm:py-2.5`}
            fallbackLabel="View All Services →"
          />
        </div>

        {editable && (
          <button
            type="button"
            onClick={addService}
            className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24]"
          >
            <Plus size={13} />
            Add Service
          </button>
        )}

        <div className="grid gap-3 overflow-hidden rounded-[18px] sm:gap-px md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const CardTag = editable ? "div" : Link;

            const cardProps = editable
              ? {}
              : {
                  to: service.to || "/services",
                };

            return (
              <CardTag
                key={`${service.name}-${index}`}
                {...cardProps}
                className={`${editable ? "" : "services-reveal"} delay-${
                  index % 3
                } group relative block overflow-hidden rounded-[18px] bg-[#112233] no-underline transition-colors duration-300 hover:bg-[#162840] sm:rounded-none
                after:absolute after:left-0 after:right-0 after:top-0 after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  lineColors[service.color] || lineColors.orange
                }`}
              >
                <div className="relative h-[150px] overflow-hidden sm:h-[170px]">
                  <EditableImage
                    src={service.image}
                    alt={service.name || "Service"}
                    editable={editable}
                    path={[...path, "items", index, "image"]}
                    onChangePath={onChangePath}
                    className="h-full w-full object-cover brightness-[0.65] saturate-[0.8] transition-[filter] duration-500 group-hover:brightness-[0.85] group-hover:saturate-100"
                  />

                  {editable && (
                    <div className="absolute left-3 top-3 z-[80] flex gap-2">
                      <button
                        type="button"
                        onClick={() => cycleColor(index)}
                        className="rounded-md bg-white/[0.12] px-2 py-1 text-[10px] font-bold text-white"
                      >
                        {service.color || "orange"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteService(index)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-red-500/80 text-white"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative z-[20] min-h-[178px] bg-[#112233] px-5 pb-14 pt-5 sm:min-h-[190px] sm:px-7 sm:pt-6">
                  <EditableText
                    as="div"
                    value={service.number || String(index + 1).padStart(2, "0")}
                    editable={editable}
                    path={[...path, "items", index, "number"]}
                    onChangePath={onChangePath}
                    className="mb-2 text-[10px] font-bold tracking-[2px] text-white/[0.22]"
                    editClassName="!text-white/70"
                  />

                  <EditableText
                    as="h3"
                    value={service.name || "New Service"}
                    editable={editable}
                    path={[...path, "items", index, "name"]}
                    onChangePath={onChangePath}
                    className="mb-2 text-[15px] font-bold leading-[1.35] text-white sm:text-base"
                    editClassName="!text-white"
                  />

                  <EditableText
                    as="p"
                    value={
                      service.description || "Write service description here."
                    }
                    editable={editable}
                    multiline
                    path={[...path, "items", index, "description"]}
                    onChangePath={onChangePath}
                    className="text-[12px] leading-[1.65] text-white/40"
                    editClassName="!text-white/80"
                  />

                  {editable && (
                    <EditableText
                      as="div"
                      value={service.to || "/services"}
                      editable={editable}
                      path={[...path, "items", index, "to"]}
                      onChangePath={onChangePath}
                      className="mt-4 inline-flex rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-white/35"
                      editClassName="!text-white"
                    />
                  )}

                  <EditableText
                    as="div"
                    value={service.ctaLabel || "View Service →"}
                    editable={editable}
                    path={[...path, "items", index, "ctaLabel"]}
                    onChangePath={onChangePath}
                    className={`absolute bottom-5 right-5 text-[11px] font-bold text-[#F57A24] transition-opacity duration-200 sm:right-[22px] ${
                      editable
                        ? "opacity-100"
                        : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    }`}
                    editClassName="!text-[#F57A24]"
                  />
                </div>
              </CardTag>
            );
          })}
        </div>
      </section>
    </>
  );
}
