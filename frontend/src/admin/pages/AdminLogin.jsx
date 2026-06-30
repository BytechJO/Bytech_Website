import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

import ENDPOINTS from "../../api/endpoints";
import axiosInstance from "../../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@bytechjo.com",
    password: "123456",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, {
        email: form.email,
        password: form.password,
      });

      const data = response.data;

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.admin));

      navigate("/admin", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0e1c2e] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[430px] w-[430px] rounded-full bg-[#F57A24]/15 blur-[120px]" />
        <div className="absolute -right-32 top-40 h-[430px] w-[430px] rounded-full bg-[#2F88C4]/15 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-1/2 h-[430px] w-[430px] -translate-x-1/2 rounded-full bg-[#F9B307]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#F57A24,#F9B307)] shadow-[0_20px_60px_rgba(245,122,36,0.25)]">
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[20px] bg-[#112233]">
                <span className="text-lg font-black">CH</span>
              </div>
            </div>

            <h1 className="text-[34px] font-black tracking-[-1.4px]">
              Byte<em className="not-italic text-white/30">CH</em>
            </h1>

            <p className="mt-2 text-[13px] text-white/35">
              Sign in to manage your website CMS.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[30px] border border-white/[0.07] bg-[#112233]/75 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] backdrop-blur-[24px]"
          >
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#F57A24]/15 bg-[#F57A24]/10 px-4 py-3">
              <ShieldCheck size={18} className="text-[#F9B307]" />
              <p className="text-[12px] font-medium text-white/55">
                Secure admin access only
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-white/45">
                  Email Address
                </span>

                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition focus-within:border-[#F57A24]/40">
                  <Mail size={18} className="text-white/25" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@bytechjo.com"
                    className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/20"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-semibold text-white/45">
                  Password
                </span>

                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition focus-within:border-[#F57A24]/40">
                  <Lock size={18} className="text-white/25" />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/20"
                  />
                </div>
              </label>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-[13px] text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F57A24] px-5 py-3.5 text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#e06815] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-white/20">
            © 2026 ByteCH Admin CMS
          </p>
        </div>
      </div>
    </div>
  );
}
