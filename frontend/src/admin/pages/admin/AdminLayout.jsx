import { Outlet } from "react-router-dom";
import { Menu, Search, Bell } from "lucide-react";
import AdminSidebar from "../../AdminSidebar";

export default function AdminLayout() {
  const admin = JSON.parse(localStorage.getItem("admin_user") || "null");

  return (
    <div className="min-h-screen bg-[#0e1c2e] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#F57A24]/10 blur-[120px]" />
        <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-[#2F88C4]/10 blur-[120px]" />
        <div className="absolute bottom-[-160px] left-1/2 h-[420px] w-[420px] rounded-full bg-[#F9B307]/5 blur-[140px]" />
      </div>

      <AdminSidebar />

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#0e1c2e]/80 backdrop-blur-[24px]">
          <div className="flex h-[78px] items-center justify-between gap-4 px-5 lg:px-8">
            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/60 lg:hidden">
                <Menu size={20} />
              </button>

              <div>
                <p className="text-[11px] uppercase tracking-[1.8px] text-white/25">
                  Admin Dashboard
                </p>
                <h2 className="text-[20px] font-extrabold tracking-[-0.7px] text-white">
                  Welcome back
                </h2>
              </div>
            </div>

            <div className="hidden max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 md:flex">
              <Search size={16} className="text-white/25" />
              <input
                type="text"
                placeholder="Search content..."
                className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/25"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/55 transition hover:text-[#F57A24]">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F57A24]" />
              </button>

              <div className="hidden items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 sm:flex">
                <div className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,#2F88C4,#6CC2E9)]" />

                <div>
                  <p className="text-[12px] font-semibold text-white">
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

        <main className="relative z-10 min-h-[calc(100vh-78px)] px-5 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
