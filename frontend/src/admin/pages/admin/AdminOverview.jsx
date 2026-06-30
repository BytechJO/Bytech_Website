import {
  BriefcaseBusiness,
  Images,
  Newspaper,
  Mail,
  Eye,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Services",
    value: "12",
    change: "+3 this month",
    icon: BriefcaseBusiness,
  },
  {
    label: "Portfolio Items",
    value: "24",
    change: "+5 this month",
    icon: Images,
  },
  {
    label: "Blog Posts",
    value: "18",
    change: "+2 this week",
    icon: Newspaper,
  },
  {
    label: "Inquiries",
    value: "37",
    change: "+12 new",
    icon: Mail,
  },
];

const inquiries = [
  {
    name: "Ahmad Saleh",
    email: "ahmad@example.com",
    type: "Website Platform",
    status: "New",
  },
  {
    name: "Sara Khaled",
    email: "sara@example.com",
    type: "Mobile App",
    status: "Pending",
  },
  {
    name: "Omar Ali",
    email: "omar@example.com",
    type: "Education System",
    status: "Done",
  },
];

export default function AdminOverview() {
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
              Update services, publish blogs, manage portfolio projects, and
              follow client inquiries through a clean admin experience.
            </p>
          </div>

          <div className="grid min-w-[260px] grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <Eye className="mb-4 text-[#6CC2E9]" size={22} />
              <p className="text-[24px] font-black text-white">8.4K</p>
              <p className="text-[11px] text-white/30">Page Views</p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
              <TrendingUp className="mb-4 text-[#F57A24]" size={22} />
              <p className="text-[24px] font-black text-white">+18%</p>
              <p className="text-[11px] text-white/30">Growth</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-[24px] border border-white/[0.07] bg-[#112233]/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F57A24]/25 hover:bg-[#112233]/90"
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
                {item.value}
              </h3>
              <p className="mt-2 text-[12px] text-[#6CC2E9]/70">
                {item.change}
              </p>
            </div>
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

            <button className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-[12px] font-semibold text-white/50 transition hover:text-white">
              View All
            </button>
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
                {inquiries.map((item) => (
                  <tr
                    key={item.email}
                    className="border-t border-white/[0.07] transition hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-4">
                      <p className="text-[13px] font-semibold text-white">
                        {item.name}
                      </p>
                      <p className="text-[12px] text-white/30">{item.email}</p>
                    </td>

                    <td className="px-4 py-4 text-[13px] text-white/45">
                      {item.type}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          item.status === "New"
                            ? "bg-[#F57A24]/10 text-[#F9B307]"
                            : item.status === "Pending"
                              ? "bg-[#2F88C4]/10 text-[#6CC2E9]"
                              : "bg-emerald-400/10 text-emerald-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
            <QuickAction title="Add Service" path="/admin/services/new" />
            <QuickAction
              title="Add Portfolio Item"
              path="/admin/portfolio/new"
            />
            <QuickAction title="Write Blog Post" path="/admin/blog/new" />
            <QuickAction title="Review Inquiries" path="/admin/inquiries" />
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickAction({ title, path }) {
  return (
    <a
      href={path}
      className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 text-[13px] font-semibold text-white/55 no-underline transition-all duration-200 hover:border-[#F57A24]/30 hover:bg-[#F57A24]/10 hover:text-white"
    >
      <span>{title}</span>
      <ArrowUpRight
        size={17}
        className="text-white/20 transition group-hover:text-[#F57A24]"
      />
    </a>
  );
}
