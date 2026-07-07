import {
  BriefcaseBusiness,
  Images,
  Newspaper,
  Mail,
  Eye,
  ArrowUpRight,
  Loader2,
  LayoutGrid,
  MessageSquareText,
  PenSquare,
  Compass,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useGetAdminCmsPages } from "../../../api/cmsPages";
import { useGetAdminContactMessages } from "../../../api/contact";
import { useGetAnalytics } from "../../../api/Analytics";

// A single accent, used with restraint. Everything else stays quiet neutrals.
const ACCENT = "#F2A93B";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

export default function AdminOverview() {
  const { pages = [], loading: pagesLoading } = useGetAdminCmsPages();
  const { analytics, loading: analyticsLoading } = useGetAnalytics();
  const totalVisits = analytics?.totalVisits ?? 0;
  const todayVisits = analytics?.todayVisits ?? 0;
  const visitTrend = analytics?.visitTrend ?? []; // optional array of numbers, last 14 days
  const { messages = [], loading: inquiriesLoading } =
    useGetAdminContactMessages();

  const totalPages = pages.length;
  const totalInquiries = messages.length;
  const newInquiries = messages.filter(
    (item) => item.status === "new" || item.is_read === false,
  ).length;

  const recentInquiries = messages.slice(0, 4);

  const stats = [
    {
      label: "Pages",
      value: totalPages,
      change: "CMS pages",
      icon: LayoutGrid,
      path: "/admin/pages",
    },
    {
      label: "Portfolio",
      value: getPageExists(pages, "portfolio") ? "Live" : "Draft",
      change: "Portfolio page",
      icon: Images,
      path: "/admin/pages/portfolio",
    },
    {
      label: "Blog",
      value: getPageExists(pages, "blog") ? "Live" : "Draft",
      change: "Blog page",
      icon: Newspaper,
      path: "/admin/pages/blog",
    },
    {
      label: "Inquiries",
      value: totalInquiries,
      change: `${newInquiries} unread`,
      icon: Mail,
      path: "/admin/inquiries",
    },
  ];

  const quickActions = [
    {
      title: "Manage pages",
      desc: "Edit copy, sections and layout",
      path: "/admin/pages",
      icon: BriefcaseBusiness,
    },
    {
      title: "Manage navbar",
      desc: "Reorder links and menus",
      path: "/admin/navbar",
      icon: Compass,
    },
    {
      title: "Review inquiries",
      desc: `${newInquiries || 0} waiting on a reply`,
      path: "/admin/inquiries",
      icon: MessageSquareText,
    },
    {
      title: "Edit contact page",
      desc: "Update form and details",
      path: "/admin/pages/contact",
      icon: PenSquare,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Hero */}
      <section className="rounded-3xl border border-white/[0.06] bg-[#0F1B2B] p-7">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[560px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: ACCENT }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[1.5px] text-white/50">
                Live overview
              </span>
            </div>

            <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.5px] text-white lg:text-[38px]">
              Everything on the site,{" "}
              <span style={{ color: ACCENT }}>at a glance.</span>
            </h1>

            <p className="mt-3 text-[14px] leading-[1.7] text-white/40">
              Pages, inquiries and traffic, kept in one quiet place.
            </p>
          </div>

          {/* Signature element: visits rendered as an instrument-style readout with a sparkline, not another gradient card */}
          <div className="min-w-[260px] rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/35">
                <Eye size={15} />
                <span className="text-[12px]">Total visits</span>
              </div>
              <span className="text-[11px] text-white/25">
                {analyticsLoading ? "" : `+${todayVisits} today`}
              </span>
            </div>

            <p
              className="text-[30px] font-semibold text-white"
              style={{ fontFamily: MONO }}
            >
              {analyticsLoading ? (
                <Loader2 size={22} className="animate-spin text-white/30" />
              ) : (
                totalVisits.toLocaleString()
              )}
            </p>

            <Sparkline data={visitTrend} />
          </div>
        </div>
      </section>

      {/* Stat grid */}
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="group rounded-2xl border border-white/[0.06] bg-[#0F1B2B] p-5 no-underline transition-colors duration-200 hover:border-white/[0.14]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-white/50">
                  <Icon size={17} />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-white/15 transition-colors group-hover:text-white/50"
                />
              </div>

              <p className="text-[12px] text-white/35">{item.label}</p>

              <h3
                className="mt-1 text-[26px] font-semibold text-white"
                style={{ fontFamily: MONO }}
              >
                {pagesLoading || inquiriesLoading ? (
                  <Loader2 size={22} className="animate-spin text-white/30" />
                ) : (
                  item.value
                )}
              </h3>

              <p className="mt-2 text-[12px] text-white/30">{item.change}</p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        {/* Recent inquiries */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0F1B2B] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold text-white">
                Recent inquiries
              </h3>
              <p className="text-[12px] text-white/30">
                Latest contact requests from your site.
              </p>
            </div>
            <Link
              to="/admin/inquiries"
              className="rounded-lg border border-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/45 no-underline transition-colors hover:text-white"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.06]">
            {inquiriesLoading && (
              <div className="px-4 py-8 text-center text-[13px] text-white/30">
                Loading inquiries…
              </div>
            )}

            {!inquiriesLoading && recentInquiries.length === 0 && (
              <div className="px-4 py-8 text-center text-[13px] text-white/30">
                No inquiries yet. New messages will show up here.
              </div>
            )}

            {!inquiriesLoading &&
              recentInquiries.map((item) => {
                const name = item.full_name || item.fullName || "Unknown";
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-[12px] font-semibold text-white/60">
                      {getInitials(name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-white">
                        {name}
                      </p>
                      <p className="truncate text-[12px] text-white/30">
                        {item.email || "—"} · {item.service || "General"}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusClass(
                        item.status,
                      )}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0F1B2B] p-5">
          <h3 className="text-[16px] font-semibold text-white">
            Quick actions
          </h3>
          <p className="mb-4 text-[12px] text-white/30">
            Common admin shortcuts.
          </p>

          <div className="space-y-2">
            {quickActions.map((item) => (
              <QuickAction key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickAction({ title, desc, path, icon: Icon }) {
  return (
    <Link
      to={path}
      className="group flex items-center gap-3 rounded-xl border border-white/[0.06] px-3.5 py-3 no-underline transition-colors duration-150 hover:border-white/[0.14] hover:bg-white/[0.02]"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/45">
        <Icon size={15} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-white/85">
          {title}
        </p>
        <p className="truncate text-[11.5px] text-white/30">{desc}</p>
      </div>

      <ArrowUpRight
        size={15}
        className="shrink-0 text-white/15 transition-colors group-hover:text-white/50"
      />
    </Link>
  );
}

// Small dependency-free sparkline. Falls back to a flat baseline if no trend data is passed.
function Sparkline({ data }) {
  const points = data && data.length >= 2 ? data : [1, 1];
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const w = 220;
  const h = 40;
  const step = w / (points.length - 1);

  const path = points
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-3 h-8 w-full"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function getPageKey(page) {
  return page.page_key || page.pageKey || page.slug || "";
}

function getPageExists(pages, pageKey) {
  return pages.some((page) => getPageKey(page) === pageKey);
}

function getStatusLabel(status) {
  if (status === "new") return "New";
  if (status === "in_progress") return "Pending";
  if (status === "done") return "Done";
  if (status === "archived") return "Archived";
  return "New";
}

function getStatusClass(status) {
  if (status === "new") return "bg-[#F2A93B]/10 text-[#F2A93B]";
  if (status === "in_progress") return "bg-[#6CC2E9]/10 text-[#6CC2E9]";
  if (status === "done") return "bg-emerald-400/10 text-emerald-300";
  if (status === "archived") return "bg-white/[0.06] text-white/40";
  return "bg-[#F2A93B]/10 text-[#F2A93B]";
}
