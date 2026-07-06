import { useState } from "react";
import { Link } from "react-router-dom";
import Ticker from "./Ticker";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <>
      <Ticker />

      <footer className="border-t border-white/[0.07] bg-[#112233] text-white">
        {/* ─── Mobile: Card Style / Desktop: Grid ─── */}
        <div className="px-5 pt-10 pb-6 lg:px-[60px] lg:py-12">
          <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
            {/* ── Brand Block ── */}
            <div className="mb-8 lg:mb-0">
              <span className="mb-4 block text-[20px] font-extrabold tracking-[-0.5px] text-white">
                Byte<em className="not-italic text-white/30">CH</em>
              </span>

              <p className="mb-6 max-w-[280px] text-[13px] leading-[1.75] text-white/35 lg:max-w-[260px]">
                Byte Technology for Digital Solutions — delivering integrated
                digital ecosystems across software, education, media, and
                growth.
              </p>

              {/* ── Contact Cards (Mobile) ── */}
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:services@bytechjo.com"
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 no-underline transition-all duration-200 hover:border-[#F57A24]/30 hover:bg-[#F57A24]/[0.06] lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:hover:bg-transparent"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F57A24]/10 text-[#F57A24] transition-colors duration-200 group-hover:bg-[#F57A24]/20 lg:h-0 lg:w-0 lg:rounded-none lg:bg-transparent lg:p-0">
                    <Mail size={14} strokeWidth={2} className="lg:hidden" />
                  </span>
                  <span className="text-xs text-white/40 transition-colors duration-200 group-hover:text-[#F57A24]">
                    services@bytechjo.com
                  </span>
                </a>

                <a
                  href="tel:+96277995100"
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 no-underline transition-all duration-200 hover:border-[#F57A24]/30 hover:bg-[#F57A24]/[0.06] lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:hover:bg-transparent"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F9B307]/10 text-[#F9B307] transition-colors duration-200 group-hover:bg-[#F9B307]/20 lg:h-0 lg:w-0 lg:rounded-none lg:bg-transparent lg:p-0">
                    <Phone size={14} strokeWidth={2} className="lg:hidden" />
                  </span>
                  <span className="text-xs text-white/40 transition-colors duration-200 group-hover:text-[#F57A24]">
                    +962 7 7995 1000
                  </span>
                </a>

                <a
                  href="#"
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 no-underline transition-all duration-200 hover:border-[#F57A24]/30 hover:bg-[#F57A24]/[0.06] lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:hover:bg-transparent"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2F88C4]/10 text-[#2F88C4] transition-colors duration-200 group-hover:bg-[#2F88C4]/20 lg:h-0 lg:w-0 lg:rounded-none lg:bg-transparent lg:p-0">
                    <MapPin size={14} strokeWidth={2} className="lg:hidden" />
                  </span>
                  <span className="text-xs text-white/40 transition-colors duration-200 group-hover:text-[#F57A24]">
                    Amman, Jordan — 8th Circle
                  </span>
                </a>
              </div>
            </div>

            {/* ── Footer Columns (Accordion on Mobile) ── */}
            <FooterColumn
              title="Services"
              links={[
                ["Web Platforms", "/services"],
                ["Mobile Apps", "/services"],
                ["LMS Systems", "/services"],
                ["Interactive Content", "/services"],
                ["Media Production", "/services"],
                ["Digital Growth", "/services"],
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                ["About Bytech", "/about"],
                ["Portfolio", "/portfolio"],
                ["Education", "/education"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ]}
            />

            <FooterColumn
              title="Connect"
              links={[
                ["LinkedIn", "#"],
                ["Instagram", "#"],
                ["Twitter / X", "#"],
                ["www.bytechjo.com", "https://www.bytechjo.com"],
              ]}
            />
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-white/[0.07] px-5 py-5 lg:px-[60px]">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
            {/* Dots — Centered on Mobile, Left on Desktop */}
            <div className="order-1 flex gap-[6px] lg:order-none">
              <span className="h-[8px] w-[8px] rounded-full bg-[#F57A24]" />
              <span className="h-[8px] w-[8px] rounded-full bg-[#F9B307]" />
              <span className="h-[8px] w-[8px] rounded-full bg-[#2F88C4]" />
              <span className="h-[8px] w-[8px] rounded-full bg-[#6CC2E9]" />
            </div>

            <span className="order-2 text-[11px] text-white/20 lg:order-none">
              © 2026 Bytech — All rights reserved.
            </span>

            <span className="order-3 text-[11px] text-white/20 lg:order-none">
              Amman, Jordan — 2026
            </span>
          </div>
        </div>
      </footer>

      {/* ─── Rainbow Bar ─── */}
      <div className="h-[2px] bg-[linear-gradient(90deg,#F57A24,#F9B307,#2F88C4,#6CC2E9,#F57A24)] bg-[length:300%] animate-[rainbowBar_4s_linear_infinite]" />
    </>
  );
}

/* ═══════════════════════════════════════════
   FooterColumn — Accordion on Mobile
   ═══════════════════════════════════════════ */
function FooterColumn({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] py-4 last:border-b-0 lg:border-b-0 lg:py-0">
      {/* ── Header (always visible) ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left lg:cursor-default lg:justify-start"
      >
        <h4 className="text-[11px] font-bold uppercase tracking-[1.5px] text-white/30">
          {title}
        </h4>

        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className="text-white/20 transition-transform duration-300 lg:hidden"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* ── Links ── */}
      <div
        className="grid transition-all duration-300 ease-in-out lg:mt-4 lg:block"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="pt-3 lg:pt-0">
            {links.map(([label, href]) => {
              const isExternal = href.startsWith("http");

              if (isExternal) {
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-3 block text-[13px] leading-[2] text-white/40 no-underline transition-colors duration-200 hover:text-white lg:mb-3.5 lg:text-xs lg:leading-normal"
                  >
                    {label}
                  </a>
                );
              }

              if (href === "#") {
                return (
                  <a
                    key={label}
                    href={href}
                    className="mb-3 block text-[13px] leading-[2] text-white/40 no-underline transition-colors duration-200 hover:text-white lg:mb-3.5 lg:text-xs lg:leading-normal"
                  >
                    {label}
                  </a>
                );
              }

              return (
                <Link
                  key={label}
                  to={href}
                  className="mb-3 block text-[13px] leading-[2] text-white/40 no-underline transition-colors duration-200 hover:text-white lg:mb-3.5 lg:text-xs lg:leading-normal"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
