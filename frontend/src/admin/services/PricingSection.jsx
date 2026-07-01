import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableButton from "../../admin/components/EditableButton";

export default function PricingSection({
  data = {},
  editable = false,
  path = ["pricing"],
  onChangePath,
}) {
  const plans = Array.isArray(data.plans) ? data.plans : [];

  const revealClass = editable ? "" : "pricing-reveal";

  const delayClass = (delay) => {
    return editable ? "" : delay;
  };

  const getPlanDelayClass = (index) => {
    if (editable) return "";

    return `pricing-delay-${Math.min(index, 2)}`;
  };

  const getFeatureDelayClass = (featureIndex) => {
    if (editable) return "";

    if (featureIndex === 0) return "pricing-delay-0";
    if (featureIndex === 1) return "pricing-delay-1";
    if (featureIndex === 2) return "pricing-delay-2";

    return "pricing-delay-3";
  };

  function addPlanFeature(planIndex) {
    const currentFeatures = Array.isArray(plans[planIndex]?.features)
      ? plans[planIndex].features
      : [];

    onChangePath?.(
      [...path, "plans", planIndex, "features"],
      [
        ...currentFeatures,
        {
          text: "New feature",
          active: true,
        },
      ],
    );
  }

  function deletePlanFeature(planIndex, featureIndex) {
    const currentFeatures = Array.isArray(plans[planIndex]?.features)
      ? plans[planIndex].features
      : [];

    onChangePath?.(
      [...path, "plans", planIndex, "features"],
      currentFeatures.filter((_, index) => index !== featureIndex),
    );
  }

  function togglePlanFeature(planIndex, featureIndex) {
    const currentFeatures = Array.isArray(plans[planIndex]?.features)
      ? plans[planIndex].features
      : [];

    const nextFeatures = currentFeatures.map((feature, index) => {
      if (index !== featureIndex) return feature;

      return {
        ...feature,
        active: typeof feature.active === "boolean" ? !feature.active : false,
      };
    });

    onChangePath?.([...path, "plans", planIndex, "features"], nextFeatures);
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

    const elements = document.querySelectorAll(".pricing-reveal");

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [plans.length, editable]);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

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
        <EditableText
          as="div"
          value={data.eyebrow || "Investment"}
          editable={editable}
          path={[...path, "eyebrow"]}
          onChangePath={onChangePath}
          className={`${revealClass} mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]`}
          editClassName="!text-[#F57A24]"
        />

        <EditableText
          as="h2"
          value={data.title || "Transparent pricing."}
          editable={editable}
          path={[...path, "title"]}
          onChangePath={onChangePath}
          className={`${revealClass} ${delayClass(
            "pricing-delay-1",
          )} mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]`}
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={data.description}
          editable={editable}
          multiline
          path={[...path, "description"]}
          onChangePath={onChangePath}
          className={`${revealClass} ${delayClass(
            "pricing-delay-2",
          )} max-w-[520px] text-sm leading-[1.75] text-white/50`}
          editClassName="!text-white/80"
        />

        {plans.length > 0 && (
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const features = Array.isArray(plan.features)
                ? plan.features
                : [];

              const isCustomPrice =
                plan.customPrice ||
                String(plan.price).toLowerCase() === "custom";

              const planPath = [...path, "plans", index];

              return (
                <div
                  key={plan.tier || index}
                  className={`${revealClass} ${getPlanDelayClass(
                    index,
                  )} pricing-card-glow relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    plan.featured && !editable ? "pricing-featured" : ""
                  } ${
                    plan.featured
                      ? "border-[#F57A24]/35 bg-[#162840] shadow-[0_18px_60px_rgba(245,122,36,0.08)]"
                      : "border-white/[0.07] bg-[#112233] hover:border-[#F57A24]/35"
                  }`}
                >
                  {plan.featured && (
                    <EditableText
                      as="div"
                      value={plan.badge || "MOST POPULAR"}
                      editable={editable}
                      path={[...planPath, "badge"]}
                      onChangePath={onChangePath}
                      className="absolute left-1/2 top-[-1px] z-[2] -translate-x-1/2 rounded-b-lg bg-[#F57A24] px-3.5 py-1 text-[10px] font-bold tracking-[1px] text-white"
                      editClassName="!text-white"
                    />
                  )}

                  <EditableText
                    as="div"
                    value={plan.tier}
                    editable={editable}
                    path={[...planPath, "tier"]}
                    onChangePath={onChangePath}
                    className={`relative z-[1] mb-2.5 text-[11px] font-bold uppercase tracking-[1.5px] ${
                      plan.featured ? "text-[#F57A24]" : "text-white/35"
                    }`}
                    editClassName={
                      plan.featured ? "!text-[#F57A24]" : "!text-white/80"
                    }
                  />

                  <EditableText
                    as="div"
                    value={plan.price}
                    editable={editable}
                    path={[...planPath, "price"]}
                    onChangePath={onChangePath}
                    className={`relative z-[1] mb-1 font-black tracking-[-1px] text-white ${
                      isCustomPrice ? "pt-1.5 text-[30px]" : "text-[40px]"
                    }`}
                    editClassName="!text-white"
                  />

                  <EditableText
                    as="div"
                    value={plan.period}
                    editable={editable}
                    path={[...planPath, "period"]}
                    onChangePath={onChangePath}
                    className="relative z-[1] mb-5 text-xs text-white/35"
                    editClassName="!text-white/80"
                  />

                  <div className="relative z-[1] mb-5 h-px bg-white/[0.07]" />

                  <div className="relative z-[1] mb-7 flex flex-col gap-2.5">
                    {editable && (
                      <button
                        type="button"
                        onClick={() => addPlanFeature(index)}
                        className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
                      >
                        <Plus size={13} />
                        Add Feature
                      </button>
                    )}

                    {features.map((feature, featureIndex) => {
                      const active =
                        typeof feature.active === "boolean"
                          ? feature.active
                          : true;

                      return (
                        <div
                          key={`${feature.text}-${featureIndex}`}
                          className={`${revealClass} ${getFeatureDelayClass(
                            featureIndex,
                          )} flex items-center gap-2 text-xs text-white/55`}
                        >
                          {editable ? (
                            <button
                              type="button"
                              onClick={() =>
                                togglePlanFeature(index, featureIndex)
                              }
                              title="Toggle active"
                              className={`shrink-0 rounded-md px-1 transition ${
                                active
                                  ? "text-[#F57A24] hover:bg-[#F57A24]/10"
                                  : "text-white/20 hover:bg-white/[0.05]"
                              }`}
                            >
                              {active ? "✓" : "✗"}
                            </button>
                          ) : (
                            <span
                              className={`shrink-0 ${
                                active ? "text-[#F57A24]" : "text-white/20"
                              }`}
                            >
                              {active ? "✓" : "✗"}
                            </span>
                          )}

                          <EditableText
                            as="span"
                            value={feature.text}
                            editable={editable}
                            path={[
                              ...planPath,
                              "features",
                              featureIndex,
                              "text",
                            ]}
                            onChangePath={onChangePath}
                            className={active ? "text-white/55" : "opacity-40"}
                            editClassName="!text-white/80"
                          />

                          {editable && (
                            <button
                              type="button"
                              onClick={() =>
                                deletePlanFeature(index, featureIndex)
                              }
                              title="Delete feature"
                              className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <EditableButton
                    label={plan.buttonLabel || plan.button}
                    url={plan.buttonUrl}
                    editable={editable}
                    labelPath={[...planPath, "buttonLabel"]}
                    urlPath={[...planPath, "buttonUrl"]}
                    onChangePath={onChangePath}
                    className={`relative z-[1] inline-block w-full rounded-lg px-[22px] py-2.5 text-center text-[13px] font-semibold no-underline transition-all duration-200 ${
                      plan.buttonType === "orange" || plan.featured
                        ? "bg-[#F57A24] text-white hover:-translate-y-px hover:bg-[#e06815]"
                        : "border border-white/[0.18] text-white/70 hover:border-white/35 hover:text-white"
                    }`}
                    fallbackLabel="Get a Quote"
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
