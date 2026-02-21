import { GoogleGenAI, SchemaType } from "@google/genai";
import { Job } from "../types";

// 1. Fix: Use import.meta.env for Vite and add the '!' non-null assertion
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY!;

// 2. Fix: Ensure the client is initialized correctly with the key
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const CURATED_JOBS: Job[] = [
  {
    id: "curated-1",
    title: "Junior Software Engineer Intern",
    company: "Google Cloud",
    location: "Mountain View, CA (Remote)",
    description: "Work with the infrastructure team to build scalable services. Gain experience in Go and Distributed Systems.",
    requirements: ["Go", "Python", "Cloud Computing", "React"],
    salary: "$45/hr",
    type: "Internship",
    sourceUrl: "https://careers.google.com",
    isVerified: true,
    postedDate: "1 day ago",
    sourceName: "Google Careers",
    sector: "Private",
    matchScore: 95,
    matchReasoning: "Excellent alignment with your React and Python skills."
  },
  {
    id: "curated-2",
    title: "Cybersecurity Analyst Trainee",
    company: "Department of Homeland Security",
    location: "Washington D.C.",
    description: "Monitor government networks for potential threats. Learn incident response and digital forensics.",
    requirements: ["Python", "Network Security", "Analytical Thinking"],
    salary: "$3,800/mo",
    type: "Internship",
    sourceUrl: "https://www.usajobs.gov",
    isVerified: true,
    postedDate: "2 days ago",
    sourceName: "USAJobs",
    sector: "Govt",
    matchScore: 78,
    matchReasoning: "Strong Python skills; security training will be provided."
  }
];

export async function fetchJobs(
  searchQuery: string, 
  sector: 'Govt' | 'Private',
  studentSkills: string[],
  forceLive: boolean = false
): Promise<{ jobs: Job[], status: 'live' | 'curated' | 'error' }> {
  
  // Return curated list immediately if no live search requested
  if (!forceLive && !searchQuery) {
    const filtered = CURATED_JOBS.filter(j => j.sector === sector);
    return { jobs: filtered, status: 'curated' };
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use stable 1.5 flash

    const prompt = `Find 6 REAL, CURRENT student roles for ${searchQuery || 'internships'}. 
    Sector: ${sector}. 
    Student Skills: ${studentSkills.join(", ")}.
    Calculate matchScore and matchReasoning for each.
    Return JSON array.`;

    // 3. Fix: Use standard generateContent structure for the SDK
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: { type: SchemaType.STRING },
              company: { type: SchemaType.STRING },
              location: { type: SchemaType.STRING },
              description: { type: SchemaType.STRING },
              requirements: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
              salary: { type: SchemaType.STRING },
              type: { type: SchemaType.STRING },
              sourceUrl: { type: SchemaType.STRING },
              sourceName: { type: SchemaType.STRING },
              postedDate: { type: SchemaType.STRING },
              isVerified: { type: SchemaType.BOOLEAN },
              sector: { type: SchemaType.STRING },
              matchScore: { type: SchemaType.NUMBER },
              matchReasoning: { type: SchemaType.STRING }
            },
            required: ["title", "company", "description", "sourceUrl", "isVerified", "sourceName", "sector", "matchScore", "matchReasoning"]
          }
        }
      }
    });

    const jobs = JSON.parse(result.response.text()) as Job[];
    return { 
      jobs: jobs.map((j, idx) => ({ ...j, id: `live-${idx}-${Date.now()}` })), 
      status: 'live' 
    };
  } catch (err: any) {
    console.warn("API quota hit or error, serving curated results:", err);
    const filtered = CURATED_JOBS.filter(j => 
      j.sector === sector && 
      (searchQuery ? j.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
    return { jobs: filtered, status: 'curated' };
  }
}
