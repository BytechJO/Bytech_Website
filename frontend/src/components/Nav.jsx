import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { useGetPublicCmsNavbarPages } from "../api/cmsPages";

const fallbackLinks = [
  { id: "fallback-home", label: "Home", to: "/" },
  { id: "fallback-services", label: "Services", to: "/services" },
  { id: "fallback-education", label: "Education", to: "/education" },
  { id: "fallback-portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "fallback-about", label: "About", to: "/about" },
  { id: "fallback-blog", label: "Blog", to: "/blog" },
  { id: "fallback-contact", label: "Contact", to: "/contact" },
];

function getPageKey(page) {
  return page.page_key || page.pageKey || page.slug || "";
}

function getPageLabel(page) {
  return (
    page.nav_label ||
    page.navLabel ||
    page.navbar_label ||
    page.title ||
    getPageKey(page)
  );
}

function getPagePath(page) {
  const pageKey = getPageKey(page);

  return pageKey === "home" ? "/" : `/${pageKey}`;
}

export default function Nav() {
  const location = useLocation();

  const { links: backendLinks, error } = useGetPublicCmsNavbarPages();

  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = useMemo(() => {
    if (error || !backendLinks?.length) {
      return fallbackLinks;
    }

    return backendLinks.map((link) => {
      const pageKey = getPageKey(link);

      return {
        id: link.id || pageKey,
        label: getPageLabel(link),
        to: getPagePath(link),
      };
    });
  }, [backendLinks, error]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const currentProgress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

      setProgress(currentProgress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSamePageClick = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault();

      sessionStorage.setItem("force-scroll-top", "true");
      window.location.reload();
    }
  };

  const handleMobileLinkClick = (event, path) => {
    setMobileOpen(false);
    handleSamePageClick(event, path);
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[9999] h-[2px] bg-[linear-gradient(90deg,#F57A24,#F9B307,#2F88C4)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />

      <nav
        id="nav"
        className={`fixed left-0 right-0 top-0 z-[1000] flex items-center justify-between border-b px-4 py-4 transition-all duration-500 sm:px-6 lg:px-[60px] lg:py-[18px] ${
          scrolled || mobileOpen
            ? "border-white/[0.07] bg-[#0e1c2e]/[0.95] backdrop-blur-[24px]"
            : "border-transparent bg-[#0e1c2e]/0 backdrop-blur-0"
        }`}
      >
        <NavLink
          to="/"
          onClick={(event) => handleSamePageClick(event, "/")}
          className="flex items-center gap-3 no-underline"
        >
          <div className="relative h-[38px] w-[38px] lg:h-[42px] lg:w-[42px]">
            <div className="absolute left-1/2 top-1/2 h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F57A24]/30 animate-[ripple_2.5s_ease-out_infinite] lg:h-[42px] lg:w-[42px]" />
            <div className="absolute left-1/2 top-1/2 h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F57A24]/30 animate-[ripple_2.5s_1.25s_ease-out_infinite] lg:h-[42px] lg:w-[42px]" />

            <svg
              viewBox="0 0 60 60"
              fill="none"
              className="h-[38px] w-[38px] lg:h-[42px] lg:w-[42px]"
            >
              <defs>
                <radialGradient id="g1" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#F9B307" />
                  <stop offset="100%" stopColor="#F57A24" />
                </radialGradient>

                <radialGradient id="g2" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#6CC2E9" />
                  <stop offset="100%" stopColor="#2F88C4" />
                </radialGradient>
              </defs>

              <circle cx="22" cy="20" r="16" fill="url(#g1)" />
              <circle cx="22" cy="40" r="16" fill="url(#g2)" />
              <ellipse
                cx="22"
                cy="30"
                rx="8"
                ry="10"
                fill="rgba(14,28,46,0.5)"
              />
              <circle cx="34" cy="30" r="10" fill="#405264" opacity="0.9" />

              <text
                x="34"
                y="34"
                textAnchor="middle"
                fontFamily="Poppins,sans-serif"
                fontSize="9"
                fontWeight="800"
                fill="white"
              >
                CH
              </text>
            </svg>
          </div>

          <span className="text-[18px] font-extrabold tracking-[-0.5px] text-white lg:text-[19px]">
            Byte<em className="not-italic text-white/30">CH</em>
          </span>
        </NavLink>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              end={link.to === "/"}
              onClick={(event) => handleSamePageClick(event, link.to)}
              className={({ isActive }) =>
                `group relative text-[13px] font-medium no-underline transition-colors duration-200 ${
                  isActive ? "text-[#F57A24]" : "text-white/50 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-[-3px] left-0 h-px bg-[#F57A24] transition-all duration-200 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/contact"
            onClick={(event) => handleSamePageClick(event, "/contact")}
            className="inline-block rounded-lg bg-[#F57A24] px-3 py-2 text-[12px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815] sm:px-4 md:px-6 md:py-2.5 md:text-[13px]"
          >
            Get in Touch
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white transition hover:bg-white/[0.08] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-[70px] z-[999] px-4 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100vh-86px)] overflow-y-auto rounded-[24px] border border-white/[0.08] bg-[#0e1c2e]/[0.98] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-[24px]">
          <div className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                end={link.to === "/"}
                onClick={(event) => handleMobileLinkClick(event, link.to)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] font-semibold no-underline transition ${
                    isActive
                      ? "bg-[#F57A24]/15 text-[#F9B307]"
                      : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[998] bg-black/30 md:hidden"
        />
      )}
    </>
  );
}
