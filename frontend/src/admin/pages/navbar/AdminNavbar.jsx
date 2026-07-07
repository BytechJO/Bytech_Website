import { useMemo, useRef, useState } from "react";
import {
  Link2,
  Plus,
  Trash2,
  Loader2,
  FileText,
  GripVertical,
} from "lucide-react";

import AdminNavbarPreview from "./AdminNavbarPreview";

import {
  useGetAdminCmsPages,
  updateAdminCmsPage,
  updateCmsPageNavbarStatus,
  reorderCmsNavbarPages,
} from "../../../api/cmsPages";

// Keep in sync with AdminOverview.jsx / AdminSidebar.jsx / AdminInquiries.jsx
const ACCENT = "#F2A93B";
const SURFACE = "#0F1B2B";

function getPageKey(page) {
  return page.page_key || page.pageKey || "";
}

function getPageLabel(page) {
  return page.nav_label || page.navLabel || page.title || getPageKey(page);
}

function getPagePath(page) {
  const pageKey = getPageKey(page);

  return pageKey === "home" ? "/" : `/${pageKey}`;
}

export default function AdminNavbar() {
  const { pages, loading, error, refetch } = useGetAdminCmsPages();

  const [savingKey, setSavingKey] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dragOrder, setDragOrder] = useState([]);

  const autoScrollFrame = useRef(null);
  const lastDragY = useRef(null);

  const navbarPages = useMemo(() => {
    return [...pages]
      .filter((page) => page.show_in_navbar)
      .sort((a, b) => {
        const orderA = a.navbar_order ?? 0;
        const orderB = b.navbar_order ?? 0;

        if (orderA !== orderB) return orderA - orderB;

        return (a.id ?? 0) - (b.id ?? 0);
      });
  }, [pages]);

  const currentNavbarPages = useMemo(() => {
    if (!dragOrder.length) return navbarPages;

    const pageMap = new Map(
      navbarPages.map((page) => [getPageKey(page), page]),
    );

    return dragOrder.map((pageKey) => pageMap.get(pageKey)).filter(Boolean);
  }, [dragOrder, navbarPages]);

  const availablePages = useMemo(() => {
    return pages.filter((page) => !page.show_in_navbar);
  }, [pages]);

  function stopAutoScroll() {
    if (autoScrollFrame.current) {
      cancelAnimationFrame(autoScrollFrame.current);
      autoScrollFrame.current = null;
    }

    lastDragY.current = null;
  }

  function runAutoScroll() {
    if (lastDragY.current === null) return;

    const edgeSize = 130;
    const maxSpeed = 24;

    const y = lastDragY.current;
    const windowHeight = window.innerHeight;

    let scrollAmount = 0;

    if (y < edgeSize) {
      scrollAmount = -Math.ceil(((edgeSize - y) / edgeSize) * maxSpeed);
    }

    if (windowHeight - y < edgeSize) {
      scrollAmount = Math.ceil(
        ((edgeSize - (windowHeight - y)) / edgeSize) * maxSpeed,
      );
    }

    if (scrollAmount !== 0) {
      window.scrollBy({
        top: scrollAmount,
        behavior: "auto",
      });
    }

    autoScrollFrame.current = requestAnimationFrame(runAutoScroll);
  }

  function handleDragOver(event) {
    event.preventDefault();

    lastDragY.current = event.clientY;

    if (!autoScrollFrame.current) {
      autoScrollFrame.current = requestAnimationFrame(runAutoScroll);
    }
  }

  async function handleAddToNavbar(page) {
    const pageKey = getPageKey(page);

    try {
      setSavingKey(pageKey);

      await updateAdminCmsPage(pageKey, {
        title: page.title,
        nav_label: getPageLabel(page),
        show_in_navbar: true,
        navbar_order: navbarPages.length + 1,
        is_active: page.is_active ?? true,
      });

      setDragOrder([]);
      await refetch();
    } finally {
      setSavingKey(null);
    }
  }

  async function handleRemoveFromNavbar(page) {
    const pageKey = getPageKey(page);

    try {
      setSavingKey(pageKey);

      await updateCmsPageNavbarStatus(pageKey, {
        show_in_navbar: false,
      });

      setDragOrder([]);
      await refetch();
    } finally {
      setSavingKey(null);
    }
  }

  function handleDragStart(index) {
    setDraggedIndex(index);

    if (!dragOrder.length) {
      setDragOrder(navbarPages.map((page) => getPageKey(page)));
    }
  }

  function handleDragEnter(index) {
    if (draggedIndex === null || draggedIndex === index) return;

    setDragOverIndex(index);

    setDragOrder((prev) => {
      const currentOrder = prev.length
        ? [...prev]
        : navbarPages.map((page) => getPageKey(page));

      const [draggedItem] = currentOrder.splice(draggedIndex, 1);

      currentOrder.splice(index, 0, draggedItem);

      setDraggedIndex(index);

      return currentOrder;
    });
  }

  async function handleDragEnd() {
    stopAutoScroll();

    if (!dragOrder.length) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    try {
      setSavingOrder(true);

      const payload = dragOrder.map((pageKey, index) => ({
        page_key: pageKey,
        navbar_order: index + 1,
      }));

      await reorderCmsNavbarPages(payload);

      setDraggedIndex(null);
      setDragOverIndex(null);
      setDragOrder([]);

      await refetch();
    } finally {
      setSavingOrder(false);
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
          <span className="text-[13px]">Loading navbar pages…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-6 text-[13px] text-red-200">
        {error.response?.data?.message ||
          error.message ||
          "Failed to load pages"}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <AdminNavbarPreview links={currentNavbarPages} />

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Current navbar */}
        <div
          className="rounded-2xl border border-white/[0.06] p-6"
          style={{ backgroundColor: SURFACE }}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-white/25">
                Current navbar
              </p>

              <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.4px] text-white">
                In navbar
              </h2>

              <p className="mt-1.5 text-[13px] text-white/35">
                Drag items to change their order in the website navbar.
              </p>
            </div>

            {savingOrder && (
              <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/40">
                <Loader2 size={13} className="animate-spin" />
                Saving…
              </div>
            )}
          </div>

          {currentNavbarPages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.015] p-8 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-white/25">
                <Link2 size={19} />
              </div>

              <h3 className="text-[14px] font-semibold text-white">
                No navbar links
              </h3>

              <p className="mt-1.5 text-[12.5px] text-white/35">
                Add pages from the available list to make them appear in the
                navbar.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentNavbarPages.map((page, index) => {
                const pageKey = getPageKey(page);

                return (
                  <div
                    key={pageKey}
                    draggable={!savingOrder}
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    className={`flex cursor-grab items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition-colors duration-150 active:cursor-grabbing ${
                      dragOverIndex === index
                        ? "border-white/20 bg-white/[0.05]"
                        : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035]"
                    } ${savingOrder ? "pointer-events-none opacity-50" : ""}`}
                    style={
                      dragOverIndex === index
                        ? { boxShadow: `inset 2px 0 0 ${ACCENT}` }
                        : undefined
                    }
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/20">
                        <GripVertical size={16} />
                      </div>

                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${ACCENT}1F`,
                          color: ACCENT,
                        }}
                      >
                        <Link2 size={16} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-[13.5px] font-medium text-white">
                          {getPageLabel(page)}
                        </h3>

                        <p className="truncate text-[12px] text-white/30">
                          {getPagePath(page)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFromNavbar(page)}
                      disabled={savingKey === pageKey || savingOrder}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg bg-red-400/[0.08] px-3 py-2 text-[12px] font-medium text-red-300 transition-colors hover:bg-red-400/[0.15] disabled:opacity-50"
                    >
                      {savingKey === pageKey ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Available pages */}
        <div
          className="rounded-2xl border border-white/[0.06] p-6"
          style={{ backgroundColor: SURFACE }}
        >
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-white/25">
              Available pages
            </p>

            <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.4px] text-white">
              Add to navbar
            </h2>

            <p className="mt-1.5 text-[13px] text-white/35">
              These CMS pages exist in the backend but are not currently shown
              in the navbar.
            </p>
          </div>

          {availablePages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.015] p-8 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-white/25">
                <FileText size={19} />
              </div>

              <h3 className="text-[14px] font-semibold text-white">
                No available pages
              </h3>

              <p className="mt-1.5 text-[12.5px] text-white/35">
                All pages are currently added to the navbar.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {availablePages.map((page) => {
                const pageKey = getPageKey(page);

                return (
                  <div
                    key={pageKey}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                        <FileText size={16} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-[13.5px] font-medium text-white">
                          {getPageLabel(page)}
                        </h3>

                        <p className="truncate text-[12px] text-white/30">
                          {getPagePath(page)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToNavbar(page)}
                      disabled={savingKey === pageKey || savingOrder}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-[#0F1B2B] transition-opacity hover:opacity-90 disabled:opacity-50"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {savingKey === pageKey ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Plus size={14} />
                      )}
                      Add
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
