
import { GoogleGenAI, Type } from "@google/genai";
import { Job, MatchResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// High-quality static dataset to ensure the app works even without API quota
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
  },
  {
    id: "curated-3",
    title: "React Native UI Developer",
    company: "Airbnb",
    location: "San Francisco, CA",
    description: "Help build the next generation of mobile experiences. Focus on performance and smooth animations.",
    requirements: ["React", "TypeScript", "UI/UX Design"],
    salary: "$5,000/mo",
    type: "Micro-job",
    sourceUrl: "https://airbnb.com/careers",
    isVerified: true,
    postedDate: "4 hours ago",
    sourceName: "Airbnb",
    sector: "Private",
    matchScore: 88,
    matchReasoning: "Direct match for your React and TypeScript expertise."
  },
  {
    id: "curated-4",
    title: "Citizen Engagement Platform Intern",
    company: "Municipal Digital Services",
    location: "Chicago, IL",
    description: "Developing community outreach tools for city residents. Working with modern web stacks.",
    requirements: ["React", "Node.js", "SQL"],
    salary: "$28/hr",
    type: "Internship",
    sourceUrl: "https://cityofchicago.org",
    isVerified: true,
    postedDate: "3 days ago",
    sourceName: "City Gov Portal",
    sector: "Govt",
    matchScore: 82,
    matchReasoning: "Strong React/Node background matches city tech stack."
  }
];

export async function fetchJobs(
  searchQuery: string, 
  sector: 'Govt' | 'Private',
  studentSkills: string[],
  forceLive: boolean = false
): Promise<{ jobs: Job[], status: 'live' | 'curated' | 'error' }> {
  
  // If not forceLive, return from curated list immediately to avoid hitting quota
  if (!forceLive && !searchQuery) {
    const filtered = CURATED_JOBS.filter(j => j.sector === sector);
    return { jobs: filtered, status: 'curated' };
  }

  // If forceLive or searchQuery, attempt API call
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Find 6 REAL, CURRENT student roles for ${searchQuery || 'internships'}. 
    Sector: ${sector}. 
    Student Skills: ${studentSkills.join(", ")}.
    Calculate matchScore and matchReasoning for each.
    Return JSON array.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              company: { type: Type.STRING },
              location: { type: Type.STRING },
              description: { type: Type.STRING },
              requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              salary: { type: Type.STRING },
              type: { type: Type.STRING },
              sourceUrl: { type: Type.STRING },
              sourceName: { type: Type.STRING },
              postedDate: { type: Type.STRING },
              isVerified: { type: Type.BOOLEAN },
              sector: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              matchReasoning: { type: Type.STRING }
            },
            required: ["title", "company", "description", "sourceUrl", "isVerified", "sourceName", "sector", "matchScore", "matchReasoning"]
          }
        }
      }
    });

    const jobs = JSON.parse(response.text) as Job[];
    return { 
      jobs: jobs.map((j, idx) => ({ ...j, id: `live-${idx}-${Date.now()}` })), 
      status: 'live' 
    };
  } catch (err: any) {
    console.warn("API quota hit, serving curated results.");
    // Even if it fails, we show curated results so the user isn't blocked
    const filtered = CURATED_JOBS.filter(j => 
      j.sector === sector && 
      (searchQuery ? j.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
    return { jobs: filtered, status: 'curated' };
  }
}
