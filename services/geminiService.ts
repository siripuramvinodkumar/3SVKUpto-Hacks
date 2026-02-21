// 1. Correct import for the new SDK (Removes Error TS2305)
import { GoogleGenAI } from "@google/genai";

// 2. Bypass Vite environment type error (Removes Error TS2339)
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is missing from Vercel Environment Variables.");
}

// 3. New SDK initialization pattern (Removes Error TS2339 for getGenerativeModel)
const ai = new GoogleGenAI({ apiKey });

export async function generateJobMatch(studentSkills: string[], jobDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Match these skills: ${studentSkills.join(", ")} with this job: ${jobDescription}` }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
