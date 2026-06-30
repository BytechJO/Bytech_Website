import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Loader2, FileText } from "lucide-react";

import {
  createSection,
  updateSection,
  deleteSection,
} from "../../../api/sections";

import { useGetAdminPageBySlug } from "../../../api/pages";
import SectionCard from "../../components/SectionCard";
import SectionForm from "../../components/SectionForm";

export default function AdminPageBuilder() {
  const { slug } = useParams();

  const { page, loading, error, refetch } = useGetAdminPageBySlug(slug);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const openCreateForm = () => {
    setSelectedSection(null);
    setFormOpen(true);
  };

  const openEditForm = (section) => {
    setSelectedSection(section);
    setFormOpen(true);
  };

  const closeForm = () => {
    setSelectedSection(null);
    setFormOpen(false);
  };

  const handleSubmitSection = async (payload) => {
    if (selectedSection) {
      await updateSection(selectedSection.id, payload);
    } else {
      await createSection(payload);
    }

    await refetch();
    closeForm();
  };

  const handleDeleteSection = async (section) => {
    const confirmDelete = window.confirm(
      `Delete section "${section.title_en || section.title || section.id}"?`,
    );

    if (!confirmDelete) return;

    await deleteSection(section.id);
    await refetch();
  };

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

  const sections = page.sections || [];

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
                {page.title || page.title_en || page.name || "Untitled Page"}
              </h1>

              <p className="mt-2 text-sm text-white/35">
                Manage sections for{" "}
                <span className="text-white/60">/{page.slug}</span>
              </p>
            </div>

            <button
              onClick={openCreateForm}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-px hover:bg-[#e06815]"
            >
              <Plus size={18} />
              Add Section
            </button>
          </div>
        </div>

        {sections.length === 0 ? (
          <div className="rounded-[30px] border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-white/25">
              <Plus size={24} />
            </div>

            <h3 className="text-xl font-black text-white">No sections yet</h3>

            <p className="mx-auto mt-2 max-w-[420px] text-sm text-white/35">
              Start building this page by adding your first section. It can be a
              hero, content block, image with text, gallery, or custom section.
            </p>

            <button
              onClick={openCreateForm}
              className="mt-6 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e06815]"
            >
              Create First Section
            </button>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                onEdit={openEditForm}
                onDelete={handleDeleteSection}
              />
            ))}
          </div>
        )}
      </div>

      <SectionForm
        open={formOpen}
        pageId={page.id}
        section={selectedSection}
        onClose={closeForm}
        onSubmit={handleSubmitSection}
      />
    </>
  );
}
