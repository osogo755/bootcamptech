import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, LayoutDashboard, BookOpen } from 'lucide-react';
import { ProgramId } from '../../types';

interface HeroProps {
  onExplorePrograms: () => void;
  onGoToDashboard: () => void;
  onSelectProgram: (id: ProgramId) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExplorePrograms, 
  onGoToDashboard,
  onSelectProgram
}) => {
  return (
    <section className="pt-12 pb-16 border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Callie Tech Bootcamp • Nairobi, Kenya</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Master Tech Skills.{' '}
          <span className="text-indigo-400">Track Your Progress.</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Callie Academy offers 5 hands-on bootcamps in <strong>Software Engineering</strong>, <strong>Data Science</strong>, <strong>Cyber Security</strong>, <strong>Ethical Hacking</strong>, and <strong>Cloud Computing</strong>. Monitor your weekly lessons, submit assignments, and earn verified credentials.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGoToDashboard}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Open Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExplorePrograms}
            className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>View 5 Programs &amp; Tuition</span>
          </button>
        </div>

        {/* 3 Simple highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-emerald-400 font-bold text-sm">🇰🇪 Local Tuition in KSh</div>
            <div className="text-xs text-slate-400 mt-1">From KSh 125,000 upfront or KSh 12,500/mo via M-Pesa.</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-bold text-sm">💻 Student Progress Portal</div>
            <div className="text-xs text-slate-400 mt-1">Track completed weekly lessons, lab scores, and cumulative GPA.</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-cyan-400 font-bold text-sm">📜 Verified Certificate</div>
            <div className="text-xs text-slate-400 mt-1">Receive an official diploma upon completing modules &amp; capstone.</div>
          </div>
        </div>

      </div>
    </section>
  );
};
