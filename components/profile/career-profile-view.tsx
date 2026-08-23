"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Briefcase, GraduationCap, Award, Wrench, Compass, Layers } from "lucide-react";
import {
  ExperienceModal,
  ProjectModal,
  EducationModal,
  AchievementModal,
  SkillModal,
} from "./profile-modals";
import { deleteRecordAction, updateProfileGeneralAction } from "@/app/actions/career-profile";
import { getIndustryConfig, INDUSTRY_CONFIGS } from "@/lib/industry-config";

interface CareerProfileViewProps {
  profile: any;
}

export function CareerProfileView({ profile }: CareerProfileViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    profile?.industry || "Information Technology & Software"
  );
  const [modalType, setModalType] = useState<"exp" | "proj" | "edu" | "achieve" | "skill" | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [isUpdatingGeneral, setIsUpdatingGeneral] = useState(false);

  const industryMeta = getIndustryConfig(selectedIndustry);

  const handleOpenAdd = (type: "exp" | "proj" | "edu" | "achieve" | "skill") => {
    setEditItem(null);
    setModalType(type);
  };

  const handleOpenEdit = (type: "exp" | "proj" | "edu" | "achieve", item: any) => {
    setEditItem(item);
    setModalType(type);
  };

  const handleDelete = async (type: "exp" | "proj" | "edu" | "skill" | "achieve", id: string) => {
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
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
          <Compass className="w-4 h-4 text-neutral-700" />
          <span>Target Industry & Profile Domain</span>
        </div>
        <p className="text-xs text-neutral-500">
          Pilih bidang industri Anda agar formulir dan AI Gemini menyesuaikan istilah (misal: Legal Cases untuk Hukum, Financial Models untuk Akuntansi).
        </p>

        <form onSubmit={handleSaveGeneral} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Bidang / Industri *</label>
            <select
              name="industry"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900 bg-white font-medium"
            >
              {Object.keys(INDUSTRY_CONFIGS).map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Professional Headline</label>
            <input
              name="headline"
              defaultValue={profile?.headline || ""}
              placeholder={industryMeta.headlinePlaceholder}
              className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isUpdatingGeneral}
              className="w-full py-2.5 px-4 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer"
            >
              {isUpdatingGeneral ? "Menyimpan..." : "Simpan Pengaturan"}
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. WORK EXPERIENCE */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Briefcase className="w-4 h-4 text-neutral-700" />
              <span>Work Experience</span>
            </div>
            <button
              onClick={() => handleOpenAdd("exp")}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.experiences && profile.experiences.length > 0 ? (
              profile.experiences.map((exp: any) => (
                <div key={exp.id} className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{exp.position}</h4>
                      <p className="text-[11px] font-medium text-neutral-600">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit("exp", exp)}
                        className="p-1 text-neutral-400 hover:text-black transition cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete("exp", exp.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono">
                    {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} -{" "}
                    {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400 italic py-2 text-center">Belum ada pengalaman kerja.</p>
            )}
          </div>
        </div>

        {/* 2. DYNAMIC PORTFOLIO / CASE STUDIES */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Layers className="w-4 h-4 text-neutral-700" />
              <span>{industryMeta.portfolioSectionTitle}</span>
            </div>
            <button
              onClick={() => handleOpenAdd("proj")}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.projects && profile.projects.length > 0 ? (
              profile.projects.map((proj: any) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{proj.title}</h4>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline">
                          {proj.link}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit("proj", proj)}
                        className="p-1 text-neutral-400 hover:text-black transition cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete("proj", proj.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-600 line-clamp-2">{proj.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400 italic py-2 text-center">
                Belum ada data {industryMeta.portfolioSectionTitle.toLowerCase()}.
              </p>
            )}
          </div>
        </div>

        {/* 3. EDUCATION */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <GraduationCap className="w-4 h-4 text-neutral-700" />
              <span>Education</span>
            </div>
            <button
              onClick={() => handleOpenAdd("edu")}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.educations && profile.educations.length > 0 ? (
              profile.educations.map((edu: any) => (
                <div key={edu.id} className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{edu.institution}</h4>
                      <p className="text-[11px] text-neutral-600">
                        {edu.degree} - {edu.fieldOfStudy}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit("edu", edu)}
                        className="p-1 text-neutral-400 hover:text-black transition cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete("edu", edu.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400 italic py-2 text-center">Belum ada riwayat pendidikan.</p>
            )}
          </div>
        </div>

        {/* 4. ACHIEVEMENTS */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Award className="w-4 h-4 text-neutral-700" />
              <span>Achievements & Awards</span>
            </div>
            <button
              onClick={() => handleOpenAdd("achieve")}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {profile?.achievements && profile.achievements.length > 0 ? (
              profile.achievements.map((ach: any) => (
                <div key={ach.id} className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/50 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900">{ach.title}</h4>
                      {ach.issuer && <p className="text-[11px] text-neutral-600">{ach.issuer}</p>}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit("achieve", ach)}
                        className="p-1 text-neutral-400 hover:text-black transition cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete("achieve", ach.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {ach.description && <p className="text-[11px] text-neutral-600">{ach.description}</p>}
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-400 italic py-2 text-center">Belum ada penghargaan.</p>
            )}
          </div>
        </div>
      </div>

      {/* 5. SKILLS */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
            <Wrench className="w-4 h-4 text-neutral-700" />
            <span>Skills & Competencies</span>
          </div>
          <button
            onClick={() => handleOpenAdd("skill")}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile?.skills && profile.skills.length > 0 ? (
            profile.skills.map((skill: any) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800 border border-neutral-200"
              >
                <span>{skill.name}</span>
                <button
                  onClick={() => handleDelete("skill", skill.id)}
                  className="text-neutral-400 hover:text-red-600 ml-1 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-neutral-400 italic py-2">Belum ada skill yang ditambahkan.</p>
          )}
        </div>
      </div>

      {/* MODALS */}
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