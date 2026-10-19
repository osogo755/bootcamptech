import React from 'react';
import { 
  Trophy, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  ArrowRight, 
  Play, 
  FileCode, 
  ExternalLink, 
  AlertCircle,
  TrendingUp,
  Sparkles,
  Award
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { UPCOMING_LIVE_SESSIONS } from '../../data/programsData';
import { triggerConfetti } from '../../utils/confetti';

interface OverviewTabProps {
  onNavigateTab: (tab: 'curriculum' | 'assignments' | 'labs' | 'gradebook' | 'mentorship') => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { currentStudent, currentProgram, stats, toggleLessonCompletion } = useStudent();

  if (!currentStudent) return null;

  // Active module (based on student.currentWeek)
  const activeModule = currentProgram.modules.find((m) => m.week === currentStudent.currentWeek) || currentProgram.modules[0];
  const upcomingAssignments = currentStudent.assignments.filter((a) => a.status === 'pending');
  const relevantLiveSession = UPCOMING_LIVE_SESSIONS.find((s) => s.programId === currentStudent.enrolledProgramId) || UPCOMING_LIVE_SESSIONS[0];

  const handleLessonCheck = (lessonId: string) => {
    toggleLessonCompletion(lessonId);
    triggerConfetti();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Academic Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Overall Syllabus Completion */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Program Progress</span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
              Week {currentStudent.currentWeek} of {currentProgram.durationWeeks}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{stats.completionPercent}%</span>
            <span className="text-xs text-slate-400 font-medium">({stats.completedLessons}/{stats.totalLessons} Units)</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 mt-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercent}%` }}
            />
          </div>
        </div>

        {/* Stat 2: Cumulative GPA */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Cumulative GPA</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Honors Standing
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{currentStudent.gpa.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-medium">/ 4.00 Max</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Average Lab Score: <strong className="text-slate-200">{stats.averageScore}%</strong></span>
          </div>
        </div>

        {/* Stat 3: Attendance Rate */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Cohort Attendance</span>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
              Synchronous
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{currentStudent.attendancePercent}%</span>
            <span className="text-xs text-slate-400 font-medium">Punctuality</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>0 unexcused absences recorded</span>
          </div>
        </div>

        {/* Stat 4: Daily Learning Streak */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Learning Streak</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Active</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{currentStudent.streakDays}</span>
            <span className="text-xs text-slate-400 font-medium">Consecutive Days</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Bonus XP multiplier unlocked</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Current Week Module Focus & Next Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Current Module Focus */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold">
                  ACTIVE SYLLABUS: WEEK {activeModule.week}
                </span>
                <span className="text-xs text-slate-400">• {currentProgram.name}</span>
              </div>
              <button
                onClick={() => onNavigateTab('curriculum')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>View Full {currentProgram.durationWeeks}-Week Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{activeModule.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {activeModule.description}
            </p>

            {/* Checklist of this week's units */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Week {activeModule.week} Learning Units (Click checkbox to update progress):
              </div>
              {activeModule.lessons.map((lesson) => {
                const isCompleted = currentStudent.completedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonCheck(lesson.id)}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                      isCompleted
                        ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                        : 'bg-slate-950 border-slate-700/80 hover:border-indigo-500/60 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="text-slate-500 group-hover:text-indigo-400 transition-colors"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div>
                        <div className={`text-xs sm:text-sm font-semibold transition-colors ${
                          isCompleted ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'
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
                              <span className="text-emerald-400 font-mono">Score: {lesson.score}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {lesson.type === 'lab' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateTab('labs');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold hover:bg-indigo-500/30 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <FileCode className="w-3 h-3" />
                          <span>Launch Sandbox</span>
                        </button>
                      )}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Sandbox Action Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-950 border border-indigo-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Hands-on Cloud Lab Sandbox</h4>
                  <p className="text-[11px] text-slate-400">
                    Run interactive Kali commands, SQL queries, or TypeScript code without installing local tools.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('labs')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer whitespace-nowrap"
              >
                Open Virtual Lab
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Live Cohort, Deadlines & Badges */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Cohort Class Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Live Cohort Session
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Zoom / Meet</span>
            </div>

            <h4 className="text-sm font-bold text-white mb-2 leading-snug">
              {relevantLiveSession.title}
            </h4>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 mb-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{relevantLiveSession.date} • {relevantLiveSession.time}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <img
                  src={relevantLiveSession.instructorAvatar}
                  alt={relevantLiveSession.instructor}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="truncate">{relevantLiveSession.instructor}</span>
              </div>
            </div>

            <a
              href={relevantLiveSession.meetingUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();
                alert(`Launching simulated synchronous live cohort room for ${relevantLiveSession.title}...`);
              }}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Join Live Classroom</span>
            </a>
          </div>

          {/* Pending Deadlines */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Upcoming Deadlines ({upcomingAssignments.length})
              </h4>
              <button
                onClick={() => onNavigateTab('assignments')}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Submit →
              </button>
            </div>

            <div className="space-y-3">
              {upcomingAssignments.slice(0, 3).map((asg) => (
                <div key={asg.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">{asg.category}</span>
                    <span className="text-[10px] text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Due {asg.dueDate}</span>
                    </span>
                  </div>
                  <div className="font-semibold text-white truncate">{asg.title}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{asg.totalPoints} Points</span>
                    <button
                      onClick={() => onNavigateTab('assignments')}
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      Open Rubric &amp; Submit
                    </button>
                  </div>
                </div>
              ))}
              {upcomingAssignments.length === 0 && (
                <div className="text-center py-4 text-xs text-slate-500">
                  All current assignments are submitted &amp; graded!
                </div>
              )}
            </div>
          </div>

          {/* Earned Milestone Badges */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Earned Badges ({currentStudent.badges.length})
                </h4>
              </div>
              <button
                onClick={() => onNavigateTab('gradebook')}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Certificate →
              </button>
            </div>

            <div className="space-y-2.5">
              {currentStudent.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{badge.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{badge.description}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">Earned {badge.earnedDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
