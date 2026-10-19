import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Play, 
  BookOpen, 
  FileCode, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ExternalLink,
  Sparkles,
  Lock
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { triggerConfetti } from '../../utils/confetti';

interface CurriculumTabProps {
  onLaunchLab: () => void;
}

export const CurriculumTab: React.FC<CurriculumTabProps> = ({ onLaunchLab }) => {
  const { currentStudent, currentProgram, toggleLessonCompletion } = useStudent();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [currentProgram.modules[0]?.id || '']: true
  });
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  if (!currentStudent) return null;

  const toggleExpand = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    currentProgram.modules.forEach((m) => {
      all[m.id] = true;
    });
    setExpandedModules(all);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  const handleToggle = (lessonId: string) => {
    toggleLessonCompletion(lessonId);
    triggerConfetti();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Tab Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-2">
            SYLLABUS &amp; LEARNING ROADMAP
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{currentProgram.name}</h2>
          <p className="text-xs text-slate-400 mt-1">
            {currentProgram.durationWeeks} Weeks • {currentProgram.modules.length} Full Modules • Track progress by checking off completed units.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Modules
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === 'pending' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === 'completed' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Completed
            </button>
          </div>

          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            Collapse
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {currentProgram.modules.map((mod) => {
          const modCompletedLessons = mod.lessons.filter((l) => currentStudent.completedLessonIds.includes(l.id));
          const isModFullyCompleted = modCompletedLessons.length === mod.lessons.length && mod.lessons.length > 0;
          const isExpanded = expandedModules[mod.id] ?? false;

          if (filter === 'completed' && !isModFullyCompleted) return null;
          if (filter === 'pending' && isModFullyCompleted) return null;

          return (
            <div
              key={mod.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isModFullyCompleted
                  ? 'bg-slate-900/60 border-slate-800/80'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Module Header Bar */}
              <div
                onClick={() => toggleExpand(mod.id)}
                className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3.5">
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                    isModFullyCompleted
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  }`}>
                    WEEK {mod.week}
                  </span>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {mod.title}
                    </h3>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {mod.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono font-semibold text-white">
                      {modCompletedLessons.length}/{mod.lessons.length}
                    </span>
                    <span className="text-[11px] text-slate-400 block">Units Finished</span>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Module Content when expanded */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4">
                  
                  {/* Learning Objectives */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Competencies for Week {mod.week}:
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mod.learningObjectives.map((obj, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lessons list */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Interactive Lessons &amp; Practical Exercises:
                    </div>
                    {mod.lessons.map((lesson) => {
                      const completed = currentStudent.completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            completed
                              ? 'bg-slate-950/40 border-slate-800/70'
                              : 'bg-slate-950 border-slate-800 hover:border-indigo-500/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleToggle(lesson.id)}
                              className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
                            >
                              {completed ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>

                            <div>
                              <div className={`text-xs sm:text-sm font-semibold ${
                                completed ? 'line-through text-slate-500' : 'text-slate-200'
                              }`}>
                                {lesson.title}
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span className="capitalize">{lesson.type}</span>
                                <span>•</span>
                                <span>{lesson.durationMinutes} min</span>
                                {lesson.score && (
                                  <>
                                    <span>•</span>
                                    <span className="text-emerald-400 font-mono font-semibold">
                                      Score: {lesson.score}%
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.type === 'lab' && (
                              <button
                                onClick={onLaunchLab}
                                className="px-3 py-1 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-600/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <FileCode className="w-3.5 h-3.5" />
                                <span>Launch Lab</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleToggle(lesson.id)}
                              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                completed
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {completed ? 'Done ✓' : 'Mark Done'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
