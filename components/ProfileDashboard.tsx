
import React from 'react';
import { Student } from '../types';

interface ProfileDashboardProps {
  student: Student;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ student }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
          <div className="relative inline-block mb-4">
            <img 
              src="https://picsum.photos/seed/alex/150/150" 
              className="w-32 h-32 rounded-full border-4 border-indigo-100 mx-auto" 
              alt="Alex Johnson" 
            />
            <div className="absolute bottom-0 right-2 w-8 h-8 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
          <p className="text-slate-500 mb-6">{student.major}</p>
          
          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{student.points}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">{student.skills.length}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Skill Badges</h3>
          <div className="flex flex-wrap gap-2">
            {student.badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100 text-xs font-bold">
                🏆 {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Verified Skills</h3>
            <button className="text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded transition-colors">
              + Add Skill
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {student.skills.map((skill, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl group hover:border-indigo-200 transition-colors">
                <span className="font-semibold text-slate-700">{skill}</span>
                <span className="text-[10px] font-bold uppercase bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">Bridge the Gap</h3>
            <p className="opacity-90 mb-6">Take a short assessment and earn "Certified Developer" badge to unlock high-paying micro-jobs.</p>
            <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
              Start Skill Assessment
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Applications</h3>
          <div className="space-y-4">
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center">💼</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Frontend Engineering Intern</h4>
                    <p className="text-sm text-slate-500">Google • Applied 2 days ago</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">Reviewing</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
