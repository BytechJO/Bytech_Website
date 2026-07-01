import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import EditableButton from "../../admin/components/EditableButton";

export default function ServiceBlocks({
  data = [],
  editable = false,
  path = ["serviceBlocks"],
  onChangePath,
}) {
  const services = Array.isArray(data) ? data : [];

  const revealClass = editable ? "" : "service-reveal";
  const revealLeftClass = editable ? "" : "service-reveal-left";
  const revealRightClass = editable ? "" : "service-reveal-right";

  const delayClass = (delay) => {
    return editable ? "" : delay;
  };

  const getFeatureDelayClass = (featureIndex) => {
    if (editable) return "";

    if (featureIndex === 0) return "service-delay-1";
    if (featureIndex === 1) return "service-delay-2";
    if (featureIndex === 2) return "service-delay-3";
    if (featureIndex === 3) return "service-delay-4";

    return "service-delay-5";
  };

  function addServiceFeature(serviceIndex) {
    const currentFeatures = Array.isArray(services[serviceIndex]?.features)
      ? services[serviceIndex].features
      : [];

    onChangePath?.(
      [...path, serviceIndex, "features"],
      [...currentFeatures, "New feature"],
    );
  }

  function deleteServiceFeature(serviceIndex, featureIndex) {
    const currentFeatures = Array.isArray(services[serviceIndex]?.features)
      ? services[serviceIndex].features
      : [];

    onChangePath?.(
      [...path, serviceIndex, "features"],
      currentFeatures.filter((_, index) => index !== featureIndex),
    );
  }

  useEffect(() => {
    if (editable) return;

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
  }, [services.length, editable]);

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

          const servicePath = [...path, index];

          return (
            <div
              key={service.id || `${service.number}-${index}`}
              id={service.id}
              className={`border-b border-white/[0.07] px-6 py-[96px] last:border-b-0 lg:px-[60px] ${sectionBg}`}
            >
              <div
                className={`${revealClass} grid items-center gap-[60px] lg:grid-cols-2 ${
                  service.reverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div
                  className={`${
                    service.reverse
                      ? `${revealRightClass} lg:[direction:ltr]`
                      : revealLeftClass
                  } relative h-[380px] overflow-hidden rounded-2xl`}
                >
                  <EditableImage
                    src={service.image}
                    alt={service.badge || service.label || "Service"}
                    editable={editable}
                    path={[...servicePath, "image"]}
                    onChangePath={onChangePath}
                    className="h-full w-full object-cover brightness-[0.7] saturate-[0.85] transition-transform duration-700 hover:scale-[1.04]"
                  />

                  <div className="absolute bottom-5 left-5 rounded-[10px] border border-white/[0.07] bg-[#0e1c2e]/90 px-3.5 py-2.5 backdrop-blur-2xl">
                    <EditableText
                      as="span"
                      value={service.badge}
                      editable={editable}
                      path={[...servicePath, "badge"]}
                      onChangePath={onChangePath}
                      className="text-[10px] font-bold text-[#F57A24]"
                      editClassName="!text-[#F57A24]"
                    />
                  </div>
                </div>

                <div
                  className={`${
                    service.reverse
                      ? `${revealLeftClass} lg:[direction:ltr]`
                      : revealRightClass
                  }`}
                >
                  <div
                    className={`${revealClass} ${delayClass(
                      "service-delay-1",
                    )} mb-3 text-[11px] font-bold tracking-[2px] text-white/20`}
                  >
                    <EditableText
                      as="span"
                      value={service.number}
                      editable={editable}
                      path={[...servicePath, "number"]}
                      onChangePath={onChangePath}
                      className="text-white/20"
                      editClassName="!text-white/70"
                    />{" "}
                    —{" "}
                    <EditableText
                      as="span"
                      value={service.label}
                      editable={editable}
                      path={[...servicePath, "label"]}
                      onChangePath={onChangePath}
                      className="text-white/20"
                      editClassName="!text-white/70"
                    />
                  </div>

                  <h2
                    className={`${revealClass} ${delayClass(
                      "service-delay-2",
                    )} mb-3.5 text-[32px] font-black leading-[1.12] tracking-[-0.8px] text-white`}
                  >
                    <EditableText
                      as="span"
                      value={service.titleLine1}
                      editable={editable}
                      path={[...servicePath, "titleLine1"]}
                      onChangePath={onChangePath}
                      className="text-white"
                      editClassName="!text-white"
                    />

                    <br />

                    <EditableText
                      as="span"
                      value={service.titleLine2}
                      editable={editable}
                      path={[...servicePath, "titleLine2"]}
                      onChangePath={onChangePath}
                      className="text-white"
                      editClassName="!text-white"
                    />
                  </h2>

                  <EditableText
                    as="p"
                    value={service.description}
                    editable={editable}
                    multiline
                    path={[...servicePath, "description"]}
                    onChangePath={onChangePath}
                    className={`${revealClass} ${delayClass(
                      "service-delay-3",
                    )} mb-6 max-w-[620px] text-sm leading-[1.8] text-white/50`}
                    editClassName="!text-white/80"
                  />

                  <div className="mb-7 flex flex-col gap-2.5">
                    {editable && (
                      <button
                        type="button"
                        onClick={() => addServiceFeature(index)}
                        className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
                      >
                        <Plus size={13} />
                        Add Feature
                      </button>
                    )}

                    {features.map((feature, featureIndex) => (
                      <div
                        key={`${feature}-${featureIndex}`}
                        className={`${revealClass} ${getFeatureDelayClass(
                          featureIndex,
                        )} flex items-start gap-2.5 text-[13px] text-white/55 before:mt-px before:shrink-0 before:text-[#F57A24] before:content-['→']`}
                      >
                        <EditableText
                          as="span"
                          value={feature}
                          editable={editable}
                          path={[...servicePath, "features", featureIndex]}
                          onChangePath={onChangePath}
                          className="text-white/55"
                          editClassName="!text-white/80"
                        />

                        {editable && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteServiceFeature(index, featureIndex)
                            }
                            title="Delete feature"
                            className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <EditableButton
                    label={service.buttonLabel}
                    url={service.buttonUrl}
                    editable={editable}
                    labelPath={[...servicePath, "buttonLabel"]}
                    urlPath={[...servicePath, "buttonUrl"]}
                    onChangePath={onChangePath}
                    className={`${revealClass} ${delayClass(
                      "service-delay-4",
                    )} inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]`}
                    fallbackLabel="Contact Us"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
