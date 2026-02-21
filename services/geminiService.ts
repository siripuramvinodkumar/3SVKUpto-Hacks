import { GoogleGenAI } from "@google/genai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

// Update the function signature to accept all 4 expected arguments
export async function fetchJobs(
  studentSkills: string[], 
  searchQuery: string, 
  sector: string, 
  forceLive: boolean = false
) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: `Match skills: ${studentSkills.join(", ")} with job: ${searchQuery} in the ${sector} sector.` }] }],
    });

    // Return the response in a structured format the UI expects
    return { jobs: [], result: response.text, status: 'live' }; 
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { jobs: [], result: "Error loading jobs", status: 'error' };
  }
}
