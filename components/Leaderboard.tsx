
import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <h2 className="text-2xl font-bold">Top Skilling Students</h2>
        <p className="opacity-80">Students who have gained the most skills and secured internships this month.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Skills Verified</th>
              <th className="px-6 py-4">Bridging Points</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((entry) => (
              <tr key={entry.rank} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-400">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://picsum.photos/seed/${entry.name}/40/40`} 
                      className="w-10 h-10 rounded-full" 
                      alt={entry.name} 
                    />
                    <span className="font-semibold text-slate-900">{entry.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {entry.skillsCount} Skills
                  </span>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-slate-700">
                  {entry.points.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 font-medium hover:underline text-sm">View Portfolio</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
