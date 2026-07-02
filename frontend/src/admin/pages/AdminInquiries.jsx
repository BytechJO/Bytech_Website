import { useState } from "react";
import { Mail, Trash2, RefreshCw } from "lucide-react";

import {
  deleteAdminContactMessage,
  updateAdminContactMessage,
  useGetAdminContactMessages,
} from "../../api/contact";

import { useConfirm } from "../components/ConfirmProvider";
import { useToast } from "../components/ToastProvider";

export default function AdminInquiries() {
  const [status, setStatus] = useState("all");

  const { messages, loading, empty, refetch } = useGetAdminContactMessages({
    status,
  });

  const { confirm } = useConfirm();
  const { showToast } = useToast();

  async function handleStatusChange(id, nextStatus) {
    try {
      await updateAdminContactMessage(id, {
        status: nextStatus,
        is_read: true,
      });

      showToast({
        type: "success",
        title: "Updated",
        message: "Inquiry status updated successfully.",
      });

      refetch();
    } catch (error) {
      console.error("Update inquiry error:", error);

      showToast({
        type: "error",
        title: "Error",
        message: "Failed to update inquiry.",
      });
    }
  }

  async function handleDelete(id) {
    const ok = await confirm({
      title: "Delete inquiry?",
      message: "This inquiry will be deleted permanently.",
      confirmText: "Delete Inquiry",
      cancelText: "Cancel",
      danger: true,
    });

    if (!ok) return;

    try {
      await deleteAdminContactMessage(id);

      showToast({
        type: "success",
        title: "Deleted",
        message: "Inquiry deleted successfully.",
      });

      refetch();
    } catch (error) {
      console.error("Delete inquiry error:", error);

      showToast({
        type: "error",
        title: "Error",
        message: "Failed to delete inquiry.",
      });
    }
  }

  return (
    <section className="space-y-5">
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] bg-[#0e1c2e]/90 pb-5 backdrop-blur-xl">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.8px] text-[#F57A24]">
            Inbox
          </p>

          <h1 className="mt-1 text-[28px] font-black tracking-[-1px] text-white">
            Inquiries
          </h1>

          <p className="mt-1 text-sm text-white/35">
            Manage contact form submissions from the website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-xl border border-white/[0.08] bg-[#112233] px-4 text-sm font-bold text-white outline-none transition focus:border-[#F57A24]/50"
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
            <option value="archived">Archived</option>
          </select>

          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm font-bold text-white/55 transition hover:text-white"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#112233]/80 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead className="border-b border-white/[0.07] bg-white/[0.03]">
              <tr className="text-[11px] font-black uppercase tracking-[1.4px] text-white/30">
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Message</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06]">
              {loading && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-white/35"
                  >
                    Loading inquiries...
                  </td>
                </tr>
              )}

              {!loading && empty && (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-white/30">
                      <Mail size={22} />
                    </div>

                    <p className="mt-3 text-sm font-bold text-white/45">
                      No inquiries found.
                    </p>
                  </td>
                </tr>
              )}

              {!loading &&
                messages.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition hover:bg-white/[0.03] ${
                      !item.is_read ? "bg-[#F57A24]/[0.045]" : ""
                    }`}
                  >
                    <td className="px-5 py-5 align-top">
                      <div className="font-bold text-white">
                        {item.full_name}
                      </div>

                      <div className="mt-1 text-xs text-white/40">
                        {item.email}
                      </div>

                      {item.company && (
                        <div className="mt-1 text-xs text-white/25">
                          {item.company}
                        </div>
                      )}

                      {item.phone && (
                        <div className="mt-1 text-xs text-white/25">
                          {item.phone}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-5 align-top text-sm text-white/55">
                      {item.service || "General"}
                    </td>

                    <td className="max-w-[360px] px-5 py-5 align-top text-sm leading-6 text-white/55">
                      {item.message}
                    </td>

                    <td className="px-5 py-5 align-top">
                      <select
                        value={item.status || "new"}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                        className="rounded-xl border border-white/[0.08] bg-[#0e1c2e] px-3 py-2 text-xs font-bold text-white outline-none transition focus:border-[#F57A24]/50"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="px-5 py-5 align-top text-xs text-white/35">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "-"}
                    </td>

                    <td className="px-5 py-5 align-top text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-300 transition hover:bg-red-500/20"
                        title="Delete inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
