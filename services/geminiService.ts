import { GoogleGenAI } from "@google/genai";

// 1. Bypass the Vite type error using 'as any'
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in your Vercel Environment Variables.");
}

// 2. Initialize with the new SDK structure
const ai = new GoogleGenAI({ apiKey });

export async function generateJobMatch(studentSkills: string[], jobDescription: string) {
  try {
    // 3. Use the new models.generateContent method
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Match skills: ${studentSkills.join(", ")} with job: ${jobDescription}` }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
