import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useGetNavbarPages } from "../api/pages";

const fallbackLinks = [
  { id: "fallback-home", label: "Home", to: "/" },
  { id: "fallback-services", label: "Services", to: "/services" },
  { id: "fallback-education", label: "Education", to: "/education" },
  { id: "fallback-portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "fallback-about", label: "About", to: "/about" },
  { id: "fallback-blog", label: "Blog", to: "/blog" },
  { id: "fallback-contact", label: "Contact", to: "/contact" },
];

export default function Nav() {
  const location = useLocation();

  const { links: backendLinks, error } = useGetNavbarPages();

  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const links = useMemo(() => {
    if (error || !backendLinks?.length) {
      return fallbackLinks;
    }

    return backendLinks.map((link) => ({
      id: link.id,
      label: link.navbar_label || link.title || link.slug,
      to: link.slug === "home" ? "/" : `/${link.slug}`,
    }));
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

  const handleSamePageClick = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault();

      sessionStorage.setItem("force-scroll-top", "true");
      window.location.reload();
    }
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[9999] h-[2px] bg-[linear-gradient(90deg,#F57A24,#F9B307,#2F88C4)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />

      <nav
        id="nav"
        className={`fixed left-0 right-0 top-0 z-[1000] flex items-center justify-between border-b px-6 py-[18px] transition-all duration-500 lg:px-[60px] ${
          scrolled
            ? "border-white/[0.07] bg-[#0e1c2e]/[0.93] backdrop-blur-[24px]"
            : "border-transparent bg-[#0e1c2e]/0 backdrop-blur-0"
        }`}
      >
        <NavLink
          to="/"
          onClick={(event) => handleSamePageClick(event, "/")}
          className="flex items-center gap-3 no-underline"
        >
          <div className="relative h-[42px] w-[42px]">
            <div className="absolute left-1/2 top-1/2 h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F57A24]/30 animate-[ripple_2.5s_ease-out_infinite]" />
            <div className="absolute left-1/2 top-1/2 h-[42px] w-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F57A24]/30 animate-[ripple_2.5s_1.25s_ease-out_infinite]" />

            <svg viewBox="0 0 60 60" fill="none" className="h-[42px] w-[42px]">
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

          <span className="text-[19px] font-extrabold tracking-[-0.5px] text-white">
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

        <NavLink
          to="/contact"
          onClick={(event) => handleSamePageClick(event, "/contact")}
          className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
        >
          Get in Touch
        </NavLink>
      </nav>
    </>
  );
}
