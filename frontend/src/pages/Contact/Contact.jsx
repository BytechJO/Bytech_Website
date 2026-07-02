import { useEffect, useState } from "react";
import { mutate } from "swr";
import { Loader2, Save } from "lucide-react";

import { updateAdminCmsPage, useGetCmsPage } from "../../api/cmsPages";
import ENDPOINTS from "../../api/endpoints";

import ContactHero from "./ContactHero";
import ContactSection from "./ContactSection";
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

export default function Contact({ editable = false }) {
  const { page, content, loading, error, refetch } = useGetCmsPage(
    "contact",
    editable,
  );

  const [pageContent, setPageContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    document.title = "Contact — Bytech";
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

    console.error("Load contact page error:", error);

    showToast({
      type: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to load contact page",
    });
  }, [error, showToast]);

  useEffect(() => {
    if (editable || !pageContent) return;

    let observer;

    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      document
        .querySelectorAll(
          ".contact-reveal, .contact-reveal-l, .contact-reveal-r",
        )
        .forEach((el) => {
          el.classList.remove("visible");
          observer.observe(el);
        });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [editable, pageContent]);

  function updatePath(path, value) {
    setPageContent((prev) => setValueByPath(prev || {}, path, value));
    setIsDirty(true);
  }

  async function handleSave() {
    if (!editable || !isDirty || saving) return;

    try {
      setSaving(true);

      await updateAdminCmsPage("contact", {
        title: page?.title || "Contact — Bytech",
        content: pageContent,
        is_active: page?.is_active ?? true,
      });

      await refetch();
      await mutate(ENDPOINTS.CMS_PAGES.PUBLIC_BY_KEY("contact"));

      setIsDirty(false);

      showToast({
        type: "success",
        message: "Contact page saved successfully",
      });
    } catch (err) {
      console.error("Save contact page error:", err);

      showToast({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to save contact page",
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
          <span className="text-sm">Loading contact...</span>
        </div>
      </main>
    );
  }

  if (!pageContent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1c2e] text-white">
        <div className="text-sm text-white/45">Contact content not found.</div>
      </main>
    );
  }

  return (
    <>
      <style>{`
        .contact-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-reveal-l {
          opacity: 0;
          transform: translateX(-36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-reveal-r {
          opacity: 0;
          transform: translateX(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-reveal.visible,
        .contact-reveal-l.visible,
        .contact-reveal-r.visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .contact-delay-1 { transition-delay: 0.1s; }
        .contact-delay-2 { transition-delay: 0.2s; }

        @keyframes contactOrb1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
        }

        @keyframes contactOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 40px); }
        }

        @keyframes contactPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes contactTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

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
        <ContactHero
          data={pageContent.hero}
          editable={editable}
          path={["hero"]}
          onChangePath={updatePath}
        />

        <ContactSection
          data={pageContent.section}
          editable={editable}
          path={["section"]}
          onChangePath={updatePath}
        />
      </main>
    </>
  );
}
