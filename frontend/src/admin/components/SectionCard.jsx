import { useParams } from "react-router-dom";

import Services from "../services/Services";
// import Contact from "../contact/Contact";
import Education from "../../../src/pages/Education/Education.jsx";
import Portfolio from "../../../src/pages/Portfolio/Portfolio.jsx";

const pageComponents = {
  services: Services,
  // about: About,
  // contact: Contact,
  // home: Home,
  education: Education,
  portfolio: Portfolio,
};

export default function SectionCard({ slug: slugProp }) {
  const params = useParams();

  const slug = slugProp || params.slug;

  const PageComponent = pageComponents[slug];

  if (!PageComponent) {
    return (
      <div className="rounded-[30px] border border-white/[0.07] bg-[#112233]/60 p-8 text-white/40">
        No visual editor connected for this page yet.
        <span className="mt-2 block text-xs text-white/25">
          Current page: /{slug}
        </span>
      </div>
    );
  }

  return <PageComponent editable />;
}
