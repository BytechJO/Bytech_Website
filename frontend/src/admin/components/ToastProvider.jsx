import { createContext, useContext, useState } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = ({
    type = "success",
    title = "",
    message = "",
    duration = 3000,
  }) => {
    setToast({
      type,
      title,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const hideToast = () => {
    setToast(null);
  };

  const Icon =
    toast?.type === "success"
      ? CheckCircle2
      : toast?.type === "error"
        ? XCircle
        : Info;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[9999] w-[360px] max-w-[calc(100vw-40px)]">
          {" "}
          <div
            className={`rounded-[22px] border p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-[24px] ${
              toast.type === "success"
                ? "border-emerald-400/20 bg-emerald-400/10"
                : toast.type === "error"
                  ? "border-red-400/20 bg-red-400/10"
                  : "border-white/[0.08] bg-[#112233]/90"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${
                  toast.type === "success"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : toast.type === "error"
                      ? "bg-red-400/15 text-red-300"
                      : "bg-[#F57A24]/15 text-[#F57A24]"
                }`}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                {toast.title && (
                  <h4 className="text-[14px] font-bold text-white">
                    {toast.title}
                  </h4>
                )}

                {toast.message && (
                  <p className="mt-1 text-[13px] leading-5 text-white/55">
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={hideToast}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white/35 transition hover:bg-white/[0.05] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
