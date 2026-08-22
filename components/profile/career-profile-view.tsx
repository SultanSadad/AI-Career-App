"use client";

import { ProfileModalsProvider } from "./profile-modals";
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  Sparkles,
  Plus,
  ExternalLink 
} from "lucide-react";

interface CareerProfileViewProps {
  profile: any;
}

export function CareerProfileView({ profile }: CareerProfileViewProps) {
  return (
    <ProfileModalsProvider>
      {(openModal) => (
        <main className="max-w-5xl w-full mx-auto p-6 md:p-8 space-y-8 flex-1">
          {/* Top Header Card */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEB43]/20 border border-[#FFEB43]/50 text-[11px] font-bold text-neutral-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                Single Source of Truth
              </div>
              <h1 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">
                Career Profile Records
              </h1>
              <p className="text-xs text-neutral-500 mt-1 max-w-lg">
                Semua input pengalaman, proyek, dan skill di sini akan menjadi basis data utama yang dipilih dan dioptimalkan oleh AI saat menyusun CV.
              </p>
            </div>

            <button
              onClick={() => openModal("exp")}
              className="px-4 py-2.5 bg-[#0A0A0A] hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" /> Tambah Record
            </button>
          </div>

          {/* Modular Profile Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Work Experience Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-neutral-700" />
                  </div>
                  <h2 className="font-extrabold text-sm text-neutral-900">
                    Work Experience ({profile?.experiences?.length ?? 0})
                  </h2>
                </div>
                <button
                  onClick={() => openModal("exp")}
                  className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-lg transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {profile?.experiences && profile.experiences.length > 0 ? (
                <div className="space-y-3">
                  {profile.experiences.map((exp: any) => (
                    <div key={exp.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-1">
                      <p className="text-xs font-bold text-neutral-900">{exp.position}</p>
                      <p className="text-[11px] font-medium text-neutral-600">{exp.company}</p>
                      {exp.description && (
                        <p className="text-[11px] text-neutral-500 line-clamp-2 pt-1">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-neutral-200 rounded-2xl">
                  <p className="text-xs text-neutral-400">Belum ada pengalaman kerja/magang.</p>
                </div>
              )}
            </div>

            {/* Projects Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <FolderGit2 className="w-4 h-4 text-neutral-700" />
                  </div>
                  <h2 className="font-extrabold text-sm text-neutral-900">
                    Projects & Proof ({profile?.projects?.length ?? 0})
                  </h2>
                </div>
                <button
                  onClick={() => openModal("proj")}
                  className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-lg transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {profile?.projects && profile.projects.length > 0 ? (
                <div className="space-y-3">
                  {profile.projects.map((proj: any) => (
                    <div key={proj.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-neutral-900">{proj.title}</p>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-black">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-2">{proj.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-neutral-200 rounded-2xl">
                  <p className="text-xs text-neutral-400">Belum ada data project yang dimasukkan.</p>
                </div>
              )}
            </div>

            {/* Education Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-neutral-700" />
                  </div>
                  <h2 className="font-extrabold text-sm text-neutral-900">
                    Education ({profile?.educations?.length ?? 0})
                  </h2>
                </div>
                <button
                  onClick={() => openModal("edu")}
                  className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-lg transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {profile?.educations && profile.educations.length > 0 ? (
                <div className="space-y-3">
                  {profile.educations.map((edu: any) => (
                    <div key={edu.id} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                      <p className="text-xs font-bold text-neutral-900">{edu.institution}</p>
                      <p className="text-[11px] text-neutral-500">{edu.degree} • {edu.fieldOfStudy}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-neutral-200 rounded-2xl">
                  <p className="text-xs text-neutral-400">Belum ada riwayat pendidikan.</p>
                </div>
              )}
            </div>

            {/* Skills Card */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-neutral-700" />
                  </div>
                  <h2 className="font-extrabold text-sm text-neutral-900">
                    Skills & Tech Stack ({profile?.skills?.length ?? 0})
                  </h2>
                </div>
                <button
                  onClick={() => openModal("skill")}
                  className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-lg transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {profile?.skills && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: any) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-xl text-xs font-semibold border border-neutral-200 shadow-2xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center border border-dashed border-neutral-200 rounded-2xl">
                  <p className="text-xs text-neutral-400">Belum ada skill yang ditambahkan.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </ProfileModalsProvider>
  );
}