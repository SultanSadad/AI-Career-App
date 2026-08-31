import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not defined in environment variables.");
}

// Inisialisasi SDK Google GenAI
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// Model aktif Google Gemini API
export const DEFAULT_AI_MODEL = "gemini-3.6-flash";