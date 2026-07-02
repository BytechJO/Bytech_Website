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
          content: {},
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
      <div className="flex min-h-[360px] items-center justify-center rounded-[30px] border border-white/[0.07] bg-[#112233]/60">
        <div className="flex items-center gap-3 text-white/45">
          <Loader2 size={22} className="animate-spin" />
          <span className="text-sm">Loading CMS pages...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[30px] border border-red-400/20 bg-red-400/10 p-6 text-red-200">
        {error.response?.data?.message ||
          error.message ||
          "Failed to load CMS pages"}
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
                CMS Pages Manager
              </p>

              <h1 className="mt-2 text-[34px] font-black tracking-[-1.4px] text-white">
                Website Pages
              </h1>

              <p className="mt-2 max-w-[620px] text-sm leading-6 text-white/35">
                Create, edit, delete, and manage CMS pages from here.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateForm}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-px hover:bg-[#e06815]"
            >
              <Plus size={18} />
              Add Page
            </button>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/[0.07] bg-[#112233]/70 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-[24px]">
          {sortedPages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-white/25">
                <FileText size={24} />
              </div>

              <h3 className="text-xl font-black text-white">No pages yet</h3>

              <p className="mx-auto mt-2 max-w-[420px] text-sm text-white/35">
                Start by creating your first CMS page.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-6 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e06815]"
              >
                Create First Page
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedPages.map((page) => {
                const pageKey = getPageKey(page);

                return (
                  <div
                    key={page.id || pageKey}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 transition hover:bg-white/[0.05]"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F57A24]/15 text-[#F57A24]">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-bold text-white">
                          {page.title || "Untitled Page"}
                        </h3>

                        <p className="truncate text-[12px] text-white/35">
                          /{pageKey}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`hidden rounded-full px-3 py-1 text-[11px] font-bold sm:inline-flex ${
                          page.is_active
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {page.is_active ? "Active" : "Inactive"}
                      </span>

                      <span
                        className={`hidden rounded-full px-3 py-1 text-[11px] font-bold md:inline-flex ${
                          page.show_in_navbar
                            ? "bg-[#F57A24]/10 text-[#F9B307]"
                            : "bg-white/[0.05] text-white/30"
                        }`}
                      >
                        {page.show_in_navbar
                          ? "In Navbar"
                          : "Hidden from Navbar"}
                      </span>

                      <button
                        type="button"
                        onClick={() => openEditForm(page)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/45 transition hover:border-[#F57A24]/30 hover:text-[#F57A24]"
                        title="Edit page"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(page)}
                        disabled={deletingKey === pageKey}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/45 transition hover:border-red-400/30 hover:text-red-300 disabled:opacity-60"
                        title="Delete page"
                      >
                        {deletingKey === pageKey ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[620px] rounded-[30px] border border-white/[0.08] bg-[#112233] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[1.8px] text-white/25">
                  CMS Page Editor
                </p>

                <h2 className="mt-2 text-[26px] font-black tracking-[-1px] text-white">
                  {selectedPage ? "Edit Page" : "Add Page"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-white/45">
                  Page Title
                </span>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Services"
                  className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#F57A24]/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-white/45">
                  Page Key
                </span>

                <input
                  name="page_key"
                  value={form.page_key}
                  onChange={handleChange}
                  placeholder="example: services"
                  disabled={Boolean(selectedPage)}
                  className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#F57A24]/40 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <p className="mt-2 text-[11px] text-white/25">
                  Public URL: /{form.page_key || "page-key"}
                </p>
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-white/45">
                  Navbar Label
                </span>

                <input
                  name="nav_label"
                  value={form.nav_label}
                  onChange={handleChange}
                  placeholder="Example: Services"
                  className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#F57A24]/40"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />

                  <span className="text-sm text-white/60">Active Page</span>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                  <input
                    type="checkbox"
                    name="show_in_navbar"
                    checked={form.show_in_navbar}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />

                  <span className="text-sm text-white/60">Show in Navbar</span>
                </label>
              </div>

              {formError && (
                <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-[13px] text-red-200">
                  {formError}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-white/[0.07] pt-5">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/50 transition hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e06815] disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}

                {saving ? "Saving..." : "Save Page"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
