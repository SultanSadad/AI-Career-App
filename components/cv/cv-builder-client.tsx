"use client";

import { useState, useRef, useEffect } from "react";
import { AtsResumePreview, ResumeConfig } from "./ats-resume-preview";
import { TemplateId } from "./resume-templates";
import {
  Eye,
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
  const [jobDescription, setJobDescription] = useState("");
  const [isTailoring, setIsTailoring] = useState(false);
  const [isAiApplied, setIsAiApplied] = useState(false);

  // Dynamic Scale Preview agar lembaran A4 selalu pas dengan lebar kolom kanan browser
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48;
        const a4WidthPx = 794; // 210mm pada 96 DPI
        const calculatedScale = Math.min(1, Math.max(0.4, containerWidth / a4WidthPx));
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
      "achievements",
      "summary",
      "experience",
      "projects",
      "education",
      "skills",
      "certifications",
    ],
    enabledSections: {
      achievements: true,
      summary: true,
      experience: true,
      projects: true,
      education: true,
      skills: true,
      certifications: true,
    },
    showLocation: true,
    customEmail: user?.email || "",
    selectedExperiences: (profile?.experiences || []).map((e: any) => e.id),
    selectedProjects: (profile?.projects || []).map((p: any) => p.id),
    selectedEducations: (profile?.educations || []).map((e: any) => e.id),
    selectedSkills: (profile?.skills || []).map((s: any) => s.id),
    selectedCertifications: (profile?.certifications || []).map((c: any) => c.id),
    selectedAchievements: (profile?.achievements || []).map((a: any) => a.id),
  });

  const templates: Array<{ id: TemplateId; label: string; desc: string; icon: any }> = [
    { id: "classic", label: "Classic ATS", desc: "Single-column A4", icon: FileText },
    { id: "modern", label: "Modern Minimal", desc: "Clean sans timeline", icon: LayoutTemplate },
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
        return { label: "Summary", icon: Eye };
      case "experience":
        return { label: "Experience", icon: Briefcase };
      case "projects":
        return { label: industryConfig.projectSectionTitle, icon: Layers };
      case "education":
        return { label: "Education", icon: GraduationCap };
      case "skills":
        return { label: "Skills", icon: Wrench };
      case "certifications":
        return { label: "Certifications", icon: ShieldCheck };
      default:
        return { label: sec, icon: Layers };
    }
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-neutral-900">ATS Resume Builder & AI Tailor</h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700">
              {industryConfig.name}
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Standar dokumen A4 presisi, margin 3/4 inchi, dan pemotongan halaman otomatis.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAiApplied && (
            <button
              onClick={handleResetAi}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-100 transition cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Reset AI</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-800 transition cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* SPLIT SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CONTROLS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          {/* EDITABLE EMAIL */}
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs text-neutral-900">
              <Mail className="w-4 h-4 text-neutral-700" />
              <span>Resume Contact Information</span>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                Display Email on CV (Editable)
              </label>
              <input
                type="email"
                value={config.customEmail ?? ""}
                onChange={(e) => setConfig((prev) => ({ ...prev, customEmail: e.target.value }))}
                placeholder="nama@email.com"
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black bg-neutral-50 font-sans"
              />
            </div>
          </div>

          {/* AI TAILORING BOX */}
          <div className="bg-white p-5 rounded-3xl border-2 border-neutral-900 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-neutral-900">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Job Tailor Engine</span>
              </div>
              {isAiApplied && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  ✓ Tailored
                </span>
              )}
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              placeholder="Paste Job Description target di sini..."
              className="w-full text-xs p-3 rounded-2xl border border-neutral-200 focus:outline-none focus:border-black bg-neutral-50 resize-none font-sans"
            />

            <button
              onClick={handleRunAiTailor}
              disabled={isTailoring || !jobDescription.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FFEB43] text-black font-extrabold text-xs hover:bg-yellow-400 disabled:opacity-50 transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              {isTailoring ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengoptimasi dengan AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Tailor My Resume for this Job</span>
                </>
              )}
            </button>
          </div>

          {/* SECTION CONTROLS */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-xs font-bold text-neutral-900">Section Order & Visibility</h3>
              <p className="text-[11px] text-neutral-500">Centang untuk aktifkan, klik panah untuk atur urutan posisi.</p>
            </div>

            {/* TOGGLE LOCATION */}
            <div
              onClick={() => setConfig((prev) => ({ ...prev, showLocation: !prev.showLocation }))}
              className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 cursor-pointer transition"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                {config.showLocation ? (
                  <CheckSquare className="w-4 h-4 text-black" />
                ) : (
                  <Square className="w-4 h-4 text-neutral-400" />
                )}
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>Show Location in Header</span>
              </div>
            </div>

            {/* SECTIONS ORDER LIST */}
            <div className="space-y-2">
              {config.sectionOrder.map((sec, index) => {
                const { label, icon: Icon } = getSectionLabel(sec);
                const isEnabled = config.enabledSections[sec];

                return (
                  <div
                    key={sec}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                      isEnabled ? "bg-neutral-50 border-neutral-200" : "bg-neutral-100/50 border-neutral-200/50 opacity-50"
                    }`}
                  >
                    <button
                      onClick={() => toggleSection(sec)}
                      className="flex items-center gap-2 text-xs font-bold text-neutral-800 cursor-pointer"
                    >
                      {isEnabled ? <CheckSquare className="w-4 h-4 text-black" /> : <Square className="w-4 h-4 text-neutral-400" />}
                      <Icon className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{label}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        disabled={index === 0}
                        onClick={() => moveSection(index, "up")}
                        className="p-1 rounded text-neutral-500 hover:text-black hover:bg-neutral-200 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        disabled={index === config.sectionOrder.length - 1}
                        onClick={() => moveSection(index, "down")}
                        className="p-1 rounded text-neutral-500 hover:text-black hover:bg-neutral-200 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <hr className="border-neutral-100" />

            {/* ITEM SELECTORS */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900">Include Experiences ({config.selectedExperiences.length})</h4>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {(profile?.experiences || []).map((exp: any) => {
                  const checked = config.selectedExperiences.includes(exp.id);
                  return (
                    <div
                      key={exp.id}
                      onClick={() => toggleItemSelection("selectedExperiences", exp.id)}
                      className="flex items-center gap-2 text-xs p-2 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-neutral-100 cursor-pointer"
                    >
                      {checked ? <CheckSquare className="w-3.5 h-3.5 text-black shrink-0" /> : <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
                      <span className="truncate font-medium">{exp.position} - {exp.company}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900">
                Include {industryConfig.projectSectionTitle} ({config.selectedProjects.length})
              </h4>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {(profile?.projects || []).map((proj: any) => {
                  const checked = config.selectedProjects.includes(proj.id);
                  return (
                    <div
                      key={proj.id}
                      onClick={() => toggleItemSelection("selectedProjects", proj.id)}
                      className="flex items-center gap-2 text-xs p-2 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-neutral-100 cursor-pointer"
                    >
                      {checked ? <CheckSquare className="w-3.5 h-3.5 text-black shrink-0" /> : <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
                      <span className="truncate font-medium">{proj.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-900">Include Skills ({config.selectedSkills.length})</h4>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                {(profile?.skills || []).map((s: any) => {
                  const checked = config.selectedSkills.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleItemSelection("selectedSkills", s.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition cursor-pointer ${
                        checked ? "bg-black text-white border-black" : "bg-neutral-100 text-neutral-700 border-neutral-200"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW CONTAINER (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-2 rounded-2xl border border-neutral-200 shadow-2xs flex items-center gap-1.5 no-print">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              const isSelected = selectedTemplate === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#FFEB43]" : "text-neutral-500"}`} />
                  <span>{tpl.label}</span>
                </button>
              );
            })}
          </div>

          {/* VIEWPORT SCALED PREVIEW (FIT TO SCREEN, IDENTIK DENGAN PDF) */}
          {/* VIEWPORT PREVIEW */}
          {/* VIEWPORT SCALED PREVIEW */}
          {/* PREVIEW CONTAINER */}
          {/* VIEWPORT PREVIEW (PURE WHITE BACKGROUND) */}
          <div
            ref={containerRef}
            id="resume-preview-container"
            className="bg-white p-4 md:p-8 rounded-2xl border border-neutral-200 overflow-y-auto max-h-[85vh] flex justify-center items-start shadow-sm print:p-0 print:m-0 print:border-none print:bg-white print:max-h-none print:overflow-visible print:shadow-none"
          >
            <div
              id="resume-printable-area"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                width: "210mm",
              }}
              className="transition-transform duration-200 ease-out flex flex-col items-center bg-white print:transform-none print:w-full print:m-0 print:bg-white"
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
    </div>
  );
}