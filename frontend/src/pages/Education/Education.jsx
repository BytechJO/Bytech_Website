import { useEffect, useState } from "react";
import { mutate } from "swr";
import { Loader2, Save } from "lucide-react";

import { updateAdminCmsPage, useGetCmsPage } from "../../api/cmsPages";
import ENDPOINTS from "../../api/endpoints";

import EducationAiSection from "./EducationAiSection";
import EducationHero from "./EducationHero";
import EducationInteractiveSection from "./EducationInteractiveSection";
import EducationLmsSection from "./EducationLmsSection";
import { useToast } from "../../admin/components/ToastProvider";

function setValueByPath(obj, path, value) {
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  let current = copy;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    if (Array.isArray(current[key])) {
      current[key] = [...current[key]];
    } else if (current[key] && typeof current[key] === "object") {
      current[key] = { ...current[key] };
    } else {
      current[key] = typeof path[i + 1] === "number" ? [] : {};
    }

    current = current[key];
  }

  current[path[path.length - 1]] = value;

  return copy;
}

export default function Education({ editable = false }) {
  const { page, content, loading, error, refetch } = useGetCmsPage(
    "education",
    editable,
  );

  const [pageContent, setPageContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Education — Bytech";
  }, []);

  useEffect(() => {
    if (content) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPageContent(content);
      setIsDirty(false);
    }
  }, [content]);

  useEffect(() => {
    if (!error) return;

    console.error("Load education page error:", error);

    showToast({
      type: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to load education page",
    });
  }, [error, showToast]);

  function updatePath(path, value) {
    setPageContent((prev) => setValueByPath(prev || {}, path, value));
    setIsDirty(true);
  }

  async function handleSave() {
    if (!editable || !isDirty || saving) return;

    try {
      setSaving(true);

      await updateAdminCmsPage("education", {
        title: page?.title || "Education — Bytech",
        content: pageContent,
        is_active: page?.is_active ?? true,
      });

      await refetch();

      await mutate(ENDPOINTS.CMS_PAGES.PUBLIC_BY_KEY("education"));

      setIsDirty(false);

      showToast({
        type: "success",
        message: "Education page saved successfully",
      });
    } catch (err) {
      console.error("Save education page error:", err);

      showToast({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to save education page",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] text-white">
        <div className="flex items-center gap-3 text-white/45">
          <Loader2 size={22} className="animate-spin" />
          <span className="text-sm">Loading education...</span>
        </div>
      </main>
    );
  }

  if (!pageContent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] text-white">
        <div className="text-sm text-white/45">
          Education content not found.
        </div>
      </main>
    );
  }

  return (
    <>
      {editable && (
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="fixed bottom-6 right-6 z-[99999] inline-flex items-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(245,122,36,0.35)] transition hover:bg-[#e06815] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35 disabled:shadow-none"
        >
          {saving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}

          {saving ? "Saving..." : isDirty ? "Save Changes" : "No Changes"}
        </button>
      )}

      <main className="bg-[#0e1c2e] text-white">
        <EducationHero
          data={pageContent.hero}
          editable={editable}
          path={["hero"]}
          onChangePath={updatePath}
        />

        <EducationLmsSection
          data={pageContent.lms}
          editable={editable}
          path={["lms"]}
          onChangePath={updatePath}
        />

        <EducationInteractiveSection
          data={pageContent.interactive}
          editable={editable}
          path={["interactive"]}
          onChangePath={updatePath}
        />

        <EducationAiSection
          data={pageContent.ai}
          editable={editable}
          path={["ai"]}
          onChangePath={updatePath}
        />
      </main>
    </>
  );
}
