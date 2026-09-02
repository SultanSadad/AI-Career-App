"use server";

import { auth } from "@/auth";
import https from "node:https";
import { getIndustryConfig } from "@/lib/industry-config";

function callGeminiApi(apiKey: string, model: string, payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const options = {
      hostname: "generativelanguage.googleapis.com",
      port: 443,
      path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Failed to parse JSON response"));
          }
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

export async function tailorResumeWithAiAction(jobDescription: string, profileData: any) {
  const session = await auth();
  if (!session?.user?.email && !session?.user?.id) throw new Error("Unauthorized");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  // Ambil konteks spesifik major user
  const majorMeta = getIndustryConfig(profileData?.industry);

  const cleanProfile = {
    major: majorMeta.name,
    headline: profileData?.headline || "",
    bio: profileData?.bio || "",
    experiences: (profileData?.experiences || []).map((e: any) => ({
      id: e.id,
      role: e.position,
      company: e.company,
      desc: e.description || "",
    })),
    skills: (profileData?.skills || []).map((s: any) => ({
      id: s.id,
      name: s.name,
    })),
  };

  const prompt = `
${majorMeta.systemRolePrompt}
You are an expert career calibration and ATS optimization system.
The candidate's core discipline is: "${majorMeta.name}".
Primary Deliverable Domain: "${majorMeta.projectSectionTitle}".
Competency Focus: "${majorMeta.skillsSectionTitle}".

Target Job Description:
"""
${jobDescription.slice(0, 1500)}
"""

Candidate Profile:
"""
${JSON.stringify(cleanProfile)}
"""

Task:
1. "tailoredHeadline": Produce a targeted, highly professional title reflecting the candidate's background and matching the target position.
2. "tailoredSummary": Write 3 concise, impactful sentences aligning the candidate's ${majorMeta.name} background directly with the role.
3. "highlightedSkillIds": Array of IDs of skills from the candidate's list that match the requirements.
4. "optimizedExperiences": Array of objects { "id": string, "tailoredDescription": string } calibrated with action verbs and quantifiable outcomes suitable for ${majorMeta.name}.

Return ONLY strict valid JSON matching this schema:
{
  "tailoredHeadline": "string",
  "tailoredSummary": "string",
  "highlightedSkillIds": ["string"],
  "optimizedExperiences": [{ "id": "string", "tailoredDescription": "string" }]
}
`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  };

  const fallbackModels = [
    "gemini-3.6-flash",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
  ];

  let lastError: any = null;

  for (const model of fallbackModels) {
    try {
      const data = await callGeminiApi(apiKey, model, payload);
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      return { success: true, data: JSON.parse(text) };
    } catch (err: any) {
      console.warn(`[Tailor Resume] Model ${model} failed, trying next fallback...`, err.message);
      lastError = err;
    }
  }

  return {
    success: false,
    error: lastError?.message || "All Gemini models are currently busy. Please try again shortly.",
  };
}