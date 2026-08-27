"use client";

import React from "react";
import {
  TemplateClassic,
  TemplateModern,
  TemplateExecutive,
  TemplateId,
} from "./resume-templates";

export interface ResumeConfig {
  sectionOrder: Array<
    | "achievements"
    | "summary"
    | "experience"
    | "projects"
    | "education"
    | "skills"
    | "certifications"
  >;
  enabledSections: Record<string, boolean>;
  showLocation: boolean;
  customEmail?: string;
  selectedExperiences: string[];
  selectedProjects: string[];
  selectedEducations: string[];
  selectedSkills: string[];
  selectedCertifications: string[];
  selectedAchievements: string[];
}

interface AtsResumePreviewProps {
  user: any;
  profile: any;
  config: ResumeConfig;
  templateId?: TemplateId;
}

export const AtsResumePreview = React.forwardRef<
  HTMLDivElement,
  AtsResumePreviewProps
>(({ user, profile, config, templateId = "classic" }, ref) => {
  return (
    <div
      ref={ref}
      id="resume-preview-content"
      className="a4-page-sheet bg-white transition-all select-text border border-neutral-200 print:border-none print:shadow-none print:p-0 print:m-0 print:bg-white"
    >
      {templateId === "classic" && (
        <TemplateClassic user={user} profile={profile} config={config} />
      )}
      {templateId === "modern" && (
        <TemplateModern user={user} profile={profile} config={config} />
      )}
      {templateId === "executive" && (
        <TemplateExecutive user={user} profile={profile} config={config} />
      )}
    </div>
  );
});

AtsResumePreview.displayName = "AtsResumePreview";