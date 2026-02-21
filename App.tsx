import React, { useState, useEffect, useCallback } from 'react';
import { Job, Student, LeaderboardEntry } from './types';
// This import must match the function signature in geminiService.ts
import { fetchJobs } from './services/geminiService';
import Navbar from './components/Navbar';
import JobBoard from './components/JobBoard';
import Leaderboard from './components/Leaderboard';
import ProfileDashboard from './components/ProfileDashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'leaderboard' | 'dashboard'>('jobs');
  const [sector, setSector] = useState<'Govt' | 'Private'>('Private');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<'live' | 'curated' | 'error'>('curated');
  
  const [studentSkills] = useState(["React", "TypeScript", "Tailwind CSS", "Node.js", "Python"]);

  const [student] = useState<Student>({
    name: "Siripuram Vinod Kumar",
    major: "Cybersecurity",
    skills: studentSkills,
    points: 1250,
    badges: ["Fast Learner", "Problem Solver"]
  });

  const [leaderboardData] = useState<LeaderboardEntry[]>([
    { rank: 1, name: "Sarah Chen", points: 4500, skillsCount: 15 },
    { rank: 2, name: "Alex Johnson", points: 1250, skillsCount: 5 },
  ]);

  // FIX: Ensure this function passes arguments in the order the service expects
  const loadData = useCallback(async (query: string = "", forceLive: boolean = false) => {
    setIsLoading(true);
    try {
      // Calling the service with: studentSkills, searchQuery, sector, forceLive
      const result = await fetchJobs(studentSkills, query, sector, forceLive);
      setJobs(result.jobs);
      setStatus(result.status);
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  }, [sector, studentSkills]);

  useEffect(() => {
    if (activeTab === 'jobs') {
      loadData();
    }
  }, [sector, activeTab, loadData]);

  const handleSearch = (query: string) => {
    loadData(query, true); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {activeTab === 'jobs' && (
          <JobBoard 
            jobs={jobs} 
            loading={isLoading} 
            status={status}
            onSearch={handleSearch} 
            studentSkills={student.skills}
            sector={sector}
            onSectorChange={setSector}
            onRefresh={() => loadData("", true)}
          />
        )}
        
        {activeTab === 'leaderboard' && (
          <Leaderboard data={leaderboardData} />
        )}
        
        {activeTab === 'dashboard' && (
          <ProfileDashboard student={student} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-xs">
        <p>&copy; 2026 3SVK - High Performance Architecture.</p>
      </footer>
    </div>
  );
};

export default App;
