import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function DynamicPage() {
  const { slug } = useParams();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true);
        setNotFound(false);
        setPage(null);

        const res = await fetch(`${API_BASE_URL}/pages/public/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch page");
        }

        const data = await res.json();

        if (!data || !data.sections) {
          setNotFound(true);
          return;
        }

        setPage(data);
      } catch (err) {
        console.error("Dynamic page error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      {page.sections?.map((section) => (
        <RenderSection key={section.id} section={section} />
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
    <section className="relative min-h-[70vh] flex items-center bg-slate-950 text-white">
      {section.image_url && (
        <img
          src={section.image_url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-4">{section.title_en}</h1>

        {section.subtitle_en && (
          <p className="text-xl mb-4">{section.subtitle_en}</p>
        )}

        {section.description_en && (
          <p className="max-w-2xl text-white/80">{section.description_en}</p>
        )}

        {section.cta_label_en && section.cta_url && (
          <a
            href={section.cta_url}
            className="inline-block mt-6 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white"
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
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">{section.title_en}</h2>

        <p className="text-gray-600 leading-8">{section.description_en}</p>
      </div>
    </section>
  );
}

export default DynamicPage;
