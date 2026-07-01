import { NavLink } from "react-router-dom";

export default function AdminNavbarPreview({ links = [] }) {
  return (
    <div className="rounded-[30px] border border-white/[0.07] bg-[#112233]/70 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-[24px]">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[1.8px] text-white/25">
          Navbar Preview
        </p>

        <h1 className="mt-2 text-[30px] font-black tracking-[-1.2px] text-white">
          Website Navbar
        </h1>

        <p className="mt-2 text-sm text-white/35">
          Only pages enabled for the navbar will appear here.
        </p>
      </div>

      <div className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#0e1c2e]">
        <div className="h-[2px] w-full bg-[linear-gradient(90deg,#F57A24,#F9B307,#2F88C4)]" />

        <nav className="flex items-center justify-between border-b border-white/[0.07] bg-[#0e1c2e]/[0.93] px-6 py-[18px] backdrop-blur-[24px] lg:px-[40px]">
          <div className="flex items-center gap-3 no-underline">
            <div className="relative h-[42px] w-[42px]">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                className="h-[42px] w-[42px]"
              >
                <defs>
                  <radialGradient id="adminPreviewG1" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#F9B307" />
                    <stop offset="100%" stopColor="#F57A24" />
                  </radialGradient>

                  <radialGradient id="adminPreviewG2" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#6CC2E9" />
                    <stop offset="100%" stopColor="#2F88C4" />
                  </radialGradient>
                </defs>

                <circle cx="22" cy="20" r="16" fill="url(#adminPreviewG1)" />
                <circle cx="22" cy="40" r="16" fill="url(#adminPreviewG2)" />
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
          </div>

          <div className="hidden items-center gap-7 xl:flex">
            {links.map((link) => (
              <NavLink
                key={link.id}
                to={link.slug === "home" ? "/" : `/${link.slug}`}
                target="_blank"
                className="group relative text-[13px] font-medium text-white/50 no-underline transition-colors duration-200 hover:text-white"
              >
                {link.navbar_label || link.title || link.title_en || link.slug}

                <span className="absolute bottom-[-3px] left-0 h-px w-0 bg-[#F57A24] transition-all duration-200 group-hover:w-full" />
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/contact"
            target="_blank"
            className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
          >
            Get in Touch
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
