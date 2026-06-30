import { Link } from "react-router-dom";
import Ticker from "./Ticker";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      <Ticker />

      <footer className="border-t border-white/[0.07] bg-[#112233] text-white">
        <div className="grid gap-10 px-6 py-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-[60px]">
          <div>
            <span className="mb-3 block text-[18px] font-extrabold tracking-[-0.5px] text-white">
              Byte<em className="not-italic text-white/30">CH</em>
            </span>

            <p className="mb-5 max-w-[260px] text-[13px] leading-[1.7] text-white/35">
              Byte Technology for Digital Solutions — delivering integrated
              digital ecosystems across software, education, media, and growth.
            </p>
            <a
              href="mailto:services@bytechjo.com"
              className="mb-2 flex items-center gap-2 text-xs text-white/40 no-underline transition-colors duration-200 hover:text-[#F57A24]"
            >
              <Mail size={14} strokeWidth={2} />
              <span>services@bytechjo.com</span>
            </a>

            <a
              href="tel:+96277995100"
              className="mb-2 flex items-center gap-2 text-xs text-white/40 no-underline transition-colors duration-200 hover:text-[#F57A24]"
            >
              <Phone size={14} strokeWidth={2} />
              <span>+962 7 7995 1000</span>
            </a>

            <a
              href="#"
              className="mb-2 flex items-center gap-2 text-xs text-white/40 no-underline transition-colors duration-200 hover:text-[#F57A24]"
            >
              <MapPin size={14} strokeWidth={2} />
              <span>Amman, Jordan — 8th Circle</span>
            </a>
          </div>

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

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] px-6 py-5 lg:px-[60px]">
          <span className="text-[11px] text-white/20">
            © 2026 Bytech — All rights reserved.
          </span>

          <div className="flex gap-[5px]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#F57A24]" />
            <span className="h-[7px] w-[7px] rounded-full bg-[#F9B307]" />
            <span className="h-[7px] w-[7px] rounded-full bg-[#2F88C4]" />
            <span className="h-[7px] w-[7px] rounded-full bg-[#6CC2E9]" />
          </div>

          <span className="text-[11px] text-white/20">
            Amman, Jordan — 2026
          </span>
        </div>
      </footer>

      <div className="h-[2px] bg-[linear-gradient(90deg,#F57A24,#F9B307,#2F88C4,#6CC2E9,#F57A24)] bg-[length:300%] animate-[rainbowBar_4s_linear_infinite]" />
    </>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[1.5px] text-white/30">
        {title}
      </h4>

      {links.map(([label, href]) => {
        const isExternal = href.startsWith("http");

        if (isExternal) {
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mb-3.5 block text-xs text-white/40 no-underline transition-colors duration-200 hover:text-white"
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
              className="mb-3.5 block text-xs text-white/40 no-underline transition-colors duration-200 hover:text-white"
            >
              {label}
            </a>
          );
        }

        return (
          <Link
            key={label}
            to={href}
            className="mb-3.5 block text-xs text-white/40 no-underline transition-colors duration-200 hover:text-white"
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
