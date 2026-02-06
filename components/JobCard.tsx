
import React from 'react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  studentSkills: string[];
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const isInternship = job.type === 'Internship';
  const score = job.matchScore || 0;

  return (
    <div className={`bg-white border ${isInternship ? 'border-indigo-100' : 'border-emerald-100'} rounded-xl p-6 hover:shadow-lg transition-all flex flex-col justify-between relative group`}>
      {job.isVerified && (
        <div className={`absolute -top-3 right-4 ${isInternship ? 'bg-indigo-600' : 'bg-emerald-600'} text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-10`}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          VERIFIED PAID
        </div>
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${isInternship ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'} rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform`}>
              {isInternship ? '🎓' : '💼'}
            </div>
            <div>
              <h3 className={`font-bold text-lg text-slate-900 leading-tight group-hover:${isInternship ? 'text-indigo-600' : 'text-emerald-600'} transition-colors`}>{job.title}</h3>
              <p className="text-slate-500 font-semibold text-sm">{job.company}</p>
            </div>
          </div>
          <span className={`${isInternship ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'} text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest border border-current opacity-70`}>
            {job.type}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-bold text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-300">📍</span> {job.location}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-300">💰</span> <span className="text-slate-600">{job.salary || 'Verified Stipend'}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
             <span className="text-slate-300">🕒</span> {job.postedDate || 'Recent'}
          </div>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.requirements.slice(0, 3).map((req, i) => (
            <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-600 font-bold uppercase tracking-tighter">
              {req}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-4">
        {/* Pre-calculated Match UI */}
        <div className={`${isInternship ? 'bg-indigo-50/50 border-indigo-100' : 'bg-emerald-50/50 border-emerald-100'} p-3 rounded-lg border relative`}>
          <div className="flex items-center justify-between mb-1.5 relative z-10">
            <span className={`text-[10px] font-black ${isInternship ? 'text-indigo-700' : 'text-emerald-700'} uppercase tracking-widest`}>AI Skill Fit</span>
            <span className={`text-sm font-black ${score > 75 ? 'text-green-600' : 'text-amber-600'}`}>
              {score}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 relative z-10">
            <div 
              className={`h-1.5 rounded-full transition-all duration-700 ${score > 75 ? (isInternship ? 'bg-indigo-500' : 'bg-emerald-500') : 'bg-amber-500'}`} 
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 leading-tight font-bold italic">
            "{job.matchReasoning}"
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
             <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
                VIA <span className="text-slate-900">{job.sourceName}</span>
             </span>
          </div>
          <div className="flex gap-2">
            <a 
              href={job.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex-grow ${isInternship ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'} text-white text-center py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-all active:scale-[0.97]`}
            >
              Verify & Apply
            </a>
            <button className="px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-400 hover:text-amber-500">
              <span className="text-lg">⭐</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
