"use client";

import { useState } from "react";
import {
  User,
  Shield,
  Trash2,
  LogOut,
  Save,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Info,
} from "lucide-react";
import { updateAccountProfileAction, deleteUserAccountAction } from "@/app/actions/settings";
import { signOut } from "next-auth/react";

interface SettingsViewProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  profile: {
    headline?: string | null;
    bio?: string | null;
    location?: string | null;
    industry?: string | null;
  } | null;
}

export function SettingsView({ user, profile }: SettingsViewProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // State Privacy Toggle (Client preference)
  const [isSearchable, setIsSearchable] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    const formData = new FormData(e.currentTarget);
    const res = await updateAccountProfileAction(formData);

    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(res.error || "Gagal menyimpan perubahan");
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") return;
    setDeleting(true);
    const res = await deleteUserAccountAction();
    if (res.success) {
      await signOut({ callbackUrl: "/" });
    } else {
      alert(res.error || "Gagal menghapus akun");
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. PROFILE & ACCOUNT INFORMATION */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-100 mb-6">
          <User className="w-4 h-4 text-neutral-800" />
          <h2 className="text-sm font-bold text-neutral-900">Profile & Account Settings</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.name || ""}
                required
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Email Address (Account ID)
              </label>
              <input
                type="email"
                disabled
                value={user.email || ""}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 bg-neutral-100/70 text-neutral-500 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Professional Headline
              </label>
              <input
                type="text"
                name="headline"
                defaultValue={profile?.headline || ""}
                placeholder="e.g., Full-Stack Software Engineer"
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={profile?.location || ""}
                placeholder="e.g., Jakarta, Indonesia"
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Primary Industry
            </label>
            <input
              type="text"
              name="industry"
              defaultValue={profile?.industry || "Information Technology & Software"}
              className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Short Professional Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              defaultValue={profile?.bio || ""}
              placeholder="Tell a brief story about your professional background..."
              className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium resize-none leading-relaxed"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {saved ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> Perubahan berhasil disimpan
              </span>
            ) : <span />}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer shadow-xs"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </section>

      {/* 2. PRIVACY & VISIBILITY */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
          <Shield className="w-4 h-4 text-neutral-800" />
          <h2 className="text-sm font-bold text-neutral-900">Privacy & Data Control</h2>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
          <div>
            <span className="text-xs font-bold text-neutral-900 block">AI Resume Matching Data</span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">
              Izinkan AI memproses pengalaman kerja untuk rekomendasi kecocokan lowongan.
            </span>
          </div>
          <input
            type="checkbox"
            checked={isSearchable}
            onChange={(e) => setIsSearchable(e.target.checked)}
            className="w-4 h-4 accent-black cursor-pointer"
          />
        </div>
      </section>

      {/* 3. AUTHENTICATION & SESSION */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4 text-neutral-800" />
            <h2 className="text-sm font-bold text-neutral-900">Session & Authentication</h2>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-neutral-800 block">Current Active Session</span>
            <span className="text-[11px] text-neutral-500 block">
              Logged in as <strong className="text-neutral-700">{user.email}</strong>
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* 4. DANGER ZONE */}
      <section className="bg-white rounded-3xl border border-rose-200 p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-rose-100">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h2 className="text-sm font-bold text-rose-900">Danger Zone</h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-rose-950 block">Delete Career Passport Account</span>
            <span className="text-[11px] text-rose-700/80 block mt-0.5 max-w-lg">
              Tindakan ini permanen. Seluruh profil CV, riwayat pengalaman, sertifikasi, dan analitik AI akan dihapus selamanya.
            </span>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Account</span>
          </button>
        </div>
      </section>

      {/* FOOTER APP VERSION */}
      <div className="flex items-center justify-center gap-2 pt-4 text-[11px] font-medium text-neutral-400">
        <Info className="w-3.5 h-3.5" />
        <span>Career Passport v1.0.0-stable — Powered by Gemini 3.6 Flash</span>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-neutral-200 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-neutral-900">Konfirmasi Hapus Akun</h3>
                <p className="text-[11px] text-neutral-500">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Ketik kata <strong className="text-rose-600 font-mono">DELETE</strong> di bawah ini untuk mengonfirmasi penghapusan seluruh data akun Anda:
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Ketik DELETE"
              className="w-full text-xs p-3 rounded-xl border border-neutral-300 font-mono tracking-widest uppercase focus:outline-none focus:border-rose-600"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmText("");
                }}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={confirmText !== "DELETE" || deleting}
                onClick={handleDeleteAccount}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-40 transition cursor-pointer"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Hapus Akun Selamanya</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}