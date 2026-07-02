import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const fallbackSection = {
  info: {},
  form: {},
};

export default function ContactSection({
  data = {},
  editable = false,
  path = ["section"],
  onChangePath,
}) {
  const section = {
    ...fallbackSection,
    ...data,
  };

  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <div
        className={`grid grid-cols-1 items-start gap-12 ${
          editable ? "" : "lg:grid-cols-2"
        }`}
      >
        <ContactInfo
          data={section.info}
          editable={editable}
          path={[...path, "info"]}
          onChangePath={onChangePath}
        />

        <ContactForm
          data={section.form}
          editable={editable}
          path={[...path, "form"]}
          onChangePath={onChangePath}
        />
      </div>
    </section>
  );
}
