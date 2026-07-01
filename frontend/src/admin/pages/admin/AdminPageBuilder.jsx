import { useParams } from "react-router-dom";
import { Plus, Loader2, FileText } from "lucide-react";

import { useGetAdminPageBySlug } from "../../../api/pages";
import SectionCard from "../../components/SectionCard";

export default function AdminPageBuilder() {
  const { slug } = useParams();

  const { page, loading, error } = useGetAdminPageBySlug(slug);

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-[30px] border border-white/[0.07] bg-[#112233]/60">
        <div className="flex items-center gap-3 text-white/45">
          <Loader2 size={22} className="animate-spin" />
          <span className="text-sm">Loading page...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[30px] border border-red-400/20 bg-red-400/10 p-6 text-red-200">
        {error.response?.data?.message || "Failed to load page"}
      </div>
    );
  }

  if (!page) {
    return (
      <div className="rounded-[30px] border border-white/[0.07] bg-[#112233]/60 p-6 text-white/40">
        Page not found.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="rounded-[30px] border border-white/[0.07] bg-[#112233]/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-[24px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F57A24]/15 text-[#F57A24]">
                <FileText size={22} />
              </div>

              <p className="text-[11px] uppercase tracking-[1.8px] text-white/25">
                Page Builder
              </p>

              <h1 className="mt-2 text-[34px] font-black tracking-[-1.4px] text-white">
                {page.title || page.name || "Untitled Page"}
              </h1>

              <p className="mt-2 text-sm text-white/35">
                Manage sections for{" "}
                <span className="text-white/60">/{page.slug}</span>
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-px hover:bg-[#e06815]">
              <Plus size={18} />
              Add Section
            </button>
          </div>
        </div>

        <SectionCard slug={slug} />
      </div>
    </>
  );
}
