"use client";

import { useState } from "react";
import { CVPreview } from "./cv-preview";
import { Sparkles, Check, Download, RefreshCw } from "lucide-react";
import { generateTailoredCVAction } from "@/app/actions/generate-cv";

interface CVBuilderClientProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  profile: any;
}

export function CVBuilderClient({ user, profile }: CVBuilderClientProps) {
  const [targetRole, setTargetRole] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
  ]);

  // State data aktif (bisa diubah oleh AI)
  const [activeProfile, setActiveProfile] = useState(profile);
  const [isGenerating, setIsGenerating] = useState(false);

  const sectionsList = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Work experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Project" },
    { id: "certifications", label: "Certifications" },
    { id: "achievements", label: "Achievement" },
  ];

  const handleToggleSection = (id: string) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenerateAI = async () => {
    try {
      setIsGenerating(true);
      const res = await generateTailoredCVAction({
        targetRole,
        rawProfile: profile,
      });

      if (res.success && res.data) {
        // Merge hasil AI ke preview
        setActiveProfile((prev: any) => ({
          ...prev,
          headline: res.data.headline,
          bio: res.data.bio,
          experiences: prev?.experiences?.map((exp: any) => {
            const tailored = res.data.experiences?.find((e: any) => e.id === exp.id || e.company === exp.company);
            return tailored ? { ...exp, description: tailored.description, position: tailored.position } : exp;
          }) || [],
          projects: prev?.projects?.map((proj: any) => {
            const tailored = res.data.projects?.find((p: any) => p.id === proj.id || p.title === proj.title);
            return tailored ? { ...proj, description: tailored.description } : proj;
          }) || [],
          skills: res.data.skills?.map((name: string, i: number) => ({ id: `skill-${i}`, name })) || prev?.skills,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <main className="max-w-7xl w-full mx-auto p-6 md:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 print:p-0 print:m-0">
      {/* LEFT COLUMN: Controls (Hidden on Print) */}
      <div className="lg:col-span-7 space-y-6 print:hidden">
        {/* Target Role Prompt Box */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-sm text-neutral-900">
              Target Role & Job Description
            </h2>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              AI Tailor
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            Ketik posisi target atau paste kualifikasi lowongan — AI akan menyusun ulang kalimat deskripsi dan memilih kata kunci yang relevan.
          </p>
          <textarea
            rows={3}
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder='e.g. "Full Stack Web Developer - Next.js, PostgreSQL, Tailwind CSS"'
            className="w-full p-3.5 text-xs bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-black placeholder:text-neutral-400 resize-none transition"
          />
        </div>

        {/* Template Selector Grid */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-neutral-900">Choose Layout / Template</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 1, name: "Modern Minimal" },
              { id: 2, name: "Classic ATS" },
              { id: 3, name: "Tech Focus" },
            ].map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`group cursor-pointer border rounded-2xl p-3 text-center transition flex flex-col items-center justify-center gap-2 ${
                  selectedTemplate === tmpl.id
                    ? "border-black bg-neutral-50 ring-1 ring-black"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <div className="w-full h-16 bg-[#DCE4EC] rounded-xl flex items-center justify-center">
                  {selectedTemplate === tmpl.id && (
                    <Check className="w-5 h-5 text-neutral-900" />
                  )}
                </div>
                <span className="text-[11px] font-bold text-neutral-800">{tmpl.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sections Checklist */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="font-extrabold text-sm text-neutral-900">Sections to include</h2>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            {sectionsList.map((section) => (
              <label
                key={section.id}
                className="flex items-center gap-3 text-xs text-neutral-700 font-semibold cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section.id)}
                  onChange={() => handleToggleSection(section.id)}
                  className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                />
                {section.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Canvas Live Preview */}
      <div className="lg:col-span-5 flex flex-col gap-4 print:col-span-12 print:w-full">
        <div className="flex-1 min-h-[580px] bg-neutral-100/70 border border-neutral-200 rounded-3xl p-4 shadow-inner flex flex-col print:border-none print:p-0 print:bg-white">
          <div className="flex items-center justify-between px-2 pb-3 print:hidden">
            <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
              Live Preview (A4 ATS)
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#FFEB43] text-black text-[10px] font-black">
              Sync Active
            </span>
          </div>

          <CVPreview
            user={user}
            profile={activeProfile}
            selectedSections={selectedSections}
            targetRole={targetRole}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="flex-1 py-4 bg-[#0A0A0A] hover:bg-neutral-800 disabled:bg-neutral-700 text-[#FFEB43] font-black text-xs rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Optimizing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Tailor with AI
              </>
            )}
          </button>

          <button
            onClick={handlePrintPDF}
            className="py-4 px-5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-bold text-xs rounded-2xl transition flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
            title="Download / Print PDF"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>
    </main>
  );
}