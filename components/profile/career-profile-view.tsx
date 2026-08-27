"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  Compass,
  Layers,
  ShieldCheck,
  Globe,
  Code2,
  Sparkles,
} from "lucide-react";
import {
  ExperienceModal,
  ProjectModal,
  EducationModal,
  AchievementModal,
  CertificationModal,
  SkillModal,
} from "./profile-modals";
import { PersonalInfoCard } from "./personal-info-card";
import { deleteRecordAction, updateProfileGeneralAction, addSkillAction } from "@/app/actions/career-profile";
import { getIndustryConfig, INDUSTRY_CONFIGS } from "@/lib/industry-config";
import { EmptyState } from "@/components/ui/empty-state";

interface CareerProfileViewProps {
  profile: any;
}

export function CareerProfileView({ profile }: CareerProfileViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    profile?.industry || "Information Technology & Software"
  );
  const [modalType, setModalType] = useState<"exp" | "proj" | "edu" | "achieve" | "cert" | "skill" | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [isUpdatingGeneral, setIsUpdatingGeneral] = useState(false);
  const [quickSkillLoading, setQuickSkillLoading] = useState<string | null>(null);

  const industryMeta = getIndustryConfig(selectedIndustry);

  const handleOpenAdd = (type: "exp" | "proj" | "edu" | "achieve" | "cert" | "skill") => {
    setEditItem(null);
    setModalType(type);
  };

  const handleOpenEdit = (type: "exp" | "proj" | "edu" | "achieve" | "cert", item: any) => {
    setEditItem(item);
    setModalType(type);
  };

  const handleDelete = async (type: "exp" | "proj" | "edu" | "skill" | "achieve" | "cert", id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteRecordAction(type, id);
    }
  };

  const handleSaveGeneral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdatingGeneral(true);
    const formData = new FormData(e.currentTarget);
    await updateProfileGeneralAction(formData);
    setIsUpdatingGeneral(false);
    alert("Target industri dan profil berhasil diperbarui!");
  };

  const handleQuickAddSkill = async (skillName: string) => {
    setQuickSkillLoading(skillName);
    const formData = new FormData();
    formData.set("name", skillName);
    formData.set("level", "INTERMEDIATE");
    await addSkillAction(formData);
    setQuickSkillLoading(null);
  };

  const existingSkillNames = new Set((profile?.skills || []).map((s: any) => s.name.toLowerCase()));

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Career Profile</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Centralized career records and industry preference for your AI CV Builder.
          </p>
        </div>
      </div>

      {/* 0. INDUSTRY SELECTOR BOX */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
          <Compass className="w-4 h-4 text-neutral-700" />
          <span>Target Industry & Profile Domain</span>
        </div>
        <p className="text-xs text-neutral-500">
          Pilih bidang industri Anda agar formulir dan AI Gemini menyesuaikan istilah (misal: Legal Cases untuk Hukum, Financial Models untuk Akuntansi).
        </p>

        <form onSubmit={handleSaveGeneral} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Bidang / Industri *</label>
            <select
              name="industry"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black bg-white font-medium"
            >
              {Object.keys(INDUSTRY_CONFIGS).map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Professional Headline</label>
            <input
              name="headline"
              defaultValue={profile?.headline || ""}
              placeholder={industryMeta.headlinePlaceholder}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isUpdatingGeneral}
              className="w-full py-2.5 px-4 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer"
            >
              {isUpdatingGeneral ? "Menyimpan..." : "Simpan Pengaturan"}
            </button>
          </div>
        </form>
      </div>

      {/* 1. PERSONAL INFORMATION */}
      <PersonalInfoCard user={profile?.user ?? null} profile={profile} />

      {/* 2. CORE RECORDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WORK EXPERIENCE */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Briefcase className="w-4 h-4 text-neutral-700" />
              <span>Work Experience</span>
            </div>
            <button
              onClick={() => handleOpenAdd("exp")}
              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.experiences && profile.experiences.length > 0 ? (
              profile.experiences.map((exp: any) => (
                <div key={exp.id} className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-neutral-900">{exp.position}</h4>
                        {exp.employmentType && (
                          <span className="px-2 py-0.5 rounded-md bg-neutral-200/70 text-[10px] font-bold text-neutral-700">
                            {exp.employmentType}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-medium text-neutral-600 mt-0.5">
                        {exp.company} {exp.location ? `• ${exp.location}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEdit("exp", exp)} className="p-1 text-neutral-400 hover:text-black transition cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete("exp", exp.id)} className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono">
                    {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} -{" "}
                    {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
                  </p>
                  {exp.description && (
                    <p className="text-[11px] text-neutral-600 whitespace-pre-line leading-relaxed pt-1 border-t border-neutral-100">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <EmptyState
                icon={Briefcase}
                title="Belum ada pengalaman kerja"
                description="Tambahkan riwayat pekerjaan atau magang Anda."
                actionLabel="+ Tambah Experience"
                onAction={() => handleOpenAdd("exp")}
              />
            )}
          </div>
        </div>

        {/* DYNAMIC PORTFOLIO / CASE STUDIES */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Layers className="w-4 h-4 text-neutral-700" />
              <span>{industryMeta.portfolioSectionTitle}</span>
            </div>
            <button
              onClick={() => handleOpenAdd("proj")}
              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.projects && profile.projects.length > 0 ? (
              profile.projects.map((proj: any) => (
                <div key={proj.id} className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
  <h4 className="font-bold text-xs text-neutral-900">{proj.title}</h4>
  {proj.startDate && (
    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
      {new Date(proj.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} -{" "}
      {proj.endDate ? new Date(proj.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
    </p>
  )}
  {proj.technologies && (
    <p className="text-[10px] font-bold text-neutral-500 font-mono mt-0.5">
      Stack: {proj.technologies}
    </p>
  )}
</div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEdit("proj", proj)} className="p-1 text-neutral-400 hover:text-black transition cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete("proj", proj.id)} className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-600 whitespace-pre-line leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex items-center gap-3 pt-1 border-t border-neutral-100">
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold">
                        <Globe className="w-3 h-3" /> Live Demo
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[10px] text-neutral-700 hover:underline inline-flex items-center gap-1 font-semibold">
                        <Code2 className="w-3 h-3" /> Repo / Document
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={Layers}
                title={`Belum ada data ${industryMeta.portfolioSectionTitle.toLowerCase()}`}
                description="Tampilkan karya, proyek, atau studi kasus terbaik Anda."
                actionLabel="+ Tambah Entry"
                onAction={() => handleOpenAdd("proj")}
              />
            )}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <GraduationCap className="w-4 h-4 text-neutral-700" />
              <span>Education</span>
            </div>
            <button
              onClick={() => handleOpenAdd("edu")}
              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.educations && profile.educations.length > 0 ? (
              profile.educations.map((edu: any) => (
                <div key={edu.id} className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{edu.institution}</h4>
                      <p className="text-[11px] text-neutral-600 font-medium mt-0.5">
                        {edu.degree} - {edu.fieldOfStudy}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEdit("edu", edu)} className="p-1 text-neutral-400 hover:text-black transition cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete("edu", edu.id)} className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono">
                    {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} -{" "}
                    {edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                  </p>
                  {edu.description && (
                    <p className="text-[11px] text-neutral-600 whitespace-pre-line leading-relaxed pt-1 border-t border-neutral-100">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <EmptyState
                icon={GraduationCap}
                title="Belum ada riwayat pendidikan"
                description="Tambahkan universitas atau sekolah terakhir Anda."
                actionLabel="+ Tambah Education"
                onAction={() => handleOpenAdd("edu")}
              />
            )}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>Certifications & Licenses</span>
            </div>
            <button
              onClick={() => handleOpenAdd("cert")}
              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.certifications && profile.certifications.length > 0 ? (
              profile.certifications.map((cert: any) => (
                <div key={cert.id} className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{cert.name}</h4>
                      <p className="text-[11px] text-neutral-600 font-medium">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEdit("cert", cert)} className="p-1 text-neutral-400 hover:text-black transition cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete("cert", cert.id)} className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono">
                    Issued: {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {cert.expiryDate ? ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : " • No Expiration"}
                  </p>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline block pt-1 font-semibold">
                      Show Credential ↗
                    </a>
                  )}
                </div>
              ))
            ) : (
              <EmptyState
                icon={ShieldCheck}
                title="Belum ada sertifikasi"
                description="Tambahkan lisensi profesi, sertifikasi IT, atau kursus terakreditasi."
                actionLabel="+ Tambah Sertifikasi"
                onAction={() => handleOpenAdd("cert")}
              />
            )}
          </div>
        </div>

        {/* ACHIEVEMENTS & AWARDS */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Award className="w-4 h-4 text-neutral-700" />
              <span>Honors & Achievements</span>
            </div>
            <button
              onClick={() => handleOpenAdd("achieve")}
              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile?.achievements && profile.achievements.length > 0 ? (
              profile.achievements.map((ach: any) => (
                <div key={ach.id} className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{ach.title}</h4>
                      {ach.issuer && <p className="text-[11px] text-neutral-600 font-medium">{ach.issuer}</p>}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEdit("achieve", ach)} className="p-1 text-neutral-400 hover:text-black transition cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete("achieve", ach.id)} className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {ach.date && (
                    <p className="text-[10px] text-neutral-400 font-mono">
                      {new Date(ach.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </p>
                  )}
                  {ach.description && <p className="text-[11px] text-neutral-600 leading-relaxed pt-1">{ach.description}</p>}
                </div>
              ))
            ) : (
              <div className="sm:col-span-2">
                <EmptyState
                  icon={Award}
                  title="Belum ada penghargaan"
                  description="Tambahkan prestasi kompetisi, beasiswa, atau penghargaan profesional."
                  actionLabel="+ Tambah Penghargaan"
                  onAction={() => handleOpenAdd("achieve")}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. SKILLS SECTION WITH QUICK DOMAIN SUGGESTIONS */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Wrench className="w-4 h-4 text-neutral-700" />
              <span>Skills & Competencies</span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Keahlian teknis dan kompetensi utama yang relevan dengan bidang <span className="font-bold text-neutral-800">{industryMeta.name}</span>.
            </p>
          </div>
          <button
            onClick={() => handleOpenAdd("skill")}
            className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 transition cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom Skill
          </button>
        </div>

        {/* DOMAIN SUGGESTIONS CHIPS */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended for your domain (Click to quick-add):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(industryMeta?.suggestedSkills || []).map((sk) => {
  const alreadyAdded = existingSkillNames.has(sk.toLowerCase());
  return (
                <button
                  key={sk}
                  disabled={alreadyAdded || quickSkillLoading === sk}
                  onClick={() => handleQuickAddSkill(sk)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition cursor-pointer ${
                    alreadyAdded
                      ? "bg-neutral-200 text-neutral-500 border-neutral-200 cursor-not-allowed"
                      : "bg-white text-neutral-800 border-neutral-200 hover:border-black hover:bg-neutral-100"
                  }`}
                >
                  {alreadyAdded ? `✓ ${sk}` : `+ ${sk}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE USER SKILLS */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Your Active Skills</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {profile?.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill: any) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-neutral-900 border border-neutral-200 shadow-2xs hover:border-neutral-400 transition"
                >
                  <span>{skill.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-neutral-100 text-neutral-600">
                    {skill.level}
                  </span>
                  <button
                    onClick={() => handleDelete("skill", skill.id)}
                    className="text-neutral-400 hover:text-red-600 transition cursor-pointer"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400 italic py-2">Belum ada skill yang ditambahkan. Gunakan saran di atas atau klik tombol Tambah.</p>
            )}
          </div>
        </div>
      </div>

      {/* ALL MODALS */}
      {modalType === "exp" && (
        <ExperienceModal
          isOpen={true}
          onClose={() => setModalType(null)}
          initialData={editItem}
          companyPlaceholder={industryMeta.companyPlaceholder}
          positionPlaceholder={industryMeta.positionPlaceholder}
          descPlaceholder={industryMeta.experienceDescPlaceholder}
        />
      )}
      {modalType === "proj" && (
        <ProjectModal
          isOpen={true}
          onClose={() => setModalType(null)}
          initialData={editItem}
          sectionTitle={industryMeta.portfolioSectionTitle}
          titleLabel={industryMeta.portfolioTitleLabel}
          titlePlaceholder={industryMeta.portfolioTitlePlaceholder}
          technologiesLabel={industryMeta.technologiesLabel}
          technologiesPlaceholder={industryMeta.technologiesPlaceholder}
          linkPlaceholder={industryMeta.portfolioLinkPlaceholder}
          descPlaceholder={industryMeta.portfolioDescPlaceholder}
        />
      )}
      {modalType === "edu" && (
        <EducationModal
          isOpen={true}
          onClose={() => setModalType(null)}
          initialData={editItem}
          institutionPlaceholder={industryMeta.institutionPlaceholder}
          majorPlaceholder={industryMeta.majorPlaceholder}
        />
      )}
      {modalType === "cert" && (
        <CertificationModal
          isOpen={true}
          onClose={() => setModalType(null)}
          initialData={editItem}
        />
      )}
      {modalType === "achieve" && (
        <AchievementModal
          isOpen={true}
          onClose={() => setModalType(null)}
          initialData={editItem}
          titlePlaceholder={industryMeta.achievementTitlePlaceholder}
          issuerPlaceholder={industryMeta.issuerPlaceholder}
        />
      )}
      {modalType === "skill" && (
        <SkillModal
          isOpen={true}
          onClose={() => setModalType(null)}
          skillPlaceholder={industryMeta.skillPlaceholder}
        />
      )}
    </div>
  );
}