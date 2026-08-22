import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/layout/app-header";
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  Plus, 
  Sparkles 
} from "lucide-react";

export default async function CareerProfilePage() {
  const session = await auth();

  // 1. Cari user berdasarkan email session
  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          profile: {
            include: {
              experiences: true,
              educations: true,
              skills: true,
              projects: true,
              certifications: true,
            },
          },
        },
      })
    : null;

  // 2. Jika user ada tapi baris profile belum terbuat, buat otomatis
  let profile = user?.profile;
  if (user && !profile) {
    profile = await prisma.profile.create({
      data: {
        userId: user.id,
        headline: "Software Engineer / Professional",
      },
      include: {
        experiences: true,
        educations: true,
        skills: true,
        projects: true,
        certifications: true,
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col">
      <AppHeader activeNav="career-profile" />

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

          <button className="px-4 py-2.5 bg-[#0A0A0A] hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs">
            <Plus className="w-4 h-4" /> Tambah Record
          </button>
        </div>

        {/* Modular Profile Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work Experience Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-neutral-700" />
                </div>
                <h2 className="font-bold text-sm text-neutral-900">Work Experience</h2>
              </div>
              <button className="text-neutral-400 hover:text-black transition p-1 cursor-pointer">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {profile?.experiences && profile.experiences.length > 0 ? (
              <div className="space-y-3">
                {profile.experiences.map((exp) => (
                  <div key={exp.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900">{exp.position}</p>
                    <p className="text-[11px] text-neutral-500">{exp.company}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border border-dashed border-neutral-200 rounded-xl">
                <p className="text-xs text-neutral-400">Belum ada pengalaman kerja/magang.</p>
              </div>
            )}
          </div>

          {/* Projects Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <FolderGit2 className="w-4 h-4 text-neutral-700" />
                </div>
                <h2 className="font-bold text-sm text-neutral-900">Projects & Proof</h2>
              </div>
              <button className="text-neutral-400 hover:text-black transition p-1 cursor-pointer">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {profile?.projects && profile.projects.length > 0 ? (
              <div className="space-y-3">
                {profile.projects.map((proj) => (
                  <div key={proj.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900">{proj.title}</p>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border border-dashed border-neutral-200 rounded-xl">
                <p className="text-xs text-neutral-400">Belum ada data project yang dimasukkan.</p>
              </div>
            )}
          </div>

          {/* Education Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-neutral-700" />
                </div>
                <h2 className="font-bold text-sm text-neutral-900">Education</h2>
              </div>
              <button className="text-neutral-400 hover:text-black transition p-1 cursor-pointer">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {profile?.educations && profile.educations.length > 0 ? (
              <div className="space-y-3">
                {profile.educations.map((edu) => (
                  <div key={edu.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900">{edu.institution}</p>
                    <p className="text-[11px] text-neutral-500">{edu.degree} • {edu.fieldOfStudy}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border border-dashed border-neutral-200 rounded-xl">
                <p className="text-xs text-neutral-400">Belum ada riwayat pendidikan.</p>
              </div>
            )}
          </div>

          {/* Skills & Tech Stack Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-neutral-700" />
                </div>
                <h2 className="font-bold text-sm text-neutral-900">Skills & Tech Stack</h2>
              </div>
              <button className="text-neutral-400 hover:text-black transition p-1 cursor-pointer">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {profile?.skills && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-medium border border-neutral-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border border-dashed border-neutral-200 rounded-xl">
                <p className="text-xs text-neutral-400">Belum ada skill yang ditambahkan.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}