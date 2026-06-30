import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
