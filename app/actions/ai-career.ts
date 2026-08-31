"use server";

import { auth } from "@/auth";
import { ai, DEFAULT_AI_MODEL } from "@/lib/ai/gemini";
import {
  buildExperienceImprovementPrompt,
  buildSkillGapPrompt,
  buildJobMatchingPrompt,
  ImproveExperiencePayload,
  SkillGapPayload,
  JobMatchingPayload,
} from "@/lib/ai/prompts";

export type AIResponseState<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type SkillGapResult = {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendedSkills: string[];
  analysisSummary: string;
  actionPlan: string[];
};

export type JobMatchingResult = {
  overallMatchScore: number;
  verdict: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  matchingSkills: string[];
  missingSkills: string[];
  strategicRecommendations: string[];
};

export async function matchJobWithAI(
  payload: JobMatchingPayload
): Promise<AIResponseState<JobMatchingResult>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized. Please login to use AI Career features.",
      };
    }

    if (!payload.targetJobTitle?.trim()) {
      return {
        success: false,
        error: "Target Job Title is required.",
      };
    }

    if (!payload.jobDescription?.trim()) {
      return {
        success: false,
        error: "Job Description cannot be empty.",
      };
    }

    const prompt = buildJobMatchingPrompt(payload);
    const response = await ai.models.generateContent({
      model: DEFAULT_AI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI engine.");
    }

    const parsedData: JobMatchingResult = JSON.parse(responseText);

    return {
      success: true,
      data: parsedData,
    };
  } catch (error: any) {
    console.error("[AI_JOB_MATCHING_ERROR]:", error);
    return {
      success: false,
      error: error?.message || "Failed to analyze job match. Please try again.",
    };
  }
}

export async function analyzeSkillGapWithAI(
  payload: SkillGapPayload
): Promise<AIResponseState<SkillGapResult>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized. Please login to use AI Career features.",
      };
    }

    if (!payload.targetJobTitle?.trim()) {
      return {
        success: false,
        error: "Target Job Title is required.",
      };
    }

    if (!payload.jobDescription?.trim()) {
      return {
        success: false,
        error: "Job Description cannot be empty.",
      };
    }

    const prompt = buildSkillGapPrompt(payload);
    const response = await ai.models.generateContent({
      model: DEFAULT_AI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI engine.");
    }

    const parsedData: SkillGapResult = JSON.parse(responseText);

    return {
      success: true,
      data: parsedData,
    };
  } catch (error: any) {
    console.error("[AI_SKILL_GAP_ERROR]:", error);
    return {
      success: false,
      error: error?.message || "Failed to analyze skill gap. Please try again.",
    };
  }
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
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized. Please login to use AI Career features.",
      };
    }

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

    const prompt = buildExperienceImprovementPrompt(payload);
    const response = await ai.models.generateContent({
      model: DEFAULT_AI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI engine.");
    }

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