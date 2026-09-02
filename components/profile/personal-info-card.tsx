"use client";

import { useState } from "react";
import { User, Phone, MapPin, Globe, Code2, FileText, CheckCircle2, Loader2, GraduationCap } from "lucide-react";
import { updatePersonalInfoAction } from "@/app/actions/career-profile";
import { MAJOR_CONFIGS, getIndustryConfig } from "@/lib/industry-config";

interface PersonalInfoCardProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  profile: {
    industry?: string | null;
    phone?: string | null;
    location?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    portfolioUrl?: string | null;
    headline?: string | null;
    bio?: string | null;
  } | null;
}

export function PersonalInfoCard({ user, profile }: PersonalInfoCardProps) {
  const [loading, setLoading] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(profile?.industry || "it");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const majorConfig = getIndustryConfig(selectedMajor);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await updatePersonalInfoAction(formData);

    setLoading(false);
    if (res.success) {
      setMessage({ type: "success", text: "Data personal & major berhasil diperbarui!" });
      setTimeout(() => setMessage(null), 4000);
    } else {
      setMessage({ type: "error", text: res.error || "Terjadi kesalahan saat menyimpan." });
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CP";

  return (
    <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-neutral-950 text-[#FFEB43] font-black text-xl flex items-center justify-center shrink-0 shadow-xs">
            {initials}
          </div>
          <div>
            <h2 className="text-lg font-black text-neutral-900 leading-snug">Personal Information & Bio</h2>
            <p className="text-xs text-neutral-500">
              Pilih major Anda terlebih dahulu untuk menyesuaikan seluruh istilah proyek, skill, dan analisis karir.
            </p>
          </div>
        </div>

        {message && (
          <div
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.type === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{message.text}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* STEP 1: MAJOR SELECTION (TOP PRIORITY) */}
        <div className="p-4 rounded-2xl bg-[#0071E3]/5 border border-[#0071E3]/20 space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-[#0071E3] flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" /> Academic Major / Professional Discipline *
          </label>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Menentukan template resume, seksi ({majorConfig.projectSectionTitle}), dan engine evaluasi AI.
          </p>
          <select
            name="industry"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 rounded-xl bg-white border border-neutral-200 focus:outline-none focus:border-[#0071E3] transition mt-1 cursor-pointer"
            required
          >
            {Object.values(MAJOR_CONFIGS).map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* STEP 2: PROFILE DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neutral-500" /> Full Name *
            </label>
            <input
              name="name"
              defaultValue={user?.name ?? ""}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 focus:bg-white focus:outline-none focus:border-black transition"
              placeholder="e.g. Sutan Sadad"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Email (Primary)</label>
            <input
              defaultValue={user?.email ?? ""}
              disabled
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Professional Title / Headline</label>
            <input
              name="headline"
              defaultValue={profile?.headline ?? ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 focus:bg-white focus:outline-none focus:border-black transition"
              placeholder={majorConfig.headlinePlaceholder}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-neutral-500" /> Phone Number
            </label>
            <input
              name="phone"
              defaultValue={profile?.phone ?? ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 focus:bg-white focus:outline-none focus:border-black transition"
              placeholder="+62 812 3456 7890"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" /> Location (City, Country)
            </label>
            <input
              name="location"
              defaultValue={profile?.location ?? ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 focus:bg-white focus:outline-none focus:border-black transition"
              placeholder="Batam, Indonesia"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-neutral-700" /> LinkedIn Profile
            </label>
            <input
              name="linkedinUrl"
              defaultValue={profile?.linkedinUrl ?? ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 focus:bg-white focus:outline-none focus:border-black transition"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-neutral-700" /> Portfolio / Reference / Repository Link
            </label>
            <input
              name="githubUrl"
              defaultValue={profile?.githubUrl ?? ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 focus:bg-white focus:outline-none focus:border-black transition"
              placeholder="https://github.com/... or https://behance.net/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-neutral-500" /> Professional Summary (Bio)
          </label>
          <textarea
            name="bio"
            defaultValue={profile?.bio ?? ""}
            rows={3}
            className="w-full text-xs p-3 rounded-xl border border-neutral-200 bg-neutral-50/40 focus:bg-white focus:outline-none focus:border-black transition"
            placeholder="Ringkasan profil profesional yang selaras dengan major Anda..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 text-white hover:bg-neutral-800 rounded-xl text-xs font-bold transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            <span>{loading ? "Menyimpan Data..." : "Simpan Pengaturan Major & Profil"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}