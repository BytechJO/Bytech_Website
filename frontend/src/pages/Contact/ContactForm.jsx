import { useEffect, useRef, useState } from "react";
import { GripVertical, Plus } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableContactField from "../../admin/components/EditableContactField";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackForm = {
  title: "Send us a message",
  description: "Fill in your details and we'll prepare a tailored proposal.",
  submitLabel: "Send Message →",
  fields: [
    {
      id: "fullName",
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Your name",
      required: true,
      width: "half",
    },
    {
      id: "company",
      label: "Company",
      name: "company",
      type: "text",
      placeholder: "Your company",
      required: false,
      width: "half",
    },
    {
      id: "email",
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "your@email.com",
      required: true,
      width: "full",
    },
    {
      id: "service",
      label: "Service of Interest",
      name: "service",
      type: "select",
      placeholder: "Select a service...",
      required: true,
      width: "full",
      options: [
        "Web Platform Development",
        "Mobile Application",
        "LMS System",
        "Interactive Content / E-Book",
        "Media Production",
        "Digital Growth",
        "Enterprise / Custom",
      ],
    },
    {
      id: "brief",
      label: "Project Brief",
      name: "brief",
      type: "textarea",
      placeholder: "Tell us about your project, goals, and timeline...",
      required: true,
      width: "full",
      rows: 4,
    },
  ],
  success: {
    eyebrow: "Message Sent",
    title: "Thank you!",
    description:
      "Your message has been received successfully. Our team will get back to you within 24 hours with a tailored response.",
    buttonLabel: "Great, thanks",
  },
};

function reorderArray(list, fromIndex, toIndex) {
  const nextList = [...list];
  const [movedItem] = nextList.splice(fromIndex, 1);

  nextList.splice(toIndex, 0, movedItem);

  return nextList;
}

export default function ContactForm({
  data = {},
  editable = false,
  path = ["form"],
  onChangePath,
}) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const autoScrollFrameRef = useRef(null);
  const lastMouseYRef = useRef(0);

  const form = {
    ...fallbackForm,
    ...data,
    success: {
      ...fallbackForm.success,
      ...(data?.success || {}),
    },
  };

  const fields = Array.isArray(form.fields) ? form.fields.filter(Boolean) : [];

  const { confirm } = useConfirm();

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/immutability
      stopAutoScroll();
    };
  }, []);

  function stopAutoScroll() {
    if (autoScrollFrameRef.current) {
      cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
  }

  function autoScrollWhileDragging() {
    const y = lastMouseYRef.current;
    const edgeSize = 120;
    const maxSpeed = 18;
    const windowHeight = window.innerHeight;

    let scrollSpeed = 0;

    if (y < edgeSize) {
      scrollSpeed = -maxSpeed * ((edgeSize - y) / edgeSize);
    } else if (y > windowHeight - edgeSize) {
      scrollSpeed = maxSpeed * ((y - (windowHeight - edgeSize)) / edgeSize);
    }

    if (scrollSpeed !== 0) {
      window.scrollBy({
        top: scrollSpeed,
        behavior: "auto",
      });
    }

    autoScrollFrameRef.current = requestAnimationFrame(autoScrollWhileDragging);
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollFrameRef.current = requestAnimationFrame(autoScrollWhileDragging);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editable) return;

    setSuccessOpen(true);
  }

  function addField() {
    // eslint-disable-next-line react-hooks/purity
    const time = Date.now();

    onChangePath?.(
      [...path, "fields"],
      [
        ...fields,
        {
          id: `field_${time}`,
          label: "New Field",
          name: `field_${time}`,
          type: "text",
          placeholder: "Write here...",
          required: false,
          width: "full",
        },
      ],
    );
  }

  async function deleteField(index) {
    const ok = await confirm({
      title: "Delete field?",
      message: "This input field will be removed from the contact form.",
      confirmText: "Delete Field",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "fields"],
      fields.filter((_, i) => i !== index),
    );
  }

  function handleDragStart(e, index) {
    if (!editable) return;

    setDraggedIndex(index);
    setDragOverIndex(index);

    lastMouseYRef.current = e.clientY;
    startAutoScroll();

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }

  function handleDrag(e) {
    if (!editable) return;

    if (e.clientY > 0) {
      lastMouseYRef.current = e.clientY;
    }
  }

  function handleDragOver(e, index) {
    if (!editable) return;

    e.preventDefault();

    lastMouseYRef.current = e.clientY;
    e.dataTransfer.dropEffect = "move";

    setDragOverIndex(index);
  }

  function handleDrop(e, dropIndex) {
    if (!editable) return;

    e.preventDefault();
    stopAutoScroll();

    const fromIndex =
      draggedIndex ?? Number(e.dataTransfer.getData("text/plain"));

    if (
      Number.isNaN(fromIndex) ||
      fromIndex === dropIndex ||
      fromIndex < 0 ||
      dropIndex < 0
    ) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const nextFields = reorderArray(fields, fromIndex, dropIndex);

    onChangePath?.([...path, "fields"], nextFields);

    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    stopAutoScroll();
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate={editable}
        className={`${
          editable ? "" : "contact-reveal-r"
        } rounded-[18px] border border-white/[0.07] bg-[#112233] p-6 sm:p-9`}
      >
        <EditableText
          as="h3"
          value={form.title}
          editable={editable}
          path={[...path, "title"]}
          onChangePath={onChangePath}
          className="mb-1.5 text-xl font-extrabold text-white"
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={form.description}
          editable={editable}
          multiline
          path={[...path, "description"]}
          onChangePath={onChangePath}
          className="mb-6 text-[13px] text-white/50"
          editClassName="!text-white/80"
        />

        {editable && (
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addField}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
            >
              <Plus size={13} />
              Add Field
            </button>

            <button
              type="button"
              onClick={() => setSuccessOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-white/45 transition hover:border-white/20 hover:text-white"
            >
              Edit Success Popup
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fields.map((field, index) => {
            const isDragging = draggedIndex === index;
            const isDragOver =
              dragOverIndex === index && draggedIndex !== index;

            return (
              <div
                key={field.id || `${field.name}-${index}`}
                draggable={editable}
                onDragStart={(e) => handleDragStart(e, index)}
                onDrag={handleDrag}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative rounded-xl transition ${
                  field.width === "full" ? "sm:col-span-2" : ""
                } ${
                  editable
                    ? "border border-transparent bg-white/[0.015] p-2"
                    : ""
                } ${isDragging ? "scale-[0.98] opacity-40" : ""} ${
                  isDragOver ? "border-[#F57A24]/60 bg-[#F57A24]/10" : ""
                }`}
              >
                {editable && (
                  <div className="mb-2 flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#0e1c2e] px-2.5 py-1.5">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1px] text-white/35">
                      <GripVertical
                        size={14}
                        className="cursor-grab text-[#F57A24]"
                      />
                      Drag field
                    </div>

                    <span className="text-[10px] text-white/25">
                      #{index + 1}
                    </span>
                  </div>
                )}

                <EditableContactField
                  field={field}
                  editable={editable}
                  path={[...path, "fields", index]}
                  onChangePath={onChangePath}
                  onDelete={() => deleteField(index)}
                />
              </div>
            );
          })}
        </div>

        <EditableText
          as="button"
          value={form.submitLabel}
          editable={editable}
          path={[...path, "submitLabel"]}
          onChangePath={onChangePath}
          className="mt-5 w-full rounded-lg bg-[#F57A24] p-3.5 text-sm font-bold text-white transition hover:bg-[#e06815]"
          editClassName="!text-white"
          type={editable ? "button" : "submit"}
          onClick={(e) => {
            if (editable) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      </form>

      {successOpen && (
        <SuccessPopup
          data={form.success}
          editable={editable}
          path={[...path, "success"]}
          onChangePath={onChangePath}
          onClose={() => setSuccessOpen(false)}
        />
      )}
    </>
  );
}

function SuccessPopup({ data, editable, path, onChangePath, onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-[#07111f]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#112233] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F57A24]/20 blur-[55px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#2F88C4]/20 blur-[55px]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition hover:border-white/20 hover:text-white"
        >
          ×
        </button>

        <div className="relative mx-auto mb-5 flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#F57A24]/25 bg-[#F57A24]/10">
          <div className="absolute h-full w-full animate-ping rounded-full bg-[#F57A24]/20" />
          <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#F57A24,#F9B307)] text-[26px] font-black text-white shadow-[0_12px_35px_rgba(245,122,36,0.35)]">
            ✓
          </div>
        </div>

        <EditableText
          as="div"
          value={data.eyebrow}
          editable={editable}
          path={[...path, "eyebrow"]}
          onChangePath={onChangePath}
          className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#F57A24]"
          editClassName="!text-[#F57A24]"
        />

        <EditableText
          as="h3"
          value={data.title}
          editable={editable}
          path={[...path, "title"]}
          onChangePath={onChangePath}
          className="mb-3 text-[26px] font-black leading-tight tracking-[-1px] text-white"
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={data.description}
          editable={editable}
          multiline
          path={[...path, "description"]}
          onChangePath={onChangePath}
          className="mx-auto mb-7 max-w-[320px] text-sm leading-[1.75] text-white/50"
          editClassName="!text-white/80"
        />

        <EditableText
          as="button"
          value={data.buttonLabel}
          editable={editable}
          path={[...path, "buttonLabel"]}
          onChangePath={onChangePath}
          onClick={onClose}
          className="w-full rounded-lg bg-[#F57A24] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e06815]"
          editClassName="!text-white"
          type="button"
        />
      </div>
    </div>
  );
}
