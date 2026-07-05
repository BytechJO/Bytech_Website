import { Navigate, useParams } from "react-router-dom";

import { useGetPublicCmsPage } from "./api/cmsPages";
import DynamicHeroSection from "./admin/pages/cms-sections/DynamicHeroSection";
import DynamicBlocksSection from "./admin/pages/cms-sections/DynamicBlocksSection";

const PUBLIC_SECTION_COMPONENTS = {
  hero: DynamicHeroSection,
  blocks: DynamicBlocksSection,
};

function normalizeContent(page, content) {
  if (Array.isArray(page?.content)) {
    return page.content;
  }

  if (Array.isArray(content)) {
    return content;
  }

  if (Array.isArray(content?.content)) {
    return content.content;
  }

  if (Array.isArray(content?.sections)) {
    return content.sections;
  }

  if (Array.isArray(page?.sections)) {
    return page.sections;
  }

  return [];
}

export default function DynamicPage() {
  const { slug } = useParams();

  const { page, content, loading, error, empty } = useGetPublicCmsPage(slug);

  if (loading) {
    return (
      <div className="min-h-[50vh] bg-[#0e1c2e] p-10 text-center text-white">
        Loading...
      </div>
    );
  }

  if (error || empty || !page) {
    return <Navigate to="/404" replace />;
  }

  const sections = normalizeContent(page, content).filter((section) => {
    return section?.type && PUBLIC_SECTION_COMPONENTS[section.type];
  });

  if (!sections.length) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main className="min-h-screen bg-[#0e1c2e] text-white">
      {sections.map((section, index) => {
        const Component = PUBLIC_SECTION_COMPONENTS[section.type];

        return (
          <Component
            key={section.id || `${section.type}-${index}`}
            data={section.data}
            editable={false}
          />
        );
      })}
    </main>
  );
}
