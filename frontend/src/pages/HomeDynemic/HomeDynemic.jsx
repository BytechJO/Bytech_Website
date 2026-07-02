import { useEffect, useState } from "react";
import { mutate } from "swr";
import { Loader2, Save } from "lucide-react";

import { updateAdminCmsPage, useGetCmsPage } from "../../api/cmsPages.js";
import ENDPOINTS from "../../api/endpoints.js";

import HeroSection from "./HeroSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import AboutSection from "./AboutSection.jsx";
import ProcessSection from "./ProcessSection.jsx";
import CtaSection from "./CtaSection.jsx";
import Ticker from "../../components/Ticker.jsx";
import PartnersSection from "./PartnersSection.jsx";
import { useToast } from "../../admin/components/ToastProvider.jsx";

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

export default function HomeDynemic({ editable = false }) {
  const { page, content, loading, error, refetch } = useGetCmsPage(
    "home",
    editable,
  );

  const [pageContent, setPageContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Bytech — Build. Launch. Grow.";
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

    console.error("Load home page error:", error);

    showToast({
      type: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to load home page",
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

      await updateAdminCmsPage("home", {
        title: page?.title || "Bytech — Build. Launch. Grow.",
        content: pageContent,
        is_active: page?.is_active ?? true,
      });

      await refetch();
      await mutate(ENDPOINTS.CMS_PAGES.PUBLIC_BY_KEY("home"));

      setIsDirty(false);

      showToast({
        type: "success",
        message: "Home page saved successfully",
      });
    } catch (err) {
      console.error("Save home page error:", err);

      showToast({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to save home page",
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
          <span className="text-sm">Loading home...</span>
        </div>
      </main>
    );
  }

  if (!pageContent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] text-white">
        <div className="text-sm text-white/45">Home content not found.</div>
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

      <main className="home-page relative overflow-x-hidden text-white">
        <HeroSection
          data={pageContent.hero}
          editable={editable}
          path={["hero"]}
          onChangePath={updatePath}
        />

        <PartnersSection
          data={pageContent.partners}
          editable={editable}
          path={["partners"]}
          onChangePath={updatePath}
        />

        {!editable && <Ticker />}

        <ServicesSection
          data={pageContent.services}
          editable={editable}
          path={["services"]}
          onChangePath={updatePath}
        />

        <AboutSection
          data={pageContent.about}
          editable={editable}
          path={["about"]}
          onChangePath={updatePath}
        />

        <ProcessSection
          data={pageContent.process}
          editable={editable}
          path={["process"]}
          onChangePath={updatePath}
        />

        <CtaSection
          data={pageContent.cta}
          editable={editable}
          path={["cta"]}
          onChangePath={updatePath}
        />
      </main>
    </>
  );
}
