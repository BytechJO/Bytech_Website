import { Navigate, useParams } from "react-router-dom";
import { useGetPublicCmsPage } from "./api/cmsPages";

function DynamicPage() {
  const { slug } = useParams();

  const { page, content, loading, error, empty } = useGetPublicCmsPage(slug);

  if (loading) {
    return <div className="p-10 text-center text-white">Loading...</div>;
  }

  if (error || empty || !page) {
    return <Navigate to="/404" replace />;
  }

  const sections = page.sections || content?.sections || [];

  if (!sections.length) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      {sections.map((section, index) => (
        <RenderSection
          key={section.id || section.section_key || index}
          section={section}
        />
      ))}
    </>
  );
}

function RenderSection({ section }) {
  switch (section.type) {
    case "hero":
      return <HeroSection section={section} />;

    case "content":
      return <ContentSection section={section} />;

    default:
      return null;
  }
}

function HeroSection({ section }) {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-slate-950 text-white">
      {section.image_url && (
        <img
          src={section.image_url}
          alt={section.image_alt || section.title_en || ""}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {section.subtitle_en && (
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-orange-300">
            {section.subtitle_en}
          </p>
        )}

        {section.title_en && (
          <h1 className="mb-5 max-w-3xl text-5xl font-black leading-tight tracking-[-2px] md:text-6xl">
            {section.title_en}
          </h1>
        )}

        {section.description_en && (
          <p className="max-w-2xl text-lg leading-8 text-white/75">
            {section.description_en}
          </p>
        )}

        {section.cta_label_en && section.cta_url && (
          <a
            href={section.cta_url}
            className="mt-8 inline-flex rounded-full bg-orange-500 px-7 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            {section.cta_label_en}
          </a>
        )}
      </div>
    </section>
  );
}

function ContentSection({ section }) {
  return (
    <section className="bg-white py-20 text-slate-950">
      <div className="mx-auto max-w-5xl px-6">
        {section.subtitle_en && (
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            {section.subtitle_en}
          </p>
        )}

        {section.title_en && (
          <h2 className="mb-5 text-3xl font-black tracking-[-1px] md:text-4xl">
            {section.title_en}
          </h2>
        )}

        {section.description_en && (
          <p className="text-lg leading-9 text-slate-600">
            {section.description_en}
          </p>
        )}

        {section.cta_label_en && section.cta_url && (
          <a
            href={section.cta_url}
            className="mt-8 inline-flex rounded-full bg-slate-950 px-7 py-3 font-bold text-white transition hover:bg-slate-800"
          >
            {section.cta_label_en}
          </a>
        )}
      </div>
    </section>
  );
}

export default DynamicPage;
