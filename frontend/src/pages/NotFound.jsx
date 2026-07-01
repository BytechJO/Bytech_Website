import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#070B16] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mb-6 text-[120px] leading-none font-black bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent">
          404
        </div>

        <h1 className="mb-4 text-3xl sm:text-4xl font-black">Page not found</h1>

        <p className="mb-8 text-white/65 leading-7">
          The page you are looking for does not exist, may have been moved, or
          is no longer available.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#F57A24,#F9B307)] px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
          >
            <Home size={18} />
            Back to home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
