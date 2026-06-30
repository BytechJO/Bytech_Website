import { Mail, Phone, MapPin, Globe2 } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "services@bytechjo.com",
    bg: "bg-[#F57A24]/10",
    iconColor: "text-[#F57A24]",
    hover: "hover:border-[#F57A24]/30",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+962 7 7995 1000",
    bg: "bg-[#2F88C4]/10",
    iconColor: "text-[#2F88C4]",
    hover: "hover:border-[#2F88C4]/30",
  },
  {
    icon: MapPin,
    label: "Office",
    value: (
      <>
        8th Circle, Prince Rashid Suburb, Building #78
        <br />
        Amman, Jordan 11831
      </>
    ),
    bg: "bg-[#F9B307]/10",
    iconColor: "text-[#F9B307]",
    hover: "hover:border-[#F9B307]/30",
  },
  {
    icon: Globe2,
    label: "Website",
    value: "www.bytechjo.com",
    bg: "bg-[#6CC2E9]/10",
    iconColor: "text-[#6CC2E9]",
    hover: "hover:border-[#6CC2E9]/30",
  },
];

export default function ContactInfo() {
  return (
    <div className="contact-reveal-l">
      <div className="mb-3.5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[2.5px] text-[#F57A24] before:block before:h-[1.5px] before:w-[18px] before:bg-[#F57A24]">
        Contact Information
      </div>

      <h2 className="mb-7 text-[32px] font-black leading-[1.1] tracking-[-1.5px] text-white">
        We&apos;re ready to talk.
      </h2>

      <div className="mb-9 flex flex-col gap-3">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`group flex items-start gap-3.5 rounded-xl border border-white/[0.07] bg-[#112233] px-5 py-[18px] transition hover:bg-[#152a40] ${item.hover}`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition group-hover:scale-105 ${item.bg} ${item.iconColor}`}
              >
                <Icon size={19} strokeWidth={2.2} />
              </div>

              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-[#F57A24]">
                  {item.label}
                </div>

                <div className="text-sm font-semibold leading-relaxed text-white">
                  {item.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#112233] p-5">
        <div className="mb-4 text-[11px] font-bold uppercase tracking-[1px] text-white/30">
          Response Time
        </div>

        <div className="flex gap-3">
          <div className="flex-1 rounded-lg bg-[#162840] p-3.5 text-center">
            <div className="text-[22px] font-black text-[#F57A24]">&lt;24h</div>
            <div className="mt-1 text-[10px] text-white/30">Email Response</div>
          </div>

          <div className="flex-1 rounded-lg bg-[#162840] p-3.5 text-center">
            <div className="text-[22px] font-black text-[#2F88C4]">Free</div>
            <div className="mt-1 text-[10px] text-white/30">Consultation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
