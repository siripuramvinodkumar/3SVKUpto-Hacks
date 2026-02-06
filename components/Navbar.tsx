
import React from 'react';

interface NavbarProps {
  activeTab: 'jobs' | 'leaderboard' | 'dashboard';
  setActiveTab: (tab: 'jobs' | 'leaderboard' | 'dashboard') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            3
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">3SVK</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'jobs' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Find Jobs
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leaderboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            My Profile
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-right">
            <div className="text-xs text-slate-500 font-medium uppercase">Student Account</div>
            <div className="text-sm font-semibold text-slate-900">Alex Johnson</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
            <img src="https://picsum.photos/seed/alex/100/100" alt="Avatar" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
