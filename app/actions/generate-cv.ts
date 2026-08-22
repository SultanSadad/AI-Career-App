"use server";

import { GoogleGenAI } from "@google/genai";
import { auth } from "@/auth";

export async function generateTailoredCVAction({
  targetRole,
  rawProfile,
}: {
  targetRole: string;
  rawProfile: any;
}) {
  const session = await auth();
  if (!session?.user) {
    console.error("[AI Tailor] Unauthorized: No session");
    return { success: false, error: "Unauthorized" };
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error("[AI Tailor] ERROR: GEMINI_API_KEY tidak ditemukan di environment variables!");
    return {
      success: false,
      error: "GEMINI_API_KEY belum diset di .env.local",
    };
  }

  console.log(`[AI Tailor] Starting generation for role: "${targetRole}"...`);

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Anda adalah AI Career Strategist & ATS Optimization Expert.
Tugas Anda adalah memoles data profil kandidat agar sangat cocok dengan Target Role / Job Description berikut:

TARGET ROLE & JOB DESCRIPTION:
"${targetRole || "Software Engineer / Professional"}"

DATA MENTAH KANDIDAT:
${JSON.stringify(rawProfile, null, 2)}

INSTRUKSI:
1. Buat "headline" dan "bio" yang profesional, ringkas, dan relevan dengan target role.
2. Tulis ulang deskripsi setiap work experience dengan action verbs kuat (misal: "Mengembangkan...", "Mengoptimalkan...", "Merancang...") dan sertakan metrik/dampak jika relevan.
3. Tulis ulang deskripsi proyek agar menonjolkan arsitektur dan tech stack yang relevan.
4. Kembalikan HANYA format JSON valid tanpa format markdown \`\`\`json.

Struktur JSON yang WAJIB dihasilkan:
{
  "headline": "string",
  "bio": "string",
  "experiences": [
    {
      "id": "string",
      "position": "string",
      "company": "string",
      "description": "string"
    }
  ],
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "link": "string | null"
    }
  ],
  "skills": ["string"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text;
    console.log("[AI Tailor] Success! Response text length:", resultText?.length);

    if (!resultText) throw new Error("Gagal mendapatkan respons AI");

    return {
      success: true,
      data: JSON.parse(resultText),
    };
  } catch (error: any) {
    console.error("[AI Tailor] Execution Error:", error);
    return {
      success: false,
      error: error.message || "Terjadi kesalahan saat memproses dengan AI",
    };
  }
}

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.AI_API_KEY ||
  process.env.GOOGLE_GENERATIVE_AI_API_KEY;