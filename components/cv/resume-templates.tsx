"use client";

import React from "react";
import { Mail, Phone, MapPin, Globe, Award, Sparkles, FolderGit2, Briefcase, GraduationCap } from "lucide-react";
import { getIndustryConfig } from "@/lib/industry-config";
import { ResumeConfig } from "./ats-resume-preview";

export type TemplateId = "classic" | "modern" | "executive";

interface TemplateProps {
  user: any;
  profile: any;
  config: ResumeConfig;
}

function useResumeData(profile: any, config: ResumeConfig) {
  const industryConfig = getIndustryConfig(profile?.industry);

  const selectedExps = (profile?.experiences || []).filter((e: any) =>
    config.selectedExperiences.includes(e.id)
  );
  const selectedProjs = (profile?.projects || []).filter((p: any) =>
    config.selectedProjects.includes(p.id)
  );
  const selectedEdus = (profile?.educations || []).filter((e: any) =>
    config.selectedEducations.includes(e.id)
  );
  const selectedSkills = (profile?.skills || []).filter((s: any) =>
    config.selectedSkills.includes(s.id)
  );
  const selectedCerts = (profile?.certifications || []).filter((c: any) =>
    config.selectedCertifications.includes(c.id)
  );
  const selectedAchieves = (profile?.achievements || []).filter((a: any) =>
    config.selectedAchievements.includes(a.id)
  );

  return {
    industryConfig,
    selectedExps,
    selectedProjs,
    selectedEdus,
    selectedSkills,
    selectedCerts,
    selectedAchieves,
  };
}

function renderBulletList(text?: string | null) {
  if (!text) return null;
  const lines = text
    .split("\n")
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);

  if (lines.length === 0) return null;

  return (
    <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[9px] leading-snug text-neutral-800">
      {lines.map((line, idx) => (
        <li key={idx} className="pl-0.5">
          {line}
        </li>
      ))}
    </ul>
  );
}

// ====================================================
// TEMPLATE 01: CLASSIC ATS (CANVA-SANS WITH ELEGANT ACCENTS)
// ====================================================
export function TemplateClassic({ user, profile, config }: TemplateProps) {
  const { industryConfig, selectedExps, selectedProjs, selectedEdus, selectedSkills, selectedCerts, selectedAchieves } =
    useResumeData(profile, config);

  const displayEmail = config.customEmail || user?.email;

  const renderSection = (key: string) => {
    if (!config.enabledSections[key]) return null;

    switch (key) {
      case "achievements":
        if (selectedAchieves.length === 0) return null;
        return (
          <section key="achievements" className="space-y-1.5 break-inside-avoid">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans">
              Key Achievements
            </h3>
            <div className="space-y-1">
              {selectedAchieves.map((a: any) => (
                <div key={a.id} className="flex justify-between items-baseline text-[10px] leading-snug">
                  <div className="flex-1 pr-4">
                    <span className="font-bold text-neutral-900">{a.title}</span>
                    {a.description && <span className="text-neutral-700"> – {a.description}</span>}
                  </div>
                  {a.issuer && (
                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="text-[9px] text-neutral-500 font-semibold">{a.issuer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "summary":
        if (!profile?.bio) return null;
        return (
          <section key="summary" className="space-y-1 break-inside-avoid">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans">
              Professional Summary
            </h3>
            <p className="text-[10px] leading-relaxed text-neutral-800 text-justify">{profile.bio}</p>
          </section>
        );

      case "experience":
        if (selectedExps.length === 0) return null;
        return (
          <section key="experience" className="space-y-1.5">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans break-inside-avoid">
              Work Experience
            </h3>
            <div className="space-y-2">
              {selectedExps.map((exp: any) => (
                <div key={exp.id} className="space-y-0.5 break-inside-avoid resume-entry">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-neutral-950">
                      {exp.position} <span className="font-semibold text-neutral-600">| {exp.company}</span>
                    </span>
                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="text-[9.5px] text-neutral-700 font-mono font-medium">
                        {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} –{" "}
                        {exp.isCurrent
                          ? "Present"
                          : exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                          : ""}
                      </span>
                      {exp.location && config.showLocation && (
                        <span className="text-[9px] text-neutral-500 italic">
                          {exp.location} {exp.employmentType ? `• ${exp.employmentType}` : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  {exp.description && renderBulletList(exp.description)}
                </div>
              ))}
            </div>
          </section>
        );

      case "projects":
        if (selectedProjs.length === 0) return null;
        return (
          <section key="projects" className="space-y-1.5">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans break-inside-avoid">
              {industryConfig.projectSectionTitle}
            </h3>
            <div className="space-y-2">
              {selectedProjs.map((proj: any) => (
                <div key={proj.id} className="space-y-0.5 break-inside-avoid resume-entry">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-bold text-neutral-950">{proj.title}</span>
                    {proj.startDate && (
                      <div className="flex flex-col items-end text-right shrink-0">
                        <span className="text-[9.5px] text-neutral-700 font-mono font-medium">
                          {new Date(proj.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          {proj.endDate
                            ? ` – ${new Date(proj.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className="text-[9.5px] text-neutral-700 font-semibold">
                      {industryConfig.technologiesLabel}: <span className="font-medium text-neutral-900">{proj.technologies}</span>
                    </p>
                  )}
                  {proj.description && renderBulletList(proj.description)}
                </div>
              ))}
            </div>
          </section>
        );

      case "education":
        if (selectedEdus.length === 0) return null;
        return (
          <section key="education" className="space-y-1.5">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans break-inside-avoid">
              Education
            </h3>
            <div className="space-y-1.5">
              {selectedEdus.map((edu: any) => (
                <div key={edu.id} className="space-y-0.5 break-inside-avoid resume-entry">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <div>
                      <span className="font-bold text-neutral-950">{edu.institution}</span>
                      <p className="text-[10px] text-neutral-700 font-medium">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                    </div>
                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="text-[9.5px] text-neutral-700 font-mono font-medium">
                        {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} –{" "}
                        {edu.endDate
                          ? new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                          : "Present"}
                      </span>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-[9.5px] text-neutral-600 whitespace-pre-line">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "skills":
        if (selectedSkills.length === 0) return null;
        return (
          <section key="skills" className="space-y-1 break-inside-avoid">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans">
              Skills & Competencies
            </h3>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {selectedSkills.map((s: any) => (
                <span
                  key={s.id}
                  className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-300"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        );

      case "certifications":
        if (selectedCerts.length === 0) return null;
        return (
          <section key="certifications" className="space-y-1 break-inside-avoid">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans">
              Certifications & Licenses
            </h3>
            <div className="space-y-1">
              {selectedCerts.map((c: any) => (
                <div key={c.id} className="flex justify-between items-baseline text-[10px] break-inside-avoid resume-entry">
                  <div className="flex-1 pr-4">
                    <strong className="font-bold text-neutral-950">{c.name}</strong> – <span className="text-neutral-700">{c.issuer}</span>
                  </div>
                  <div className="flex flex-col items-end text-right shrink-0">
                    <span className="text-[9.5px] text-neutral-700 font-mono font-medium">
                      {new Date(c.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3.5 font-sans tracking-tight text-neutral-900">
      <header className="resume-header text-center space-y-1 border-b-2 border-neutral-950 pb-2.5 break-inside-avoid">
        <h1 className="text-2xl font-black uppercase tracking-wide text-neutral-950">
          {user?.name || "YOUR NAME"}
        </h1>
       
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[10px] font-medium text-neutral-700 pt-0.5">
          {displayEmail && <span>{displayEmail}</span>}
          {profile?.phone && <span>• {profile.phone}</span>}
          {config.showLocation && profile?.location && <span>• {profile.location}</span>}
          {profile?.linkedinUrl && <span>• {profile.linkedinUrl.replace(/^https?:\/\//, "")}</span>}
        </div>
      </header>
      <div className="space-y-3.5">{config.sectionOrder.map((key) => renderSection(key))}</div>
    </div>
  );
}

// ====================================================
// TEMPLATE 02: MODERN MINIMALIST (SIDE TIMELINE & PILLS)
// ====================================================
export function TemplateModern({ user, profile, config }: TemplateProps) {
  const { industryConfig, selectedExps, selectedProjs, selectedEdus, selectedSkills, selectedCerts, selectedAchieves } =
    useResumeData(profile, config);

  const displayEmail = config.customEmail || user?.email;

  const renderSection = (key: string) => {
    if (!config.enabledSections[key]) return null;

    switch (key) {
      case "achievements":
        if (selectedAchieves.length === 0) return null;
        return (
          <section key="achievements" className="space-y-1 break-inside-avoid">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block"></span>
              Achievements
            </h3>
            <div className="space-y-1 pl-3">
              {selectedAchieves.map((a: any) => (
                <div key={a.id} className="flex justify-between items-baseline text-[10px]">
                  <div className="flex-1 pr-4">
                    <span className="font-bold text-neutral-950">{a.title}</span> – <span className="text-neutral-700">{a.description}</span>
                  </div>
                  {a.issuer && (
                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="text-[9px] text-neutral-500 font-semibold">{a.issuer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "summary":
        if (!profile?.bio) return null;
        return (
          <section key="summary" className="space-y-1 break-inside-avoid">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block"></span>
              Professional Summary
            </h3>
            <p className="text-[10px] leading-relaxed text-neutral-700 pl-3">{profile.bio}</p>
          </section>
        );

      case "experience":
        if (selectedExps.length === 0) return null;
        return (
          <section key="experience" className="space-y-1.5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5 break-inside-avoid">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block"></span>
              Experience
            </h3>
            <div className="space-y-2.5 pl-3 border-l-2 border-neutral-200 ml-0.5">
              {selectedExps.map((exp: any) => (
                <div key={exp.id} className="space-y-0.5 break-inside-avoid resume-entry">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <div>
                      <span className="font-extrabold text-neutral-950">{exp.position}</span>
                      <p className="text-[9.5px] font-bold text-neutral-600">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="text-[9.5px] text-neutral-600 font-mono font-medium">
                        {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} –{" "}
                        {exp.isCurrent
                          ? "Present"
                          : exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                          : ""}
                      </span>
                      {exp.location && config.showLocation && (
                        <span className="text-[9px] text-neutral-500">
                          {exp.location} {exp.employmentType ? `• ${exp.employmentType}` : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  {exp.description && renderBulletList(exp.description)}
                </div>
              ))}
            </div>
          </section>
        );

      case "projects":
        if (selectedProjs.length === 0) return null;
        return (
          <section key="projects" className="space-y-1.5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5 break-inside-avoid">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block"></span>
              {industryConfig.projectSectionTitle}
            </h3>
            <div className="space-y-2 pl-3 border-l-2 border-neutral-200 ml-0.5">
              {selectedProjs.map((proj: any) => (
                <div key={proj.id} className="space-y-0.5 break-inside-avoid resume-entry">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-extrabold text-neutral-950">{proj.title}</span>
                    {proj.startDate && (
                      <div className="flex flex-col items-end text-right shrink-0">
                        <span className="text-[9.5px] text-neutral-600 font-mono font-medium">
                          {new Date(proj.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      </div>
                    )}
                  </div>
                  {proj.technologies && (
                    <span className="inline-block text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">
                      {proj.technologies}
                    </span>
                  )}
                  {proj.description && renderBulletList(proj.description)}
                </div>
              ))}
            </div>
          </section>
        );

      case "education":
        if (selectedEdus.length === 0) return null;
        return (
          <section key="education" className="space-y-1.5">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5 break-inside-avoid">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block"></span>
              Education
            </h3>
            <div className="space-y-1.5 pl-3">
              {selectedEdus.map((edu: any) => (
                <div key={edu.id} className="flex justify-between items-baseline text-[11px] break-inside-avoid resume-entry">
                  <div>
                    <span className="font-extrabold text-neutral-950">{edu.institution}</span>
                    <p className="text-[10px] text-neutral-700 font-medium">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-right shrink-0">
                    <span className="text-[9.5px] text-neutral-600 font-mono font-medium">
                      {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} –{" "}
                      {edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "skills":
        if (selectedSkills.length === 0) return null;
        return (
          <section key="skills" className="space-y-1 break-inside-avoid">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 inline-block"></span>
              Key Skills
            </h3>
            <div className="flex flex-wrap gap-1 pl-3">
              {selectedSkills.map((s: any) => (
                <span key={s.id} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        );

      case "certifications":
        if (selectedCerts.length === 0) return null;
        return (
          <section key="certifications" className="space-y-0.5 break-inside-avoid">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-900 pb-0.5 font-sans">
              Certifications & Licenses
            </h3>
            <div className="space-y-0.5">
              {selectedCerts.map((c: any) => (
                <div key={c.id} className="flex justify-between items-baseline text-[10px] break-inside-avoid resume-entry">
                  <div className="flex-1 pr-2 truncate">
                    <strong className="font-bold text-neutral-950">{c.name}</strong> – <span className="text-neutral-700">{c.issuer}</span>
                  </div>
                  <div className="flex flex-col items-end text-right shrink-0">
                    <span className="text-[9px] text-neutral-600 font-mono font-medium">
                      {new Date(c.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3.5 font-sans text-neutral-900">
      <header className="resume-header flex justify-between items-start border-b-2 border-neutral-950 pb-2.5 break-inside-avoid">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-black tracking-tight text-neutral-950">{user?.name || "YOUR NAME"}</h1>
          {profile?.headline && <p className="text-xs font-bold text-neutral-700">{profile.headline}</p>}
        </div>
        <div className="flex flex-col items-end text-right text-[9.5px] text-neutral-700 space-y-0.5 font-medium shrink-0">
          {displayEmail && <p>{displayEmail}</p>}
          {profile?.phone && <p>{profile.phone}</p>}
          {config.showLocation && profile?.location && <p>{profile.location}</p>}
          {profile?.linkedinUrl && <p>{profile.linkedinUrl.replace(/^https?:\/\//, "")}</p>}
        </div>
      </header>

      <div className="space-y-3.5">{config.sectionOrder.map((key) => renderSection(key))}</div>
    </div>
  );
}

// ====================================================
// TEMPLATE 03: EXECUTIVE TWO-COLUMN (DARK BANNER & STRUCTURED SIDEBAR)
// ====================================================
export function TemplateExecutive({ user, profile, config }: TemplateProps) {
  const { industryConfig, selectedExps, selectedProjs, selectedEdus, selectedSkills, selectedCerts, selectedAchieves } =
    useResumeData(profile, config);

  const displayEmail = config.customEmail || user?.email;

  return (
    <div className="space-y-3.5 font-sans text-neutral-900">
      <header className="resume-header bg-neutral-950 text-white p-4 rounded-xl space-y-0.5 break-inside-avoid">
        <h1 className="text-xl font-black tracking-tight uppercase">{user?.name || "YOUR NAME"}</h1>
        {profile?.headline && <p className="text-[11px] font-medium text-neutral-300">{profile.headline}</p>}
      </header>

      <div className="grid grid-cols-12 gap-4 items-start pt-1">
        {/* LEFT SIDEBAR (4 Cols) */}
        <div className="col-span-4 space-y-3.5 border-r border-neutral-200 pr-3.5">
          <div className="space-y-1 break-inside-avoid">
            <h4 className="text-[10.5px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
              Contact
            </h4>
            <div className="space-y-1.5 text-[9.5px] text-neutral-700 pt-0.5">
              {displayEmail && (
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span className="truncate">{displayEmail}</span>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {config.showLocation && profile?.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.linkedinUrl && (
                <div className="flex items-center gap-1.5 truncate">
                  <Globe className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span className="truncate">{profile.linkedinUrl.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
            </div>
          </div>

          {config.enabledSections.skills && selectedSkills.length > 0 && (
            <div className="space-y-1 break-inside-avoid">
              <h4 className="text-[10.5px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
                Competencies
              </h4>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {selectedSkills.map((s: any) => (
                  <span
                    key={s.id}
                    className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-200"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {config.enabledSections.education && selectedEdus.length > 0 && (
            <div className="space-y-1 break-inside-avoid">
              <h4 className="text-[10.5px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
                Education
              </h4>
              <div className="space-y-1.5 pt-0.5">
                {selectedEdus.map((edu: any) => (
                  <div key={edu.id} className="text-[9.5px] space-y-0.5 resume-entry">
                    <p className="font-bold text-neutral-950">{edu.institution}</p>
                    <p className="text-neutral-700 font-medium">
                      {edu.degree}, {edu.fieldOfStudy}
                    </p>
                    <p className="text-neutral-500 font-mono">
                      {new Date(edu.startDate).getFullYear()} –{" "}
                      {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {config.enabledSections.certifications && selectedCerts.length > 0 && (
            <div className="space-y-1 break-inside-avoid">
              <h4 className="text-[10.5px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-0.5">
                Certifications
              </h4>
              <div className="space-y-1 pt-0.5">
                {selectedCerts.map((c: any) => (
                  <div key={c.id} className="text-[9.5px] resume-entry">
                    <p className="font-bold text-neutral-950">{c.name}</p>
                    <p className="text-neutral-600">{c.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT MAIN (8 Cols) */}
        <div className="col-span-8 space-y-3.5">
          {config.enabledSections.achievements && selectedAchieves.length > 0 && (
            <div className="space-y-1 break-inside-avoid">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5">
                Key Achievements
              </h3>
              <div className="space-y-1">
                {selectedAchieves.map((a: any) => (
                  <div key={a.id} className="flex justify-between items-baseline text-[9.5px] leading-snug resume-entry">
                    <div className="flex-1 pr-2">
                      <span className="font-bold text-neutral-950">{a.title}</span> – {a.description}
                    </div>
                    {a.issuer && (
                      <div className="flex flex-col items-end text-right shrink-0">
                        <span className="text-[8.5px] text-neutral-500 font-semibold">{a.issuer}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {config.enabledSections.summary && profile?.bio && (
            <div className="space-y-1 break-inside-avoid">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5">
                Executive Profile
              </h3>
              <p className="text-[10px] leading-relaxed text-neutral-700 text-justify">{profile.bio}</p>
            </div>
          )}

          {config.enabledSections.experience && selectedExps.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 break-inside-avoid">
                Professional Experience
              </h3>
              <div className="space-y-2">
                {selectedExps.map((exp: any) => (
                  <div key={exp.id} className="space-y-0.5 break-inside-avoid resume-entry">
                    <div className="flex justify-between items-baseline text-[11px]">
                      <div>
                        <span className="font-extrabold text-neutral-950">{exp.position}</span>
                        <p className="text-[9.5px] font-bold text-neutral-600">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end text-right shrink-0">
                        <span className="text-[9.5px] text-neutral-600 font-mono font-medium">
                          {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} –{" "}
                          {exp.isCurrent
                            ? "Present"
                            : exp.endDate
                            ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                            : ""}
                        </span>
                        {exp.location && config.showLocation && (
                          <span className="text-[9px] text-neutral-500">
                            {exp.location} {exp.employmentType ? `• ${exp.employmentType}` : ""}
                          </span>
                        )}
                      </div>
                    </div>
                    {exp.description && renderBulletList(exp.description)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {config.enabledSections.projects && selectedProjs.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 break-inside-avoid">
                {industryConfig.projectSectionTitle}
              </h3>
              <div className="space-y-2">
                {selectedProjs.map((proj: any) => (
                  <div key={proj.id} className="space-y-0.5 break-inside-avoid resume-entry">
                    <div className="flex justify-between items-baseline text-[11px]">
                      <span className="font-extrabold text-neutral-950">{proj.title}</span>
                      {proj.startDate && (
                        <div className="flex flex-col items-end text-right shrink-0">
                          <span className="text-[9.5px] text-neutral-600 font-mono font-medium">
                            {new Date(proj.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </span>
                        </div>
                      )}
                    </div>
                    {proj.technologies && (
                      <p className="text-[9px] text-neutral-600 font-semibold">Focus: {proj.technologies}</p>
                    )}
                    {proj.description && renderBulletList(proj.description)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}