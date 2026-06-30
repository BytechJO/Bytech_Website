import { Edit3, Trash2, Layers } from "lucide-react";

export default function SectionCard({ section, onEdit, onDelete }) {
  return (
    <div className="rounded-[26px] border border-white/[0.07] bg-[#112233]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-[20px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F57A24]/15 text-[#F57A24]">
            <Layers size={20} />
          </div>

          <p className="text-[11px] uppercase tracking-[1.7px] text-white/25">
            {section.type || "Section"}
          </p>

          <h3 className="mt-2 truncate text-[20px] font-black tracking-[-0.7px] text-white">
            {section.title_en || section.title || "Untitled Section"}
          </h3>

          <p className="mt-1 truncate text-[13px] text-white/35">
            {section.title_ar || section.subtitle_en || "No description"}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                section.is_active
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "bg-red-400/10 text-red-300"
              }`}
            >
              {section.is_active ? "Active" : "Inactive"}
            </span>

            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-bold text-white/35">
              Order {section.sort_order ?? 0}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => onEdit(section)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/45 transition hover:border-[#F57A24]/30 hover:text-[#F57A24]"
          >
            <Edit3 size={16} />
          </button>

          <button
            onClick={() => onDelete(section)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/45 transition hover:border-red-400/30 hover:text-red-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
