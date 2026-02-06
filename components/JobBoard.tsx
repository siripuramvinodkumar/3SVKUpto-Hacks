
import React, { useState, useMemo } from 'react';
import { Job } from '../types';
import JobCard from './JobCard';

interface JobBoardProps {
  jobs: Job[];
  loading: boolean;
  status: 'live' | 'curated' | 'error';
  onSearch: (query: string) => void;
  studentSkills: string[];
  sector: 'Govt' | 'Private';
  onSectorChange: (sector: 'Govt' | 'Private') => void;
  onRefresh: () => void;
}

const JobBoard: React.FC<JobBoardProps> = ({ 
  jobs, 
  loading, 
  status,
  onSearch, 
  studentSkills, 
  sector, 
  onSectorChange,
  onRefresh
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const { internships, microJobs } = useMemo(() => {
    return {
      internships: jobs.filter(j => j.type === 'Internship'),
      microJobs: jobs.filter(j => j.type !== 'Internship')
    };
  }, [jobs]);

  return (
    <div className="space-y-8">
      <header className="text-center max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore {sector} Roles
          </h1>
          <p className="text-lg text-slate-600">
            AI-vetted opportunities from verified sources.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex p-1 bg-slate-200 rounded-xl">
            <button
              onClick={() => onSectorChange('Private')}
              className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${
                sector === 'Private' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'
              }`}
            >
              Private Sector
            </button>
            <button
              onClick={() => onSectorChange('Govt')}
              className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${
                sector === 'Govt' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'
              }`}
            >
              Govt Sector
            </button>
          </div>

          <div className="flex items-center gap-3">
             <span className={`flex h-2 w-2 rounded-full ${status === 'live' ? 'bg-green-500' : 'bg-amber-400'}`}></span>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
               Mode: {status === 'live' ? 'Live Sync' : 'Static (Optimized)'}
             </span>
             {status !== 'live' && (
               <button 
                onClick={onRefresh}
                className="text-[10px] text-indigo-600 font-bold underline ml-2"
               >
                 Try Live Update
               </button>
             )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 p-2 bg-white rounded-2xl shadow-xl border border-slate-100">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${sector} skills or roles...`}
            className="flex-grow px-5 py-3 rounded-xl focus:outline-none text-slate-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Find Jobs'}
          </button>
        </form>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-white rounded-2xl border border-slate-100 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {/* Section: Internships */}
          {internships.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-sm">🎓</span>
                Verified Internships
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {internships.map(job => <JobCard key={job.id} job={job} studentSkills={studentSkills} />)}
              </div>
            </section>
          )}

          {/* Section: Micro-jobs */}
          {microJobs.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center text-sm">💼</span>
                Micro-jobs & Roles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {microJobs.map(job => <JobCard key={job.id} job={job} studentSkills={studentSkills} />)}
              </div>
            </section>
          )}

          {jobs.length === 0 && (
            <div className="text-center py-20 bg-slate-100 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No positions found for this query.</p>
              <button onClick={() => onSearch("")} className="mt-4 text-indigo-600 font-bold">Clear Filters</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobBoard;
