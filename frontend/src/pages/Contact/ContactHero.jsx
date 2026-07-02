import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";

const fallbackHero = {
  image:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop",
  imageAlt: "Contact Bytech",
  badge: "Get in Touch",
  titleBefore: "Let's build something",
  titleHighlight: "great.",
  description:
    "Ready to start your project? Reach out and we'll get back to you within 24 hours with a tailored response to your needs.",
};

export default function ContactHero({
  data = {},
  editable = false,
  path = ["hero"],
  onChangePath,
}) {
  const hero = {
    ...fallbackHero,
    ...data,
  };

  const revealClass = editable ? "" : "contact-reveal";
  const delayClass = (delay) => (editable ? "" : delay);

  return (
    <section className="relative overflow-hidden bg-[#0e1c2e]">
      <EditableImage
        src={hero.image}
        alt={hero.imageAlt || "Contact Bytech"}
        editable={editable}
        path={[...path, "image"]}
        onChangePath={onChangePath}
        className="h-[600px] w-full object-cover object-center brightness-[0.25] saturate-[0.6]"
      />

      <div className="pointer-events-none absolute bottom-[-100px] left-0 z-[1] h-[400px] w-[400px] rounded-full bg-[#2F88C4]/[0.08] blur-[80px] [animation:contactOrb2_13s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,#0e1c2e_0%,rgba(14,28,46,0.4)_60%)]" />

      <div className="absolute bottom-[70px] left-0 right-0 z-[2] px-6 lg:px-[60px]">
        <div className="max-w-[720px]">
          <div
            className={`${revealClass} mb-6 inline-flex items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-[14px] py-[6px]`}
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[#F57A24] shadow-[0_0_0_6px_rgba(245,122,36,0.08)] [animation:contactPulse_2s_infinite]" />

            <EditableText
              as="span"
              value={hero.badge}
              editable={editable}
              path={[...path, "badge"]}
              onChangePath={onChangePath}
              className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#F57A24]"
              editClassName="!text-[#F57A24]"
            />
          </div>

          <h1
            className={`${revealClass} ${delayClass(
              "contact-delay-1",
            )} mb-5 max-w-[760px] text-[42px] font-black leading-[1.05] tracking-[-2px] text-white sm:text-[56px] lg:text-[58px]`}
          >
            <EditableText
              as="span"
              value={hero.titleBefore}
              editable={editable}
              path={[...path, "titleBefore"]}
              onChangePath={onChangePath}
              className="text-white"
              editClassName="!text-white"
            />{" "}
            <EditableText
              as="span"
              value={hero.titleHighlight}
              editable={editable}
              path={[...path, "titleHighlight"]}
              onChangePath={onChangePath}
              className="bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent"
              editClassName="!text-[#F57A24]"
            />
          </h1>

          <EditableText
            as="p"
            value={hero.description}
            editable={editable}
            multiline
            path={[...path, "description"]}
            onChangePath={onChangePath}
            className={`${revealClass} ${delayClass(
              "contact-delay-2",
            )} max-w-[600px] text-[15px] leading-[1.78] text-white/50 sm:text-base`}
            editClassName="!text-white/80"
          />
        </div>
      </div>
    </section>
  );
}
