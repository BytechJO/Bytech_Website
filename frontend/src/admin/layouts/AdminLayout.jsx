import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0e1c2e] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#F57A24]/10 blur-[120px]" />
        <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-[#2F88C4]/10 blur-[120px]" />
        <div className="absolute bottom-[-160px] left-1/2 h-[420px] w-[420px] rounded-full bg-[#F9B307]/5 blur-[140px]" />
      </div>

      <AdminSidebar />

      <div className="lg:pl-[280px]">
        <AdminHeader />

        <main className="relative z-10 min-h-[calc(100vh-78px)] px-5 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
