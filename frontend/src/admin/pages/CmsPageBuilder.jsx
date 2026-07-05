import { useEffect, useState } from "react";
import { Loader2, Plus, Save, X } from "lucide-react";
import DynamicHeroSection from "./cms-sections/DynamicHeroSection";
import { useToast } from "../components/ToastProvider";
import { updateAdminCmsPage } from "../../api/cmsPages";
import DynamicBlocksSection from "./cms-sections/DynamicBlocksSection";

function createId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getPageKey(page) {
  return page?.page_key || page?.pageKey || "";
}

function normalizeContent(content) {
  return Array.isArray(content) ? content : [];
}

function setDeepValue(target, path, value) {
  if (!Array.isArray(path) || path.length === 0) {
    return value;
  }

  const next = Array.isArray(target) ? [...target] : { ...(target || {}) };
  let current = next;

  path.forEach((key, index) => {
    const isLast = index === path.length - 1;

    if (isLast) {
      current[key] = value;
      return;
    }

    const nextKey = path[index + 1];

    if (current[key] === undefined || current[key] === null) {
      current[key] = typeof nextKey === "number" ? [] : {};
    } else {
      current[key] = Array.isArray(current[key])
        ? [...current[key]]
        : { ...current[key] };
    }

    current = current[key];
  });

  return next;
}

const SECTION_OPTIONS = [
  {
    key: "hero",
    label: "Hero",
    description: "Main page hero section with image, title and description.",
  },
  {
    key: "blocks",
    label: "Blocks",
    description: "Repeating content blocks with images, text and buttons.",
  },
];

const SECTION_COMPONENTS = {
  hero: DynamicHeroSection,
  blocks: DynamicBlocksSection,
};

function createDefaultSection(type) {
  if (type === "hero") {
    return {
      id: createId("hero"),
      type: "hero",
      data: {
        badge: "New Page",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&auto=format&fit=crop",
        imageAlt: "Page Hero",
        titleBefore: "Build something",
        titleHighlight: "great.",
        description:
          "Write a short description for this page. Explain what this page is about and why visitors should care.",
      },
    };
  }

  if (type === "blocks") {
    return {
      id: createId("blocks"),
      type: "blocks",
      data: [
        {
          id: createId("block"),
          badge: "Feature",
          label: "CONTENT",
          number: "01",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop",
          titleLine1: "Flexible content,",
          titleLine2: "ready to edit.",
          description:
            "Use this block to describe a service, feature, process, or any page content.",
          features: [
            "Editable image and text",
            "Repeating content blocks",
            "Automatic alternating layout",
          ],
          buttonLabel: "Learn More →",
          buttonUrl: "/contact",
        },
      ],
    };
  }

  return null;
}

function AddSectionModal({ open, onClose, onAdd }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[620px] rounded-[30px] border border-white/[0.08] bg-[#112233] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[1.8px] text-white/25">
              Add Section
            </p>

            <h2 className="mt-2 text-[26px] font-black tracking-[-1px] text-white">
              Choose a section
            </h2>

            <p className="mt-2 text-sm text-white/35">
              Start this CMS page with Hero or Blocks.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {SECTION_OPTIONS.map((section) => {
            return (
              <button
                key={section.key}
                type="button"
                onClick={() => onAdd(section.key)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 text-left transition hover:border-[#F57A24]/30 hover:bg-[#F57A24]/10"
              >
                <div>
                  <h3 className="text-[15px] font-black text-white">
                    {section.label}
                  </h3>

                  <p className="mt-1 text-[12px] text-white/35">
                    {section.description}
                  </p>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F57A24]/15 text-[#F57A24]">
                  <Plus size={18} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CmsPageBuilder({ page, onSaved }) {
  const { showToast } = useToast();

  const [content, setContent] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContent(normalizeContent(page?.content));
    setDirty(false);
  }, [page]);

  function handleAddSection(type) {
    const nextSection = createDefaultSection(type);

    if (!nextSection) return;

    setContent((prev) => [...prev, nextSection]);
    setDirty(true);
    setModalOpen(false);
  }

  function handleDeleteSection(sectionIndex) {
    setContent((prev) => prev.filter((_, index) => index !== sectionIndex));
    setDirty(true);
  }

  function handleUpdateSectionData(sectionIndex, childPath, value) {
    setContent((prev) =>
      prev.map((section, index) => {
        if (index !== sectionIndex) return section;

        return {
          ...section,
          data: setDeepValue(section.data, childPath, value),
        };
      }),
    );

    setDirty(true);
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateAdminCmsPage(getPageKey(page), {
        title: page.title,
        page_key: getPageKey(page),
        nav_label: page.nav_label || page.navLabel || page.title,
        is_active: page.is_active ?? true,
        show_in_navbar: page.show_in_navbar ?? page.showInNavbar ?? false,
        content,
      });

      setDirty(false);
      onSaved?.();

      showToast({
        type: "success",
        title: "Page saved",
        message:`${page.title} page content has been saved successfully.`,
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Save failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong while saving the page.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="space-y-5">
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#F57A24]/25 bg-[#112233]/95 px-5 py-3 text-sm font-bold text-[#F57A24] shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:bg-[#F57A24]/15"
          >
            <Plus size={17} />
            Add Section
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white shadow-[0_20px_70px_rgba(245,122,36,0.28)] transition hover:bg-[#e06815] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            Save Changes
          </button>
        </div>

        {content.length === 0 ? (
          <div className="rounded-[30px] border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center">
            <h3 className="text-xl font-black text-white">Empty CMS page</h3>

            <p className="mx-auto mt-2 max-w-[520px] text-sm leading-6 text-white/35">
              Add Hero or Blocks to start building this page.
            </p>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e06815]"
            >
              <Plus size={17} />
              Add First Section
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {content.map((section, index) => {
              const SectionComponent = SECTION_COMPONENTS[section.type];

              return (
                <div
                  key={section.id || `${section.type}-${index}`}
                  className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#112233]/70"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] bg-[#112233]/90 p-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/25">
                        Section
                      </p>

                      <h3 className="mt-1 text-lg font-black capitalize text-white">
                        {section.type}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteSection(index)}
                      className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/15"
                    >
                      Delete
                    </button>
                  </div>

                  {SectionComponent ? (
                    <SectionComponent
                      data={section.data}
                      editable
                      path={[]}
                      onChangePath={(childPath, value) =>
                        handleUpdateSectionData(index, childPath, value)
                      }
                    />
                  ) : (
                    <div className="p-5">
                      <pre className="max-h-[260px] overflow-auto rounded-2xl bg-[#0e1c2e] p-4 text-xs leading-6 text-white/45">
                        {JSON.stringify(section.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AddSectionModal
        open={modalOpen}
        content={content}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddSection}
      />
    </>
  );
}
