import * as LucideIcons from "lucide-react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import LucideIconPicker from "../../admin/components/LucideIconPicker";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackInfo = {
  eyebrow: "Contact Information",
  title: "We're ready to talk.",
  items: [
    {
      icon: "Mail",
      label: "Email",
      value: "services@bytechjo.com",
      bg: "orange",
    },
    {
      icon: "Phone",
      label: "Phone",
      value: "+962 7 7995 1000",
      bg: "blue",
    },
    {
      icon: "MapPin",
      label: "Office",
      value:
        "8th Circle, Prince Rashid Suburb, Building #78\nAmman, Jordan 11831",
      bg: "yellow",
    },
    {
      icon: "Globe2",
      label: "Website",
      value: "www.bytechjo.com",
      bg: "cyan",
    },
  ],
  response: {
    title: "Response Time",
    cards: [
      {
        value: "<24h",
        label: "Email Response",
        color: "orange",
      },
      {
        value: "Free",
        label: "Consultation",
        color: "blue",
      },
    ],
  },
};

const colorClasses = {
  orange: {
    bg: "bg-[#F57A24]/10",
    iconColor: "text-[#F57A24]",
    hover: "hover:border-[#F57A24]/30",
    text: "text-[#F57A24]",
  },
  blue: {
    bg: "bg-[#2F88C4]/10",
    iconColor: "text-[#2F88C4]",
    hover: "hover:border-[#2F88C4]/30",
    text: "text-[#2F88C4]",
  },
  yellow: {
    bg: "bg-[#F9B307]/10",
    iconColor: "text-[#F9B307]",
    hover: "hover:border-[#F9B307]/30",
    text: "text-[#F9B307]",
  },
  cyan: {
    bg: "bg-[#6CC2E9]/10",
    iconColor: "text-[#6CC2E9]",
    hover: "hover:border-[#6CC2E9]/30",
    text: "text-[#6CC2E9]",
  },
};

const colorOrder = ["orange", "blue", "yellow", "cyan"];

function getColorClasses(color) {
  return colorClasses[color] || colorClasses.orange;
}

export default function ContactInfo({
  data = {},
  editable = false,
  path = ["info"],
  onChangePath,
}) {
  const info = {
    ...fallbackInfo,
    ...data,
    response: {
      ...fallbackInfo.response,
      ...(data?.response || {}),
    },
  };

  const items = Array.isArray(info.items) ? info.items : [];
  const responseCards = Array.isArray(info.response?.cards)
    ? info.response.cards
    : [];

  const { confirm } = useConfirm();

  const revealClass = editable ? "" : "contact-reveal-l";

  function addItem() {
    onChangePath?.(
      [...path, "items"],
      [
        ...items,
        {
          icon: "Mail",
          label: "New Item",
          value: "New value",
          bg: "orange",
        },
      ],
    );
  }

  async function deleteItem(index) {
    const ok = await confirm({
      title: "Delete contact item?",
      message: "This contact information item will be removed.",
      confirmText: "Delete Item",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "items"],
      items.filter((_, i) => i !== index),
    );
  }

  function updateItemIcon(index, iconName) {
    const nextItems = items.map((item, i) =>
      i === index ? { ...item, icon: iconName } : item,
    );

    onChangePath?.([...path, "items"], nextItems);
  }

  function cycleItemColor(index) {
    const nextItems = items.map((item, i) => {
      if (i !== index) return item;

      const currentIndex = colorOrder.indexOf(item.bg || "orange");
      const nextColor = colorOrder[(currentIndex + 1) % colorOrder.length];

      return {
        ...item,
        bg: nextColor,
      };
    });

    onChangePath?.([...path, "items"], nextItems);
  }

  function addResponseCard() {
    onChangePath?.(
      [...path, "response", "cards"],
      [
        ...responseCards,
        {
          value: "New",
          label: "New Label",
          color: "orange",
        },
      ],
    );
  }

  async function deleteResponseCard(index) {
    const ok = await confirm({
      title: "Delete response card?",
      message: "This response card will be removed.",
      confirmText: "Delete Card",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "response", "cards"],
      responseCards.filter((_, i) => i !== index),
    );
  }

  function cycleResponseColor(index) {
    const nextCards = responseCards.map((card, i) => {
      if (i !== index) return card;

      const currentIndex = colorOrder.indexOf(card.color || "orange");
      const nextColor = colorOrder[(currentIndex + 1) % colorOrder.length];

      return {
        ...card,
        color: nextColor,
      };
    });

    onChangePath?.([...path, "response", "cards"], nextCards);
  }

  return (
    <div className={revealClass}>
      <EditableText
        as="div"
        value={info.eyebrow}
        editable={editable}
        path={[...path, "eyebrow"]}
        onChangePath={onChangePath}
        className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]"
        editClassName="!text-[#F57A24]"
      />

      <EditableText
        as="h2"
        value={info.title}
        editable={editable}
        path={[...path, "title"]}
        onChangePath={onChangePath}
        className="mb-7 text-[32px] font-black leading-[1.1] tracking-[-1.5px] text-white"
        editClassName="!text-white"
      />

      {editable && (
        <button
          type="button"
          onClick={addItem}
          className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
        >
          <Plus size={13} />
          Add Contact Item
        </button>
      )}

      <div className="mb-9 flex flex-col gap-3">
        {items.map((item, index) => {
          const iconName = item.icon || "Mail";
          const Icon = LucideIcons[iconName] || LucideIcons.Mail;
          const classes = getColorClasses(item.bg);

          return (
            <div
              key={`${item.label}-${index}`}
              className={`group rounded-xl border border-white/[0.07] bg-[#112233] px-5 py-[18px] transition hover:bg-[#152a40] ${classes.hover}`}
            >
              <div className="flex items-start gap-3.5">
                {editable ? (
                  <LucideIconPicker
                    value={iconName}
                    onChange={(nextIcon) => updateItemIcon(index, nextIcon)}
                  />
                ) : (
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition group-hover:scale-105 ${classes.bg} ${classes.iconColor}`}
                  >
                    <Icon size={19} strokeWidth={2.2} />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <EditableText
                    as="div"
                    value={item.label}
                    editable={editable}
                    path={[...path, "items", index, "label"]}
                    onChangePath={onChangePath}
                    className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-[#F57A24]"
                    editClassName="!text-[#F57A24]"
                  />

                  <EditableText
                    as="div"
                    value={item.value}
                    editable={editable}
                    multiline
                    path={[...path, "items", index, "value"]}
                    onChangePath={onChangePath}
                    className="whitespace-pre-line text-sm font-semibold leading-relaxed text-white"
                    editClassName="!text-white"
                  />
                </div>

                {editable && (
                  <button
                    type="button"
                    onClick={() => deleteItem(index)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/15 text-red-300 transition hover:bg-red-500/25"
                    title="Delete item"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>

              {editable && (
                <div className="mt-3 pl-[52px]">
                  <button
                    type="button"
                    onClick={() => cycleItemColor(index)}
                    className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold text-white/45 transition hover:border-[#F57A24]/35 hover:text-white"
                  >
                    Color: {item.bg || "orange"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#112233] p-5">
        <EditableText
          as="div"
          value={info.response.title}
          editable={editable}
          path={[...path, "response", "title"]}
          onChangePath={onChangePath}
          className="mb-4 text-[11px] font-bold uppercase tracking-[1px] text-white/30"
          editClassName="!text-white/60"
        />

        {editable && (
          <button
            type="button"
            onClick={addResponseCard}
            className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
          >
            <Plus size={13} />
            Add Response Card
          </button>
        )}

        <div className="flex gap-3">
          {responseCards.map((card, index) => {
            const classes = getColorClasses(card.color);

            return (
              <div
                key={`${card.label}-${index}`}
                className="relative flex-1 rounded-lg bg-[#162840] p-3.5 text-center"
              >
                {editable && (
                  <button
                    type="button"
                    onClick={() => deleteResponseCard(index)}
                    className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-red-500/15 text-red-300 transition hover:bg-red-500/25"
                    title="Delete response card"
                  >
                    ×
                  </button>
                )}

                <EditableText
                  as="div"
                  value={card.value}
                  editable={editable}
                  path={[...path, "response", "cards", index, "value"]}
                  onChangePath={onChangePath}
                  className={`text-[22px] font-black ${classes.text}`}
                  editClassName="!text-white"
                />

                <EditableText
                  as="div"
                  value={card.label}
                  editable={editable}
                  path={[...path, "response", "cards", index, "label"]}
                  onChangePath={onChangePath}
                  className="mt-1 text-[10px] text-white/30"
                  editClassName="!text-white/60"
                />

                {editable && (
                  <button
                    type="button"
                    onClick={() => cycleResponseColor(index)}
                    className="mt-3 rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[10px] font-bold text-white/45 transition hover:border-[#F57A24]/35 hover:text-white"
                  >
                    {card.color || "orange"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
