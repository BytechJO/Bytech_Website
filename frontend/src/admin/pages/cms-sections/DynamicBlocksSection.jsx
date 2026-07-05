import { useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../components/EditableText";
import EditableImage from "../../components/EditableImage";
import EditableButton from "../../components/EditableButton";

export default function DynamicBlocksSection({
  data = [],
  editable = false,
  path = [],
  onChangePath,
}) {
  const blocks = Array.isArray(data) ? data : [];
  const pendingScrollBlockIdRef = useRef(null);

  const revealClass = editable ? "" : "blocks-reveal";
  const revealLeftClass = editable ? "" : "blocks-reveal-left";
  const revealRightClass = editable ? "" : "blocks-reveal-right";

  const delayClass = (delay) => {
    return editable ? "" : delay;
  };

  const getFeatureDelayClass = (featureIndex) => {
    if (editable) return "";

    if (featureIndex === 0) return "blocks-delay-1";
    if (featureIndex === 1) return "blocks-delay-2";
    if (featureIndex === 2) return "blocks-delay-3";
    if (featureIndex === 3) return "blocks-delay-4";

    return "blocks-delay-5";
  };

  function getNextBlockNumber(nextIndex) {
    return String(nextIndex + 1).padStart(2, "0");
  }

  function normalizeBlocks(list) {
    return list.map((block, index) => ({
      ...block,
      number: getNextBlockNumber(index),
      reverse: index % 2 === 1,
    }));
  }

  function addBlock() {
    const nextIndex = blocks.length;
    const newBlockId = `block-${Date.now()}`;

    pendingScrollBlockIdRef.current = newBlockId;

    const newBlock = {
      id: newBlockId,
      badge: "New Block",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop",
      label: "CONTENT",
      number: getNextBlockNumber(nextIndex),
      reverse: nextIndex % 2 === 1,
      features: ["New point one", "New point two", "New point three"],
      buttonUrl: "/contact",
      titleLine1: "New content,",
      titleLine2: "ready to edit.",
      buttonLabel: "Learn More →",
      description:
        "Write a short description for this content block. Explain what this section includes and what the visitor should know.",
    };

    onChangePath?.([...path], normalizeBlocks([...blocks, newBlock]));
  }

  function deleteBlock(blockIndex) {
    const nextBlocks = blocks.filter((_, index) => index !== blockIndex);

    onChangePath?.([...path], normalizeBlocks(nextBlocks));
  }

  function addBlockFeature(blockIndex) {
    const currentFeatures = Array.isArray(blocks[blockIndex]?.features)
      ? blocks[blockIndex].features
      : [];

    onChangePath?.(
      [...path, blockIndex, "features"],
      [...currentFeatures, "New point"],
    );
  }

  function deleteBlockFeature(blockIndex, featureIndex) {
    const currentFeatures = Array.isArray(blocks[blockIndex]?.features)
      ? blocks[blockIndex].features
      : [];

    onChangePath?.(
      [...path, blockIndex, "features"],
      currentFeatures.filter((_, index) => index !== featureIndex),
    );
  }

  useEffect(() => {
    if (!editable) return;
    if (!pendingScrollBlockIdRef.current) return;

    const blockId = pendingScrollBlockIdRef.current;

    const scrollTimer = setTimeout(() => {
      const element = document.getElementById(blockId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        pendingScrollBlockIdRef.current = null;
      }
    }, 80);

    return () => clearTimeout(scrollTimer);
  }, [blocks.length, editable]);

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
      {
        threshold: 0.15,
      },
    );

    const elements = document.querySelectorAll(
      ".blocks-reveal, .blocks-reveal-left, .blocks-reveal-right",
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [blocks.length, editable]);

  if (blocks.length === 0 && !editable) {
    return null;
  }

  return (
    <>
      <style>{`
        .blocks-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blocks-reveal-left {
          opacity: 0;
          transform: translateX(-42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blocks-reveal-right {
          opacity: 0;
          transform: translateX(42px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blocks-reveal.visible,
        .blocks-reveal-left.visible,
        .blocks-reveal-right.visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .blocks-delay-1 { transition-delay: 0.1s; }
        .blocks-delay-2 { transition-delay: 0.2s; }
        .blocks-delay-3 { transition-delay: 0.3s; }
        .blocks-delay-4 { transition-delay: 0.4s; }
        .blocks-delay-5 { transition-delay: 0.5s; }
      `}</style>

      <section className="bg-[#0e1c2e] text-white">
        {editable && (
          <div className="border-b border-white/[0.07] bg-[#0e1c2e] px-6 py-6 lg:px-[60px]">
            <button
              type="button"
              onClick={addBlock}
              className="inline-flex items-center gap-2 rounded-xl border border-[#F57A24]/25 bg-[#F57A24]/10 px-4 py-2.5 text-sm font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
            >
              <Plus size={16} />
              Add Block
            </button>
          </div>
        )}

        {editable && blocks.length === 0 && (
          <div className="px-6 py-16 text-center lg:px-[60px]">
            <p className="text-sm font-semibold text-white/40">
              No blocks yet.
            </p>

            <button
              type="button"
              onClick={addBlock}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e06815]"
            >
              <Plus size={16} />
              Create First Block
            </button>
          </div>
        )}

        {blocks.map((block, index) => {
          const features = Array.isArray(block.features) ? block.features : [];

          const sectionBg =
            index % 2 === 0 ? "bg-[#0e1c2e]" : "bg-white/[0.01]";

          const blockPath = [...path, index];
          const isReversed = index % 2 === 1;

          return (
            <div
              key={block.id || `${block.number}-${index}`}
              id={block.id}
              className={`scroll-mt-[120px] border-b border-white/[0.07] px-6 py-[96px] last:border-b-0 lg:px-[60px] ${sectionBg}`}
            >
              {editable && (
                <div className="mb-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => deleteBlock(index)}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/15"
                  >
                    <Trash2 size={14} />
                    Delete Block
                  </button>
                </div>
              )}

              <div
                className={`${revealClass} grid items-center gap-[60px] lg:grid-cols-2 ${
                  isReversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div
                  className={`${
                    isReversed
                      ? `${revealRightClass} lg:[direction:ltr]`
                      : revealLeftClass
                  } relative h-[380px] overflow-hidden rounded-2xl`}
                >
                  <EditableImage
                    src={block.image}
                    alt={block.badge || block.label || "Content block"}
                    editable={editable}
                    path={[...blockPath, "image"]}
                    onChangePath={onChangePath}
                    className="h-full w-full object-cover brightness-[0.7] saturate-[0.85] transition-transform duration-700 hover:scale-[1.04]"
                  />

                  <div className="absolute bottom-5 left-5 rounded-[10px] border border-white/[0.07] bg-[#0e1c2e]/90 px-3.5 py-2.5 backdrop-blur-2xl">
                    <EditableText
                      as="span"
                      value={block.badge}
                      editable={editable}
                      path={[...blockPath, "badge"]}
                      onChangePath={onChangePath}
                      className="text-[10px] font-bold text-[#F57A24]"
                      editClassName="!text-[#F57A24]"
                    />
                  </div>
                </div>

                <div
                  className={`${
                    isReversed
                      ? `${revealLeftClass} lg:[direction:ltr]`
                      : revealRightClass
                  }`}
                >
                  <div
                    className={`${revealClass} ${delayClass(
                      "blocks-delay-1",
                    )} mb-3 text-[11px] font-bold tracking-[2px] text-white/20`}
                  >
                    <EditableText
                      as="span"
                      value={block.number}
                      editable={editable}
                      path={[...blockPath, "number"]}
                      onChangePath={onChangePath}
                      className="text-white/20"
                      editClassName="!text-white/70"
                    />{" "}
                    —{" "}
                    <EditableText
                      as="span"
                      value={block.label}
                      editable={editable}
                      path={[...blockPath, "label"]}
                      onChangePath={onChangePath}
                      className="text-white/20"
                      editClassName="!text-white/70"
                    />
                  </div>

                  <h2
                    className={`${revealClass} ${delayClass(
                      "blocks-delay-2",
                    )} mb-3.5 text-[32px] font-black leading-[1.12] tracking-[-0.8px] text-white`}
                  >
                    <EditableText
                      as="span"
                      value={block.titleLine1}
                      editable={editable}
                      path={[...blockPath, "titleLine1"]}
                      onChangePath={onChangePath}
                      className="text-white"
                      editClassName="!text-white"
                    />

                    <br />

                    <EditableText
                      as="span"
                      value={block.titleLine2}
                      editable={editable}
                      path={[...blockPath, "titleLine2"]}
                      onChangePath={onChangePath}
                      className="text-white"
                      editClassName="!text-white"
                    />
                  </h2>

                  <EditableText
                    as="p"
                    value={block.description}
                    editable={editable}
                    multiline
                    path={[...blockPath, "description"]}
                    onChangePath={onChangePath}
                    className={`${revealClass} ${delayClass(
                      "blocks-delay-3",
                    )} mb-6 max-w-[620px] text-sm leading-[1.8] text-white/50`}
                    editClassName="!text-white/80"
                  />

                  <div className="mb-7 flex flex-col gap-2.5">
                    {editable && (
                      <button
                        type="button"
                        onClick={() => addBlockFeature(index)}
                        className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
                      >
                        <Plus size={13} />
                        Add Point
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
                          path={[...blockPath, "features", featureIndex]}
                          onChangePath={onChangePath}
                          className="text-white/55"
                          editClassName="!text-white/80"
                        />

                        {editable && (
                          <button
                            type="button"
                            onClick={() =>
                              deleteBlockFeature(index, featureIndex)
                            }
                            title="Delete point"
                            className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <EditableButton
                    label={block.buttonLabel}
                    url={block.buttonUrl}
                    editable={editable}
                    labelPath={[...blockPath, "buttonLabel"]}
                    urlPath={[...blockPath, "buttonUrl"]}
                    onChangePath={onChangePath}
                    className={`${revealClass} ${delayClass(
                      "blocks-delay-4",
                    )} inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]`}
                    fallbackLabel="Learn More"
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
