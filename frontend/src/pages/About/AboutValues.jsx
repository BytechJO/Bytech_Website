import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackValues = {
  eyebrow: "Our Values",
  title: "What drives everything we do.",
  items: [
    {
      number: "01",
      title: "Integration over isolation.",
      desc: "The best digital outcomes happen when software, design, content, media, and marketing are built together — not handed off between separate vendors.",
      large: true,
    },
  ],
};

export default function AboutValues({
  data = {},
  editable = false,
  path = ["values"],
  onChangePath,
}) {
  const section = {
    ...fallbackValues,
    ...data,
  };

  const values = Array.isArray(section.items) ? section.items : [];

  const { confirm } = useConfirm();

  const revealClass = editable ? "" : "about-reveal";
  const delayClass = (delay) => (editable ? "" : delay);

  function addValue() {
    onChangePath?.(
      [...path, "items"],
      [
        ...values,
        {
          number: `${String(values.length + 1).padStart(2, "0")}`,
          title: "New Value",
          desc: "Write value description here.",
          large: false,
        },
      ],
    );
  }

  async function deleteValue(index) {
    const ok = await confirm({
      title: "Delete value?",
      message: "This value card will be removed.",
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "items"],
      values.filter((_, i) => i !== index),
    );
  }

  function toggleLarge(index) {
    const nextValues = values.map((value, i) =>
      i === index ? { ...value, large: !value.large } : value,
    );

    onChangePath?.([...path, "items"], nextValues);
  }

  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <EditableText
        as="div"
        value={section.eyebrow}
        editable={editable}
        path={[...path, "eyebrow"]}
        onChangePath={onChangePath}
        className={`${revealClass} mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]`}
        editClassName="!text-[#F57A24]"
      />

      <EditableText
        as="h2"
        value={section.title}
        editable={editable}
        path={[...path, "title"]}
        onChangePath={onChangePath}
        className={`${revealClass} ${delayClass(
          "about-delay-1",
        )} text-[34px] font-black leading-[1.1] tracking-[-1.5px] text-white sm:text-[42px]`}
        editClassName="!text-white"
      />

      {editable && (
        <button
          type="button"
          onClick={addValue}
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
        >
          <Plus size={13} />
          Add Value
        </button>
      )}

      <div className="mt-12 grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        {values.map((value, index) => (
          <article
            key={`${value.number}-${index}`}
            className={`${revealClass} ${
              editable
                ? ""
                : index > 0
                  ? `about-delay-${Math.min(index, 4)}`
                  : ""
            } relative rounded-[14px] border border-white/[0.07] bg-[#112233] p-7 ${
              value.large ? "lg:col-span-2" : ""
            }`}
          >
            {editable && (
              <div className="absolute right-3 top-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => toggleLarge(index)}
                  className="rounded-md bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-white/50 transition hover:bg-white/[0.1] hover:text-white"
                >
                  {value.large ? "Small" : "Large"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteValue(index)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-red-400/10 text-red-300 transition hover:bg-red-400/20"
                  title="Delete value"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            )}

            <EditableText
              as="div"
              value={value.number}
              editable={editable}
              path={[...path, "items", index, "number"]}
              onChangePath={onChangePath}
              className="mb-2.5 text-[10px] font-bold tracking-[2px] text-white/[0.15]"
              editClassName="!text-white/60"
            />

            <EditableText
              as="h3"
              value={value.title}
              editable={editable}
              path={[...path, "items", index, "title"]}
              onChangePath={onChangePath}
              className={`mb-3 font-bold text-white ${
                value.large
                  ? "text-xl font-extrabold tracking-[-0.5px]"
                  : "text-[15px]"
              }`}
              editClassName="!text-white"
            />

            <EditableText
              as="p"
              value={value.desc}
              editable={editable}
              multiline
              path={[...path, "items", index, "desc"]}
              onChangePath={onChangePath}
              className={`text-white/50 ${
                value.large
                  ? "text-[13px] leading-[1.75]"
                  : "text-xs leading-[1.65]"
              }`}
              editClassName="!text-white/80"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
