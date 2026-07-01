import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Settings, X } from "lucide-react";

export default function EditableButton({
  label,
  url,
  editable = false,
  labelPath,
  urlPath,
  onChangePath,
  className = "",
  fallbackLabel = "Contact Us",
}) {
  const [open, setOpen] = useState(false);
  const [draftLabel, setDraftLabel] = useState(label || fallbackLabel);
  const [draftUrl, setDraftUrl] = useState(url || "/contact");

  useEffect(() => {
    if (!open) return;

    function closeOnEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [open]);

  function openEditor(e) {
    e.preventDefault();
    e.stopPropagation();

    setDraftLabel(label || fallbackLabel);
    setDraftUrl(url || "/contact");
    setOpen(true);
  }

  function save() {
    onChangePath?.(labelPath, draftLabel.trim() || fallbackLabel);
    onChangePath?.(urlPath, draftUrl.trim() || "/contact");
    setOpen(false);
  }

  if (!editable) {
    return (
      <Link to={url || "/contact"} className={className}>
        {label || fallbackLabel}
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        className={`${className} relative`}
        title="Click to edit button"
      >
        {label || fallbackLabel}

        <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/15 align-middle">
          <Settings size={12} />
        </span>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/35 px-4 backdrop-blur-sm">
            <div
              className="w-full max-w-[380px] rounded-2xl border border-white/[0.08] bg-[#112233] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-black text-white">Edit Button</h4>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/45 hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>

              <label className="mb-3 block">
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.8px] text-white/30">
                  Button Label
                </span>

                <input
                  autoFocus
                  value={draftLabel}
                  onChange={(e) => setDraftLabel(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#F57A24]/50"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.8px] text-white/30">
                  Button URL / href
                </span>

                <input
                  value={draftUrl}
                  onChange={(e) => setDraftUrl(e.target.value)}
                  placeholder="/contact"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-[#F57A24]/50"
                />
              </label>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/[0.08] px-4 py-2 text-xs font-bold text-white/45 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={save}
                  className="rounded-xl bg-[#F57A24] px-4 py-2 text-xs font-bold text-white hover:bg-[#e06815]"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
