
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  type: 'Internship' | 'Micro-job' | 'Part-time';
  sourceUrl: string;
  isVerified: boolean;
  postedDate: string;
  sourceName: string;
  sector: 'Govt' | 'Private';
  matchScore?: number;
  matchReasoning?: string;
}

export interface Student {
  name: string;
  major: string;
  skills: string[];
  points: number;
  badges: string[];
}

export interface MatchResult {
  score: number; // 0 to 100
  reasoning: string;
  missingSkills: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  skillsCount: number;
}
