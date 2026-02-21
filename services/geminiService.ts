// 1. Fix: Use the correct imports for the new SDK
import { GoogleGenAI } from "@google/genai";

// 2. Fix: Use 'as any' to bypass the Vite type error until you update vite-env.d.ts
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateJobMatch(studentSkills: string[], jobDescription: string) {
  try {
    // 3. Fix: Use the new SDK's direct model calling method
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Match these skills: ${studentSkills.join(", ")} against this job: ${jobDescription}. Provide a match score and reasoning.`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
