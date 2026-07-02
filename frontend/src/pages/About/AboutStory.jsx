import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackStory = {
  eyebrow: "The Beginning",
  titleLine1: "Started with one",
  titleLine2: "question.",
  paragraph1:
    "Why is digital delivery so fragmented? Every organization we spoke to had the same problem — five different vendors, no single source of truth, no consistent vision.",
  paragraph2:
    "Bytech was the answer. One team. One direction. One ecosystem handling everything from concept to growth. Today we serve businesses, educational institutions, and publishers across Jordan and the Arab region.",
  badges: ["Founded 2020", "Amman, Jordan", "30+ Projects", "4 Countries"],
  timeline: [
    {
      short: "20",
      year: "2020",
      title: "Bytech Founded",
      desc: "Established in Amman with a focus on integrated digital delivery.",
      active: "orange",
    },
    {
      short: "21",
      year: "2021",
      title: "EdTech Specialization",
      desc: "Expanded into LMS platforms and interactive educational content.",
      active: "",
    },
  ],
};

export default function AboutStory({
  data = {},
  editable = false,
  path = ["story"],
  onChangePath,
}) {
  const story = {
    ...fallbackStory,
    ...data,
  };

  const badges = Array.isArray(story.badges) ? story.badges : [];
  const timeline = Array.isArray(story.timeline) ? story.timeline : [];

  const { confirm } = useConfirm();

  const revealLeftClass = editable ? "" : "about-reveal-l";
  const revealRightClass = editable ? "" : "about-reveal-r";

  function addBadge() {
    onChangePath?.([...path, "badges"], [...badges, "New Badge"]);
  }

  async function deleteBadge(index) {
    const ok = await confirm({
      title: "Delete badge?",
      message: "This badge will be removed.",
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "badges"],
      badges.filter((_, i) => i !== index),
    );
  }

  function addTimelineItem() {
    onChangePath?.(
      [...path, "timeline"],
      [
        ...timeline,
        {
          short: "00",
          year: "New Year",
          title: "New Timeline Item",
          desc: "Write timeline description here.",
          active: "",
        },
      ],
    );
  }

  async function deleteTimelineItem(index) {
    const ok = await confirm({
      title: "Delete timeline item?",
      message: "This timeline item will be removed.",
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "timeline"],
      timeline.filter((_, i) => i !== index),
    );
  }

  return (
    <section className="grid grid-cols-1 gap-14 border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-[60px]">
      <div className={revealLeftClass}>
        <EditableText
          as="div"
          value={story.eyebrow}
          editable={editable}
          path={[...path, "eyebrow"]}
          onChangePath={onChangePath}
          className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]"
          editClassName="!text-[#F57A24]"
        />

        <h2 className="mb-2.5 text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white">
          <EditableText
            as="span"
            value={story.titleLine1}
            editable={editable}
            path={[...path, "titleLine1"]}
            onChangePath={onChangePath}
            className="text-white"
            editClassName="!text-white"
          />
          <br />
          <EditableText
            as="span"
            value={story.titleLine2}
            editable={editable}
            path={[...path, "titleLine2"]}
            onChangePath={onChangePath}
            className="text-white"
            editClassName="!text-white"
          />
        </h2>

        <EditableText
          as="p"
          value={story.paragraph1}
          editable={editable}
          multiline
          path={[...path, "paragraph1"]}
          onChangePath={onChangePath}
          className="mb-4 text-sm leading-[1.82] text-white/50"
          editClassName="!text-white/80"
        />

        <EditableText
          as="p"
          value={story.paragraph2}
          editable={editable}
          multiline
          path={[...path, "paragraph2"]}
          onChangePath={onChangePath}
          className="mb-6 text-sm leading-[1.82] text-white/50"
          editClassName="!text-white/80"
        />

        {editable && (
          <button
            type="button"
            onClick={addBadge}
            className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
          >
            <Plus size={13} />
            Add Badge
          </button>
        )}

        <div className="mt-2 flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span
              key={`${badge}-${index}`}
              className="inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.04] px-4 py-[7px] text-[11px] font-semibold text-white/50"
            >
              <EditableText
                as="span"
                value={badge}
                editable={editable}
                path={[...path, "badges", index]}
                onChangePath={onChangePath}
                className="text-white/50"
                editClassName="!text-white/80"
              />

              {editable && (
                <button
                  type="button"
                  onClick={() => deleteBadge(index)}
                  className="text-red-300 transition hover:text-red-200"
                  title="Delete badge"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className={`${revealRightClass} relative flex flex-col pl-7`}>
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-[linear-gradient(180deg,#F57A24,#2F88C4,transparent)] opacity-30" />

        {editable && (
          <button
            type="button"
            onClick={addTimelineItem}
            className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
          >
            <Plus size={13} />
            Add Timeline Item
          </button>
        )}

        {timeline.map((item, index) => (
          <div
            key={`${item.year}-${index}`}
            className={`about-timeline-item relative flex gap-6 ${
              index !== timeline.length - 1 ? "pb-8" : ""
            } ${editable ? "!opacity-100 !translate-y-0" : ""}`}
            style={{ transitionDelay: `${index * 0.18}s` }}
          >
            <EditableText
              as="div"
              value={item.short}
              editable={editable}
              path={[...path, "timeline", index, "short"]}
              onChangePath={onChangePath}
              className={`z-[1] mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border bg-[#0e1c2e] text-[9px] font-bold ${
                item.active === "orange"
                  ? "border-[#F57A24] text-[#F57A24]"
                  : item.active === "yellow"
                    ? "border-[#F9B307] text-[#F9B307]"
                    : "border-white/[0.07] text-white/30"
              }`}
              editClassName="!text-white"
            />

            <div className="flex-1">
              <EditableText
                as="div"
                value={item.year}
                editable={editable}
                path={[...path, "timeline", index, "year"]}
                onChangePath={onChangePath}
                className="mb-1 text-[10px] font-bold tracking-[1px] text-[#F57A24]"
                editClassName="!text-[#F57A24]"
              />

              <EditableText
                as="h3"
                value={item.title}
                editable={editable}
                path={[...path, "timeline", index, "title"]}
                onChangePath={onChangePath}
                className="mb-1 text-sm font-bold text-white"
                editClassName="!text-white"
              />

              <EditableText
                as="p"
                value={item.desc}
                editable={editable}
                multiline
                path={[...path, "timeline", index, "desc"]}
                onChangePath={onChangePath}
                className="text-xs leading-[1.6] text-white/50"
                editClassName="!text-white/80"
              />
            </div>

            {editable && (
              <button
                type="button"
                onClick={() => deleteTimelineItem(index)}
                className="ml-auto inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
                title="Delete timeline item"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
