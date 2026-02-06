
import React, { useState, useEffect, useCallback } from 'react';
import { Job, Student, LeaderboardEntry } from './types';
import { fetchJobs } from './services/geminiService';
import Navbar from './components/Navbar';
import JobBoard from './components/JobBoard';
import Leaderboard from './components/Leaderboard';
import ProfileDashboard from './components/ProfileDashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'leaderboard' | 'dashboard'>('jobs');
  const [sector, setSector] = useState<'Govt' | 'Private'>('Private');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<'live' | 'curated' | 'error'>('curated');
  
  const [student] = useState<Student>({
    name: "Alex Johnson",
    major: "Computer Science",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Python"],
    points: 1250,
    badges: ["Fast Learner", "Problem Solver"]
  });

  const [leaderboardData] = useState<LeaderboardEntry[]>([
    { rank: 1, name: "Sarah Chen", points: 4500, skillsCount: 15 },
    { rank: 2, name: "Michael Rodriguez", points: 3800, skillsCount: 12 },
    { rank: 3, name: "Priya Patel", points: 3650, skillsCount: 14 },
    { rank: 4, name: "Alex Johnson", points: 1250, skillsCount: 5 },
    { rank: 5, name: "Liam Smith", points: 900, skillsCount: 4 },
  ]);

  const loadData = useCallback(async (query: string = "", forceLive: boolean = false) => {
    setLoading(true);
    const result = await fetchJobs(query, sector, student.skills, forceLive);
    setJobs(result.jobs);
    setStatus(result.status);
    setLoading(false);
  }, [sector, student.skills]);

  useEffect(() => {
    if (activeTab === 'jobs') {
      loadData();
    }
  }, [sector, activeTab, loadData]);

  const handleSearch = (query: string) => {
    loadData(query, true); // Search always attempts live
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {activeTab === 'jobs' && (
          <JobBoard 
            jobs={jobs} 
            loading={loading} 
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
        <p>&copy; 2024 3SVK - High Performance / Zero Quota Architecture.</p>
      </footer>
    </div>
  );
};

export default App;
