import { GoogleGenAI } from "@google/genai";

// Bypass Vite type error for the build
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is missing from Vercel Settings.");
}

const ai = new GoogleGenAI({ apiKey });

// Export the specific function App.tsx is looking for
export async function fetchJobs(studentSkills: string[], jobDescription: string) {
  try {
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
