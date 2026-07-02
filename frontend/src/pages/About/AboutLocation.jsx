import * as LucideIcons from "lucide-react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import EditableButton from "../../admin/components/EditableButton";
import LucideIconPicker from "../../admin/components/LucideIconPicker";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackLocation = {
  image:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  imageAlt: "Office",
  eyebrow: "Location",
  titleLine1: "Based in Amman,",
  titleLine2: "serving the region.",
  description:
    "Our headquarters is in Amman, Jordan — strategically positioned to serve clients across the Arab world with on-site, hybrid, and fully remote delivery models.",
  rows: [
    {
      icon: "MapPin",
      text: "8th Circle, Prince Rashid Suburb, Amman",
    },
    {
      icon: "Mail",
      text: "services@bytechjo.com",
    },
    {
      icon: "Globe2",
      text: "Jordan · Palestine · Saudi Arabia · Qatar",
    },
  ],
  buttonLabel: "Start a Conversation →",
  buttonUrl: "/contact",
};

const oldIconNameMap = {
  map: "MapPin",
  mail: "Mail",
  globe: "Globe2",
  phone: "Phone",
  location: "MapPin",
  email: "Mail",
  world: "Globe2",
};

function resolveIconName(value) {
  if (!value) return "MapPin";

  return oldIconNameMap[value] || value;
}

function getIconComponent(iconName) {
  const normalizedIconName = resolveIconName(iconName);

  return LucideIcons[normalizedIconName] || LucideIcons.MapPin;
}

export default function AboutLocation({
  data = {},
  editable = false,
  path = ["location"],
  onChangePath,
}) {
  const location = {
    ...fallbackLocation,
    ...data,
  };

  const rows = Array.isArray(location.rows) ? location.rows : [];

  const { confirm } = useConfirm();

  const revealLeftClass = editable ? "" : "about-reveal-l";
  const revealRightClass = editable ? "" : "about-reveal-r";

  function addRow() {
    onChangePath?.(
      [...path, "rows"],
      [
        ...rows,
        {
          icon: "MapPin",
          text: "New contact row",
        },
      ],
    );
  }

  async function deleteRow(index) {
    const ok = await confirm({
      title: "Delete row?",
      message: "This contact row will be removed.",
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "rows"],
      rows.filter((_, i) => i !== index),
    );
  }

  function updateRowIcon(index, iconName) {
    const nextRows = rows.map((row, i) =>
      i === index ? { ...row, icon: iconName } : row,
    );

    onChangePath?.([...path, "rows"], nextRows);
  }

  return (
    <section
      className={`grid grid-cols-1 items-center gap-14 border-b border-white/[0.07] px-6 sm:px-10 lg:grid-cols-2 lg:gap-[60px] lg:px-[60px] ${
        editable ? "py-12" : "py-[88px]"
      }`}
    >
      <div className={revealLeftClass}>
        <div className="relative h-[400px] overflow-hidden rounded-2xl">
          <EditableImage
            src={location.image}
            alt={location.imageAlt || "Office"}
            editable={editable}
            path={[...path, "image"]}
            onChangePath={onChangePath}
            className="h-full w-full object-cover brightness-[0.65] saturate-[0.8]"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,122,36,0.2),transparent)]" />
        </div>
      </div>

      <div className={revealRightClass}>
        <EditableText
          as="div"
          value={location.eyebrow}
          editable={editable}
          path={[...path, "eyebrow"]}
          onChangePath={onChangePath}
          className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]"
          editClassName="!text-[#F57A24]"
        />

        <h2 className="mb-2.5 text-[32px] font-black leading-[1.1] tracking-[-1.5px] text-white">
          <EditableText
            as="span"
            value={location.titleLine1}
            editable={editable}
            path={[...path, "titleLine1"]}
            onChangePath={onChangePath}
            className="text-white"
            editClassName="!text-white"
          />
          <br />
          <EditableText
            as="span"
            value={location.titleLine2}
            editable={editable}
            path={[...path, "titleLine2"]}
            onChangePath={onChangePath}
            className="text-white"
            editClassName="!text-white"
          />
        </h2>

        <EditableText
          as="p"
          value={location.description}
          editable={editable}
          multiline
          path={[...path, "description"]}
          onChangePath={onChangePath}
          className="mb-6 text-sm leading-[1.8] text-white/50"
          editClassName="!text-white/80"
        />

        {editable && (
          <button
            type="button"
            onClick={addRow}
            className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
          >
            <Plus size={13} />
            Add Row
          </button>
        )}

        <div className="mb-8 flex flex-col gap-3">
          {rows.map((row, index) => {
            const iconName = resolveIconName(row.icon);
            const Icon = getIconComponent(iconName);

            return (
              <div
                key={`${row.text}-${index}`}
                className="group flex items-center gap-3 rounded-[12px] border border-white/[0.08] bg-[#112233] px-[18px] py-3.5 transition hover:border-[#F57A24]/40 hover:bg-[#152a40]"
              >
                {editable ? (
                  <LucideIconPicker
                    value={iconName}
                    onChange={(selectedIconName) =>
                      updateRowIcon(index, selectedIconName)
                    }
                  />
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F57A24]/10 text-[#F57A24] transition group-hover:bg-[#F57A24] group-hover:text-white">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                )}

                <EditableText
                  as="span"
                  value={row.text}
                  editable={editable}
                  path={[...path, "rows", index, "text"]}
                  onChangePath={onChangePath}
                  className="text-[13px] text-white/60 transition group-hover:text-white/80"
                  editClassName="!text-white/80"
                />

                {editable && (
                  <button
                    type="button"
                    onClick={() => deleteRow(index)}
                    className="ml-auto inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
                    title="Delete row"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <EditableButton
          label={location.buttonLabel}
          url={location.buttonUrl}
          editable={editable}
          labelPath={[...path, "buttonLabel"]}
          urlPath={[...path, "buttonUrl"]}
          onChangePath={onChangePath}
          className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e06815]"
          fallbackLabel="Start a Conversation →"
        />
      </div>
    </section>
  );
}
