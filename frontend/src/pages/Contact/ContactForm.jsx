import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-white/[0.07] bg-white/[0.04] px-3.5 py-[11px] text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-[#F57A24]";

export default function ContactForm() {
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // هون بعدين بتحط API submit
    setSuccessOpen(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="contact-reveal-r rounded-[18px] border border-white/[0.07] bg-[#112233] p-6 sm:p-9"
      >
        <h3 className="mb-1.5 text-xl font-extrabold text-white">
          Send us a message
        </h3>

        <p className="mb-6 text-[13px] text-white/50">
          Fill in your details and we&apos;ll prepare a tailored proposal.
        </p>

        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField label="Full Name">
            <input type="text" placeholder="Your name" className={inputClass} />
          </FormField>

          <FormField label="Company">
            <input
              type="text"
              placeholder="Your company"
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="mb-3">
          <FormField label="Email Address">
            <input
              type="email"
              placeholder="your@email.com"
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="mb-3">
          <FormField label="Service of Interest">
            <select
              className={`${inputClass} cursor-pointer bg-[#162840] text-white/70`}
            >
              <option className="bg-[#0e1c2e]" value="">
                Select a service...
              </option>
              <option className="bg-[#0e1c2e]">Web Platform Development</option>
              <option className="bg-[#0e1c2e]">Mobile Application</option>
              <option className="bg-[#0e1c2e]">LMS System</option>
              <option className="bg-[#0e1c2e]">
                Interactive Content / E-Book
              </option>
              <option className="bg-[#0e1c2e]">Media Production</option>
              <option className="bg-[#0e1c2e]">Digital Growth</option>
              <option className="bg-[#0e1c2e]">Enterprise / Custom</option>
            </select>
          </FormField>
        </div>

        <div className="mb-5">
          <FormField label="Project Brief">
            <textarea
              placeholder="Tell us about your project, goals, and timeline..."
              rows="4"
              className={`${inputClass} resize-y`}
            />
          </FormField>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#F57A24] p-3.5 text-sm font-bold text-white transition hover:bg-[#e06815]"
        >
          Send Message →
        </button>
      </form>

      {successOpen && <SuccessPopup onClose={() => setSuccessOpen(false)} />}
    </>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[1px] text-white/35">
        {label}
      </span>
      {children}
    </label>
  );
}

function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-[#07111f]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#112233] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F57A24]/20 blur-[55px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#2F88C4]/20 blur-[55px]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition hover:border-white/20 hover:text-white"
        >
          ×
        </button>

        <div className="relative mx-auto mb-5 flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#F57A24]/25 bg-[#F57A24]/10">
          <div className="absolute h-full w-full animate-ping rounded-full bg-[#F57A24]/20" />
          <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#F57A24,#F9B307)] text-[26px] font-black text-white shadow-[0_12px_35px_rgba(245,122,36,0.35)]">
            ✓
          </div>
        </div>

        <div className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#F57A24]">
          Message Sent
        </div>

        <h3 className="mb-3 text-[26px] font-black leading-tight tracking-[-1px] text-white">
          Thank you!
        </h3>

        <p className="mx-auto mb-7 max-w-[320px] text-sm leading-[1.75] text-white/50">
          Your message has been received successfully. Our team will get back to
          you within 24 hours with a tailored response.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg bg-[#F57A24] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e06815]"
        >
          Great, thanks
        </button>
      </div>
    </div>
  );
}
