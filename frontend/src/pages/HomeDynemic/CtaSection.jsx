import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import EditableButton from "../../admin/components/EditableButton";

const fallbackCta = {
  image:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop",
  imageAlt: "CTA",
  titleLine1: "Ready to build",
  titleLine2: "something great?",
  description:
    "Let's discuss your project and create solutions that drive real impact.",
  primaryLabel: "View Our Work",
  primaryUrl: "/portfolio",
  secondaryLabel: "Book a Free Consultation",
  secondaryUrl: "/contact",
};

export default function CtaSection({
  data = {},
  editable = false,
  path = ["cta"],
  onChangePath,
}) {
  const cta = {
    ...fallbackCta,
    ...data,
  };

  return (
    <section className="relative mx-6 mb-[88px] overflow-hidden rounded-[22px] bg-[#0e1c2e] lg:mx-[60px]">
      <EditableImage
        src={cta.image}
        alt={cta.imageAlt || "CTA"}
        editable={editable}
        path={[...path, "image"]}
        onChangePath={onChangePath}
        className="h-[300px] w-full object-cover brightness-[0.28] saturate-50"
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,122,36,0.35),rgba(14,28,46,0.88))]" />

      <div className="absolute inset-0 flex flex-col justify-center gap-8 p-6 md:flex-row md:items-center md:justify-between lg:p-[60px]">
        <div>
          <h2 className="mb-2 text-[30px] font-black leading-[1.1] tracking-[-1px] text-white md:text-[36px]">
            <EditableText
              as="span"
              value={cta.titleLine1}
              editable={editable}
              path={[...path, "titleLine1"]}
              onChangePath={onChangePath}
              className="text-white"
              editClassName="!text-white"
            />
            <br />
            <EditableText
              as="span"
              value={cta.titleLine2}
              editable={editable}
              path={[...path, "titleLine2"]}
              onChangePath={onChangePath}
              className="text-white"
              editClassName="!text-white"
            />
          </h2>

          <EditableText
            as="p"
            value={cta.description}
            editable={editable}
            multiline
            path={[...path, "description"]}
            onChangePath={onChangePath}
            className="text-sm text-white/50"
            editClassName="!text-white/80"
          />
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <EditableButton
            label={cta.primaryLabel}
            url={cta.primaryUrl}
            editable={editable}
            labelPath={[...path, "primaryLabel"]}
            urlPath={[...path, "primaryUrl"]}
            onChangePath={onChangePath}
            className="inline-block rounded-lg border border-white/[0.18] bg-transparent px-[22px] py-2.5 text-[13px] font-semibold text-white/70 no-underline transition-all duration-200 hover:border-white/35 hover:text-white"
            fallbackLabel="View Our Work"
          />

          <EditableButton
            label={cta.secondaryLabel}
            url={cta.secondaryUrl}
            editable={editable}
            labelPath={[...path, "secondaryLabel"]}
            urlPath={[...path, "secondaryUrl"]}
            onChangePath={onChangePath}
            className="inline-block rounded-lg bg-[#F57A24] px-6 py-2.5 text-[13px] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815]"
            fallbackLabel="Book a Free Consultation"
          />
        </div>
      </div>
    </section>
  );
}
