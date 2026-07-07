import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Globe,
  Loader2,
  Save,
  ShieldAlert,
} from "lucide-react";

import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";

// Keep in sync with the rest of the admin (AdminOverview.jsx, AdminSidebar.jsx, etc.)
const ACCENT = "#F2A93B";
const SURFACE = "#0F1B2B";

// TODO: replace with your real settings API, e.g. ../../api/settings
// import { useGetAdminSettings, updateAdminProfile, updateAdminPassword, updateSiteSettings } from "../../api/settings";

export default function AdminSettings() {
  const admin = JSON.parse(localStorage.getItem("admin_user") || "null");

  const { showToast } = useToast();
  const { confirm } = useConfirm();

  // ---- Profile ----
  const [profile, setProfile] = useState({
    full_name: admin?.full_name || "",
    email: admin?.email || "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // ---- Password ----
  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // ---- Site settings ----
  const [site, setSite] = useState({
    site_name: "",
    contact_email: "",
    maintenance_mode: false,
  });
  const [savingSite, setSavingSite] = useState(false);

  // ---- Notifications ----
  const [notifications, setNotifications] = useState({
    new_inquiry_email: true,
    weekly_summary: false,
  });
  const [savingNotifications, setSavingNotifications] = useState(false);

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  }

  function handleSiteChange(event) {
    const { name, value, type, checked } = event.target;
    setSite((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();

    try {
      setSavingProfile(true);

      // await updateAdminProfile(profile);
      await new Promise((resolve) => setTimeout(resolve, 500));

      localStorage.setItem(
        "admin_user",
        JSON.stringify({ ...admin, ...profile }),
      );

      showToast({
        type: "success",
        title: "Profile updated",
        message: "Your profile has been saved successfully.",
      });
    } catch (err) {
      showToast({
        type: "error",
        title: "Update failed",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to update profile.",
      });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();

    if (!password.current || !password.next) {
      showToast({
        type: "error",
        title: "Missing fields",
        message: "Please fill in your current and new password.",
      });
      return;
    }

    if (password.next !== password.confirm) {
      showToast({
        type: "error",
        title: "Passwords don't match",
        message: "New password and confirmation must match.",
      });
      return;
    }

    try {
      setSavingPassword(true);

      // await updateAdminPassword(password);
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPassword({ current: "", next: "", confirm: "" });

      showToast({
        type: "success",
        title: "Password updated",
        message: "Your password has been changed successfully.",
      });
    } catch (err) {
      showToast({
        type: "error",
        title: "Update failed",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to update password.",
      });
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleSiteSubmit(event) {
    event.preventDefault();

    try {
      setSavingSite(true);

      // await updateSiteSettings(site);
      await new Promise((resolve) => setTimeout(resolve, 500));

      showToast({
        type: "success",
        title: "Site settings updated",
        message: "Your changes have been saved.",
      });
    } catch (err) {
      showToast({
        type: "error",
        title: "Update failed",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to update site settings.",
      });
    } finally {
      setSavingSite(false);
    }
  }

  async function handleToggleNotification(key) {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);

    try {
      setSavingNotifications(true);
      // await updateNotificationSettings(next);
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (err) {
      setNotifications(notifications);
      showToast({
        type: "error",
        title: "Update failed",
        message: "Failed to update notification preference.",
      });
    } finally {
      setSavingNotifications(false);
    }
  }

  async function handleLogoutEverywhere() {
    const confirmed = await confirm({
      title: "Log out everywhere?",
      message:
        "This will end all active admin sessions on every device, including this one.",
      confirmText: "Log Out Everywhere",
      cancelText: "Cancel",
      danger: true,
    });

    if (!confirmed) return;

    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    window.location.href = "/admin/login";
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className="rounded-2xl border border-white/[0.06] p-6"
        style={{ backgroundColor: SURFACE }}
      >
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${ACCENT}1F`, color: ACCENT }}
        >
          <SettingsIcon size={19} />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-white/25">
          Admin settings
        </p>

        <h1 className="mt-1.5 text-[26px] font-bold tracking-[-0.6px] text-white">
          Settings
        </h1>

        <p className="mt-1.5 max-w-[600px] text-[13px] leading-6 text-white/35">
          Manage your account, site preferences, and notifications.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Profile */}
        <SettingsCard
          icon={User}
          eyebrow="Account"
          title="Profile"
          description="Your name and email as shown across the admin."
        >
          <form onSubmit={handleProfileSubmit} className="space-y-3.5">
            <Field label="Full name">
              <input
                name="full_name"
                value={profile.full_name}
                onChange={handleProfileChange}
                placeholder="Your name"
                className={inputClass}
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>

            <SaveButton saving={savingProfile} label="Save profile" />
          </form>
        </SettingsCard>

        {/* Password */}
        <SettingsCard
          icon={Lock}
          eyebrow="Security"
          title="Password"
          description="Choose a strong password you don't use elsewhere."
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
            <Field label="Current password">
              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </Field>

            <Field label="New password">
              <input
                type="password"
                name="next"
                value={password.next}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </Field>

            <Field label="Confirm new password">
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </Field>

            <SaveButton saving={savingPassword} label="Update password" />
          </form>
        </SettingsCard>

        {/* Site settings */}
        <SettingsCard
          icon={Globe}
          eyebrow="Website"
          title="Site preferences"
          description="General settings used across the public site."
        >
          <form onSubmit={handleSiteSubmit} className="space-y-3.5">
            <Field label="Site name">
              <input
                name="site_name"
                value={site.site_name}
                onChange={handleSiteChange}
                placeholder="Your company name"
                className={inputClass}
              />
            </Field>

            <Field label="Public contact email">
              <input
                type="email"
                name="contact_email"
                value={site.contact_email}
                onChange={handleSiteChange}
                placeholder="hello@example.com"
                className={inputClass}
              />
            </Field>

            <label className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white/80">
                  Maintenance mode
                </p>
                <p className="text-[12px] text-white/30">
                  Show a maintenance page to visitors.
                </p>
              </div>

              <input
                type="checkbox"
                name="maintenance_mode"
                checked={site.maintenance_mode}
                onChange={handleSiteChange}
                className="h-4 w-4 shrink-0 accent-[#F2A93B]"
              />
            </label>

            <SaveButton saving={savingSite} label="Save site settings" />
          </form>
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard
          icon={Bell}
          eyebrow="Alerts"
          title="Notifications"
          description="Choose what you get notified about."
        >
          <div className="space-y-2.5">
            <ToggleRow
              label="New inquiry email"
              description="Get an email when someone submits the contact form."
              checked={notifications.new_inquiry_email}
              disabled={savingNotifications}
              onChange={() => handleToggleNotification("new_inquiry_email")}
            />

            <ToggleRow
              label="Weekly summary"
              description="A weekly digest of site activity and traffic."
              checked={notifications.weekly_summary}
              disabled={savingNotifications}
              onChange={() => handleToggleNotification("weekly_summary")}
            />
          </div>
        </SettingsCard>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.04] p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
              <ShieldAlert size={19} />
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-white">
                Log out of all devices
              </h3>
              <p className="mt-1 text-[12.5px] text-white/35">
                Ends every active admin session, including this one.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogoutEverywhere}
            className="shrink-0 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-[13px] font-medium text-red-200 transition-colors hover:bg-red-400/[0.18]"
          >
            Log out everywhere
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[13px] text-white outline-none placeholder:text-white/20 focus:border-white/20";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-white/45">
        {label}
      </span>
      {children}
    </label>
  );
}

function SaveButton({ saving, label }) {
  return (
    <button
      type="submit"
      disabled={saving}
      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#0F1B2B] transition-opacity hover:opacity-90 disabled:opacity-50"
      style={{ backgroundColor: ACCENT }}
    >
      {saving ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        <Save size={15} />
      )}
      {saving ? "Saving…" : label}
    </button>
  );
}

function SettingsCard({ icon: Icon, eyebrow, title, description, children }) {
  return (
    <div
      className="rounded-2xl border border-white/[0.06] p-6"
      style={{ backgroundColor: SURFACE }}
    >
      <div className="mb-5 flex items-start gap-3.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${ACCENT}1F`, color: ACCENT }}
        >
          <Icon size={16} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[1.4px] text-white/25">
            {eyebrow}
          </p>
          <h2 className="text-[16px] font-semibold text-white">{title}</h2>
          <p className="mt-0.5 text-[12.5px] text-white/35">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

function ToggleRow({ label, description, checked, disabled, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-white/80">{label}</p>
        <p className="text-[12px] text-white/30">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-50"
        style={{
          backgroundColor: checked ? ACCENT : "rgba(255,255,255,0.08)",
        }}
      >
        <span
          className="absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200"
          style={{ left: checked ? "22px" : "4px" }}
        />
      </button>
    </div>
  );
}
