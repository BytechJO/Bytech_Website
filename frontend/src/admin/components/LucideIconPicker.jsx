import { useEffect, useMemo, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";

const hiddenExports = new Set([
  "createLucideIcon",
  "default",
  "icons",
  "Icon",
  "LucideIcon",
  "CircleIcon",
]);

const oldIconNameMap = {
  map: "MapPin",
  mail: "Mail",
  globe: "Globe2",
  phone: "Phone",
};

const defaultVisibleIcons = [
  "MapPin",
  "Mail",
  "Globe2",
  "Phone",
  "MessageCircle",
  "Clock",
  "Building2",
  "Home",
  "Users",
  "BriefcaseBusiness",
  "CalendarDays",
  "Link",
];
function resolveIconName(value) {
  if (!value) return "MapPin";

  return oldIconNameMap[value] || value;
}

function getIconsSource() {
  return LucideIcons.icons && typeof LucideIcons.icons === "object"
    ? LucideIcons.icons
    : LucideIcons;
}

export default function LucideIconPicker({
  value = "MapPin",
  onChange,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pickerRef = useRef(null);

  const iconsSource = getIconsSource();

  const icons = useMemo(() => {
    return Object.entries(iconsSource)
      .filter(([name, Component]) => {
        return !hiddenExports.has(name) && Component && /^[A-Z]/.test(name);
      })
      .map(([name, Component]) => ({
        name,
        Component,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [iconsSource]);

  const normalizedValue = resolveIconName(value);

  const filteredIcons = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return defaultVisibleIcons
        .map((iconName) => {
          const Component = iconsSource[iconName] || LucideIcons[iconName];

          if (!Component) return null;

          return {
            name: iconName,
            Component,
          };
        })
        .filter(Boolean);
    }

    return icons
      .filter((icon) => icon.name.toLowerCase().includes(keyword))
      .slice(0, 28);
  }, [icons, iconsSource, search]);

  const SelectedIcon =
    iconsSource[normalizedValue] ||
    LucideIcons[normalizedValue] ||
    iconsSource.MapPin ||
    LucideIcons.MapPin;

  useEffect(() => {
    function handleClickOutside(event) {
      if (!pickerRef.current) return;

      if (!pickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function handleSelect(iconName) {
    onChange?.(iconName);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={pickerRef} className="relative inline-flex">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F57A24]/10 text-[#F57A24] transition hover:bg-[#F57A24] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        title="Change icon"
      >
        <SelectedIcon size={18} strokeWidth={2.2} />

        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#F57A24]/40 bg-[#0e1c2e] text-[#F57A24] shadow-md">
          <LucideIcons.Pencil size={8.5} strokeWidth={3} />
        </span>
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-11 z-[99999] w-[260px] rounded-2xl border border-white/[0.08] bg-[#112233] p-3 shadow-[0_22px_70px_rgba(0,0,0,0.45)]">
          <div className="mb-3 flex items-center gap-2">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="h-9 flex-1 rounded-lg border border-white/[0.08] bg-[#0e1c2e] px-3 text-xs text-white outline-none placeholder:text-white/25 focus:border-[#F57A24]/50"
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2.5 py-2 text-[11px] font-bold text-white/35 transition hover:bg-white/[0.06] hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid max-h-[220px] grid-cols-4 gap-1 overflow-y-auto pr-1">
            {filteredIcons.map(({ name, Component }) => (
              <button
                key={name}
                type="button"
                onClick={() => handleSelect(name)}
                title={name}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-[#F57A24]/15 hover:text-[#F57A24] ${
                  normalizedValue === name
                    ? "bg-[#F57A24]/25 text-[#F57A24]"
                    : "bg-white/[0.03] text-white/45"
                }`}
              >
                <Component size={18} strokeWidth={2.1} />
              </button>
            ))}
          </div>

          <div className="mt-2 text-[10px] text-white/25">
            {search.trim() ? `${filteredIcons.length} results` : "Common icons"}
          </div>
        </div>
      )}
    </div>
  );
}
