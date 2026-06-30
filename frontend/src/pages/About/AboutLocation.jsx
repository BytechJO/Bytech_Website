import { Link } from "react-router-dom";
import { MapPin, Mail, Globe2 } from "lucide-react";

const contactRows = [
  {
    icon: MapPin,
    text: "8th Circle, Prince Rashid Suburb, Amman",
  },
  {
    icon: Mail,
    text: "services@bytechjo.com",
  },
  {
    icon: Globe2,
    text: "Jordan · Palestine · Saudi Arabia · Qatar",
  },
];

export default function AboutLocation() {
  return (
    <section className="grid grid-cols-1 items-center gap-14 border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:grid-cols-2 lg:gap-[60px] lg:px-[60px]">
      <div className="about-reveal-l">
        <div className="relative h-[400px] overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop"
            alt="Office"
            className="h-full w-full object-cover brightness-[0.65] saturate-[0.8]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,122,36,0.2),transparent)]" />
        </div>
      </div>

      <div className="about-reveal-r">
        <div className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
          Location
        </div>

        <h2 className="mb-2.5 text-[32px] font-black leading-[1.1] tracking-[-1.5px] text-white">
          Based in Amman,
          <br />
          serving the region.
        </h2>

        <p className="mb-6 text-sm leading-[1.8] text-white/50">
          Our headquarters is in Amman, Jordan — strategically positioned to
          serve clients across the Arab world with on-site, hybrid, and fully
          remote delivery models.
        </p>

        <div className="mb-8 flex flex-col gap-3">
          {contactRows.map((row) => {
            const Icon = row.icon;

            return (
              <div
                key={row.text}
                className="group flex items-center gap-3 rounded-[12px] border border-white/[0.08] bg-[#112233] px-[18px] py-3.5 transition hover:border-[#F57A24]/40 hover:bg-[#152a40]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F57A24]/10 text-[#F57A24] transition group-hover:bg-[#F57A24] group-hover:text-white">
                  <Icon size={18} strokeWidth={2.2} />
                </div>

                <span className="text-[13px] text-white/60 transition group-hover:text-white/80">
                  {row.text}
                </span>
              </div>
            );
          })}
        </div>

        <Link
          to="/contact"
          className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e06815]"
        >
          Start a Conversation →
        </Link>
      </div>
    </section>
  );
}
