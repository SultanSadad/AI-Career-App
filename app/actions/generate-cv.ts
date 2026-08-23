"use server";

import { GoogleGenAI, Type } from "@google/genai";
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

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.AI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error("[AI Tailor] ERROR: GEMINI_API_KEY belum diset di .env.local");
    return {
      success: false,
      error: "GEMINI_API_KEY belum diset di .env.local",
    };
  }

  console.log(`[AI Tailor] Starting generation for role: "${targetRole.slice(0, 50)}..."`);

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Payload ringkas agar response cepat & hemat token
    const simplifiedProfile = {
      headline: rawProfile?.headline,
      bio: rawProfile?.bio,
      experiences: rawProfile?.experiences?.map((e: any) => ({
        id: e.id,
        company: e.company,
        position: e.position,
        description: e.description,
      })),
      projects: rawProfile?.projects?.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        link: p.link,
      })),
      skills: rawProfile?.skills?.map((s: any) => s.name),
      educations: rawProfile?.educations?.map((ed: any) => ({
        institution: ed.institution,
        degree: ed.degree,
        fieldOfStudy: ed.fieldOfStudy,
      })),
    };

    const prompt = `Anda adalah AI Career Strategist & ATS Optimization Expert profesional di bidang "${rawProfile?.industry || "General / IT"}".
Tugas Anda: Poles dan sesuaikan data kandidat berikut agar memenuhi kualifikasi Target Role / Job Description dengan menggunakan standar dan terminologi industri "${rawProfile?.industry || "General"}".

BIDANG UTAMA KANDIDAT:
${rawProfile?.industry || "Information Technology"}

TARGET ROLE & JOB DESCRIPTION:
"${targetRole || "Professional"}"

DATA MENTAH KANDIDAT:
${JSON.stringify(simplifiedProfile)}

ATURAN:
1. Buat "headline" dan "bio" yang ringkas, profesional, dan menonjolkan kecocokan dengan target role sesuai standar industri terkait.
2. Tulis deskripsi experience dan projects dengan action verbs kuat dan metrik/impact yang relevan dengan domain (${rawProfile?.industry || "General"}).
3. Pertahankan "id" asli pada setiap experience dan project.
4. Pilih atau rekomendasikan skills yang paling relevan.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            bio: { type: Type.STRING },
            experiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  position: { type: Type.STRING },
                  company: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["id", "position", "company", "description"],
              },
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  link: { type: Type.STRING, nullable: true },
                },
                required: ["id", "title", "description"],
              },
            },
            skills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["headline", "bio", "experiences", "projects", "skills"],
        },
      },
    });

    const resultText = response.text;
    console.log("[AI Tailor] Success! Response text length:", resultText?.length);

    if (!resultText) throw new Error("Gagal mendapatkan respons teks dari Gemini API");

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