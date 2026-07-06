import { Search } from "lucide-react";
import NotificationsBell from "./NotificationsBell";

export default function AdminHeader() {
  const admin = JSON.parse(localStorage.getItem("admin_user") || "null");

  return (
    <header className="sticky top-[64px] z-20 border-b border-white/[0.07] bg-[#0e1c2e]/80 backdrop-blur-[24px] lg:top-0">
      <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:h-[78px] lg:px-8 lg:py-0">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[1.6px] text-white/25 sm:text-[11px] sm:tracking-[1.8px]">
            Admin Dashboard
          </p>

          <h2 className="truncate text-[18px] font-extrabold tracking-[-0.6px] text-white sm:text-[20px] sm:tracking-[-0.7px]">
            Welcome back
          </h2>
        </div>

        <div className="hidden max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 md:flex">
          <Search size={16} className="text-white/25" />

          <input
            type="text"
            placeholder="Search content..."
            className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/25"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <NotificationsBell />

          <div className="hidden items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 sm:flex">
            <div className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,#2F88C4,#6CC2E9)]" />

            <div className="min-w-0">
              <p className="max-w-[140px] truncate text-[12px] font-semibold text-white">
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
