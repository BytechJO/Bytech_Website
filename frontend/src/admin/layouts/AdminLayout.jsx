import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  useEffect(() => {
    document.title = "ByteCH Admin — Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-[#0e1c2e] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#F57A24]/10 blur-[120px]" />
        <div className="absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-[#2F88C4]/10 blur-[120px]" />
        <div className="absolute bottom-[-160px] left-1/2 h-[420px] w-[420px] rounded-full bg-[#F9B307]/5 blur-[140px]" />
      </div>

      <AdminSidebar />

      <div className="pt-[64px] lg:pl-[280px] lg:pt-0">
        <AdminHeader />

        <main className="relative z-10 min-h-[calc(100vh-136px)] px-4 py-5 sm:px-5 sm:py-6 lg:min-h-[calc(100vh-78px)] lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
