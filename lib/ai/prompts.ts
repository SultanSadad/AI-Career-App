export interface ImproveExperiencePayload {
  position: string;
  company: string;
  currentDescription: string;
  industry?: string;
}

export interface SkillGapPayload {
  userSkills: string[];
  targetJobTitle: string;
  jobDescription: string;
}

export interface JobMatchPayload {
  profileSummary: string;
  skills: string[];
  experiences: Array<{ position: string; company: string; description: string }>;
  jobDescription: string;
}

// System prompt untuk optimasi deskripsi pengalaman kerja ATS
export function buildExperienceImprovementPrompt(data: ImproveExperiencePayload) {
  return `
You are an elite Executive Career Coach and ATS Resume Specialist.
Transform the following job experience into 3 to 5 powerful, high-impact, achievement-oriented bullet points using the Google XYZ formula ("Accomplished [X] as measured by [Y], by doing [Z]") and strong action verbs.

Role: ${data.position}
Company: ${data.company}
Industry: ${data.industry || "Technology"}
Current Raw Description:
"""
${data.currentDescription}
"""

Requirements:
1. Output strict JSON only.
2. Every bullet point MUST start with an active past-tense action verb (e.g., "Spearheaded", "Engineered", "Orchestrated", "Accelerated").
3. Include realistic quantifiable metrics and business impact.
4. Keep tone highly professional, crisp, and ATS-friendly.

JSON Schema format:
{
  "improvedBullets": [
    "Spearheaded...",
    "Orchestrated...",
    "Optimized..."
  ],
  "formattedText": "- Spearheaded...\\n- Orchestrated...\\n- Optimized...",
  "keyChangesSummary": "Brief 1-sentence summary of what was enhanced"
}
`;
}