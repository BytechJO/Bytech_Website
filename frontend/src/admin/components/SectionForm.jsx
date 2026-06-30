import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const initialForm = {
  type: "hero",
  title_en: "",
  title_ar: "",
  subtitle_en: "",
  subtitle_ar: "",
  description_en: "",
  description_ar: "",
  image_url: "",
  cta_label_en: "",
  cta_label_ar: "",
  cta_url: "",
  sort_order: 0,
  is_active: true,
};

export default function SectionForm({
  open,
  pageId,
  section,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (section) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        type: section.type || "hero",
        title_en: section.title_en || "",
        title_ar: section.title_ar || "",
        subtitle_en: section.subtitle_en || "",
        subtitle_ar: section.subtitle_ar || "",
        description_en: section.description_en || "",
        description_ar: section.description_ar || "",
        image_url: section.image_url || "",
        cta_label_en: section.cta_label_en || "",
        cta_label_ar: section.cta_label_ar || "",
        cta_url: section.cta_url || "",
        sort_order: section.sort_order || 0,
        is_active: section.is_active ?? true,
      });
    } else {
      setForm(initialForm);
    }
  }, [section, open]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      await onSubmit({
        ...form,
        page_id: pageId,
        sort_order: Number(form.sort_order || 0),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-[900px] overflow-y-auto rounded-[30px] border border-white/[0.08] bg-[#112233] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[1.8px] text-white/25">
              Section Editor
            </p>
            <h2 className="mt-2 text-[26px] font-black tracking-[-1px] text-white">
              {section ? "Edit Section" : "Create Section"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Section Type
            </span>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            >
              <option className="bg-[#112233]" value="hero">
                Hero
              </option>
              <option className="bg-[#112233]" value="content">
                Content
              </option>
              <option className="bg-[#112233]" value="image_text">
                Image + Text
              </option>
              <option className="bg-[#112233]" value="cards">
                Cards
              </option>
              <option className="bg-[#112233]" value="gallery">
                Gallery
              </option>
              <option className="bg-[#112233]" value="custom">
                Custom
              </option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Sort Order
            </span>
            <input
              type="number"
              name="sort_order"
              value={form.sort_order}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Title EN
            </span>
            <input
              name="title_en"
              value={form.title_en}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Title AR
            </span>
            <input
              name="title_ar"
              value={form.title_ar}
              onChange={handleChange}
              dir="rtl"
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Subtitle EN
            </span>
            <input
              name="subtitle_en"
              value={form.subtitle_en}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Subtitle AR
            </span>
            <input
              name="subtitle_ar"
              value={form.subtitle_ar}
              onChange={handleChange}
              dir="rtl"
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Image URL
            </span>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              CTA Label EN
            </span>
            <input
              name="cta_label_en"
              value={form.cta_label_en}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label>
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              CTA Label AR
            </span>
            <input
              name="cta_label_ar"
              value={form.cta_label_ar}
              onChange={handleChange}
              dir="rtl"
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              CTA URL
            </span>
            <input
              name="cta_url"
              value={form.cta_url}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Description EN
            </span>
            <textarea
              name="description_en"
              value={form.description_en}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label className="md:col-span-2">
            <span className="mb-2 block text-[12px] font-semibold text-white/45">
              Description AR
            </span>
            <textarea
              name="description_ar"
              value={form.description_ar}
              onChange={handleChange}
              rows={4}
              dir="rtl"
              className="w-full resize-none rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 md:col-span-2">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm text-white/60">Active Section</span>
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-white/[0.07] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/50 transition hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e06815] disabled:opacity-60"
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Section"}
          </button>
        </div>
      </form>
    </div>
  );
}
