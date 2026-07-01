import { Routes, Route, useLocation } from "react-router-dom";

import AdminLogin from "../admin/pages/AdminLogin";
import ProtectedAdmin from "../admin/layouts/ProtectedAdmin";
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminOverview from "../admin/pages/admin/AdminOverview";
import AdminPageBuilder from "../admin/pages/admin/AdminPageBuilder";
import AdminNavbar from "../admin/pages/navbar/AdminNavbar";
import AdminPages from "../admin/pages/AdminPages";

import { ToastProvider } from "../admin/components/ToastProvider";
import { ConfirmProvider } from "../admin/components/ConfirmProvider";

import PublicLayout from "../layouts/PublicLayout";
import DynamicPage from "../DynamicPage";
import NotFound from "../pages/NotFound";

import {
  Home,
  Services,
  Education,
  Portfolio,
  About,
  Blog,
  Contact,
} from "../pages/Pages.jsx";

export default function AppRouter() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <ToastProvider>
                <ConfirmProvider>
                  <AdminLayout />
                </ConfirmProvider>
              </ToastProvider>
            </ProtectedAdmin>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="navbar" element={<AdminNavbar />} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="pages/:slug" element={<AdminPageBuilder />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/education" element={<Education />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/services/:slug" element={<DynamicPage />} />
        <Route path="/:slug" element={<DynamicPage />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
