"use client";

import { getIndustryConfig } from "@/lib/industry-config";

interface CVPreviewProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  profile: {
    industry?: string | null;
    headline?: string | null;
    bio?: string | null;
    experiences: Array<{
      id: string;
      company: string;
      position: string;
      location?: string | null;
      startDate: Date;
      endDate?: Date | null;
      isCurrent: boolean;
      description?: string | null;
    }>;
    educations: Array<{
      id: string;
      institution: string;
      degree: string;
      fieldOfStudy: string;
      startDate: Date;
      endDate?: Date | null;
    }>;
    skills: Array<{ id: string; name: string }>;
    projects: Array<{
      id: string;
      title: string;
      description: string;
      link?: string | null;
    }>;
  } | null;
  selectedSections: string[];
  targetRole: string;
}

export function CVPreview({
  user,
  profile,
  selectedSections,
}: CVPreviewProps) {
  const industryMeta = getIndustryConfig(profile?.industry);
  const hasSections = selectedSections.length > 0;

  if (!hasSections) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-400">
        <p className="text-xs">Pilih minimal satu section untuk melihat preview.</p>
      </div>
    );
  }

  const renderBullets = (text?: string | null) => {
    if (!text) return null;
    const lines = text
      .split("\n")
      .map((l) => l.trim().replace(/^[•\-\*]\s*/, ""))
      .filter(Boolean);

    if (lines.length === 1 && !text.includes("\n")) {
      return (
        <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-neutral-800 leading-relaxed">
          <li>{lines[0]}</li>
        </ul>
      );
    }

    return (
      <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-neutral-800 leading-relaxed">
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    );
  };

  const formatDate = (dateString?: Date | string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div
      id="cv-print-area"
      className="w-full bg-white border border-neutral-200 p-8 md:p-10 text-left text-neutral-900 font-sans text-xs space-y-4 max-h-[720px] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:p-0"
    >
      {/* 1. ATS HEADER */}
      <div className="text-center space-y-1 pb-2 border-b border-neutral-900">
        <h1 className="text-2xl font-black tracking-wide text-neutral-900 uppercase">
          {user.name ?? "CAREER CANDIDATE"}
        </h1>
        {profile?.headline && (
          <p className="text-xs font-bold text-neutral-700">{profile.headline}</p>
        )}
        <p className="text-[11px] text-neutral-600 font-medium">
          {user.email ?? "candidate@example.com"}
        </p>
      </div>

      {/* 2. SUMMARY */}
      {selectedSections.includes("summary") && profile?.bio && (
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[11px] text-neutral-800 leading-relaxed pt-0.5">{profile.bio}</p>
        </div>
      )}

      {/* 3. EDUCATION */}
      {selectedSections.includes("education") && profile?.educations && profile.educations.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
            EDUCATION
          </h2>
          <div className="space-y-1.5 pt-0.5">
            {profile.educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-[11px] text-neutral-900">
                <div>
                  <span className="font-bold">{edu.institution}</span> — {edu.degree} ({edu.fieldOfStudy})
                </div>
                <span className="font-medium text-neutral-600">
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EXPERIENCE */}
      {selectedSections.includes("experience") && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
            EXPERIENCE
          </h2>
          {profile?.experiences && profile.experiences.length > 0 ? (
            <div className="space-y-3 pt-0.5">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-[11px] text-neutral-900">
                    <span>
                      {exp.position} | <span className="font-semibold text-neutral-700">{exp.company}</span>
                    </span>
                    <span className="text-[11px] font-medium text-neutral-600">
                      {formatDate(exp.startDate)} - {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {renderBullets(exp.description)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-neutral-400 italic">Belum ada data pengalaman kerja.</p>
          )}
        </div>
      )}

      {/* 5. DYNAMIC PORTFOLIO / CASE STUDIES / PROJECTS */}
      {selectedSections.includes("projects") && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
            {industryMeta.portfolioSectionTitle.toUpperCase()}
          </h2>
          {profile?.projects && profile.projects.length > 0 ? (
            <div className="space-y-3 pt-0.5">
              {profile.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-[11px] text-neutral-900">
                    <span>{proj.title}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 font-normal underline">
                        View
                      </a>
                    )}
                  </div>
                  {renderBullets(proj.description)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-neutral-400 italic">Belum ada data portofolio/studi kasus.</p>
          )}
        </div>
      )}

      {/* 6. SKILLS */}
      {selectedSections.includes("skills") && profile?.skills && profile.skills.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5">
            KEY COMPETENCIES & SKILLS
          </h2>
          <p className="text-[11px] text-neutral-900 leading-relaxed pt-0.5 font-medium">
            {profile.skills.map((s) => s.name).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}