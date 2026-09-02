"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Wrench, 
  Plus, 
  Trash2, 
  Pencil,
  Check,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { 
  updatePersonalInfoAction, 
  saveProjectAction, 
  saveExperienceAction,
  saveEducationAction,
  addSkillAction, 
  deleteRecordAction 
} from "@/app/actions/profile";
import { getRecommendedSkillsAction } from "@/app/actions/ai";
import { MAJOR_CONFIGS, getIndustryConfig } from "@/lib/industry-config";

function formatDate(dateStr: any) {
  if (!dateStr) return "Present";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function toInputDate(dateStr: any) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  } catch {
    return "";
  }
}

export function CareerProfileView({ profile, user }: { profile: any; user?: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"basic" | "experience" | "projects" | "skills" | "education">("basic");
  const [isSaving, setIsSaving] = React.useState(false);

  // States Major / Industry & Personal Info
  const [industry, setIndustry] = React.useState(profile?.industry || "it");
  const [name, setName] = React.useState(user?.name || profile?.user?.name || "");
  const [contactEmail, setContactEmail] = React.useState(
    profile?.contactEmail || user?.email || ""
  );
  const [headline, setHeadline] = React.useState(profile?.headline || "");
  const [phone, setPhone] = React.useState(profile?.phone || "");
  const [location, setLocation] = React.useState(profile?.location || "");
  const [linkedinUrl, setLinkedinUrl] = React.useState(profile?.linkedinUrl || "");
  const [githubUrl, setGithubUrl] = React.useState(profile?.githubUrl || "");
  const [bio, setBio] = React.useState(profile?.bio || "");

  // Ambil metadata konfigurasi major saat ini
  const currentMajorConfig = getIndustryConfig(industry);

  // Sinkronisasi data server ke state saat props masuk atau diperbarui
  React.useEffect(() => {
    if (user?.name) setName(user.name);
    if (profile) {
      setIndustry(profile.industry || "it");
      setContactEmail(profile.contactEmail || user?.email || "");
      setHeadline(profile.headline || "");
      setPhone(profile.phone || "");
      setLocation(profile.location || "");
      setLinkedinUrl(profile.linkedinUrl || "");
      setGithubUrl(profile.githubUrl || "");
      setBio(profile.bio || "");
    }
  }, [profile, user]);

  // States Project Modal
  const [isProjModalOpen, setIsProjModalOpen] = React.useState(false);
  const [editingProjId, setEditingProjId] = React.useState<string | null>(null);
  const [projTitle, setProjTitle] = React.useState("");
  const [projTech, setProjTech] = React.useState("");
  const [projDesc, setProjDesc] = React.useState("");
  const [projStartDate, setProjStartDate] = React.useState("");
  const [projEndDate, setProjEndDate] = React.useState("");
  const [isSubmittingProj, setIsSubmittingProj] = React.useState(false);

  // States Experience Modal
  const [isExpModalOpen, setIsExpModalOpen] = React.useState(false);
  const [editingExpId, setEditingExpId] = React.useState<string | null>(null);
  const [expPosition, setExpPosition] = React.useState("");
  const [expCompany, setExpCompany] = React.useState("");
  const [expLocation, setExpLocation] = React.useState("");
  const [expStartDate, setExpStartDate] = React.useState("");
  const [expEndDate, setExpEndDate] = React.useState("");
  const [expIsCurrent, setExpIsCurrent] = React.useState(false);
  const [expDesc, setExpDesc] = React.useState("");
  const [isSubmittingExp, setIsSubmittingExp] = React.useState(false);

  // States Education Modal
  const [isEduModalOpen, setIsEduModalOpen] = React.useState(false);
  const [editingEduId, setEditingEduId] = React.useState<string | null>(null);
  const [eduInstitution, setEduInstitution] = React.useState("");
  const [eduDegree, setEduDegree] = React.useState("");
  const [eduField, setEduField] = React.useState("");
  const [eduStartDate, setEduStartDate] = React.useState("");
  const [eduEndDate, setEduEndDate] = React.useState("");
  const [isSubmittingEdu, setIsSubmittingEdu] = React.useState(false);

  // States Skill & AI Recommendation
  const [newSkillName, setNewSkillName] = React.useState("");
  const [aiSuggestions, setAiSuggestions] = React.useState<string[]>([]);
  const [isLoadingAiSkills, setIsLoadingAiSkills] = React.useState(false);

  React.useEffect(() => {
    if (activeTab === "skills" && aiSuggestions.length === 0) {
      loadAiSkills();
    }
  }, [activeTab]);

  const loadAiSkills = async () => {
    setIsLoadingAiSkills(true);
    try {
      const recs = await getRecommendedSkillsAction();
      setAiSuggestions(recs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAiSkills(false);
    }
  };

  // Handler Simpan Personal Info & Pilihan Major
  const handleSavePersonalInfo = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name,
        contactEmail,
        industry, // Disimpan ke database untuk menyelaraskan seluruh fitur
        headline,
        phone,
        location,
        linkedinUrl,
        githubUrl,
        bio,
      };

      const res = await updatePersonalInfoAction(payload);
      if (res?.success) {
        router.refresh();
      } else {
        alert(res?.error || "Gagal menyimpan data.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  // ----------------- Project Handlers -----------------
  const handleOpenAddProj = () => {
    setEditingProjId(null);
    setProjTitle("");
    setProjTech("");
    setProjDesc("");
    setProjStartDate("");
    setProjEndDate("");
    setIsProjModalOpen(true);
  };

  const handleOpenEditProj = (proj: any) => {
    setEditingProjId(proj.id);
    setProjTitle(proj.title || "");
    setProjTech(proj.technologies || "");
    setProjDesc(proj.description || "");
    setProjStartDate(toInputDate(proj.startDate));
    setProjEndDate(toInputDate(proj.endDate));
    setIsProjModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;
    setIsSubmittingProj(true);

    const fd = new FormData();
    if (editingProjId) fd.append("id", editingProjId);
    fd.append("title", projTitle);
    fd.append("technologies", projTech);
    fd.append("description", projDesc);
    if (projStartDate) fd.append("startDate", projStartDate);
    if (projEndDate) fd.append("endDate", projEndDate);

    try {
      await saveProjectAction(fd);
      setIsProjModalOpen(false);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingProj(false);
    }
  };

  // ----------------- Experience Handlers -----------------
  const handleOpenAddExp = () => {
    setEditingExpId(null);
    setExpPosition("");
    setExpCompany("");
    setExpLocation("");
    setExpStartDate("");
    setExpEndDate("");
    setExpIsCurrent(false);
    setExpDesc("");
    setIsExpModalOpen(true);
  };

  const handleOpenEditExp = (exp: any) => {
    setEditingExpId(exp.id);
    setExpPosition(exp.position || "");
    setExpCompany(exp.company || "");
    setExpLocation(exp.location || "");
    setExpStartDate(toInputDate(exp.startDate));
    setExpEndDate(toInputDate(exp.endDate));
    setExpIsCurrent(Boolean(exp.isCurrent));
    setExpDesc(exp.description || "");
    setIsExpModalOpen(true);
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expPosition.trim() || !expCompany.trim() || !expStartDate) return;
    setIsSubmittingExp(true);

    const fd = new FormData();
    if (editingExpId) fd.append("id", editingExpId);
    fd.append("position", expPosition);
    fd.append("company", expCompany);
    fd.append("location", expLocation);
    fd.append("startDate", expStartDate);
    if (expEndDate) fd.append("endDate", expEndDate);
    fd.append("isCurrent", String(expIsCurrent));
    fd.append("description", expDesc);

    try {
      await saveExperienceAction(fd);
      setIsExpModalOpen(false);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingExp(false);
    }
  };

  // ----------------- Education Handlers -----------------
  const handleOpenAddEdu = () => {
    setEditingEduId(null);
    setEduInstitution("");
    setEduDegree("");
    setEduField("");
    setEduStartDate("");
    setEduEndDate("");
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (edu: any) => {
    setEditingEduId(edu.id);
    setEduInstitution(edu.institution || "");
    setEduDegree(edu.degree || "");
    setEduField(edu.fieldOfStudy || "");
    setEduStartDate(toInputDate(edu.startDate));
    setEduEndDate(toInputDate(edu.endDate));
    setIsEduModalOpen(true);
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduInstitution.trim() || !eduDegree.trim() || !eduStartDate) return;
    setIsSubmittingEdu(true);

    const fd = new FormData();
    if (editingEduId) fd.append("id", editingEduId);
    fd.append("institution", eduInstitution);
    fd.append("degree", eduDegree);
    fd.append("fieldOfStudy", eduField);
    fd.append("startDate", eduStartDate);
    if (eduEndDate) fd.append("endDate", eduEndDate);

    try {
      await saveEducationAction(fd);
      setIsEduModalOpen(false);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingEdu(false);
    }
  };

  // ----------------- Generic Delete -----------------
  const handleDeleteItem = async (type: "exp" | "proj" | "edu" | "skill", id: string) => {
    try {
      await deleteRecordAction(type, id);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  // ----------------- Skills Handlers -----------------
  const handleAddSkillDirect = async (skillText: string) => {
    if (!skillText.trim()) return;
    const fd = new FormData();
    fd.append("name", skillText.trim());
    fd.append("level", "INTERMEDIATE");

    try {
      await addSkillAction(fd);
      setAiSuggestions((prev) => prev.filter((s) => s.toLowerCase() !== skillText.toLowerCase()));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const tabs = [
    { id: "basic", label: "General Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: currentMajorConfig.portfolioSectionTitle || "Key Projects", icon: Layers },
    { id: "skills", label: "Skills Inventory", icon: Wrench },
    { id: "education", label: "Education", icon: GraduationCap },
  ];

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6 text-left font-['Canva_Sans',-apple-system,sans-serif]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
              Profile Assets
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E8E8ED] text-[#1D1D1F]">
              {currentMajorConfig.name}
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#86868B] mt-1">
            Manage verified career records, skill repository, and ATS calibrations.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSavePersonalInfo} isLoading={isSaving}>
          <Check className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#E8E8ED] rounded-full w-fit overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-[#1D1D1F] font-semibold shadow-xs"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: General Info */}
      {activeTab === "basic" && (
        <Card className="p-6 md:p-8 space-y-6">
          <CardHeader className="p-0 border-0">
            <CardTitle>Core Identity & Contact Information</CardTitle>
            <p className="text-xs text-[#86868B]">
              This data serves as the verified contact header across ATS resumes and AI evaluators.
            </p>
          </CardHeader>

          {/* MAJOR / DISCIPLINE SELECTION (PRIORITAS PERTAMA) */}
          <div className="p-4 rounded-2xl bg-[#0071E3]/5 border border-[#0071E3]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0071E3]">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Major / Professional Discipline *</span>
            </div>
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              Pilih bidang studi Anda. Seluruh istilah proyek/kasus ({currentMajorConfig.projectSectionTitle}), kompetensi keahlian, dan analisis AI akan disesuaikan dengan jurusan ini.
            </p>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2.5 text-xs font-semibold rounded-xl bg-white text-[#1D1D1F] border border-black/[0.1] focus:border-[#0071E3] outline-none transition cursor-pointer shadow-xs"
            >
              {Object.values(MAJOR_CONFIGS).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            
            {/* Input Resume Contact Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">
                Resume Contact Email
              </label>
              <input
                type="email"
                placeholder="e.g. yourname.work@gmail.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
              <p className="text-[10px] text-[#86868B]">
                Email kontak yang dicetak pada CV. (Akun Login: {user?.email || profile?.user?.email})
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Professional Title / Headline</label>
              <input
                type="text"
                placeholder={currentMajorConfig.headlinePlaceholder}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">LinkedIn Profile URL</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Repository / Portfolio / Case Study Link</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1D1D1F]">
              Professional Bio & Executive Summary
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tuliskan ringkasan karir profesional yang selaras dengan major Anda..."
              className="w-full px-4 py-3 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] placeholder:text-[#86868B] border border-transparent focus:border-[#0071E3] focus:bg-white focus:outline-none transition resize-none"
            />
          </div>
        </Card>
      )}

      {/* TAB 2: Experience */}
      {activeTab === "experience" && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <p className="text-xs text-[#86868B] mt-0.5">
                Employment history and quantifiable accomplishments.
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={handleOpenAddExp}>
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experience</span>
            </Button>
          </div>

          <div className="space-y-3">
            {profile?.experiences?.length > 0 ? (
              profile.experiences.map((exp: any) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl bg-[#F5F5F7] flex items-start justify-between gap-4 transition hover:bg-[#EBEBEF]"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-xs text-[#1D1D1F]">
                      {exp.position} • <span className="text-[#86868B] font-normal">{exp.company}</span>
                    </div>
                    <p className="text-[11px] text-[#86868B]">
                      {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)} {exp.location && `• ${exp.location}`}
                    </p>
                    <p className="text-xs text-[#333336] pt-1 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditExp(exp)}
                      className="text-[#86868B] hover:text-[#1D1D1F] p-1.5 rounded-lg hover:bg-neutral-200 transition cursor-pointer"
                      title="Edit Experience"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem("exp", exp.id)}
                      className="text-[#86868B] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer shrink-0"
                      title="Delete Experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-[#86868B] bg-[#F5F5F7] rounded-2xl">
                No work experiences recorded yet. Click &quot;Add Experience&quot; to create one.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* TAB 3: Key Projects (Major Adaptive) */}
      {activeTab === "projects" && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{currentMajorConfig.projectSectionTitle}</CardTitle>
              <p className="text-xs text-[#86868B] mt-0.5">
                Key deliverables, cases, and systems calibrated for {currentMajorConfig.name}.
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={handleOpenAddProj}>
              <Plus className="w-3.5 h-3.5" />
              <span>Add {currentMajorConfig.portfolioSectionTitle}</span>
            </Button>
          </div>

          <div className="space-y-3">
            {profile?.projects?.length > 0 ? (
              profile.projects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-[#F5F5F7] flex items-start justify-between gap-4 transition hover:bg-[#EBEBEF]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#1D1D1F]">
                        {proj.title}
                      </span>
                      {(proj.startDate || proj.endDate) && (
                        <span className="text-[10px] text-[#86868B]">
                          ({formatDate(proj.startDate)} — {formatDate(proj.endDate)})
                        </span>
                      )}
                    </div>
                    {proj.technologies && (
                      <p className="text-[11px] text-[#0071E3] font-medium">
                        {currentMajorConfig.technologiesLabel}: {proj.technologies}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-xs text-[#333336] pt-1 leading-relaxed whitespace-pre-line">
                        {proj.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditProj(proj)}
                      className="text-[#86868B] hover:text-[#1D1D1F] p-1.5 rounded-lg hover:bg-neutral-200 transition cursor-pointer"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem("proj", proj.id)}
                      className="text-[#86868B] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer shrink-0"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-[#86868B] bg-[#F5F5F7] rounded-2xl">
                No entries recorded yet. Click &quot;Add {currentMajorConfig.portfolioSectionTitle}&quot; to create one.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* TAB 4: Skills (Major Adaptive) */}
      {activeTab === "skills" && (
        <Card className="p-6 md:p-8 space-y-6">
          <CardHeader className="p-0 border-0">
            <CardTitle>{currentMajorConfig.skillsSectionTitle}</CardTitle>
            <p className="text-xs text-[#86868B]">
              Indexed competencies evaluated against benchmarks in {currentMajorConfig.name}.
            </p>
          </CardHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSkillDirect(newSkillName);
              setNewSkillName("");
            }}
            className="flex gap-2 max-w-md"
          >
            <input
              type="text"
              placeholder={`e.g. ${currentMajorConfig.defaultRecommendedSkills.slice(0, 3).join(", ")}`}
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="flex-1 px-4 py-2 text-xs rounded-full bg-[#F5F5F7] text-[#1D1D1F] placeholder:text-[#86868B] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
            />
            <Button type="submit" variant="primary" size="sm">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </Button>
          </form>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
              Active Skill Portfolio ({profile?.skills?.length || 0})
            </label>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((s: any) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#E8E8ED] text-[#1D1D1F]"
                >
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem("skill", s.id)}
                    className="hover:text-rose-600 transition cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0071E3]" />
                <span className="text-xs font-bold text-[#1D1D1F]">
                  AI Recommended for You ({currentMajorConfig.name})
                </span>
              </div>
              <button
                type="button"
                onClick={loadAiSkills}
                disabled={isLoadingAiSkills}
                className="text-[11px] font-medium text-[#0071E3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingAiSkills ? "animate-spin" : ""}`} />
                <span>Refresh Suggestions</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {isLoadingAiSkills ? (
                <span className="text-xs text-[#86868B]">Generating smart recommendations with Gemini...</span>
              ) : aiSuggestions.length > 0 ? (
                aiSuggestions.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddSkillDirect(s)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition cursor-pointer border border-[#0071E3]/20"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{s}</span>
                  </button>
                ))
              ) : (
                <span className="text-xs text-[#86868B]">All top recommended skills are already in your portfolio!</span>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* TAB 5: Education */}
      {activeTab === "education" && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Education Records</CardTitle>
              <p className="text-xs text-[#86868B] mt-0.5">Formal academic degrees and institutions.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={handleOpenAddEdu}>
              <Plus className="w-3.5 h-3.5" />
              <span>Add Education</span>
            </Button>
          </div>

          <div className="space-y-3">
            {profile?.educations?.length > 0 ? (
              profile.educations.map((edu: any) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-2xl bg-[#F5F5F7] flex items-start justify-between gap-4 transition hover:bg-[#EBEBEF]"
                >
                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-[#1D1D1F]">
                      {edu.institution}
                    </div>
                    <p className="text-[#86868B]">
                      {edu.degree} in {edu.fieldOfStudy} • {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditEdu(edu)}
                      className="text-[#86868B] hover:text-[#1D1D1F] p-1.5 rounded-lg hover:bg-neutral-200 transition cursor-pointer"
                      title="Edit Education"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem("edu", edu.id)}
                      className="text-[#86868B] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Delete Education"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-[#86868B] bg-[#F5F5F7] rounded-2xl">
                No education records added yet. Click &quot;Add Education&quot; to create one.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* ----------------- MODAL 1: Experience (CRUD) ----------------- */}
      <Modal
        isOpen={isExpModalOpen}
        onClose={() => setIsExpModalOpen(false)}
        title={editingExpId ? "Edit Work Experience" : "Add Work Experience"}
        description="Detail your position, organization, duration, and core accomplishments."
      >
        <form onSubmit={handleSaveExperience} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1D1D1F]">Role / Position Title</label>
            <input
              type="text"
              placeholder={currentMajorConfig.positionPlaceholder}
              value={expPosition}
              onChange={(e) => setExpPosition(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Company / Organization</label>
              <input
                type="text"
                placeholder="e.g. Enterprise Org / Advisory Firm"
                value={expCompany}
                onChange={(e) => setExpCompany(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Location</label>
              <input
                type="text"
                placeholder="e.g. Batam, Indonesia"
                value={expLocation}
                onChange={(e) => setExpLocation(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Start Date</label>
              <input
                type="date"
                value={expStartDate}
                onChange={(e) => setExpStartDate(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">End Date</label>
              <input
                type="date"
                value={expEndDate}
                onChange={(e) => setExpEndDate(e.target.value)}
                disabled={expIsCurrent}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition disabled:opacity-50"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-[#1D1D1F] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={expIsCurrent}
              onChange={(e) => setExpIsCurrent(e.target.checked)}
              className="rounded text-[#0071E3]"
            />
            <span>I currently work in this role</span>
          </label>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1D1D1F]">Responsibilities & Quantifiable Achievements</label>
            <textarea
              rows={4}
              placeholder={currentMajorConfig.experienceDescPlaceholder}
              value={expDesc}
              onChange={(e) => setExpDesc(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-black/[0.04]">
            <Button type="button" variant="ghost" size="md" onClick={() => setIsExpModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSubmittingExp}>
              {editingExpId ? "Update Experience" : "Save Experience"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ----------------- MODAL 2: Education (CRUD) ----------------- */}
      <Modal
        isOpen={isEduModalOpen}
        onClose={() => setIsEduModalOpen(false)}
        title={editingEduId ? "Edit Education" : "Add Education"}
        description="Record formal academic degrees, institutions, and dates."
      >
        <form onSubmit={handleSaveEducation} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1D1D1F]">Institution / University</label>
            <input
              type="text"
              placeholder="e.g. Politeknik Negeri Batam"
              value={eduInstitution}
              onChange={(e) => setEduInstitution(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Degree Level</label>
              <input
                type="text"
                placeholder="e.g. Associate Degree (D3) / Bachelor"
                value={eduDegree}
                onChange={(e) => setEduDegree(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Field of Study / Major</label>
              <input
                type="text"
                placeholder="e.g. Informatics Engineering"
                value={eduField}
                onChange={(e) => setEduField(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Start Date</label>
              <input
                type="date"
                value={eduStartDate}
                onChange={(e) => setEduStartDate(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">End Date</label>
              <input
                type="date"
                value={eduEndDate}
                onChange={(e) => setEduEndDate(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-black/[0.04]">
            <Button type="button" variant="ghost" size="md" onClick={() => setIsEduModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSubmittingEdu}>
              {editingEduId ? "Update Education" : "Save Education"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ----------------- MODAL 3: Project (Major Adaptive) ----------------- */}
      <Modal
        isOpen={isProjModalOpen}
        onClose={() => setIsProjModalOpen(false)}
        title={editingProjId ? `Edit ${currentMajorConfig.portfolioSectionTitle}` : `Add ${currentMajorConfig.portfolioSectionTitle}`}
        description={`Record key achievements and deliverables for ${currentMajorConfig.name}.`}
      >
        <form onSubmit={handleSaveProject} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1D1D1F]">{currentMajorConfig.portfolioSectionTitle} Title</label>
            <input
              type="text"
              placeholder={currentMajorConfig.projectItemTitlePlaceholder}
              value={projTitle}
              onChange={(e) => setProjTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1D1D1F]">{currentMajorConfig.technologiesLabel}</label>
            <input
              type="text"
              placeholder={currentMajorConfig.technologiesPlaceholder}
              value={projTech}
              onChange={(e) => setProjTech(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">Start Date</label>
              <input
                type="date"
                value={projStartDate}
                onChange={(e) => setProjStartDate(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1D1D1F]">End Date (Optional)</label>
              <input
                type="date"
                value={projEndDate}
                onChange={(e) => setProjEndDate(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1D1D1F]">Scope & Description</label>
            <textarea
              rows={3}
              placeholder={currentMajorConfig.projectDescPlaceholder}
              value={projDesc}
              onChange={(e) => setProjDesc(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-black/[0.04]">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setIsProjModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSubmittingProj}>
              {editingProjId ? "Update Entry" : "Save Entry"}
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}