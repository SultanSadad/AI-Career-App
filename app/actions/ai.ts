"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { getIndustryConfig } from "@/lib/industry-config";

const apiKey = process.env.GEMINI_API_KEY || "";
if (!apiKey) {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });
const DEFAULT_AI_MODEL = "gemini-3.6-flash";

// Helper internal mencari user & profile dari session
async function getAuthenticatedUserWithProfile() {
  const session = await auth();
  if (!session?.user?.id && !session?.user?.email) {
    throw new Error("Unauthorized");
  }

  let user = await prisma.user.findFirst({
    where: {
      OR: [
        ...(session.user.id ? [{ id: session.user.id }] : []),
        ...(session.user.email ? [{ email: session.user.email }] : []),
      ],
    },
    include: {
      profile: {
        include: {
          experiences: true,
          educations: true,
          projects: true,
          skills: true,
          certifications: true,
          achievements: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  if (!user.profile) {
    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        industry: "it",
      },
      include: {
        experiences: true,
        educations: true,
        projects: true,
        skills: true,
        certifications: true,
        achievements: true,
      },
    });
    user = { ...user, profile: newProfile };
  }

  return user;
}

// 1. REKOMENDASI SKILL ADAPTIF BERDASARKAN MAJOR & EXPERIENCES
// 1. REKOMENDASI SKILL ADAPTIF BERDASARKAN MAJOR & EXPERIENCES
export async function getRecommendedSkillsAction(): Promise<string[]> {
  let fallbackSkills: string[] = [];

  try {
    const user = await getAuthenticatedUserWithProfile();
    const profile = user.profile!;
    const majorMeta = getIndustryConfig(profile.industry);

    // Ambil default skills dari config jurusan sebagai jaminan fallback
    fallbackSkills = majorMeta.defaultRecommendedSkills || [];

    const existingSkillNames = (profile.skills || []).map((s: any) =>
      s.name.toLowerCase().trim()
    );

    const expContext = (profile.experiences || [])
      .map((e: any) => `${e.position} at ${e.company}: ${e.description || ""}`)
      .join("\n");

    const prompt = `
${majorMeta.systemRolePrompt}
Candidate Academic Major & Discipline: "${majorMeta.name}".
Core Practice Area: "${majorMeta.skillsSectionTitle}".
Deliverables Domain: "${majorMeta.projectSectionTitle}".

Candidate Work Experience Context:
${expContext || "Relevant field experience"}

Existing Skills to EXCLUDE:
${existingSkillNames.join(", ") || "None"}

TASK:
Provide exactly 6 to 8 trending, high-impact professional skills/tools specifically for "${majorMeta.name}" that are NOT in the existing skills list.

Return ONLY a strict JSON array of strings, without formatting backticks, example:
["Skill 1", "Skill 2", "Skill 3"]
`;

    // Gunakan fallback model yang terbukti aktif di API key Anda
    const candidateModels = [
      "gemini-flash-latest",
      "gemini-flash-lite-latest",
      "gemini-3.5-flash",
    ];

    let recommended: string[] = [];

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        const rawText = response.text?.trim() || "";
        // Bersihkan formatting markdown jika ada
        const sanitized = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        const parsed = JSON.parse(sanitized);

        if (Array.isArray(parsed) && parsed.length > 0) {
          recommended = parsed;
          break;
        }
      } catch (innerErr) {
        console.warn(`[getRecommendedSkillsAction] Model ${modelName} gagal, mencoba fallback...`);
      }
    }

    // Jika Gemini memberikan hasil, filter skill yang sudah ada
    if (recommended.length > 0) {
      const filtered = recommended.filter(
        (s) => !existingSkillNames.includes(s.toLowerCase().trim())
      );
      if (filtered.length > 0) return filtered;
    }

    // Jika filter kosong atau Gemini gagal, kembalikan skill rekomendasi dari konfigurasi major
    return fallbackSkills.filter(
      (s) => !existingSkillNames.includes(s.toLowerCase().trim())
    );
  } catch (err: any) {
    console.error("[getRecommendedSkillsAction Error]:", err);
    // Anti-stuck: selalu kembalikan array agar loading state di client selesai
    return fallbackSkills;
  }
}

// 2. ANALISIS AI JOB FIT & SKILL GAP DENGAN SUDUT PANDANG MAJOR
export async function analyzeJobMatchAction(data: {
  targetJobTitle?: string;
  jobDescription: string;
}) {
  try {
    if (!data.jobDescription?.trim()) {
      throw new Error("Job description is required");
    }

    const user = await getAuthenticatedUserWithProfile();
    const p = user.profile!;
    const majorMeta = getIndustryConfig(p.industry);

    const prompt = `
${majorMeta.systemRolePrompt}
You are evaluating a candidate whose declared major/discipline is "${majorMeta.name}".

TARGET JOB DETAILS:
- Target Role: ${data.targetJobTitle || "Professional Role"}
- Job Description & Requirements:
"""
${data.jobDescription}
"""

CANDIDATE PROFILE:
- Name: ${user.name || "Candidate"}
- Academic Major / Discipline: ${majorMeta.name}
- Headline: ${p.headline || "-"}
- Summary/Bio: ${p.bio || "-"}

- Competencies (${majorMeta.skillsSectionTitle}):
${p.skills.length > 0 ? p.skills.map((s) => `  * ${s.name}`).join("\n") : "  * None listed"}

- Professional Experience:
${
  p.experiences.length > 0
    ? p.experiences
        .map((e) => `  * ${e.position} at ${e.company}\n    ${e.description || ""}`)
        .join("\n")
    : "  * No experience listed"
}

- Deliverables & Case Records (${majorMeta.projectSectionTitle}):
${
  p.projects.length > 0
    ? p.projects
        .map((pr) => `  * ${pr.title} (${majorMeta.technologiesLabel}: ${pr.technologies || "-"})\n    ${pr.description || ""}`)
        .join("\n")
    : "  * No records listed"
}

- Education:
${
  p.educations.length > 0
    ? p.educations
        .map((ed) => `  * ${ed.degree || ""} in ${ed.fieldOfStudy || ""} - ${ed.institution}`)
        .join("\n")
    : "  * No education listed"
}

EVALUATION RULES:
1. First determine whether the candidate's background and discipline (${majorMeta.name}) are fundamentally aligned with the target job.
2. If the candidate's background is completely out of domain (e.g. Software Engineer applying for a Clinical Pharmacist or Chief Legal Counsel), state the structural mismatch clearly in the summary and set overallMatchScore appropriately low (< 30%).
3. If they are in the same or adjacent domain, evaluate their specific experiences, deliverables, and skill gaps rigorously.
4. Provide recommendations that respect their discipline and show realistic pivoting or advancement paths.

OUTPUT FORMAT:
Return ONLY strict valid JSON matching this schema:
{
  "overallMatchScore": 85,
  "verdict": "Strong Candidate | Moderate Fit | Targeted Upskilling Required | Discipline Mismatch",
  "summary": "2-3 concise evaluative sentences tailored to the domain.",
  "strengths": [
    "Key aligned capability with tangible proof"
  ],
  "weaknesses": [
    "Identified gap or credential deficiency"
  ],
  "matchingSkills": ["Skill A", "Skill B"],
  "missingSkills": ["Skill X", "Skill Y"],
  "strategicRecommendations": [
    "Actionable calibration step 1",
    "Actionable calibration step 2"
  ]
}
`;

    const response = await ai.models.generateContent({
      model: DEFAULT_AI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("AI Evaluation error:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze profile alignment.",
    };
  }
}