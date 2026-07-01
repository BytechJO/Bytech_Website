import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackProjects = [
  {
    company: "PMAA Education Group",
    title: "LMS Platform & Domain Migration",
    desc: "Ground-up LMS rebuild replacing legacy Moodle system — 5-phase architecture with AI knowledge base layer.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop",
    tags: ["LMS", "AI Integration", "Education"],
  },
];

export default function PortfolioProjects({
  data = [],
  editable = false,
  path = ["projects"],
  onChangePath,
}) {
  const projects =
    Array.isArray(data) && data.length > 0 ? data : fallbackProjects;

  const { confirm } = useConfirm();

  function addProject() {
    onChangePath?.(path, [
      ...projects,
      {
        company: "New Company",
        title: "New Project",
        desc: "Write project description here.",
        image: "",
        tags: ["New Tag"],
      },
    ]);
  }

  async function deleteProject(projectIndex) {
    const ok = await confirm({
      title: "Delete project?",
      message: "This project will be removed from the portfolio page.",
      confirmText: "Delete Project",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      path,
      projects.filter((_, index) => index !== projectIndex),
    );
  }

  function addTag(projectIndex) {
    const currentTags = Array.isArray(projects[projectIndex]?.tags)
      ? projects[projectIndex].tags
      : [];

    onChangePath?.(
      [...path, projectIndex, "tags"],
      [...currentTags, "New Tag"],
    );
  }

  function deleteTag(projectIndex, tagIndex) {
    const currentTags = Array.isArray(projects[projectIndex]?.tags)
      ? projects[projectIndex].tags
      : [];

    onChangePath?.(
      [...path, projectIndex, "tags"],
      currentTags.filter((_, index) => index !== tagIndex),
    );
  }

  useEffect(() => {
    if (editable) return;

    let observer;

    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );

      document.querySelectorAll(".portfolio-reveal").forEach((el) => {
        el.classList.remove("visible");
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [editable, projects.length]);

  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      {editable && (
        <button
          type="button"
          onClick={addProject}
          className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
        >
          <Plus size={13} />
          Add Project
        </button>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <PortfolioProjectCard
            key={`${project.title}-${index}`}
            project={project}
            index={index}
            editable={editable}
            projectPath={[...path, index]}
            onChangePath={onChangePath}
            onDeleteProject={() => deleteProject(index)}
            onAddTag={() => addTag(index)}
            onDeleteTag={(tagIndex) => deleteTag(index, tagIndex)}
          />
        ))}
      </div>
    </section>
  );
}

function PortfolioProjectCard({
  project,
  index,
  editable,
  projectPath,
  onChangePath,
  onDeleteProject,
  onAddTag,
  onDeleteTag,
}) {
  const tags = Array.isArray(project.tags) ? project.tags : [];

  const delayClass = editable
    ? ""
    : index === 1
      ? "portfolio-delay-1"
      : index === 2
        ? "portfolio-delay-2"
        : index === 3
          ? "portfolio-delay-3"
          : "";

  return (
    <article
      className={`${
        editable ? "" : "portfolio-reveal"
      } ${delayClass} group relative min-h-[280px] cursor-pointer overflow-hidden rounded-[18px] border border-white/[0.07] transition-transform duration-300 hover:-translate-y-1`}
    >
      <EditableImage
        src={project.image}
        alt={project.company || "Project"}
        editable={editable}
        path={[...projectPath, "image"]}
        onChangePath={onChangePath}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.55] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,28,46,0.98)_0%,rgba(14,28,46,0.2)_50%)]" />

      {editable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteProject?.();
          }}
          title="Delete project"
          className="absolute left-4 top-4 z-[999] inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-[11px] font-bold text-white shadow-[0_12px_30px_rgba(239,68,68,0.35)] transition hover:bg-red-600"
        >
          <Trash2 size={13} />
          Delete
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 p-7">
        <EditableText
          as="div"
          value={project.company}
          editable={editable}
          path={[...projectPath, "company"]}
          onChangePath={onChangePath}
          className="mb-2 text-[9px] font-bold uppercase tracking-[1.5px] text-[#F57A24]"
          editClassName="!text-[#F57A24]"
        />

        <EditableText
          as="h3"
          value={project.title}
          editable={editable}
          path={[...projectPath, "title"]}
          onChangePath={onChangePath}
          className="mb-2 text-xl font-bold text-white"
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={project.desc}
          editable={editable}
          multiline
          path={[...projectPath, "desc"]}
          onChangePath={onChangePath}
          className="mb-3.5 text-xs leading-[1.6] text-white/50"
          editClassName="!text-white/80"
        />

        {editable && (
          <button
            type="button"
            onClick={onAddTag}
            className="mb-2 inline-flex items-center gap-1 rounded-md border border-[#F57A24]/25 bg-[#F57A24]/10 px-2 py-1 text-[10px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
          >
            <Plus size={11} />
            Add Tag
          </button>
        )}

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, tagIndex) => (
            <span
              key={`${tag}-${tagIndex}`}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-[3px] text-[10px] text-white/50"
            >
              <EditableText
                as="span"
                value={tag}
                editable={editable}
                path={[...projectPath, "tags", tagIndex]}
                onChangePath={onChangePath}
                className="text-white/50"
                editClassName="!text-white/80"
              />

              {editable && (
                <button
                  type="button"
                  onClick={() => onDeleteTag(tagIndex)}
                  title="Delete tag"
                  className="text-red-300 transition hover:text-red-200"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
