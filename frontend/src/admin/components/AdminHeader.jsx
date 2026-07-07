import { Search } from "lucide-react";
import NotificationsBell from "./NotificationsBell";

// Keep in sync with AdminOverview.jsx / AdminSidebar.jsx / AdminInquiries.jsx / AdminNavbar.jsx
const ACCENT = "#F2A93B";
const SURFACE = "#0F1B2B";

export default function AdminHeader() {
  const admin = JSON.parse(localStorage.getItem("admin_user") || "null");

  const initials = getInitials(admin?.full_name || admin?.email || "Admin");

  return (
    <header
      className="sticky top-[60px] z-20 border-b border-white/[0.06] backdrop-blur-[20px] lg:top-0"
      style={{ backgroundColor: `${SURFACE}CC` }}
    >
      <div className="flex min-h-[68px] items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:h-[72px] lg:px-8 lg:py-0">
        <div className="min-w-0">
          <p className="text-[10.5px] font-medium uppercase tracking-[1.4px] text-white/25">
            Admin dashboard
          </p>

          <h2 className="truncate text-[17px] font-semibold tracking-[-0.4px] text-white sm:text-[18px]">
            Welcome back
          </h2>
        </div>

        <div className="hidden max-w-[340px] flex-1 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-2.5 transition-colors focus-within:border-white/15 md:flex">
          <Search size={15} className="shrink-0 text-white/25" />

          <input
            type="text"
            placeholder="Search content…"
            className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/25"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <NotificationsBell />

          <div className="hidden items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 sm:flex">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold"
              style={{ backgroundColor: `${ACCENT}1F`, color: ACCENT }}
            >
              {initials}
            </div>

            <div className="min-w-0">
              <p className="max-w-[130px] truncate text-[12px] font-medium text-white">
                {admin?.full_name || admin?.email || "Admin User"}
              </p>

              <p className="text-[11px] text-white/30">
                {admin?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function getInitials(value) {
  const cleaned = value.includes("@") ? value.split("@")[0] : value;

  return cleaned
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}
