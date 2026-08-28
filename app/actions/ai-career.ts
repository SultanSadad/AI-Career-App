"use server";

import { auth } from "@/auth";
import { ai, DEFAULT_AI_MODEL } from "@/lib/ai/gemini";
import {
  buildExperienceImprovementPrompt,
  ImproveExperiencePayload,
} from "@/lib/ai/prompts";

export interface AIResponseState<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function improveExperienceWithAI(
  payload: ImproveExperiencePayload
): Promise<
  AIResponseState<{
    improvedBullets: string[];
    formattedText: string;
    keyChangesSummary: string;
  }>
> {
  try {
    // 1. Validasi Autentikasi User
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized. Please login to use AI Career features.",
      };
    }

    // 2. Validasi Input Payload
    if (!payload.currentDescription?.trim()) {
      return {
        success: false,
        error: "Experience description cannot be empty.",
      };
    }

    if (!process.env.GEMINI_API_KEY) {
      return {
        success: false,
        error: "AI Service configuration is missing (API Key not found).",
      };
    }

    // 3. Panggil Google Gemini API
    const prompt = buildExperienceImprovementPrompt(payload);
    const response = await ai.models.generateContent({
      model: DEFAULT_AI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3, // Menjaga hasil tetap faktual dan profesional
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI engine.");
    }

    // 4. Parse & Return JSON
    const parsedData = JSON.parse(responseText);

    return {
      success: true,
      data: parsedData,
    };
  } catch (error: any) {
    console.error("[AI_IMPROVE_EXPERIENCE_ERROR]:", error);
    return {
      success: false,
      error: error?.message || "Failed to generate AI improvement. Please try again.",
    };
  }
}