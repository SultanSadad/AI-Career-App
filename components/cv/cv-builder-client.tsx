"use client";

import { useState, useRef, useEffect } from "react";
import { AtsResumePreview, ResumeConfig } from "./ats-resume-preview";
import { TemplateId } from "./resume-templates";
import {
  Download,
  ArrowUp,
  ArrowDown,
  CheckSquare,
  Square,
  Layers,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  ShieldCheck,
  Sparkles,
  Loader2,
  Undo2,
  FileText,
  LayoutTemplate,
  Columns2,
  MapPin,
  Mail,
  Sliders,
  Sparkle,
} from "lucide-react";
import { tailorResumeWithAiAction } from "@/app/actions/tailor-resume";
import { getIndustryConfig } from "@/lib/industry-config";

interface CvBuilderClientProps {
  user: any;
  profile: any;
}

export function CvBuilderClient({ user, profile }: CvBuilderClientProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.85);

  const industryConfig = getIndustryConfig(profile?.industry);

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("classic");
  const [activeControlTab, setActiveControlTab] = useState<"customize" | "sections">("customize");
  const [jobDescription, setJobDescription] = useState("");
  const [isTailoring, setIsTailoring] = useState(false);
  const [isAiApplied, setIsAiApplied] = useState(false);

  // Dynamic Scale Preview agar lembar A4 selalu pas dengan viewport
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48;
        const a4WidthPx = 794; // 210mm pada 96 DPI
        const calculatedScale = Math.min(1, Math.max(0.45, containerWidth / a4WidthPx));
        setScale(calculatedScale);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [tailoredData, setTailoredData] = useState<{
    headline?: string;
    bio?: string;
    experiences?: Record<string, string>;
  }>({});

  const [config, setConfig] = useState<ResumeConfig>({
    sectionOrder: [
      "summary",
      "experience",
      "projects",
      "education",
      "skills",
      "certifications",
      "achievements",
    ],
    enabledSections: {
      summary: true,
      experience: true,
      projects: true,
      education: true,
      skills: true,
      certifications: true,
      achievements: true,
    },
    showLocation: true,
    customEmail: profile?.contactEmail || user?.email || "",
    selectedExperiences: (profile?.experiences || []).map((e: any) => e.id),
    selectedProjects: (profile?.projects || []).map((p: any) => p.id),
    selectedEducations: (profile?.educations || []).map((e: any) => e.id),
    selectedSkills: (profile?.skills || []).map((s: any) => s.id),
    selectedCertifications: (profile?.certifications || []).map((c: any) => c.id),
    selectedAchievements: (profile?.achievements || []).map((a: any) => a.id),
  });

  const templates: Array<{ id: TemplateId; label: string; desc: string; icon: any }> = [
    { id: "classic", label: "Classic ATS", desc: "Single-column A4", icon: FileText },
    { id: "modern", label: "Modern Minimal", desc: "Clean timeline", icon: LayoutTemplate },
    { id: "executive", label: "Executive Two-Col", desc: "Structured sidebar", icon: Columns2 },
  ];

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleRunAiTailor = async () => {
    if (!jobDescription.trim()) {
      alert("Masukkan deskripsi lowongan kerja target terlebih dahulu.");
      return;
    }

    setIsTailoring(true);
    const res = await tailorResumeWithAiAction(jobDescription, profile);
    setIsTailoring(false);

    if (res.success && res.data) {
      const expMap: Record<string, string> = {};
      (res.data.optimizedExperiences || []).forEach((exp: any) => {
        expMap[exp.id] = exp.tailoredDescription;
      });

      setTailoredData({
        headline: res.data.tailoredHeadline,
        bio: res.data.tailoredSummary,
        experiences: expMap,
      });

      if (res.data.highlightedSkillIds && res.data.highlightedSkillIds.length > 0) {
        setConfig((prev) => ({
          ...prev,
          selectedSkills: res.data.highlightedSkillIds,
        }));
      }

      setIsAiApplied(true);
    } else {
      alert(res.error || "Gagal mengoptimasi resume.");
    }
  };

  const handleResetAi = () => {
    setTailoredData({});
    setIsAiApplied(false);
    setConfig((prev) => ({
      ...prev,
      selectedSkills: (profile?.skills || []).map((s: any) => s.id),
    }));
  };

  const effectiveProfile = {
    ...profile,
    headline: tailoredData.headline || profile?.headline,
    bio: tailoredData.bio || profile?.bio,
    experiences: (profile?.experiences || []).map((exp: any) => ({
      ...exp,
      description: tailoredData.experiences?.[exp.id] || exp.description,
    })),
  };

  const toggleSection = (sectionKey: string) => {
    setConfig((prev) => ({
      ...prev,
      enabledSections: {
        ...prev.enabledSections,
        [sectionKey]: !prev.enabledSections[sectionKey],
      },
    }));
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...config.sectionOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setConfig((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  const toggleItemSelection = (
    key:
      | "selectedExperiences"
      | "selectedProjects"
      | "selectedEducations"
      | "selectedSkills"
      | "selectedCertifications"
      | "selectedAchievements",
    id: string
  ) => {
    setConfig((prev) => {
      const currentList = prev[key];
      const isSelected = currentList.includes(id);
      return {
        ...prev,
        [key]: isSelected ? currentList.filter((item) => item !== id) : [...currentList, id],
      };
    });
  };

  const getSectionLabel = (sec: string) => {
    switch (sec) {
      case "achievements":
        return { label: "Achievements", icon: Award };
      case "summary":
        return { label: "Executive Summary", icon: FileText };
      case "experience":
        return { label: "Work Experience", icon: Briefcase };
      case "projects":
        return { label: industryConfig.projectSectionTitle, icon: Layers };
      case "education":
        return { label: "Education", icon: GraduationCap };
      case "skills":
        return { label: "Key Competencies", icon: Wrench };
      case "certifications":
        return { label: "Certifications", icon: ShieldCheck };
      default:
        return { label: sec, icon: Layers };
    }
  };

  return (
    <>
      {/* CSS KHUSUS PRINT A4 */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          #resume-preview-container {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            max-height: none !important;
            overflow: visible !important;
            background: transparent !important;
          }
          #resume-printable-area {
            transform: none !important;
            width: 100% !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6 text-left font-['Canva_Sans',-apple-system,sans-serif]">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] no-print">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
                Resume Studio
              </h1>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E8E8ED] text-[#1D1D1F]">
                {industryConfig.name}
              </span>
            </div>
            <p className="text-xs text-[#86868B] mt-1">
              Standar format A4 presisi, kompatibel dengan parser ATS industri.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAiApplied && (
              <button
                onClick={handleResetAi}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-black/[0.1] text-xs font-semibold text-[#1D1D1F] hover:bg-neutral-100 transition cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5 text-[#86868B]" />
                <span>Reset AI</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: TOOLS & CONTROLS */}
          <div className="lg:col-span-5 space-y-4 no-print">
            {/* SUB-TAB NAVIGATOR */}
            <div className="flex items-center gap-1 p-1 bg-[#E8E8ED] rounded-full w-fit">
              <button
                type="button"
                onClick={() => setActiveControlTab("customize")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeControlTab === "customize"
                    ? "bg-white text-[#1D1D1F] font-semibold shadow-xs"
                    : "text-[#86868B] hover:text-[#1D1D1F]"
                }`}
              >
                <Sparkle className="w-3.5 h-3.5" />
                <span>Tailor & Style</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveControlTab("sections")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeControlTab === "sections"
                    ? "bg-white text-[#1D1D1F] font-semibold shadow-xs"
                    : "text-[#86868B] hover:text-[#1D1D1F]"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Sections & Visibility</span>
              </button>
            </div>

            {/* TAB 1: AI TAILOR & STYLE */}
            {activeControlTab === "customize" && (
              <div className="space-y-4">
                {/* AI TAILOR PANEL */}
                <div className="bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0071E3]" />
                      <span className="text-xs font-bold text-[#1D1D1F]">
                        AI Job Tailor Engine
                      </span>
                    </div>
                    {isAiApplied && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                        ✓ Optimized
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#86868B] leading-relaxed">
                    Tempel kualifikasi lowongan kerja untuk menyelaraskan kata kunci, ringkasan, dan pencapaian pengalaman kerja.
                  </p>

                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    placeholder="Tempel Job Description target di sini..."
                    className="w-full text-xs p-3 rounded-xl bg-white border border-black/[0.08] focus:border-[#0071E3] focus:outline-none resize-none transition"
                  />

                  <button
                    onClick={handleRunAiTailor}
                    disabled={isTailoring || !jobDescription.trim()}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs disabled:opacity-40 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    {isTailoring ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Menyesuaikan dengan AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Tailor Resume for this Role</span>
                      </>
                    )}
                  </button>
                </div>

                {/* CONTACT HEADER ADJUSTMENT */}
                <div className="bg-white p-5 rounded-2xl border border-black/[0.06] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1F]">
                    <Mail className="w-3.5 h-3.5 text-[#86868B]" />
                    <span>Contact Info Override</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#86868B] mb-1">
                      Display Email on CV
                    </label>
                    <input
                      type="email"
                      value={config.customEmail ?? ""}
                      onChange={(e) => setConfig((prev) => ({ ...prev, customEmail: e.target.value }))}
                      placeholder="nama@email.com"
                      className="w-full text-xs p-2.5 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  <div
                    onClick={() => setConfig((prev) => ({ ...prev, showLocation: !prev.showLocation }))}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F5F7] hover:bg-[#EBEBEF] cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1D1D1F]">
                      <MapPin className="w-3.5 h-3.5 text-[#86868B]" />
                      <span>Show Location in Header</span>
                    </div>
                    {config.showLocation ? (
                      <CheckSquare className="w-4 h-4 text-[#0071E3]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#86868B]" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SECTIONS REORDER & FILTER */}
            {activeControlTab === "sections" && (
              <div className="bg-white p-5 rounded-2xl border border-black/[0.06] space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-[#1D1D1F]">Section Arrangement</h3>
                  <p className="text-[11px] text-[#86868B] mt-0.5">
                    Aktifkan dan atur prioritas penataan seksi pada resume.
                  </p>
                </div>

                {/* SECTION LIST */}
                <div className="space-y-1.5">
                  {config.sectionOrder.map((sec, index) => {
                    const { label, icon: Icon } = getSectionLabel(sec);
                    const isEnabled = config.enabledSections[sec];

                    return (
                      <div
                        key={sec}
                        className={`flex items-center justify-between p-2.5 rounded-xl transition ${
                          isEnabled
                            ? "bg-[#F5F5F7] border border-black/[0.04]"
                            : "bg-neutral-50/60 opacity-40 border border-transparent"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleSection(sec)}
                          className="flex items-center gap-2 text-xs font-semibold text-[#1D1D1F] cursor-pointer"
                        >
                          {isEnabled ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#0071E3]" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-[#86868B]" />
                          )}
                          <Icon className="w-3.5 h-3.5 text-[#86868B]" />
                          <span>{label}</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveSection(index, "up")}
                            className="p-1 rounded-md text-[#86868B] hover:text-[#1D1D1F] hover:bg-neutral-200 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === config.sectionOrder.length - 1}
                            onClick={() => moveSection(index, "down")}
                            className="p-1 rounded-md text-[#86868B] hover:text-[#1D1D1F] hover:bg-neutral-200 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <hr className="border-black/[0.06]" />

                {/* ITEM SELECTION: EXPERIENCE */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                    Included Experiences ({config.selectedExperiences.length})
                  </span>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {(profile?.experiences || []).map((exp: any) => {
                      const checked = config.selectedExperiences.includes(exp.id);
                      return (
                        <div
                          key={exp.id}
                          onClick={() => toggleItemSelection("selectedExperiences", exp.id)}
                          className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#F5F5F7] hover:bg-[#EBEBEF] cursor-pointer"
                        >
                          {checked ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-[#86868B] shrink-0" />
                          )}
                          <span className="truncate text-[11px] font-medium text-[#1D1D1F]">
                            {exp.position} • {exp.company}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ITEM SELECTION: SKILLS */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                    Included Skills ({config.selectedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                    {(profile?.skills || []).map((s: any) => {
                      const checked = config.selectedSkills.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleItemSelection("selectedSkills", s.id)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition cursor-pointer ${
                            checked
                              ? "bg-[#1D1D1F] text-white border-[#1D1D1F] font-semibold"
                              : "bg-[#F5F5F7] text-[#86868B] border-transparent"
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: REALTIME A4 STUDIO */}
          <div className="lg:col-span-7 space-y-4">
            {/* TEMPLATE PICKER PILL */}
            <div className="bg-[#E8E8ED] p-1 rounded-full flex items-center gap-1 w-fit no-print">
              {templates.map((tpl) => {
                const Icon = tpl.icon;
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-white text-[#1D1D1F] shadow-xs"
                        : "text-[#86868B] hover:text-[#1D1D1F]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tpl.label}</span>
                  </button>
                );
              })}
            </div>

            {/* PREVIEW CONTAINER */}
            <div
              ref={containerRef}
              id="resume-preview-container"
              className="bg-[#F5F5F7] p-4 md:p-8 rounded-2xl border border-black/[0.04] overflow-y-auto max-h-[82vh] flex justify-center items-start shadow-inner"
            >
              <div
                id="resume-printable-area"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  width: "210mm",
                }}
                className="transition-transform duration-150 ease-out flex flex-col items-center bg-white shadow-xl rounded-sm"
              >
                <AtsResumePreview
                  ref={resumeRef}
                  user={user}
                  profile={effectiveProfile}
                  config={config}
                  templateId={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}