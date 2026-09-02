"use client";

import * as React from "react";
import { 
  Download, 
  Sparkles, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Phone, 
  LayoutTemplate, 
  CheckCircle2, 
  Image as ImageIcon,
  Sliders,
  Mail,
  MapPin,
  Linkedin,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TemplateType = 
  | "classic-ats" 
  | "executive-sidebar" 
  | "minimal-accent" 
  | "tech-two-col" 
  | "corporate-formal" 
  | "compact-one-page";

function formatResumeDate(dateVal: any) {
  if (!dateVal) return "Present";
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return String(dateVal);
  }
}

export function CVBuilderClientView({ user, profile }: { user: any; profile: any }) {
  const [jobDescription, setJobDescription] = React.useState("");
  const [targetRole, setTargetRole] = React.useState("");
  const [isTailoring, setIsTailoring] = React.useState(false);
  const [activeTemplate, setActiveTemplate] = React.useState<TemplateType>("classic-ats");
  const [sidebarTab, setSidebarTab] = React.useState<"ai" | "templates" | "contact" | "sections">("templates");
  const [showPhoto, setShowPhoto] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState(user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80");

  const [sections, setSections] = React.useState({
    summary: true,
    achievements: true,
    education: true,
    experience: true,
    projects: true,
    skills: true,
  });

  const [cvData, setCvData] = React.useState({
    name: user?.name || "Sultan Sadad",
    headline: profile?.headline || "Full-Stack Web Developer & Workflow Automation Specialist",
    email: user?.email || "sadadsultan@gmail.com",
    phone: profile?.phone || "+62 812-3456-7890",
    location: profile?.location || "Batam, Indonesia",
    linkedin: profile?.linkedinUrl || "linkedin.com/in/sultansadad",
    summary: profile?.bio || "Experienced Full-Stack Developer specializing in Next.js, TypeScript, PostgreSQL, and workflow automation. Proven track record in engineering resilient enterprise systems, automated ticketing platforms, and AI-integrated applications.",
    achievements: profile?.achievements || [],
    education: profile?.educations || [],
    experiences: profile?.experiences || [],
    projects: profile?.projects || [],
    skills: profile?.skills?.map((s: any) => (typeof s === "string" ? s : s.name)) || [],
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTailorResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsTailoring(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCvData((prev) => ({
        ...prev,
        headline: targetRole || prev.headline,
        summary: `Targeted for ${targetRole || "target position"}: ` + prev.summary,
      }));
    } finally {
      setIsTailoring(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  // Helper render bullet point
  const renderBullets = (rawText: string) => {
    const bullets = (rawText || "")
      .split(/\n|•|- /)
      .map((item: string) => item.trim())
      .filter(Boolean);

    if (bullets.length === 0) return null;

    return (
      <ul className="list-disc ml-4 space-y-0.5 leading-normal">
        {bullets.map((b, i) => (
          <li key={i} className="text-justify [text-align-last:left]">{b}</li>
        ))}
      </ul>
    );
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6 text-left print:p-0 print:m-0 print:max-w-full font-['Canva_Sans',-apple-system,sans-serif]">
      {/* 1. Header Toolbar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
            ATS Resume Studio
          </h1>
          <p className="text-xs md:text-sm text-[#86868B] mt-1">
            Standard A4 studio with distinct structural templates calibrated for industry ATS parsers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="primary" size="md" onClick={handleExportPDF}>
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block">
        {/* 2. Left Column Controls */}
        <div className="no-print lg:col-span-5 space-y-5">
          <div className="flex items-center gap-1 p-1 bg-[#E8E8ED] rounded-full w-fit">
            {[
              { id: "templates", label: "Templates", icon: LayoutTemplate },
              { id: "ai", label: "AI Tailor", icon: Sparkles },
              { id: "contact", label: "Personal Info", icon: Phone },
              { id: "sections", label: "Sections", icon: Layers },
            ].map((tab) => {
              const isActive = sidebarTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSidebarTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-white text-[#1D1D1F] font-semibold shadow-xs"
                      : "text-[#86868B] hover:text-[#1D1D1F]"
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Template Selection */}
          {sidebarTab === "templates" && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868B]">
                  Choose Resume Layout & Style
                </h3>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#1D1D1F] select-none">
                  <input
                    type="checkbox"
                    checked={showPhoto}
                    onChange={(e) => setShowPhoto(e.target.checked)}
                    className="rounded border-neutral-300 text-[#0071E3] focus:ring-0"
                  />
                  <span>Include Photo</span>
                </label>
              </div>

              {showPhoto && (
                <div className="p-3 bg-[#F5F5F7] rounded-xl space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#86868B]">Profile Image URL</label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-black/[0.08] outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "classic-ats",
                    name: "Classic ATS",
                    badge: "100% Parser",
                    desc: "Single-column format, centered header, clean dividers. Standard for tech & finance.",
                  },
                  {
                    id: "executive-sidebar",
                    name: "Executive Split",
                    badge: "Sidebar Layout",
                    desc: "Left panel for contact, skills & education. Perfect for multi-year experienced roles.",
                  },
                  {
                    id: "minimal-accent",
                    name: "Minimalist Modern",
                    badge: "Fresh Graduate",
                    desc: "Top colored hairline banner, left-aligned typography, clean badge highlights.",
                  },
                  {
                    id: "tech-two-col",
                    name: "Tech Two-Column",
                    badge: "Senior / Lead",
                    desc: "Asymmetrical 65/35 grid placing projects and experience prominently side-by-side.",
                  },
                  {
                    id: "corporate-formal",
                    name: "Corporate Formal",
                    badge: "Enterprise",
                    desc: "Solid dark headers with high contrast. Tailored for enterprise and corporate banking.",
                  },
                  {
                    id: "compact-one-page",
                    name: "Compact One-Pager",
                    badge: "Single Page",
                    desc: "Dense vertical pacing with inline skills to ensure everything fits on exactly 1 page.",
                  },
                ].map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => setActiveTemplate(tmpl.id as TemplateType)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition select-none flex flex-col justify-between ${
                      activeTemplate === tmpl.id
                        ? "border-[#0071E3] bg-[#0071E3]/5 shadow-xs"
                        : "border-black/[0.06] bg-[#F5F5F7] hover:bg-[#EBEBEF]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#1D1D1F]">{tmpl.name}</span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/5 text-[#86868B]">
                          {tmpl.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#86868B] mt-1 leading-snug">{tmpl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 2: AI Tailor */}
          {sidebarTab === "ai" && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0071E3]" />
                  <h3 className="text-sm font-bold text-[#1D1D1F]">
                    AI Keyword & Content Tailor
                  </h3>
                </div>
                <Badge variant="ai">Gemini Flash</Badge>
              </div>

              <form onSubmit={handleTailorResume} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#86868B]">
                    Target Role Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Full-Stack Engineer"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#86868B]">
                    Target Job Description & Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Paste job description to tailor ATS keywords..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  isLoading={isTailoring}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tailor Resume for Job</span>
                </Button>
              </form>
            </Card>
          )}

          {/* TAB 3: Contact Info */}
          {sidebarTab === "contact" && (
            <Card className="p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868B]">
                Personal & Contact Details
              </h3>
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#86868B]">Full Name</label>
                  <input
                    type="text"
                    value={cvData.name}
                    onChange={(e) => setCvData({ ...cvData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:bg-white focus:border-[#0071E3] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#86868B]">Headline</label>
                  <input
                    type="text"
                    value={cvData.headline}
                    onChange={(e) => setCvData({ ...cvData, headline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:bg-white focus:border-[#0071E3] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-[#86868B]">Email</label>
                    <input
                      type="email"
                      value={cvData.email}
                      onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:bg-white focus:border-[#0071E3] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-[#86868B]">Phone</label>
                    <input
                      type="text"
                      value={cvData.phone}
                      onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:bg-white focus:border-[#0071E3] outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#86868B]">LinkedIn</label>
                  <input
                    type="text"
                    value={cvData.linkedin}
                    onChange={(e) => setCvData({ ...cvData, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:bg-white focus:border-[#0071E3] outline-none"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: Sections */}
          {sidebarTab === "sections" && (
            <Card className="p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#86868B]">
                Resume Section Sequence
              </h3>
              <div className="space-y-2">
                {[
                  { key: "summary", label: "1. Summary", icon: Sparkles },
                  { key: "achievements", label: "2. Achievements & Honors", icon: Award },
                  { key: "education", label: "3. Education", icon: GraduationCap },
                  { key: "experience", label: "4. Work Experience", icon: Briefcase },
                  { key: "projects", label: "5. Key Projects", icon: Layers },
                  { key: "skills", label: "6. Technical Skills", icon: CheckCircle2 },
                ].map(({ key, label, icon: Icon }) => (
                  <div
                    key={key}
                    onClick={() => toggleSection(key as any)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F5F7] hover:bg-[#EBEBEF] cursor-pointer transition select-none"
                  >
                    <div className="flex items-center gap-2.5 text-xs font-medium text-[#1D1D1F]">
                      <Icon className="w-3.5 h-3.5 text-[#86868B]" />
                      <span>{label}</span>
                    </div>
                    <Badge variant={sections[key as keyof typeof sections] ? "neutral" : "warning"}>
                      {sections[key as keyof typeof sections] ? "Visible" : "Hidden"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* 3. Right Column: Printable Canvas */}
        <div 
          id="resume-preview-container" 
          className="lg:col-span-7 flex justify-center bg-[#EBEBEF] rounded-[28px] p-6 md:p-8 border border-black/[0.04] print:bg-transparent print:p-0 print:border-none print:w-full print:block overflow-x-auto"
        >
          {/* ====================================================
              TEMPLATE 1: CLASSIC SINGLE COLUMN ATS
             ==================================================== */}
          {activeTemplate === "classic-ats" && (
            <div
              id="resume-printable-area"
              className="a4-page-sheet text-black space-y-3.5 select-text text-left print:p-0 print:shadow-none print:w-full text-[11.5px]"
            >
              <div className="resume-header flex items-center justify-between border-b border-black pb-2">
                <div className="space-y-0.5">
                  <h2 className="text-xl font-bold tracking-wider uppercase text-black">
                    {cvData.name}
                  </h2>
                  <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">
                    {cvData.headline}
                  </p>
                  <p className="text-[11px] text-neutral-700 pt-0.5">
                    {[cvData.email, cvData.phone, cvData.location, cvData.linkedin].filter(Boolean).join(" | ")}
                  </p>
                </div>
                {showPhoto && (
                  <img
                    src={photoUrl}
                    alt={cvData.name}
                    className="w-16 h-16 rounded-full object-cover border border-neutral-300 shrink-0 ml-4"
                  />
                )}
              </div>

              {sections.summary && cvData.summary && (
                <section className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black border-b border-neutral-300 pb-0.5">
                    SUMMARY
                  </h3>
                  <p className="text-neutral-900 leading-normal text-justify [text-align-last:left]">
                    {cvData.summary}
                  </p>
                </section>
              )}

              {sections.achievements && cvData.achievements?.length > 0 && (
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black border-b border-neutral-300 pb-0.5">
                    ACHIEVEMENTS
                  </h3>
                  {cvData.achievements.map((ach: any, idx: number) => (
                    <div key={ach.id || idx} className="resume-entry">
                      <div className="flex justify-between items-baseline font-bold text-black">
                        <span>{ach.title} {ach.issuer && `| ${ach.issuer}`}</span>
                        {ach.date && <span className="font-normal text-neutral-700">{formatResumeDate(ach.date)}</span>}
                      </div>
                      {ach.description && <p className="text-neutral-900 leading-normal text-justify pt-0.5">{ach.description}</p>}
                    </div>
                  ))}
                </section>
              )}

              {sections.education && cvData.education?.length > 0 && (
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black border-b border-neutral-300 pb-0.5">
                    EDUCATION
                  </h3>
                  {cvData.education.map((edu: any, idx: number) => (
                    <div key={edu.id || idx} className="resume-entry">
                      <div className="flex justify-between items-baseline font-bold text-black">
                        <span>{edu.institution || edu.school} {edu.degree && `| ${edu.degree}`} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                        <span className="font-normal text-neutral-700">
                          {edu.startDate ? `${formatResumeDate(edu.startDate)} - ${formatResumeDate(edu.endDate)}` : edu.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {sections.experience && cvData.experiences?.length > 0 && (
                <section className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black border-b border-neutral-300 pb-0.5">
                    EXPERIENCE
                  </h3>
                  {cvData.experiences.map((exp: any, idx: number) => (
                    <div key={exp.id || idx} className="resume-entry space-y-0.5">
                      <div className="flex justify-between items-baseline font-bold text-black">
                        <span>{exp.position || exp.role} | {exp.company}</span>
                        <span className="font-normal text-neutral-700">
                          {exp.startDate ? `${formatResumeDate(exp.startDate)} - ${formatResumeDate(exp.endDate)}` : exp.period}
                        </span>
                      </div>
                      {renderBullets(exp.description)}
                    </div>
                  ))}
                </section>
              )}

              {sections.projects && cvData.projects?.length > 0 && (
                <section className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black border-b border-neutral-300 pb-0.5">
                    PROJECTS
                  </h3>
                  {cvData.projects.map((proj: any, idx: number) => (
                    <div key={proj.id || idx} className="resume-entry space-y-0.5">
                      <div className="flex justify-between items-baseline font-bold text-black">
                        <span>{proj.title || proj.name} {proj.technologies && `| ${proj.technologies}`}</span>
                        <span className="font-normal text-neutral-700">
                          {proj.startDate ? `${formatResumeDate(proj.startDate)} - ${formatResumeDate(proj.endDate)}` : (proj.year || "")}
                        </span>
                      </div>
                      {renderBullets(proj.description || proj.desc)}
                    </div>
                  ))}
                </section>
              )}

              {sections.skills && cvData.skills?.length > 0 && (
                <section className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black border-b border-neutral-300 pb-0.5">
                    SKILLS
                  </h3>
                  <p className="text-neutral-900 leading-normal text-justify">
                    {cvData.skills.join(" | ")}
                  </p>
                </section>
              )}
            </div>
          )}

          {/* ====================================================
              TEMPLATE 2: EXECUTIVE SIDEBAR SPLIT
             ==================================================== */}
          {activeTemplate === "executive-sidebar" && (
            <div
              id="resume-printable-area"
              className="a4-page-sheet p-0 grid grid-cols-12 min-h-[297mm] text-black text-[11px] print:p-0 print:shadow-none print:w-full"
            >
              {/* Left Column Sidebar */}
              <div className="col-span-4 bg-[#F8F9FA] p-6 border-r border-neutral-200 space-y-4 print:bg-[#F8F9FA]">
                {showPhoto && (
                  <div className="flex justify-center pb-1">
                    <img
                      src={photoUrl}
                      alt={cvData.name}
                      className="w-24 h-24 rounded-2xl object-cover shadow-sm border-2 border-white"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-tight text-neutral-900 leading-tight">
                    {cvData.name}
                  </h2>
                  <p className="text-[10.5px] font-semibold text-neutral-600 mt-0.5">
                    {cvData.headline}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    CONTACT
                  </h4>
                  <div className="space-y-1 text-[10.5px] text-neutral-800 break-all">
                    <div>{cvData.email}</div>
                    <div>{cvData.phone}</div>
                    <div>{cvData.location}</div>
                    <div>{cvData.linkedin}</div>
                  </div>
                </div>

                {sections.skills && cvData.skills?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-neutral-200">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      SKILLS
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {cvData.skills.map((s: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-neutral-200/70 text-neutral-800 text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {sections.education && cvData.education?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-neutral-200">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      EDUCATION
                    </h4>
                    {cvData.education.map((edu: any, i: number) => (
                      <div key={i} className="space-y-0.5 text-[10.5px]">
                        <div className="font-bold text-neutral-900">{edu.institution || edu.school}</div>
                        <div className="text-neutral-700">{edu.degree}</div>
                        <div className="text-[9.5px] text-neutral-500">
                          {edu.startDate ? `${formatResumeDate(edu.startDate)} - ${formatResumeDate(edu.endDate)}` : edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column Main Body */}
              <div className="col-span-8 p-6 space-y-3.5">
                {sections.summary && cvData.summary && (
                  <section className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
                      PROFILE SUMMARY
                    </h3>
                    <p className="text-neutral-800 leading-normal text-justify [text-align-last:left]">
                      {cvData.summary}
                    </p>
                  </section>
                )}

                {sections.achievements && cvData.achievements?.length > 0 && (
                  <section className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
                      HONORS & ACHIEVEMENTS
                    </h3>
                    {cvData.achievements.map((ach: any, idx: number) => (
                      <div key={idx} className="resume-entry">
                        <div className="flex justify-between items-baseline font-bold text-neutral-900">
                          <span>{ach.title}</span>
                          {ach.date && <span className="font-normal text-neutral-500 text-[10px]">{formatResumeDate(ach.date)}</span>}
                        </div>
                        {ach.description && <p className="text-neutral-700 pt-0.5">{ach.description}</p>}
                      </div>
                    ))}
                  </section>
                )}

                {sections.experience && cvData.experiences?.length > 0 && (
                  <section className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
                      WORK EXPERIENCE
                    </h3>
                    {cvData.experiences.map((exp: any, idx: number) => (
                      <div key={idx} className="resume-entry space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-neutral-900">
                          <span>{exp.position || exp.role} • {exp.company}</span>
                          <span className="font-normal text-neutral-500 text-[10px]">
                            {exp.startDate ? `${formatResumeDate(exp.startDate)} - ${formatResumeDate(exp.endDate)}` : exp.period}
                          </span>
                        </div>
                        {renderBullets(exp.description)}
                      </div>
                    ))}
                  </section>
                )}

                {sections.projects && cvData.projects?.length > 0 && (
                  <section className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
                      KEY PROJECTS
                    </h3>
                    {cvData.projects.map((proj: any, idx: number) => (
                      <div key={idx} className="resume-entry space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-neutral-900">
                          <span>{proj.title || proj.name}</span>
                          <span className="font-normal text-neutral-500 text-[10px]">
                            {proj.startDate ? `${formatResumeDate(proj.startDate)} - ${formatResumeDate(proj.endDate)}` : proj.year}
                          </span>
                        </div>
                        {proj.technologies && <div className="text-[10px] font-semibold text-neutral-600">{proj.technologies}</div>}
                        {renderBullets(proj.description || proj.desc)}
                      </div>
                    ))}
                  </section>
                )}
              </div>
            </div>
          )}

          {/* ====================================================
              TEMPLATE 3: MINIMALIST MODERN ACCENT
             ==================================================== */}
          {activeTemplate === "minimal-accent" && (
            <div
              id="resume-printable-area"
              className="a4-page-sheet border-t-8 border-t-[#0F172A] text-neutral-900 space-y-3.5 select-text text-left print:p-0 print:shadow-none print:w-full text-[11.5px]"
            >
              <div className="resume-header flex items-center justify-between pb-1 border-b border-neutral-200">
                <div className="space-y-1">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
                    {cvData.name}
                  </h2>
                  <p className="text-xs font-semibold text-neutral-600">
                    {cvData.headline}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-neutral-500 pt-0.5">
                    <span>{cvData.email}</span>
                    <span>•</span>
                    <span>{cvData.phone}</span>
                    <span>•</span>
                    <span>{cvData.location}</span>
                    {cvData.linkedin && (
                      <>
                        <span>•</span>
                        <span>{cvData.linkedin}</span>
                      </>
                    )}
                  </div>
                </div>
                {showPhoto && (
                  <img
                    src={photoUrl}
                    alt={cvData.name}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-200"
                  />
                )}
              </div>

              {sections.summary && cvData.summary && (
                <section className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    SUMMARY
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-justify [text-align-last:left]">
                    {cvData.summary}
                  </p>
                </section>
              )}

              {sections.achievements && cvData.achievements?.length > 0 && (
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    ACHIEVEMENTS
                  </h3>
                  {cvData.achievements.map((ach: any, idx: number) => (
                    <div key={idx} className="resume-entry">
                      <div className="flex justify-between items-baseline font-bold text-neutral-900">
                        <span>{ach.title} {ach.issuer && `(${ach.issuer})`}</span>
                        {ach.date && <span className="font-normal text-neutral-500">{formatResumeDate(ach.date)}</span>}
                      </div>
                      {ach.description && <p className="text-neutral-700 pt-0.5">{ach.description}</p>}
                    </div>
                  ))}
                </section>
              )}

              {sections.education && cvData.education?.length > 0 && (
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    EDUCATION
                  </h3>
                  {cvData.education.map((edu: any, idx: number) => (
                    <div key={idx} className="resume-entry flex justify-between items-baseline text-neutral-900">
                      <div>
                        <span className="font-bold">{edu.institution || edu.school}</span>
                        <span className="text-neutral-600"> — {edu.degree} in {edu.fieldOfStudy}</span>
                      </div>
                      <span className="text-neutral-500 font-normal">
                        {edu.startDate ? `${formatResumeDate(edu.startDate)} - ${formatResumeDate(edu.endDate)}` : edu.year}
                      </span>
                    </div>
                  ))}
                </section>
              )}

              {sections.experience && cvData.experiences?.length > 0 && (
                <section className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    PROFESSIONAL EXPERIENCE
                  </h3>
                  {cvData.experiences.map((exp: any, idx: number) => (
                    <div key={idx} className="resume-entry space-y-0.5">
                      <div className="flex justify-between items-baseline font-bold text-neutral-900">
                        <span>{exp.position || exp.role} <span className="font-normal text-neutral-600">at</span> {exp.company}</span>
                        <span className="font-normal text-neutral-500">
                          {exp.startDate ? `${formatResumeDate(exp.startDate)} - ${formatResumeDate(exp.endDate)}` : exp.period}
                        </span>
                      </div>
                      {renderBullets(exp.description)}
                    </div>
                  ))}
                </section>
              )}

              {sections.projects && cvData.projects?.length > 0 && (
                <section className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    NOTABLE PROJECTS
                  </h3>
                  {cvData.projects.map((proj: any, idx: number) => (
                    <div key={idx} className="resume-entry space-y-0.5">
                      <div className="flex justify-between items-baseline font-bold text-neutral-900">
                        <span>{proj.title || proj.name}</span>
                        <span className="font-normal text-neutral-500">
                          {proj.startDate ? `${formatResumeDate(proj.startDate)} - ${formatResumeDate(proj.endDate)}` : proj.year}
                        </span>
                      </div>
                      {proj.technologies && <div className="text-[11px] font-medium text-neutral-600">{proj.technologies}</div>}
                      {renderBullets(proj.description || proj.desc)}
                    </div>
                  ))}
                </section>
              )}

              {sections.skills && cvData.skills?.length > 0 && (
                <section className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    SKILLS & COMPETENCIES
                  </h3>
                  <p className="text-neutral-800 leading-normal">
                    {cvData.skills.join(" • ")}
                  </p>
                </section>
              )}
            </div>
          )}

          {/* ====================================================
              TEMPLATE 4: TECH TWO-COLUMN ASYMMETRIC
             ==================================================== */}
          {activeTemplate === "tech-two-col" && (
            <div
              id="resume-printable-area"
              className="a4-page-sheet text-neutral-900 space-y-4 select-text text-left print:p-0 print:shadow-none print:w-full text-[11px]"
            >
              {/* Full Width Top Header */}
              <div className="resume-header flex items-center justify-between border-b-2 border-neutral-900 pb-2.5">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-neutral-900">
                    {cvData.name}
                  </h2>
                  <p className="text-xs font-bold text-neutral-700 tracking-wide mt-0.5">
                    {cvData.headline}
                  </p>
                </div>
                <div className="text-right text-[10.5px] text-neutral-600 space-y-0.5">
                  <div>{cvData.email} • {cvData.phone}</div>
                  <div>{cvData.location} • {cvData.linkedin}</div>
                </div>
              </div>

              {sections.summary && cvData.summary && (
                <section className="space-y-1">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider bg-neutral-100 px-2 py-0.5 text-neutral-900 w-fit">
                    EXECUTIVE PROFILE
                  </h3>
                  <p className="text-neutral-800 leading-normal text-justify [text-align-last:left]">
                    {cvData.summary}
                  </p>
                </section>
              )}

              {/* 2-Column Grid */}
              <div className="grid grid-cols-12 gap-5 items-start">
                {/* Main 8-Col: Experience & Projects */}
                <div className="col-span-8 space-y-3.5">
                  {sections.experience && cvData.experiences?.length > 0 && (
                    <section className="space-y-2">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
                        WORK EXPERIENCE
                      </h3>
                      {cvData.experiences.map((exp: any, idx: number) => (
                        <div key={idx} className="resume-entry space-y-0.5">
                          <div className="flex justify-between items-baseline font-bold text-neutral-900">
                            <span>{exp.position || exp.role}</span>
                            <span className="font-normal text-neutral-500 text-[10px]">
                              {exp.startDate ? `${formatResumeDate(exp.startDate)} - ${formatResumeDate(exp.endDate)}` : exp.period}
                            </span>
                          </div>
                          <div className="text-[10.5px] font-semibold text-neutral-600">{exp.company}</div>
                          {renderBullets(exp.description)}
                        </div>
                      ))}
                    </section>
                  )}

                  {sections.projects && cvData.projects?.length > 0 && (
                    <section className="space-y-2">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
                        KEY SYSTEMS & DELIVERABLES
                      </h3>
                      {cvData.projects.map((proj: any, idx: number) => (
                        <div key={idx} className="resume-entry space-y-0.5">
                          <div className="flex justify-between items-baseline font-bold text-neutral-900">
                            <span>{proj.title || proj.name}</span>
                            <span className="font-normal text-neutral-500 text-[10px]">
                              {proj.startDate ? `${formatResumeDate(proj.startDate)} - ${formatResumeDate(proj.endDate)}` : proj.year}
                            </span>
                          </div>
                          {proj.technologies && <div className="text-[10px] font-medium text-neutral-500">{proj.technologies}</div>}
                          {renderBullets(proj.description || proj.desc)}
                        </div>
                      ))}
                    </section>
                  )}
                </div>

                {/* Side 4-Col: Achievements, Education, Skills */}
                <div className="col-span-4 space-y-3.5 border-l border-neutral-200 pl-4">
                  {sections.skills && cvData.skills?.length > 0 && (
                    <section className="space-y-1">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
                        TECH STACK
                      </h3>
                      <p className="text-[10.5px] text-neutral-800 leading-relaxed">
                        {cvData.skills.join(" • ")}
                      </p>
                    </section>
                  )}

                  {sections.education && cvData.education?.length > 0 && (
                    <section className="space-y-1.5">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
                        EDUCATION
                      </h3>
                      {cvData.education.map((edu: any, idx: number) => (
                        <div key={idx} className="resume-entry text-[10.5px]">
                          <div className="font-bold text-neutral-900">{edu.institution || edu.school}</div>
                          <div className="text-neutral-700">{edu.degree}</div>
                          <div className="text-[9.5px] text-neutral-500">
                            {edu.startDate ? `${formatResumeDate(edu.startDate)} - ${formatResumeDate(edu.endDate)}` : edu.year}
                          </div>
                        </div>
                      ))}
                    </section>
                  )}

                  {sections.achievements && cvData.achievements?.length > 0 && (
                    <section className="space-y-1.5">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
                        ACHIEVEMENTS
                      </h3>
                      {cvData.achievements.map((ach: any, idx: number) => (
                        <div key={idx} className="resume-entry text-[10.5px]">
                          <div className="font-bold text-neutral-900">{ach.title}</div>
                          {ach.issuer && <div className="text-neutral-600 text-[10px]">{ach.issuer}</div>}
                        </div>
                      ))}
                    </section>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              TEMPLATE 5: CORPORATE FORMAL
             ==================================================== */}
          {activeTemplate === "corporate-formal" && (
            <div
              id="resume-printable-area"
              className="a4-page-sheet text-neutral-900 space-y-3 select-text text-left print:p-0 print:shadow-none print:w-full text-[11.5px]"
            >
              <div className="resume-header text-center space-y-1 pb-2 border-b-2 border-neutral-800">
                <h2 className="text-xl font-bold uppercase tracking-widest text-neutral-950">
                  {cvData.name}
                </h2>
                <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  {cvData.headline}
                </p>
                <p className="text-[11px] text-neutral-600">
                  {[cvData.email, cvData.phone, cvData.location, cvData.linkedin].filter(Boolean).join(" | ")}
                </p>
              </div>

              {sections.summary && cvData.summary && (
                <section className="space-y-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 bg-neutral-100 px-2 py-0.5">
                    PROFESSIONAL SUMMARY
                  </h3>
                  <p className="text-neutral-800 px-2 pt-0.5 leading-normal text-justify [text-align-last:left]">
                    {cvData.summary}
                  </p>
                </section>
              )}

              {sections.achievements && cvData.achievements?.length > 0 && (
                <section className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 bg-neutral-100 px-2 py-0.5">
                    HONORS & AWARDS
                  </h3>
                  <div className="px-2 space-y-1">
                    {cvData.achievements.map((ach: any, idx: number) => (
                      <div key={idx} className="resume-entry flex justify-between items-baseline font-bold">
                        <span>{ach.title} {ach.issuer && `— ${ach.issuer}`}</span>
                        {ach.date && <span className="font-normal text-neutral-600">{formatResumeDate(ach.date)}</span>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {sections.education && cvData.education?.length > 0 && (
                <section className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 bg-neutral-100 px-2 py-0.5">
                    ACADEMIC BACKGROUND
                  </h3>
                  <div className="px-2 space-y-1">
                    {cvData.education.map((edu: any, idx: number) => (
                      <div key={idx} className="resume-entry flex justify-between items-baseline">
                        <div>
                          <span className="font-bold">{edu.institution || edu.school}</span>
                          <span className="text-neutral-700"> | {edu.degree} in {edu.fieldOfStudy}</span>
                        </div>
                        <span className="font-normal text-neutral-600">
                          {edu.startDate ? `${formatResumeDate(edu.startDate)} - ${formatResumeDate(edu.endDate)}` : edu.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {sections.experience && cvData.experiences?.length > 0 && (
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 bg-neutral-100 px-2 py-0.5">
                    PROFESSIONAL EXPERIENCE
                  </h3>
                  <div className="px-2 space-y-1.5">
                    {cvData.experiences.map((exp: any, idx: number) => (
                      <div key={idx} className="resume-entry space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{exp.position || exp.role} | {exp.company}</span>
                          <span className="font-normal text-neutral-600">
                            {exp.startDate ? `${formatResumeDate(exp.startDate)} - ${formatResumeDate(exp.endDate)}` : exp.period}
                          </span>
                        </div>
                        {renderBullets(exp.description)}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {sections.projects && cvData.projects?.length > 0 && (
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 bg-neutral-100 px-2 py-0.5">
                    PROJECTS & INITIATIVES
                  </h3>
                  <div className="px-2 space-y-1.5">
                    {cvData.projects.map((proj: any, idx: number) => (
                      <div key={idx} className="resume-entry space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{proj.title || proj.name} {proj.technologies && `(${proj.technologies})`}</span>
                          <span className="font-normal text-neutral-600">
                            {proj.startDate ? `${formatResumeDate(proj.startDate)} - ${formatResumeDate(proj.endDate)}` : proj.year}
                          </span>
                        </div>
                        {renderBullets(proj.description || proj.desc)}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {sections.skills && cvData.skills?.length > 0 && (
                <section className="space-y-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 bg-neutral-100 px-2 py-0.5">
                    SKILLS INVENTORY
                  </h3>
                  <p className="text-neutral-800 px-2 pt-0.5 leading-normal">
                    {cvData.skills.join(" • ")}
                  </p>
                </section>
              )}
            </div>
          )}

          {/* ====================================================
              TEMPLATE 6: COMPACT ONE-PAGER
             ==================================================== */}
          {activeTemplate === "compact-one-page" && (
            <div
              id="resume-printable-area"
              className="a4-page-sheet text-neutral-900 space-y-2 select-text text-left print:p-0 print:shadow-none print:w-full text-[10.5px] leading-tight"
            >
              <div className="resume-header text-center space-y-0.5 pb-1 border-b border-black">
                <h2 className="text-lg font-bold uppercase tracking-tight">
                  {cvData.name}
                </h2>
                <p className="text-[10px] text-neutral-700">
                  {[cvData.email, cvData.phone, cvData.location, cvData.linkedin].filter(Boolean).join(" • ")}
                </p>
              </div>

              {sections.summary && cvData.summary && (
                <section className="space-y-0.5">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-neutral-300">
                    SUMMARY
                  </h3>
                  <p className="text-neutral-800 leading-snug text-justify [text-align-last:left]">
                    {cvData.summary}
                  </p>
                </section>
              )}

              {sections.education && cvData.education?.length > 0 && (
                <section className="space-y-0.5">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-neutral-300">
                    EDUCATION
                  </h3>
                  {cvData.education.map((edu: any, idx: number) => (
                    <div key={idx} className="resume-entry flex justify-between font-medium">
                      <span>{edu.institution || edu.school} — {edu.degree} in {edu.fieldOfStudy}</span>
                      <span className="text-neutral-600">
                        {edu.startDate ? `${formatResumeDate(edu.startDate)} - ${formatResumeDate(edu.endDate)}` : edu.year}
                      </span>
                    </div>
                  ))}
                </section>
              )}

              {sections.experience && cvData.experiences?.length > 0 && (
                <section className="space-y-1">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-neutral-300">
                    EXPERIENCE
                  </h3>
                  {cvData.experiences.map((exp: any, idx: number) => (
                    <div key={idx} className="resume-entry space-y-0.5">
                      <div className="flex justify-between font-bold">
                        <span>{exp.position || exp.role} | {exp.company}</span>
                        <span className="font-normal text-neutral-600 text-[9.5px]">
                          {exp.startDate ? `${formatResumeDate(exp.startDate)} - ${formatResumeDate(exp.endDate)}` : exp.period}
                        </span>
                      </div>
                      {renderBullets(exp.description)}
                    </div>
                  ))}
                </section>
              )}

              {sections.projects && cvData.projects?.length > 0 && (
                <section className="space-y-1">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-neutral-300">
                    PROJECTS
                  </h3>
                  {cvData.projects.map((proj: any, idx: number) => (
                    <div key={idx} className="resume-entry space-y-0.5">
                      <div className="flex justify-between font-bold">
                        <span>{proj.title || proj.name} {proj.technologies && `(${proj.technologies})`}</span>
                        <span className="font-normal text-neutral-600 text-[9.5px]">
                          {proj.startDate ? `${formatResumeDate(proj.startDate)} - ${formatResumeDate(proj.endDate)}` : proj.year}
                        </span>
                      </div>
                      {renderBullets(proj.description || proj.desc)}
                    </div>
                  ))}
                </section>
              )}

              {sections.skills && cvData.skills?.length > 0 && (
                <section className="space-y-0.5">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-black border-b border-neutral-300">
                    SKILLS
                  </h3>
                  <p className="text-neutral-800">
                    {cvData.skills.join(" • ")}
                  </p>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}