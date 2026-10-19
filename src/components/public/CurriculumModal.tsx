import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Award, 
  FileCode, 
  Play, 
  BookOpen, 
  HelpCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Program, ProgramId } from '../../types';

interface CurriculumModalProps {
  program: Program | null;
  onClose: () => void;
  onEnroll: (programId: string) => void;
  onGoToDashboard: () => void;
  onOpenNotes?: (programId: ProgramId) => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  program,
  onClose,
  onEnroll,
  onGoToDashboard,
  onOpenNotes
}) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'capstone' | 'outcomes'>('modules');

  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${program.gradient} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
            Detailed Syllabus • {program.durationWeeks} Weeks
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{program.name}</h2>
          <p className="mt-2 text-white/90 text-sm max-w-2xl">{program.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-white/90">
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-white" />
              <span>{program.hoursPerWeek} Hours / Week</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl">
              <Award className="w-4 h-4 text-white" />
              <span>{program.credential}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl">
              <Calendar className="w-4 h-4 text-white" />
              <span>Next Cohort: {program.nextCohortDate}</span>
            </div>
          </div>
        </div>

        {/* Modal Subnav */}
        <div className="border-b border-slate-800 bg-slate-900 px-6 sm:px-8 flex gap-4">
          <button
            onClick={() => setActiveTab('modules')}
            className={`py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'modules'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Weekly Modules ({program.modules.length})
          </button>
          <button
            onClick={() => setActiveTab('capstone')}
            className={`py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'capstone'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Capstone Project Brief
          </button>
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`py-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'outcomes'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Career &amp; Salaries
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === 'modules' && (
            <div className="space-y-6">
              {program.modules.map((mod) => (
                <div 
                  key={mod.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
                        WEEK {mod.week}
                      </span>
                      <h4 className="text-base font-bold text-white">{mod.title}</h4>
                    </div>
                    <span className="text-xs text-slate-400">{mod.lessons.length} Units</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4">{mod.description}</p>

                  {/* Learning Objectives */}
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Core Competencies Mastered:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {mod.learningObjectives.map((obj, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lessons list */}
                  <div className="border-t border-slate-800/80 pt-3 space-y-1.5">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-900/60 text-slate-300"
                      >
                        <div className="flex items-center gap-2">
                          {lesson.type === 'video' && <Play className="w-3 h-3 text-cyan-400" />}
                          {lesson.type === 'reading' && <BookOpen className="w-3 h-3 text-indigo-400" />}
                          {lesson.type === 'lab' && <FileCode className="w-3 h-3 text-emerald-400" />}
                          {lesson.type === 'quiz' && <HelpCircle className="w-3 h-3 text-amber-400" />}
                          <span>{lesson.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">{lesson.durationMinutes} min</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'capstone' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Senior Portfolio Project
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{program.capstoneProject.title}</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {program.capstoneProject.description}
                </p>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Mandatory Capstone Deliverables:
                </h4>
                <div className="space-y-2.5">
                  {program.capstoneProject.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    {program.careerOutcomes.avgStartingSalary}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Average Starting Base</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-2xl font-bold text-white font-mono">
                    {program.careerOutcomes.placementRate}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Hired Within 180 Days</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-2xl font-bold text-indigo-400 font-mono">
                    KSh {program.tuition.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Tuition / ISA Available</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Target Job Titles for Graduates:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {program.careerOutcomes.roles.map((role) => (
                    <div key={role} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Close Syllabus
            </button>
            {onOpenNotes && (
              <button
                onClick={() => {
                  onClose();
                  onOpenNotes(program.id);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Read Full Program Notes</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onGoToDashboard();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>View Student Academic Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onEnroll(program.id);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Apply for Next Cohort
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
