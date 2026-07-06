import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackPartners = {
  eyebrow: "Trusted by leading organizations",
  items: [
    {
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&auto=format",
      imageAlt: "PMAA Education",
      name: "PMAA Education",
      type: "Education Group",
      color: "orange",
      to: "/portfolio",
    },
    {
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&h=200&fit=crop&auto=format",
      imageAlt: "AIM Ambition",
      name: "AIM Ambition",
      type: "Digital Printing",
      color: "blue",
      to: "/portfolio",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=200&fit=crop&auto=format",
      imageAlt: "Ruwad Al Hayah",
      name: "Ruwad Al Hayah",
      type: "Educational Services",
      color: "cyan",
      to: "/portfolio",
    },
  ],
};

const imageBgColors = {
  orange: "bg-[#F57A24]/[0.12] ring-[#F57A24]/20",
  blue: "bg-[#2F88C4]/[0.12] ring-[#2F88C4]/20",
  cyan: "bg-[#6CC2E9]/[0.12] ring-[#6CC2E9]/20",
  yellow: "bg-[#F9B307]/[0.12] ring-[#F9B307]/20",
};

function normalizePartner(partner, index) {
  return {
    image:
      partner?.image ||
      partner?.logo ||
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&auto=format",
    imageAlt: partner?.imageAlt || partner?.name || `Partner ${index + 1}`,
    name: partner?.name || `Partner ${index + 1}`,
    type: partner?.type || "Partner Type",
    color: partner?.color || "orange",
    to: partner?.to || "/portfolio",
  };
}

export default function PartnersSection({
  data = {},
  editable = false,
  path = ["partners"],
  onChangePath,
}) {
  const section = {
    ...fallbackPartners,
    ...data,
  };

  const partners = Array.isArray(section.items)
    ? section.items.filter(Boolean).map(normalizePartner)
    : fallbackPartners.items;

  const { confirm } = useConfirm();

  function addPartner() {
    onChangePath?.(
      [...path, "items"],
      [
        ...partners,
        {
          image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&auto=format",
          imageAlt: "New Partner",
          name: "New Partner",
          type: "Partner Type",
          color: "orange",
          to: "/portfolio",
        },
      ],
    );
  }

  async function deletePartner(index) {
    const ok = await confirm({
      title: "Delete partner?",
      message: "This partner will be removed.",
      confirmText: "Delete Partner",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "items"],
      partners.filter((_, i) => i !== index),
    );
  }

  return (
    <section className="border-b border-white/[0.07] bg-[#0e1c2e] px-4 py-7 text-white sm:px-6 sm:py-8 lg:px-[60px]">
      <EditableText
        as="div"
        value={section.eyebrow}
        editable={editable}
        path={[...path, "eyebrow"]}
        onChangePath={onChangePath}
        className="mb-5 flex items-center gap-3 text-center text-[9px] font-bold uppercase tracking-[1.4px] text-white/20 before:h-px before:flex-1 before:bg-white/[0.06] after:h-px after:flex-1 after:bg-white/[0.06] sm:mb-[22px] sm:gap-4 sm:text-[10px] sm:tracking-[2px]"
        editClassName="!text-white/60"
      />

      {editable && (
        <button
          type="button"
          onClick={addPartner}
          className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
        >
          <Plus size={13} />
          Add Partner
        </button>
      )}

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        {partners.map((partner, index) => {
          const CardTag = editable ? "div" : Link;

          const cardProps = editable
            ? {}
            : {
                to: partner.to || "/portfolio",
              };

          return (
            <CardTag
              key={`${partner.name}-${index}`}
              {...cardProps}
              className="group relative flex min-h-[132px] flex-col items-center justify-center gap-2.5 rounded-[14px] border border-white/[0.07] bg-white/[0.04] px-3 py-4 text-center no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F57A24]/30 hover:bg-white/[0.06] sm:min-h-[118px] sm:flex-row sm:justify-start sm:gap-2.5 sm:rounded-[10px] sm:px-3.5 sm:py-3 sm:text-left xl:min-h-0"
            >
              {editable && (
                <button
                  type="button"
                  onClick={() => deletePartner(index)}
                  className="absolute right-2 top-2 z-[50] inline-flex h-6 w-6 items-center justify-center rounded-md bg-red-500/80 text-white transition hover:bg-red-600"
                  title="Delete partner"
                >
                  <Trash2 size={12} />
                </button>
              )}

              <div
                className={`relative flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 transition duration-300 group-hover:scale-105 sm:h-[34px] sm:w-[34px] sm:rounded-lg ${
                  imageBgColors[partner.color] || imageBgColors.orange
                }`}
              >
                <EditableImage
                  src={partner.image}
                  alt={partner.imageAlt || partner.name || "Partner"}
                  editable={editable}
                  path={[...path, "items", index, "image"]}
                  onChangePath={onChangePath}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <EditableText
                  as="div"
                  value={partner.name}
                  editable={editable}
                  path={[...path, "items", index, "name"]}
                  onChangePath={onChangePath}
                  className="line-clamp-2 text-[11px] font-bold leading-[1.35] text-white sm:truncate sm:leading-[1.3]"
                  editClassName="!text-white"
                />

                <EditableText
                  as="div"
                  value={partner.type}
                  editable={editable}
                  path={[...path, "items", index, "type"]}
                  onChangePath={onChangePath}
                  className="mt-1 line-clamp-2 text-[9px] leading-[1.35] text-white/30 sm:mt-0.5 sm:truncate"
                  editClassName="!text-white/60"
                />

                {editable && (
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                    <EditableText
                      as="span"
                      value={partner.to || "/portfolio"}
                      editable={editable}
                      path={[...path, "items", index, "to"]}
                      onChangePath={onChangePath}
                      className="rounded-md bg-white/[0.06] px-2 py-1 text-[9px] font-bold text-white/30"
                      editClassName="!text-white"
                    />
                  </div>
                )}
              </div>
            </CardTag>
          );
        })}
      </div>
    </section>
  );
}
