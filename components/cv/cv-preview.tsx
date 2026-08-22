"use client";

interface CVPreviewProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  profile: {
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
  targetRole,
}: CVPreviewProps) {
  const hasSections = selectedSections.length > 0;

  if (!hasSections) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-400">
        <p className="text-xs">Pilih minimal satu section untuk melihat preview.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 text-left text-neutral-900 font-sans text-xs space-y-4 max-h-[700px] overflow-y-auto">
      {/* Header Info */}
      <div className="border-b border-neutral-200 pb-3 text-center space-y-1">
        <h1 className="text-lg font-black tracking-tight text-neutral-900 uppercase">
          {user.name ?? "Your Name"}
        </h1>
        <p className="text-[11px] font-semibold text-neutral-600">
          {targetRole || profile?.headline || "Software Engineer / Professional"}
        </p>
        <p className="text-[10px] text-neutral-400">{user.email}</p>
      </div>

      {/* Summary Section */}
      {selectedSections.includes("summary") && profile?.bio && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-0.5">
            Professional Summary
          </h2>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            {profile.bio}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {selectedSections.includes("experience") && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-0.5">
            Work Experience
          </h2>
          {profile?.experiences && profile.experiences.length > 0 ? (
            <div className="space-y-2.5">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-800 text-[11px]">
                      {exp.position} — <span className="font-medium text-neutral-600">{exp.company}</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[10px] text-neutral-500 leading-normal whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-neutral-400 italic">Belum ada data pengalaman kerja.</p>
          )}
        </div>
      )}

      {/* Projects Section */}
      {selectedSections.includes("projects") && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-0.5">
            Key Projects
          </h2>
          {profile?.projects && profile.projects.length > 0 ? (
            <div className="space-y-2">
              {profile.projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-800 text-[11px]">{proj.title}</span>
                    {proj.link && (
                      <span className="text-[10px] text-blue-600 underline truncate max-w-[150px]">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-500">{proj.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-neutral-400 italic">Belum ada data proyek.</p>
          )}
        </div>
      )}

      {/* Skills Section */}
      {selectedSections.includes("skills") && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-0.5">
            Skills & Competencies
          </h2>
          {profile?.skills && profile.skills.length > 0 ? (
            <p className="text-[11px] text-neutral-700">
              {profile.skills.map((s) => s.name).join(" • ")}
            </p>
          ) : (
            <p className="text-[10px] text-neutral-400 italic">Belum ada data skill.</p>
          )}
        </div>
      )}

      {/* Education Section */}
      {selectedSections.includes("education") && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-0.5">
            Education
          </h2>
          {profile?.educations && profile.educations.length > 0 ? (
            <div className="space-y-1.5">
              {profile.educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[11px] text-neutral-800">{edu.institution}</span>
                    <p className="text-[10px] text-neutral-500">{edu.degree} in {edu.fieldOfStudy}</p>
                  </div>
                  <span className="text-[10px] text-neutral-400">
                    {new Date(edu.startDate).getFullYear()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-neutral-400 italic">Belum ada riwayat pendidikan.</p>
          )}
        </div>
      )}
    </div>
  );
}