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
export function buildSkillGapPrompt(data: SkillGapPayload) {
  return `
You are an expert Technical Recruiter and Career Strategist.
Analyze the candidate's existing skill set against the target job requirements.

Target Job Title: ${data.targetJobTitle}
Candidate's Existing Skills:
${data.userSkills.length > 0 ? data.userSkills.map((s) => `- ${s}`).join("\n") : "- (No skills listed yet)"}

Target Job Description:
"""
${data.jobDescription}
"""

Task:
1. Extract the core required skills and technologies from the job description.
2. Compare them with the candidate's existing skills.
3. Categorize into:
   - "matchingSkills": Skills the candidate already has that directly match the job.
   - "missingSkills": High-priority required skills mentioned in the job that the candidate lacks.
   - "recommendedSkills": Nice-to-have or complementary skills that would give the candidate a competitive edge.
4. Calculate a matchPercentage (0 to 100) based on skill coverage.
5. Provide a 2-3 sentence strategic recommendation.

Output MUST be strict JSON matching this schema:
{
  "matchPercentage": 75,
  "matchingSkills": ["React", "TypeScript", "Tailwind CSS"],
  "missingSkills": ["GraphQL", "Redis", "AWS Lambda"],
  "recommendedSkills": ["Docker", "Jest", "CI/CD Pipelines"],
  "analysisSummary": "Brief overview of how well the candidate fits...",
  "actionPlan": [
    "Build a project demonstrating GraphQL integration...",
    "Take a short course or get hands-on with Redis caching..."
  ]
}
`;
}

export interface JobMatchingPayload {
  targetJobTitle: string;
  jobDescription: string;
  candidateProfile: {
    name?: string;
    headline?: string;
    bio?: string;
    experiences: Array<{
      position: string;
      company: string;
      description?: string | null;
    }>;
    projects: Array<{
      title: string;
      technologies?: string | null;
      description?: string | null;
    }>;
    educations: Array<{
      institution: string;
      degree?: string | null;
      fieldOfStudy?: string | null;
    }>;
    skills: string[];
    certifications?: Array<{
      name: string;
      issuer: string;
    }>;
  };
}

export function buildJobMatchingPrompt(data: JobMatchingPayload) {
  const p = data.candidateProfile;

  return `
You are an expert Executive Hiring Manager and AI Recruiter.
Evaluate the candidate's complete career profile against the target job requirements.

TARGET JOB:
- Title: ${data.targetJobTitle}
- Job Description:
"""
${data.jobDescription}
"""

CANDIDATE COMPLETE PROFILE:
- Name: ${p.name || "Candidate"}
- Headline: ${p.headline || "-"}
- Summary/Bio: ${p.bio || "-"}

- Skills:
${p.skills.length > 0 ? p.skills.map((s) => `  * ${s}`).join("\n") : "  * None listed"}

- Work Experiences:
${
  p.experiences.length > 0
    ? p.experiences
        .map((e) => `  * ${e.position} at ${e.company}\n    ${e.description || ""}`)
        .join("\n")
    : "  * No experience listed"
}

- Projects:
${
  p.projects.length > 0
    ? p.projects
        .map((pr) => `  * ${pr.title} (Tech: ${pr.technologies || "-"})\n    ${pr.description || ""}`)
        .join("\n")
    : "  * No projects listed"
}

- Education:
${
  p.educations.length > 0
    ? p.educations
        .map((ed) => `  * ${ed.degree || ""} in ${ed.fieldOfStudy || ""} - ${ed.institution}`)
        .join("\n")
    : "  * No education listed"
}

TASK:
1. Conduct a deep match analysis between the candidate's holistic background and the job requirements.
2. Calculate an objective "overallMatchScore" (0 to 100).
3. Identify candidate's top "strengths" (why they are a strong fit).
4. Identify candidate's critical "weaknesses" or qualification gaps.
5. Extract "matchingSkills" and "missingSkills".
6. Formulate clear, actionable "strategicRecommendations" to optimize their chances of landing this job.

OUTPUT FORMAT:
Return ONLY strict JSON matching this schema:
{
  "overallMatchScore": 82,
  "verdict": "Strong Candidate / Moderate Fit / Needs Upskilling",
  "summary": "2-3 concise sentences analyzing profile-job alignment.",
  "strengths": [
    "Proven full-stack experience aligning with required Next.js & Node.js tech stack",
    "Strong portfolio demonstrating scalable web application delivery"
  ],
  "weaknesses": [
    "Lack of explicit cloud deployment (AWS/GCP) mentioned in past work",
    "No proven leadership experience for team lead responsibility"
  ],
  "matchingSkills": ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS"],
  "missingSkills": ["AWS Lambda", "Docker", "Kubernetes"],
  "strategicRecommendations": [
    "Tailor CV summary to highlight backend architecture & performance optimization",
    "Add Docker containerization evidence to projects",
    "Prepare talking points around microservices architecture for interviews"
  ]
}
`;
}