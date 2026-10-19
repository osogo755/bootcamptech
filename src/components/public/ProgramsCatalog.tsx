import React from 'react';
import { 
  Code2, 
  LineChart, 
  ShieldCheck, 
  Terminal, 
  Cloud, 
  ArrowRight, 
  Clock, 
  BookOpen,
  BookMarked
} from 'lucide-react';
import { PROGRAMS } from '../../data/programsData';
import { Program, ProgramId } from '../../types';
import { useStudent } from '../../context/StudentContext';

interface ProgramsCatalogProps {
  onOpenCurriculum: (program: Program) => void;
  onOpenNotes?: (programId: ProgramId) => void;
  onEnroll: (programId: ProgramId) => void;
  onLaunchDashboardWithTrack: (programId: ProgramId) => void;
}

export const ProgramsCatalog: React.FC<ProgramsCatalogProps> = ({
  onOpenCurriculum,
  onOpenNotes,
  onEnroll,
  onLaunchDashboardWithTrack
}) => {
  const { currentStudent } = useStudent();

  const getIcon = (id: string) => {
    switch (id) {
      case 'software-engineering': return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'data-science': return <LineChart className="w-5 h-5 text-emerald-400" />;
      case 'cyber-security': return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'ethical-hacking': return <Terminal className="w-5 h-5 text-rose-400" />;
      case 'cloud-computing': return <Cloud className="w-5 h-5 text-amber-400" />;
      default: return <Code2 className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="programs-catalog" className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">5 Academic Programs</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Select any track to view its full syllabus, read comprehensive study notes, or track individual student progress.
        </p>
      </div>

      {/* 5 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(PROGRAMS).map((prog) => {
          const isEnrolled = currentStudent?.enrolledProgramId === prog.id;

          return (
            <div
              key={prog.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                isEnrolled
                  ? 'bg-indigo-950/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header with icon and duration */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                    {getIcon(prog.id)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      KSh {prog.tuition.toLocaleString()}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{prog.durationWeeks} Weeks</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">{prog.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {prog.tagline}
                </p>

                {/* Key Skills */}
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Skills Covered:
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {prog.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions with Syllabus, Full Notes, and Dashboard */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCurriculum(prog)}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Syllabus</span>
                  </button>

                  {onOpenNotes && (
                    <button
                      onClick={() => onOpenNotes(prog.id)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <BookMarked className="w-3.5 h-3.5" />
                      <span>Full Notes</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => onLaunchDashboardWithTrack(prog.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    isEnrolled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  <span>{isEnrolled ? 'Active ✓' : 'Dashboard'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
