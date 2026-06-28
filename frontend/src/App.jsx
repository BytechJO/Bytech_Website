import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import {
  Home,
  Services,
  Education,
  Portfolio,
  About,
  Blog,
  Contact,
} from "./pages/Pages.jsx";

function RouteContent() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    // نخلي التحكم بالسكرول يدوي
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const saveScrollPosition = () => {
      sessionStorage.setItem("scroll-path", window.location.pathname);
      sessionStorage.setItem("scroll-y", String(window.scrollY));
    };

    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      if (!location.hash) return false;

      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (!element) return false;

      const navOffset = 90;
      const elementTop =
        element.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });

      // بعد ما ينزله على السكشن، نشيل #web أو #mobile من الرابط
      setTimeout(() => {
        window.history.replaceState(null, "", location.pathname);
      }, 300);

      return true;
    };

    if (firstLoad.current) {
      firstLoad.current = false;

      const forceScrollTop = sessionStorage.getItem("force-scroll-top");

      // هاي معناها: الريفريش جاي من كبسة الناف، فابدأ من فوق
      if (forceScrollTop === "true") {
        sessionStorage.removeItem("force-scroll-top");
        sessionStorage.removeItem("scroll-y");
        sessionStorage.removeItem("scroll-path");

        window.scrollTo({
          top: 0,
          behavior: "instant",
        });

        return;
      }

      const savedPath = sessionStorage.getItem("scroll-path");
      const savedY = sessionStorage.getItem("scroll-y");

      // لو في hash مثل /services#web خلي الهاش أهم
      if (location.hash) {
        setTimeout(scrollToHash, 100);
        return;
      }

      // إذا كان Refresh عادي من المتصفح، رجعه لنفس المكان
      if (savedPath === location.pathname && savedY !== null) {
        setTimeout(() => {
          window.scrollTo({
            top: Number(savedY),
            behavior: "instant",
          });
        }, 0);

        return;
      }
    }

    // لو الرابط فيه hash مثل /services#mobile
    if (location.hash) {
      setTimeout(scrollToHash, 100);
      return;
    }

    // إذا تنقلت على صفحة ثانية بدون hash، ابدأ من فوق
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => reveal.observe(element));

    return () => reveal.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 50);

      const scrollableHeight = document.body.scrollHeight - window.innerHeight;

      const progress =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      document
        .getElementById("progress")
        ?.style.setProperty("width", `${progress}%`);
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <>
      <div
        id="progress"
        className="fixed top-0 left-0 z-50 h-1 w-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-sky-500 transition-[width] duration-150"
      />

      <Nav scrolled={scrolled} />

      <div
        className={
          location.pathname === "/" || location.pathname === "/services"
            ? ""
            : "pt-[108px]"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/education" element={<Education />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteContent />
    </BrowserRouter>
  );
}
