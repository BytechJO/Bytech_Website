import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

import { getAdminCmsPage, updateAdminCmsPage } from "../../api/cmsPages";

import ServicesHero from "./ServicesHero.jsx";
import ServiceBlocks from "./ServiceBlocks.jsx";
import PricingSection from "./PricingSection.jsx";
import { useToast } from "../components/ToastProvider";

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

export default function Services() {
  const [page, setPage] = useState(null);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function loadServicesPage() {
      try {
        setLoading(true);

        const data = await getAdminCmsPage("services");

        if (!mounted) return;

        setPage(data);
        setPageContent(data.content || {});
        setIsDirty(false);
      } catch (err) {
        console.error("Load admin services page error:", err);

        showToast({
          type: "error",
          message: err.message || "Failed to load services page",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadServicesPage();

    return () => {
      mounted = false;
    };
  }, [showToast]);

  function updatePath(path, value) {
    setPageContent((prev) => setValueByPath(prev || {}, path, value));
    setIsDirty(true);
  }

  async function handleSave() {
    if (!isDirty || saving) return;

    try {
      setSaving(true);

      const updatedPage = await updateAdminCmsPage("services", {
        title: page?.title || "Services — Bytech",
        content: pageContent,
        is_active: page?.is_active ?? true,
      });

      setPage(updatedPage);
      setPageContent(updatedPage.content || {});
      setIsDirty(false);

      showToast({
        type: "success",
        message: "Services page saved successfully",
      });
    } catch (err) {
      console.error("Save services page error:", err);

      showToast({
        type: "error",
        message: err.message || "Failed to save services page",
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
          <span className="text-sm">Loading services...</span>
        </div>
      </main>
    );
  }

  if (!pageContent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] text-white">
        <div className="text-sm text-white/45">Services content not found.</div>
      </main>
    );
  }

  const hero = pageContent?.hero || {};

  const serviceBlocks = Array.isArray(pageContent?.serviceBlocks)
    ? pageContent.serviceBlocks
    : [];

  const pricing = pageContent?.pricing || {};

  return (
    <>
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

      <main className="bg-[#0e1c2e] text-white">
        <ServicesHero
          data={hero}
          editable
          path={["hero"]}
          onChangePath={updatePath}
        />

        <ServiceBlocks
          data={serviceBlocks}
          editable
          path={["serviceBlocks"]}
          onChangePath={updatePath}
        />

        <PricingSection
          data={pricing}
          editable
          path={["pricing"]}
          onChangePath={updatePath}
        />
      </main>
    </>
  );
}
