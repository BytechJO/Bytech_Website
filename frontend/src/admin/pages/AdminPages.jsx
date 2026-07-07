import { useMemo, useState } from "react";
import { FileText, Plus, Edit3, Trash2, Loader2, X, Save } from "lucide-react";

import {
  useGetAdminCmsPages,
  createAdminCmsPage,
  updateAdminCmsPage,
  deleteAdminCmsPage,
} from "../../api/cmsPages";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";

// Keep in sync with AdminOverview.jsx / AdminSidebar.jsx / AdminHeader.jsx / AdminInquiries.jsx / AdminNavbar.jsx
const ACCENT = "#F2A93B";
const SURFACE = "#0F1B2B";

const initialForm = {
  title: "",
  page_key: "",
  nav_label: "",
  is_active: true,
  show_in_navbar: false,
};

function generatePageKey(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPageKey(page) {
  return page.page_key || page.pageKey || "";
}

function getNavLabel(page) {
  return page.nav_label || page.navLabel || page.title || getPageKey(page);
}

export default function AdminPages() {
  const { pages, loading, error, refetch } = useGetAdminCmsPages();

  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [deletingKey, setDeletingKey] = useState(null);
  const [formError, setFormError] = useState("");

  const sortedPages = useMemo(() => {
    return [...pages].sort((a, b) => {
      return (a.id ?? 0) - (b.id ?? 0);
    });
  }, [pages]);

  function openCreateForm() {
    setSelectedPage(null);
    setForm(initialForm);
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(page) {
    setSelectedPage(page);

    setForm({
      title: page.title || "",
      page_key: getPageKey(page),
      nav_label: getNavLabel(page),
      is_active: page.is_active ?? true,
      show_in_navbar: page.show_in_navbar ?? false,
    });

    setFormError("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setSelectedPage(null);
    setForm(initialForm);
    setFormError("");
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((prev) => {
      const next = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "title" && !selectedPage) {
        next.page_key = generatePageKey(value);
        next.nav_label = value;
      }

      if (name === "page_key") {
        next.page_key = generatePageKey(value);
      }

      return next;
    });

    setFormError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const pageKey = generatePageKey(form.page_key);

    if (!title) {
      setFormError("Page title is required");

      showToast({
        type: "error",
        title: "Missing title",
        message: "Please enter a page title before saving.",
      });

      return;
    }

    if (!pageKey) {
      setFormError("Page key is required");

      showToast({
        type: "error",
        title: "Missing page key",
        message: "Please enter a valid page key before saving.",
      });

      return;
    }

    try {
      setSaving(true);

      const payload = {
        title,
        page_key: pageKey,
        nav_label: form.nav_label.trim() || title,
        is_active: form.is_active,
        show_in_navbar: form.show_in_navbar,
      };

      if (selectedPage) {
        await updateAdminCmsPage(getPageKey(selectedPage), payload);
      } else {
        await createAdminCmsPage({
          ...payload,
          content: [],
        });
      }
      await refetch();
      closeForm();

      showToast({
        type: "success",
        title: selectedPage ? "Page updated" : "Page created",
        message: selectedPage
          ? `"${payload.title}" has been updated successfully.`
          : `"${payload.title}" has been created successfully.`,
      });
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to save page";

      setFormError(message);

      showToast({
        type: "error",
        title: "Save failed",
        message,
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(page) {
    const pageKey = getPageKey(page);
    const pageName = page.title || pageKey || "this page";

    const confirmed = await confirm({
      title: "Delete page?",
      message: `Are you sure you want to delete "${pageName}"? This action cannot be undone.`,
      confirmText: "Delete Page",
      cancelText: "Cancel",
      danger: true,
    });

    if (!confirmed) return;

    try {
      setDeletingKey(pageKey);

      await deleteAdminCmsPage(pageKey);
      await refetch();

      showToast({
        type: "success",
        title: "Page deleted",
        message: `"${pageName}" has been deleted successfully.`,
      });
    } catch (err) {
      showToast({
        type: "error",
        title: "Delete failed",
        message:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong while deleting the page.",
      });
    } finally {
      setDeletingKey(null);
    }
  }

  if (loading) {
    return (
      <div
        className="flex min-h-[360px] items-center justify-center rounded-2xl border border-white/[0.06]"
        style={{ backgroundColor: SURFACE }}
      >
        <div className="flex items-center gap-3 text-white/40">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-[13px]">Loading CMS pages…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-6 text-[13px] text-red-200">
        {error.response?.data?.message ||
          error.message ||
          "Failed to load CMS pages"}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        {/* Header card */}
        <div
          className="rounded-2xl border border-white/[0.06] p-6"
          style={{ backgroundColor: SURFACE }}
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${ACCENT}1F`, color: ACCENT }}
              >
                <FileText size={19} />
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-white/25">
                CMS pages manager
              </p>

              <h1 className="mt-1.5 text-[26px] font-bold tracking-[-0.6px] text-white">
                Website pages
              </h1>

              <p className="mt-1.5 max-w-[600px] text-[13px] leading-6 text-white/35">
                Create, edit, delete, and manage CMS pages from here.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateForm}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#0F1B2B] transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              <Plus size={16} />
              Add page
            </button>
          </div>
        </div>

        {/* Pages list */}
        <div
          className="rounded-2xl border border-white/[0.06] p-5"
          style={{ backgroundColor: SURFACE }}
        >
          {sortedPages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.015] p-10 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/25">
                <FileText size={21} />
              </div>

              <h3 className="text-[15px] font-semibold text-white">
                No pages yet
              </h3>

              <p className="mx-auto mt-1.5 max-w-[420px] text-[13px] text-white/35">
                Start by creating your first CMS page.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#0F1B2B] transition-opacity hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Create first page
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedPages.map((page) => {
                const pageKey = getPageKey(page);

                return (
                  <div
                    key={page.id || pageKey}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-colors hover:bg-white/[0.035]"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${ACCENT}1F`,
                          color: ACCENT,
                        }}
                      >
                        <FileText size={16} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-[13.5px] font-medium text-white">
                          {page.title || "Untitled Page"}
                        </h3>

                        <p className="truncate text-[12px] text-white/30">
                          /{pageKey}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`hidden rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${
                          page.is_active
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {page.is_active ? "Active" : "Inactive"}
                      </span>

                      <span
                        className="hidden rounded-full px-2.5 py-1 text-[11px] font-medium md:inline-flex"
                        style={
                          page.show_in_navbar
                            ? { backgroundColor: `${ACCENT}1A`, color: ACCENT }
                            : undefined
                        }
                      >
                        <span
                          className={
                            page.show_in_navbar ? "" : "text-white/30"
                          }
                        >
                          {page.show_in_navbar
                            ? "In navbar"
                            : "Hidden from navbar"}
                        </span>
                      </span>

                      <button
                        type="button"
                        onClick={() => openEditForm(page)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 transition-colors hover:text-white"
                        title="Edit page"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(page)}
                        disabled={deletingKey === pageKey}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 transition-colors hover:text-red-300 disabled:opacity-50"
                        title="Delete page"
                      >
                        {deletingKey === pageKey ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[580px] rounded-2xl border border-white/[0.07] p-6"
            style={{ backgroundColor: SURFACE }}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-white/25">
                  CMS page editor
                </p>

                <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.4px] text-white">
                  {selectedPage ? "Edit page" : "Add page"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/40 transition-colors hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-3.5">
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-white/45">
                  Page title
                </span>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Services"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[13px] text-white outline-none placeholder:text-white/20 focus:border-white/20"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-white/45">
                  Page key
                </span>

                <input
                  name="page_key"
                  value={form.page_key}
                  onChange={handleChange}
                  placeholder="example: services"
                  disabled={Boolean(selectedPage)}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[13px] text-white outline-none placeholder:text-white/20 focus:border-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <p className="mt-1.5 text-[11.5px] text-white/25">
                  Public URL: /{form.page_key || "page-key"}
                </p>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-white/45">
                  Navbar label
                </span>

                <input
                  name="nav_label"
                  value={form.nav_label}
                  onChange={handleChange}
                  placeholder="Example: Services"
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[13px] text-white outline-none placeholder:text-white/20 focus:border-white/20"
                />
              </label>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#F2A93B]"
                  />

                  <span className="text-[13px] text-white/55">
                    Active page
                  </span>
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                  <input
                    type="checkbox"
                    name="show_in_navbar"
                    checked={form.show_in_navbar}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#F2A93B]"
                  />

                  <span className="text-[13px] text-white/55">
                    Show in navbar
                  </span>
                </label>
              </div>

              {formError && (
                <div className="rounded-xl border border-red-400/15 bg-red-400/[0.06] px-3.5 py-2.5 text-[12.5px] text-red-200">
                  {formError}
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2.5 border-t border-white/[0.06] pt-4">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-white/45 transition-colors hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#0F1B2B] transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: ACCENT }}
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}

                {saving ? "Saving…" : "Save page"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
