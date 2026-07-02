import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Mail,
  Settings,
  LogOut,
  PanelTop,
} from "lucide-react";

import { useGetAdminCmsPages } from "../../api/cmsPages";

function getPageKey(page) {
  return page.page_key || page.pageKey || page.slug || "";
}

function getPageLabel(page) {
  return (
    page.title ||
    page.title_en ||
    page.name ||
    page.nav_label ||
    page.navLabel ||
    getPageKey(page) ||
    "Untitled"
  );
}

function SidebarLink({ link }) {
  const Icon = link.icon;

  return (
    <NavLink
      to={link.to}
      end={link.end}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium no-underline transition-all duration-200 ${
          isActive
            ? "bg-[#F57A24] text-white shadow-[0_12px_30px_rgba(245,122,36,0.22)]"
            : "text-white/45 hover:bg-white/[0.05] hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            strokeWidth={2.2}
            className={
              isActive
                ? "text-white"
                : "text-white/35 group-hover:text-[#F57A24]"
            }
          />

          <span className="truncate">{link.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function AdminSidebar() {
  const navigate = useNavigate();

  const { pages, loading } = useGetAdminCmsPages();
  const sortedPages = [...pages].sort((a, b) => {
    return (a.id ?? 0) - (b.id ?? 0);
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[280px] border-r border-white/[0.07] bg-[#112233]/80 backdrop-blur-[24px] lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/[0.07] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="relative h-[42px] w-[42px]">
              <div className="absolute inset-[3px] flex items-center justify-center rounded-[14px] bg-[#112233] overflow-hidden">
                <img
                  src="/logo.svg"
                  alt="Company logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>

            <div>
              <h1 className="text-[18px] font-extrabold tracking-[-0.6px] text-white">
                Byte<em className="not-italic text-white/30">CH</em>
              </h1>
              <p className="text-[11px] text-white/30">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          <SidebarLink
            link={{
              label: "Dashboard",
              to: "/admin",
              icon: LayoutDashboard,
              end: true,
            }}
          />

          <div className="px-4 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[1.6px] text-white/20">
            Website
          </div>

          <SidebarLink
            link={{
              label: "Navbar",
              to: "/admin/navbar",
              icon: PanelTop,
            }}
          />

          <SidebarLink
            link={{
              label: "Pages",
              to: "/admin/pages",
              icon: FileText,
              end: true,
            }}
          />

          <div className="px-4 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[1.6px] text-white/20">
             Pages
          </div>

          {loading && (
            <div className="rounded-xl px-4 py-3 text-[12px] text-white/30">
              Loading pages...
            </div>
          )}

          {!loading &&
            sortedPages.map((page) => {
              const pageKey = getPageKey(page);

              if (!pageKey) return null;

              return (
                <SidebarLink
                  key={page.id || pageKey}
                  link={{
                    label: getPageLabel(page),
                    to: `/admin/pages/${pageKey}`,
                    icon: FileText,
                  }}
                />
              );
            })}

          <div className="px-4 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[1.6px] text-white/20">
            System
          </div>

          <SidebarLink
            link={{
              label: "Inquiries",
              to: "/admin/inquiries",
              icon: Mail,
            }}
          />

          <SidebarLink
            link={{
              label: "Settings",
              to: "/admin/settings",
              icon: Settings,
            }}
          />
        </nav>

        <div className="border-t border-white/[0.07] p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[13px] font-medium text-white/40 transition-all duration-200 hover:bg-white/[0.05] hover:text-red-300"
          >
            <LogOut size={18} strokeWidth={2.2} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
