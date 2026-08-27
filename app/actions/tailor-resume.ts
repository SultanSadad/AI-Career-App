"use server";

import { auth } from "@/auth";
import https from "node:https";

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
  if (!session?.user?.email) throw new Error("Unauthorized");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  // 1. Sanitasi payload agar prompt ringkas dan respon cepat
  const cleanProfile = {
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
You are an ATS resume optimization expert.
Target Job Description:
"""
${jobDescription.slice(0, 1500)}
"""

Candidate Profile:
"""
${JSON.stringify(cleanProfile)}
"""

Task:
1. "tailoredHeadline": Targeted professional title.
2. "tailoredSummary": 3 concise impactful sentences matching the role.
3. "highlightedSkillIds": Array of IDs of skills matching the JD.
4. "optimizedExperiences": Array of objects { "id": string, "tailoredDescription": string } with metric-driven bullet points using strong action verbs.

Return ONLY strict valid JSON:
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

  // Daftar model yang tersedia di API key Anda secara berurutan
const fallbackModels = [
  "gemini-flash-lite-latest",
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-flash-latest",
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