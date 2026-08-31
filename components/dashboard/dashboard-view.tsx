"use client";

import Link from "next/link";
import {
  FileText,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  GraduationCap,
  Wrench,
  Award,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { getIndustryConfig } from "@/lib/industry-config";

interface DashboardViewProps {
  user: any;
  profile: any;
}

export function DashboardView({ user, profile }: DashboardViewProps) {
  // Ambil metadata & konfigurasi industri profil
  const industryMeta = getIndustryConfig(
    profile?.industry || "Information Technology & Software"
  );

  const portfolioTitle =
    industryMeta?.portfolioSectionTitle || "Key Projects & Repositories";
  const industryName =
    industryMeta?.name || profile?.industry || "Information Technology & Software";
  const industryBadge =
    (industryMeta as any)?.badge || industryMeta?.name || "General Tech";

  // 1. Hitung Profile Completeness
  const checklist = [
    {
      label: "Target Industry Selected",
      isDone: Boolean(profile?.industry),
      weight: 15,
    },
    {
      label: "Professional Headline & Bio",
      isDone: Boolean(profile?.headline),
      weight: 15,
    },
    {
      label: "Work Experience",
      isDone: (profile?.experiences?.length ?? 0) > 0,
      weight: 25,
    },
    {
      label: portfolioTitle,
      isDone: (profile?.projects?.length ?? 0) > 0,
      weight: 25,
    },
    {
      label: "Education Records",
      isDone: (profile?.educations?.length ?? 0) > 0,
      weight: 10,
    },
    {
      label: "Key Skills (Min 3)",
      isDone: (profile?.skills?.length ?? 0) >= 3,
      weight: 10,
    },
  ];

  const completionPercentage = checklist.reduce(
    (total, item) => (item.isDone ? total + item.weight : total),
    0
  );

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-8">
      {/* 1. WELCOME BANNER & DOMAIN BADGE */}
      <div className="bg-neutral-950 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-neutral-900">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-[#FFEB43] text-[11px] font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{industryBadge}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Selamat Datang, {user?.name?.split(" ")[0] ?? "Kandidat"}!
          </h1>

          <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
            Data karir Anda saat ini terhubung dengan domain{" "}
            <span className="text-white font-semibold">{industryName}</span>. AI
            akan mengoptimasi CV ATS dan saran kata kunci sesuai standar profesi
            ini.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/cv-builder"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFEB43] text-neutral-950 text-xs font-bold hover:bg-[#ffe724] transition shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Tailor CV Baru</span>
            </Link>
            <Link
              href="/career-profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition"
            >
              <span>Kelola Portofolio</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          </div>
        </div>

        {/* Decorative Radial Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-neutral-800/40 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* 2. PROFILE COMPLETENESS & QUICK STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COMPLETENESS PROGRESS CARD */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                Profile Readiness
              </span>
              <span className="text-2xl font-black text-neutral-900">
                {completionPercentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  completionPercentage === 100
                    ? "bg-emerald-500"
                    : completionPercentage > 60
                    ? "bg-[#FFEB43]"
                    : "bg-neutral-900"
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <p className="text-[11px] text-neutral-500 leading-tight">
              {completionPercentage === 100
                ? "Profil Anda lengkap dan siap menghasilkan CV ATS dengan akurasi optimal!"
                : "Lengkapi data untuk meningkatkan akurasi tailoring resume berbasis AI."}
            </p>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs"
              >
                <span
                  className={
                    item.isDone
                      ? "text-neutral-700 font-medium"
                      : "text-neutral-400 line-through"
                  }
                >
                  {item.label}
                </span>
                {item.isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <Link
            href="/career-profile"
            className="w-full text-center py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold transition block"
          >
            Lengkapi Profil Sekarang
          </Link>
        </div>

        {/* QUICK STATS METRICS GRID */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="pt-4">
              <div className="text-2xl font-black text-neutral-900">
                {profile?.experiences?.length ?? 0}
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                Experiences
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Layers className="w-4 h-4" />
            </div>
            <div className="pt-4">
              <div className="text-2xl font-black text-neutral-900">
                {profile?.projects?.length ?? 0}
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-0.5 truncate">
                {portfolioTitle.split(" ")[0]}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Wrench className="w-4 h-4" />
            </div>
            <div className="pt-4">
              <div className="text-2xl font-black text-neutral-900">
                {profile?.skills?.length ?? 0}
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                Skills
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="pt-4">
              <div className="text-2xl font-black text-neutral-900">
                {profile?.educations?.length ?? 0}
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                Educations
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Award className="w-4 h-4" />
            </div>
            <div className="pt-4">
              <div className="text-2xl font-black text-neutral-900">
                {profile?.achievements?.length ?? 0}
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                Honors & Awards
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="pt-4">
              <div className="text-2xl font-black text-neutral-900">92%</div>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                Avg. ATS Match
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. QUICK ACTION TILES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/cv-builder"
          className="group bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs hover:border-black transition flex items-center justify-between"
        >
          <div className="space-y-1 max-w-sm">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <FileText className="w-4 h-4 text-neutral-700" />
              <span>ATS CV Generator</span>
            </div>
            <p className="text-xs text-neutral-500">
              Sesuaikan CV dengan deskripsi pekerjaan target menggunakan AI
              Tailoring.
            </p>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-neutral-100 group-hover:bg-neutral-950 group-hover:text-white flex items-center justify-center transition shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/ai-insight"
          className="group bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs hover:border-black transition flex items-center justify-between"
        >
          <div className="space-y-1 max-w-sm">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Career & Skill Gap Insights</span>
            </div>
            <p className="text-xs text-neutral-500">
              Evaluasi kata kunci yang hilang dan analisis kecocokan profil
              dengan pasar kerja.
            </p>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-neutral-100 group-hover:bg-neutral-950 group-hover:text-white flex items-center justify-center transition shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </main>
  );
}