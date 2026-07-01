import { useEffect, useState } from "react";

export default function EditableText({
  value,
  editable = false,
  path,
  onChangePath,
  as = "span",
  className = "",
  multiline = false,
  placeholder = "Double click to edit",
  editClassName = "",
}) {
  const Tag = as;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(value || "");
  }, [value]);

  function save() {
    setEditing(false);

    const nextValue = draft.trim();

    if (nextValue !== value) {
      onChangePath?.(path, nextValue);
    }
  }

  function cancel() {
    setDraft(value || "");
    setEditing(false);
  }

  const editableOutlineClass =
    "cursor-text outline outline-1 outline-transparent transition hover:outline-[#F57A24]/70";

  const editBaseClass =
    "rounded-xl border border-[#F57A24]/60 bg-[#0e1c2e]/95 outline-none placeholder:text-current/35 opacity-100 translate-y-0 translate-x-0";

  const cleanEditClassName = className
    .replaceAll("service-reveal-left", "")
    .replaceAll("service-reveal-right", "")
    .replaceAll("service-reveal", "")
    .replaceAll("service-delay-1", "")
    .replaceAll("service-delay-2", "")
    .replaceAll("service-delay-3", "")
    .replaceAll("service-delay-4", "")
    .replaceAll("service-delay-5", "");

  if (!editable) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (editing) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Escape") cancel();
          }}
          className={`${cleanEditClassName} ${editBaseClass} ${editClassName} min-h-[110px] w-full px-3 py-2 text-white`}
        />
      );
    }

    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") cancel();
        }}
        className={`${cleanEditClassName} ${editBaseClass} ${editClassName} px-2 py-1 text-white`}
      />
    );
  }

  return (
    <Tag
      onDoubleClick={() => setEditing(true)}
      title="Double click to edit"
      className={`${className} ${editableOutlineClass}`}
    >
      {value || placeholder}
    </Tag>
  );
}
