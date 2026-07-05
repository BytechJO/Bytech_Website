import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, ChevronDown, Loader2, Mail } from "lucide-react";

import {
  getNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../api/notifications";

const INQUIRIES_PATH = "/admin/inquiries";
// غيرها لو صفحة الكويريز عندك مثلا:
// const INQUIRIES_PATH = "/admin/queries";
// const INQUIRIES_PATH = "/admin/inquiries";

export default function NotificationsBell() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const dropdownRef = useRef(null);

  const visibleNotifications = useMemo(() => {
    return showAll ? notifications : notifications.slice(0, 3);
  }, [notifications, showAll]);

  const hasMore = notifications.length > 3 && !showAll;

  async function loadNotifications() {
    try {
      setLoading(true);

      const [listRes, countRes] = await Promise.all([
        getNotifications(),
        getUnreadNotificationsCount(),
      ]);

      setNotifications(listRes?.data || []);
      setCount(countRes?.count || 0);
    } catch (error) {
      console.error("Load notifications error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setShowAll(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  async function handleOpen() {
    setOpen((prev) => !prev);

    if (!open) {
      setShowAll(false);
      loadNotifications();
    }
  }

  async function handleNotificationClick(notification) {
    try {
      if (!notification.is_read) {
        await markNotificationAsRead(notification.id);

        setNotifications((prev) =>
          prev.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  is_read: true,
                }
              : item,
          ),
        );

        setCount((prev) => Math.max(prev - 1, 0));
      }

      setOpen(false);
      setShowAll(false);

      navigate(INQUIRIES_PATH);
    } catch (error) {
      console.error("Mark notification read error:", error);

      setOpen(false);
      setShowAll(false);

      navigate(INQUIRIES_PATH);
    }
  }

  async function handleReadAll() {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          is_read: true,
        })),
      );

      setCount(0);
    } catch (error) {
      console.error("Mark all notifications read error:", error);
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={handleOpen}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/55 transition hover:text-[#F57A24]"
      >
        <Bell size={18} />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F57A24] px-1.5 text-[10px] font-black text-white">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-[999] w-[380px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#112233] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4">
            <div>
              <h3 className="text-sm font-black text-white">Notifications</h3>
              <p className="mt-0.5 text-xs text-white/35">
                {count} unread notification{count === 1 ? "" : "s"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleReadAll}
              disabled={count === 0}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[11px] font-bold text-white/45 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCheck size={14} />
              Read all
            </button>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {loading && notifications.length === 0 && (
              <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-white/35">
                <Loader2 size={16} className="animate-spin" />
                Loading notifications...
              </div>
            )}

            {!loading && notifications.length === 0 && (
              <div className="px-4 py-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-white/30">
                  <Bell size={22} />
                </div>

                <p className="mt-3 text-sm font-bold text-white/45">
                  No notifications yet.
                </p>
              </div>
            )}

            {visibleNotifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => handleNotificationClick(notification)}
                className={`block w-full border-b border-white/[0.05] px-4 py-4 text-left transition hover:bg-white/[0.04] ${
                  !notification.is_read ? "bg-[#F57A24]/[0.055]" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                      !notification.is_read
                        ? "bg-[#F57A24]/15 text-[#F57A24]"
                        : "bg-white/[0.04] text-white/30"
                    }`}
                  >
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-black text-white">
                        {notification.title}
                      </h4>

                      {!notification.is_read && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F57A24]" />
                      )}
                    </div>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/45">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-[10px] text-white/25">
                      {notification.created_at
                        ? new Date(notification.created_at).toLocaleString()
                        : ""}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {hasMore && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="flex w-full items-center justify-center gap-2 px-4 py-3 text-xs font-black text-[#F57A24] transition hover:bg-white/[0.04]"
              >
                Show more
                <ChevronDown size={15} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
