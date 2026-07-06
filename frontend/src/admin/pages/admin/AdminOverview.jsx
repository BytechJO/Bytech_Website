import {
  BriefcaseBusiness,
  Images,
  Newspaper,
  Mail,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useGetAdminCmsPages } from "../../../api/cmsPages";
import { useGetAdminContactMessages } from "../../../api/contact";
import { useGetAnalytics } from "../../../api/Analytics";

export default function AdminOverview() {
  const { pages = [], loading: pagesLoading } = useGetAdminCmsPages();
  const { analytics, loading: analyticsLoading } = useGetAnalytics();
  const totalVisits = analytics?.totalVisits ?? 0;
  const todayVisits = analytics?.todayVisits ?? 0;
  const { messages = [], loading: inquiriesLoading } =
    useGetAdminContactMessages();

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
      <section className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#112233]/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-[24px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-[#F57A24]/20 bg-[#F57A24]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#F9B307]">
              Control Center
            </p>

            <h1 className="max-w-[680px] text-[34px] font-black leading-[1.05] tracking-[-1.7px] text-white lg:text-[46px]">
              Manage your digital ecosystem from one{" "}
              <span className="bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent">
                powerful dashboard.
              </span>
            </h1>

            <p className="mt-4 max-w-[580px] text-[14px] leading-[1.8] text-white/40">
              Update pages, manage website content, and follow client inquiries
              through a clean admin experience.
            </p>
          </div>

          <div className="grid min-w-[260px] grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <Eye className="mb-4 text-[#6CC2E9]" size={22} />

              <p className="text-[24px] font-black text-white">
                {analyticsLoading ? "-" : totalVisits}
              </p>

              <p className="text-[11px] text-white/30">
                {analyticsLoading ? "Loading..." : `${todayVisits} today`}
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <TrendingUp className="mb-4 text-[#F57A24]" size={22} />

              <p className="text-[24px] font-black text-white">
                {inquiriesLoading ? "-" : newInquiries}
              </p>

              <p className="text-[11px] text-white/30">New Inquiries</p>
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
