import { Plus, Trash2 } from "lucide-react";

import EditableText from "../../admin/components/EditableText";
import EditableImage from "../../admin/components/EditableImage";
import { useConfirm } from "../../admin/components/ConfirmProvider";

const fallbackPosts = {
  featured: {
    category: "EdTech",
    author: "Bytech Team",
    date: "June 15, 2026 · 6 min read",
    title: "Why LMS platforms fail — and how to build one that doesn't",
    desc: "Most LMS platforms are designed for administrators, not learners. Here's what we've learned from building scalable learning systems across the Arab region.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop",
  },
  side: [
    {
      category: "AI",
      author: "Bytech Team",
      date: "May 28, 2026",
      title: "Integrating RAG into education platforms — a practical guide",
      desc: "How we built a content knowledge base for PMAA using GPT-4o and retrieval-augmented generation.",
      image:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop",
      color: "blue",
    },
    {
      category: "Design",
      author: "Bytech Team",
      date: "May 10, 2026",
      title: "The case for integrated digital delivery in 2026",
      desc: "Why the agency model is broken and what a unified ecosystem actually looks like in practice.",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop",
      color: "orange",
    },
  ],
  small: [
    {
      title: "Choosing the right mobile stack in 2026",
      author: "Bytech Team",
      desc: "React Native vs Flutter — an honest comparison for product teams.",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&auto=format&fit=crop",
      alt: "Mobile",
    },
    {
      title: "B2B social media for publishers in the Arab world",
      author: "Bytech Team",
      desc: "What AIM Ambition taught us about bilingual content strategy.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
      alt: "Growth",
    },
    {
      title: "Interactive e-books — lessons from Mindful Kids G1",
      author: "Bytech Team",
      desc: "How we converted a children's book into a full digital experience.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop",
      alt: "Education",
    },
  ],
};

export default function BlogPosts({
  data = {},
  editable = false,
  path = ["posts"],
  onChangePath,
}) {
  const posts = {
    ...fallbackPosts,
    ...data,
  };

  const featuredPost = {
    ...fallbackPosts.featured,
    ...(posts.featured || {}),
  };

  const sidePosts = Array.isArray(posts.side) ? posts.side : [];
  const smallPosts = Array.isArray(posts.small) ? posts.small : [];

  const { confirm } = useConfirm();

  function addSidePost() {
    onChangePath?.(
      [...path, "side"],
      [
        ...sidePosts,
        {
          category: "New",
          author: "Bytech Team",
          date: "New date",
          title: "New side post",
          desc: "Write side post description here.",
          image: "",
          color: "orange",
        },
      ],
    );
  }

  async function deleteSidePost(index) {
    const ok = await confirm({
      title: "Delete side post?",
      message: "This post will be removed from the blog page.",
      confirmText: "Delete Post",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "side"],
      sidePosts.filter((_, i) => i !== index),
    );
  }
  function addSmallPost() {
    onChangePath?.(
      [...path, "small"],
      [
        ...smallPosts,
        {
          title: "New small post",
          desc: "Write small post description here.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&auto=format&fit=crop",
          alt: "Blog",
        },
      ],
    );
  }
  async function deleteSmallPost(index) {
    const ok = await confirm({
      title: "Delete small post?",
      message: "This post will be removed from the blog page.",
      confirmText: "Delete Post",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    onChangePath?.(
      [...path, "small"],
      smallPosts.filter((_, i) => i !== index),
    );
  }

  function toggleSideColor(index) {
    const nextPosts = sidePosts.map((post, i) =>
      i === index
        ? {
            ...post,
            color: post.color === "blue" ? "orange" : "blue",
          }
        : post,
    );

    onChangePath?.([...path, "side"], nextPosts);
  }

  return (
    <section className="border-b border-white/[0.07] px-6 py-[88px] sm:px-10 lg:px-[60px]">
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <FeaturedPost
          post={featuredPost}
          editable={editable}
          path={[...path, "featured"]}
          onChangePath={onChangePath}
        />

        <div>
          {editable && (
            <button
              type="button"
              onClick={addSidePost}
              className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
            >
              <Plus size={13} />
              Add Side Post
            </button>
          )}

          <SidePosts
            posts={sidePosts}
            editable={editable}
            path={[...path, "side"]}
            onChangePath={onChangePath}
            onDeletePost={deleteSidePost}
            onToggleColor={toggleSideColor}
          />
        </div>
      </div>

      {editable && (
        <button
          type="button"
          onClick={addSmallPost}
          className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-[#F57A24]/25 bg-[#F57A24]/10 px-3 py-1.5 text-[11px] font-bold text-[#F57A24] transition hover:bg-[#F57A24]/15"
        >
          <Plus size={13} />
          Add Small Post
        </button>
      )}

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {smallPosts.map((post, index) => (
          <SmallPostCard
            key={`${post.title}-${index}`}
            post={post}
            index={index}
            editable={editable}
            path={[...path, "small", index]}
            onChangePath={onChangePath}
            onDeletePost={() => deleteSmallPost(index)}
          />
        ))}
      </div>
    </section>
  );
}

function FeaturedPost({ post, editable, path, onChangePath }) {
  return (
    <article
      className={`${
        editable ? "" : "blog-reveal"
      } group relative min-h-[320px] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.07]`}
    >
      <EditableImage
        src={post.image}
        alt={post.title || "Blog"}
        editable={editable}
        path={[...path, "image"]}
        onChangePath={onChangePath}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.55] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,28,46,0.98)_0%,rgba(14,28,46,0.1)_50%)]" />

      <div className="absolute left-5 top-5 z-[5]">
        <EditableText
          as="span"
          value={post.category}
          editable={editable}
          path={[...path, "category"]}
          onChangePath={onChangePath}
          className="rounded-full bg-[#F57A24] px-3 py-1 text-[10px] font-bold text-white"
          editClassName="!text-white"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[5] p-7">
        <div className="mb-2.5 flex flex-wrap items-center gap-2 text-[11px] text-white/35">
          <EditableText
            as="span"
            value={post.author || "Bytech Team"}
            editable={editable}
            path={[...path, "author"]}
            onChangePath={onChangePath}
            className="text-white/45"
            editClassName="!text-white/80"
          />

          <span className="text-white/20">•</span>

          <EditableText
            as="span"
            value={post.date}
            editable={editable}
            path={[...path, "date"]}
            onChangePath={onChangePath}
            className="text-white/35"
            editClassName="!text-white/70"
          />
        </div>

        <EditableText
          as="h2"
          value={post.title}
          editable={editable}
          path={[...path, "title"]}
          onChangePath={onChangePath}
          className="mb-2.5 text-[22px] font-bold leading-[1.3] text-white"
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={post.desc}
          editable={editable}
          multiline
          path={[...path, "desc"]}
          onChangePath={onChangePath}
          className="text-xs leading-[1.6] text-white/50"
          editClassName="!text-white/80"
        />
      </div>
    </article>
  );
}

function SidePosts({
  posts,
  editable,
  path,
  onChangePath,
  onDeletePost,
  onToggleColor,
}) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, index) => (
        <article
          key={`${post.title}-${index}`}
          className={`${
            editable ? "" : `blog-reveal blog-delay-${index + 1}`
          } group relative cursor-pointer overflow-hidden rounded-[14px] border border-white/[0.07] transition duration-300 hover:-translate-y-0.5`}
        >
          <EditableImage
            src={post.image}
            alt={post.category || "Blog"}
            editable={editable}
            path={[...path, index, "image"]}
            onChangePath={onChangePath}
            className="h-[140px] w-full object-cover brightness-[0.6] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
          />

          {editable && (
            <div className="absolute left-3-3 top-3 z-[50] flex gap-2">
              <button
                type="button"
                onClick={() => onToggleColor(index)}
                className="rounded-md bg-white/[0.08] px-2 py-1 text-[10px] font-bold text-white/60 transition hover:bg-white/[0.14] hover:text-white"
              >
                {post.color === "blue" ? "Blue" : "Orange"}
              </button>

              <button
                type="button"
                onClick={() => onDeletePost(index)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-red-500/80 text-white transition hover:bg-red-600"
                title="Delete post"
              >
                <Trash2 size={13} />
              </button>
            </div>
          )}

          <div className="bg-[#112233] px-5 py-[18px]">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <EditableText
                as="span"
                value={post.category}
                editable={editable}
                path={[...path, index, "category"]}
                onChangePath={onChangePath}
                className={`rounded-full px-2.5 py-[3px] text-[10px] font-bold ${
                  post.color === "blue"
                    ? "bg-[#2F88C4]/20 text-[#6CC2E9]"
                    : "bg-[#F57A24]/15 text-[#F57A24]"
                }`}
                editClassName="!text-white"
              />

              <EditableText
                as="span"
                value={post.author || "Bytech Team"}
                editable={editable}
                path={[...path, index, "author"]}
                onChangePath={onChangePath}
                className="text-[10px] text-white/30"
                editClassName="!text-white/70"
              />

              <span className="text-[10px] text-white/20">•</span>

              <EditableText
                as="span"
                value={post.date}
                editable={editable}
                path={[...path, index, "date"]}
                onChangePath={onChangePath}
                className="text-[10px] text-white/30"
                editClassName="!text-white/70"
              />
            </div>

            <EditableText
              as="h3"
              value={post.title}
              editable={editable}
              path={[...path, index, "title"]}
              onChangePath={onChangePath}
              className="mb-1.5 text-sm font-bold leading-[1.3] text-white"
              editClassName="!text-white"
            />

            <EditableText
              as="p"
              value={post.desc}
              editable={editable}
              multiline
              path={[...path, index, "desc"]}
              onChangePath={onChangePath}
              className="text-[11px] leading-[1.6] text-white/50"
              editClassName="!text-white/80"
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function SmallPostCard({
  post,
  index,
  editable,
  path,
  onChangePath,
  onDeletePost,
}) {
  const delayClass = editable
    ? ""
    : index === 1
      ? "blog-delay-1"
      : index === 2
        ? "blog-delay-2"
        : "";

  return (
    <article
      className={`${
        editable ? "" : "blog-reveal"
      } ${delayClass} group relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.07] bg-[#112233] transition duration-300 hover:-translate-y-0.5`}
    >
      <div className="relative h-[120px] overflow-hidden">
        <EditableImage
          src={post.image}
          alt={post.alt || post.title || "Blog"}
          editable={editable}
          path={[...path, "image"]}
          onChangePath={onChangePath}
          className="h-full w-full object-cover brightness-[0.6] saturate-[0.7] transition-transform duration-500 group-hover:scale-105"
        />

        {editable && (
          <button
            type="button"
            onClick={onDeletePost}
            className="absolute left-3 top-3 z-[50] inline-flex h-7 w-7 items-center justify-center rounded-md bg-red-500/80 text-white transition hover:bg-red-600"
            title="Delete post"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      <div className="bg-[#112233] p-[18px]">
        <EditableText
          as="h3"
          value={post.title || "New small post"}
          editable={editable}
          path={[...path, "title"]}
          onChangePath={onChangePath}
          className="mb-1.5 text-[13px] font-bold text-white"
          editClassName="!text-white"
        />

        <EditableText
          as="p"
          value={post.desc || "Write small post description here."}
          editable={editable}
          multiline
          path={[...path, "desc"]}
          onChangePath={onChangePath}
          className="text-[11px] leading-[1.6] text-white/50"
          editClassName="!text-white/80"
        />
      </div>
    </article>
  );
}
