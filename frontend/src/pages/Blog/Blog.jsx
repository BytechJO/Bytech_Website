import { useEffect } from "react";
import BlogHero from "./BlogHero";
import BlogPosts from "./BlogPosts";

export default function Blog() {
     useEffect(() => {
    document.title = "Blog — Bytech";
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );

    document
      .querySelectorAll(".blog-reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .blog-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-delay-1 { transition-delay: 0.1s; }
        .blog-delay-2 { transition-delay: 0.2s; }

        @keyframes blogOrb1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -30px); }
        }

        @keyframes blogOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 40px); }
        }

        @keyframes blogPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes blogTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <main className="bg-[#0e1c2e] text-white">
        <BlogHero />
        <BlogPosts />
      </main>
    </>
  );
}
