/* eslint-disable react-hooks/static-components */
import { useState } from "react";
import {
  BriefcaseBusiness,
  Images,
  Newspaper,
  Mail,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Loader2,
  X,
  Monitor,
  Smartphone,
  Tablet,
  Globe2,
  MapPin,
  Clock3,
  Laptop,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useGetAdminCmsPages } from "../../../api/cmsPages";
import { useGetAdminContactMessages } from "../../../api/contact";
import { useGetAnalytics, useGetAnalyticsVisits } from "../../../api/Analytics";
import { createPortal } from "react-dom";

export default function AdminOverview() {
  const [visitsOpen, setVisitsOpen] = useState(false);

  const { pages = [], loading: pagesLoading } = useGetAdminCmsPages();

  const { analytics, loading: analyticsLoading } = useGetAnalytics();
  const { visits = [], loading: visitsLoading } = useGetAnalyticsVisits();

  const { messages = [], loading: inquiriesLoading } =
    useGetAdminContactMessages();

  const totalVisits = analytics?.totalVisits ?? 0;
  const todayVisits = analytics?.todayVisits ?? 0;

  const totalPages = pages.length;
  const totalInquiries = messages.length;

  const newInquiries = messages.filter((item) => {
    return item.status === "new" || item.is_read === false;
  }).length;

  const recentInquiries = messages.slice(0, 3);

  const stats = [
    {
      label: "Pages",
      value: totalPages,
      change: pagesLoading ? "Loading..." : "CMS pages",
      icon: BriefcaseBusiness,
      path: "/admin/pages",
    },
    {
      label: "Portfolio Items",
      value: getPageExists(pages, "portfolio") ? "Live" : "0",
      change: "Portfolio page",
      icon: Images,
      path: "/admin/pages/portfolio",
    },
    {
      label: "Blog Posts",
      value: getPageExists(pages, "blog") ? "Live" : "0",
      change: "Blog page",
      icon: Newspaper,
      path: "/admin/pages/blog",
    },
    {
      label: "Inquiries",
      value: totalInquiries,
      change: `${newInquiries} new`,
      icon: Mail,
      path: "/admin/inquiries",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#112233]/65 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-[20px] lg:p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-[#F57A24]/20 bg-[#F57A24]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.4px] text-[#F9B307]">
              Control Center
            </p>

            <h1 className="max-w-[560px] text-[26px] font-black leading-[1.12] tracking-[-1px] text-white sm:text-[30px] lg:text-[36px]">
              Manage your website from one{" "}
              <span className="bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent">
                clean dashboard.
              </span>
            </h1>

            <p className="mt-3 max-w-[520px] text-[13px] leading-[1.7] text-white/40">
              Update pages, manage content, and track client inquiries in one
              place.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 lg:w-auto lg:min-w-[250px]">
            <button
              type="button"
              onClick={() => setVisitsOpen(true)}
              className="rounded-[18px] border border-white/[0.07] bg-white/[0.035] p-4 text-left transition-all duration-200 hover:border-[#6CC2E9]/30 hover:bg-[#6CC2E9]/10"
            >
              <Eye className="mb-3 text-[#6CC2E9]" size={20} />

              <p className="text-[22px] font-black leading-none text-white">
                {analyticsLoading ? "-" : totalVisits}
              </p>

              <p className="mt-2 text-[11px] text-white/30">
                {analyticsLoading ? "Loading..." : `${todayVisits} today`}
              </p>

              <p className="mt-3 inline-flex text-[11px] font-semibold text-[#6CC2E9]">
                View details
              </p>
            </button>

            <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.035] p-4">
              <TrendingUp className="mb-3 text-[#F57A24]" size={20} />

              <p className="text-[22px] font-black leading-none text-white">
                {inquiriesLoading ? "-" : newInquiries}
              </p>

              <p className="mt-2 text-[11px] text-white/30">New Inquiries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className="group rounded-[24px] border border-white/[0.07] bg-[#112233]/60 p-5 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-[#F57A24]/25 hover:bg-[#112233]/90"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] text-[#F57A24] transition group-hover:bg-[#F57A24] group-hover:text-white">
                  <Icon size={20} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-white/20 transition group-hover:text-[#F57A24]"
                />
              </div>

              <p className="text-[12px] text-white/35">{item.label}</p>

              <h3 className="mt-1 text-[32px] font-black tracking-[-1px] text-white">
                {pagesLoading || inquiriesLoading ? (
                  <Loader2 size={26} className="animate-spin text-white/35" />
                ) : (
                  item.value
                )}
              </h3>

              <p className="mt-2 text-[12px] text-[#6CC2E9]/70">
                {item.change}
              </p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[26px] border border-white/[0.07] bg-[#112233]/60 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-extrabold tracking-[-0.5px] text-white">
                Recent Inquiries
              </h3>

              <p className="text-[12px] text-white/30">
                Latest contact requests from your website.
              </p>
            </div>

            <Link
              to="/admin/inquiries"
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-[12px] font-semibold text-white/50 no-underline transition hover:text-white"
            >
              View All
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
            <table className="w-full border-collapse">
              <thead className="bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[1.4px] text-white/25">
                    Client
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[1.4px] text-white/25">
                    Type
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[1.4px] text-white/25">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {inquiriesLoading && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-8 text-center text-sm text-white/35"
                    >
                      Loading inquiries...
                    </td>
                  </tr>
                )}

                {!inquiriesLoading && recentInquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-8 text-center text-sm text-white/35"
                    >
                      No inquiries yet.
                    </td>
                  </tr>
                )}

                {!inquiriesLoading &&
                  recentInquiries.map((item) => {
                    const statusLabel = getStatusLabel(item.status);

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-white/[0.07] transition hover:bg-white/[0.03]"
                      >
                        <td className="px-4 py-4">
                          <p className="text-[13px] font-semibold text-white">
                            {item.full_name || item.fullName || "Unknown"}
                          </p>

                          <p className="text-[12px] text-white/30">
                            {item.email || "-"}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-[13px] text-white/45">
                          {item.service || "General"}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusClass(
                              item.status,
                            )}`}
                          >
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[26px] border border-white/[0.07] bg-[#112233]/60 p-5">
          <h3 className="text-[18px] font-extrabold tracking-[-0.5px] text-white">
            Quick Actions
          </h3>

          <p className="mb-5 text-[12px] text-white/30">
            Common admin shortcuts.
          </p>

          <div className="space-y-3">
            <QuickAction title="Manage Pages" path="/admin/pages" />
            <QuickAction title="Manage Navbar" path="/admin/navbar" />
            <QuickAction title="Review Inquiries" path="/admin/inquiries" />
            <QuickAction
              title="Edit Contact Page"
              path="/admin/pages/contact"
            />
          </div>
        </div>
      </section>

      {visitsOpen && (
        <VisitsModal
          visits={visits}
          loading={visitsLoading}
          onClose={() => setVisitsOpen(false)}
        />
      )}
    </div>
  );
}

function QuickAction({ title, path }) {
  return (
    <Link
      to={path}
      className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 text-[13px] font-semibold text-white/55 no-underline transition-all duration-200 hover:border-[#F57A24]/30 hover:bg-[#F57A24]/10 hover:text-white"
    >
      <span>{title}</span>

      <ArrowUpRight
        size={17}
        className="text-white/20 transition group-hover:text-[#F57A24]"
      />
    </Link>
  );
}

function VisitsModal({ visits, loading, onClose }) {
  return createPortal(
    <div className="fixed left-0 top-0 z-[99999] flex h-dvh w-dvw items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-[980px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0e1c2e] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] p-5">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-[#6CC2E9]/20 bg-[#6CC2E9]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.4px] text-[#6CC2E9]">
              Website Analytics
            </p>

            <h3 className="text-[22px] font-black tracking-[-0.8px] text-white">
              Visit Details
            </h3>

            <p className="mt-1 text-[12px] text-white/35">
              Latest visitors, location, device, browser, and visited page.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03] text-white/45 transition hover:bg-white/[0.07] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[68vh] overflow-y-auto p-5">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-16 text-white/35">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Loading visits...</span>
            </div>
          )}

          {!loading && visits.length === 0 && (
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-10 text-center text-sm text-white/35">
              No visits yet.
            </div>
          )}

          {!loading && visits.length > 0 && (
            <div className="grid gap-4">
              {visits.map((visit) => (
                <VisitCard key={visit.id} visit={visit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function VisitCard({ visit }) {
  const DeviceIcon = getDeviceIcon(visit.device?.deviceType);

  return (
    <article className="rounded-[22px] border border-white/[0.07] bg-white/[0.035] p-4 transition hover:border-[#F57A24]/20 hover:bg-white/[0.05]">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6CC2E9]/10 text-[#6CC2E9]">
            <DeviceIcon size={22} />
          </div>

          <div>
            <h4 className="text-[15px] font-extrabold text-white">
              {visit.device?.deviceName || "Unknown Device"}
            </h4>

            <p className="mt-1 text-[12px] text-white/35">
              {visit.device?.deviceType || "Unknown"} ·{" "}
              {visit.device?.os || "Unknown OS"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-black/10 px-3 py-2 text-[12px] text-white/35">
          <Clock3 size={14} className="mr-1 inline text-[#F9B307]" />
          {visit.visitedAtLabel || formatVisitDate(visit.visitedAt)}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <InfoBox
          icon={MapPin}
          label="Country"
          value={`${visit.location?.country || "Unknown"}${
            visit.location?.city ? ` / ${visit.location.city}` : ""
          }`}
        />
        <InfoBox
          icon={Monitor}
          label="Browser"
          value={visit.device?.browser || "Unknown Browser"}
        />

        <InfoBox
          icon={Laptop}
          label="Exact Model"
          value={visit.device?.model || "Not available"}
        />
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer text-[12px] font-semibold text-white/35 transition hover:text-white">
          Show technical details
        </summary>

        <div className="mt-3 rounded-2xl border border-white/[0.07] bg-black/15 p-3">
          <p className="text-[11px] leading-6 text-white/30">
            <span className="text-white/50">IP:</span> {visit.ip || "Unknown"}
          </p>

          <p className="break-all text-[11px] leading-6 text-white/30">
            <span className="text-white/50">User Agent:</span>{" "}
            {visit.device?.rawUserAgent || "Unknown"}
          </p>
        </div>
      </details>
    </article>
  );
}

function InfoBox({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-black/10 p-3">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.2px] text-white/25">
        <Icon size={14} />
        {label}
      </div>

      <p className="break-words text-[13px] font-semibold text-white/70">
        {value || "-"}
      </p>
    </div>
  );
}

function getDeviceIcon(deviceType) {
  if (deviceType === "Phone") return Smartphone;
  if (deviceType === "Tablet") return Tablet;
  if (deviceType === "Desktop") return Monitor;

  return Laptop;
}

function formatVisitDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Amman",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
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
  if (status === "new") {
    return "bg-[#F57A24]/10 text-[#F9B307]";
  }

  if (status === "in_progress") {
    return "bg-[#2F88C4]/10 text-[#6CC2E9]";
  }

  if (status === "done") {
    return "bg-emerald-400/10 text-emerald-300";
  }

  if (status === "archived") {
    return "bg-white/[0.06] text-white/40";
  }

  return "bg-[#F57A24]/10 text-[#F9B307]";
}
