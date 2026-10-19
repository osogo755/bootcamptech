import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Award, 
  BookOpen, 
  FileCode, 
  Send, 
  Printer, 
  ChevronDown, 
  Sparkles, 
  ArrowLeft, 
  Play, 
  Terminal,
  Clock,
  ExternalLink,
  Flame,
  Check,
  BookMarked,
  Copy,
  Search,
  ChevronRight
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { PROGRAMS } from '../../data/programsData';
import { PROGRAM_STUDY_GUIDES } from '../../data/programNotesData';
import { ProgramId, Assignment, TopicNote } from '../../types';
import { triggerConfetti, triggerGraduationConfetti } from '../../utils/confetti';
import { ProgramNotesModal } from '../common/ProgramNotesModal';

interface DashboardLayoutProps {
  onBackToHome: () => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onBackToHome, onLogout }) => {
  const { 
    currentStudent, 
    currentProgram, 
    stats, 
    switchEnrolledProgram, 
    toggleLessonCompletion,
    submitAssignment,
    issueCertificate,
    allStudents,
    loginAsDemoStudent
  } = useStudent();

  const [activeTab, setActiveTab] = useState<'modules' | 'notes' | 'assignments' | 'certificate'>('modules');
  const [showProgramPicker, setShowProgramPicker] = useState(false);
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [labCommandOutput, setLabCommandOutput] = useState<string>('Click "Run Lab Test" to simulate code execution...');
  
  // Dedicated notes state for dashboard notes tab
  const [activeNoteProgramId, setActiveNoteProgramId] = useState<ProgramId>(currentProgram.id);
  const currentGuide = PROGRAM_STUDY_GUIDES[activeNoteProgramId] || PROGRAM_STUDY_GUIDES['software-engineering'];
  const [selectedTopicId, setSelectedTopicId] = useState<string>(currentGuide.topics[0]?.id || '');
  const [notesSearch, setNotesSearch] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Popup modal state for quick "Read Notes" from module cards
  const [popupNotesProgram, setPopupNotesProgram] = useState<ProgramId | null>(null);
  const [popupTopicId, setPopupTopicId] = useState<string | undefined>(undefined);

  if (!currentStudent) return null;

  const activeTopic = currentGuide.topics.find((t) => t.id === selectedTopicId) || currentGuide.topics[0];

  const handleToggle = (lessonId: string) => {
    toggleLessonCompletion(lessonId);
    triggerConfetti();
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment) return;
    submitAssignment(submittingAssignment.id, githubUrl, 'Completed requirements');
    triggerConfetti();
    setSubmittingAssignment(null);
    setGithubUrl('');
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleOpenTopicNotes = (week: number) => {
    // Find matching topic in study guide
    const topic = currentGuide.topics.find((t) => t.week === week) || currentGuide.topics[0];
    if (topic) {
      setSelectedTopicId(topic.id);
      setActiveTab('notes');
    }
  };

  const handleRunLab = () => {
    triggerConfetti();
    if (currentProgram.id === 'ethical-hacking' || currentProgram.id === 'cyber-security') {
      setLabCommandOutput(
        '[+] Kali Linux Scan: Target 10.0.4.12\n' +
        'PORT 80/tcp  OPEN  nginx 1.18.0\n' +
        'PORT 5432/tcp OPEN  postgresql 14.5\n' +
        '✅ Lab Test Passed: Target service mapped and reported.'
      );
    } else if (currentProgram.id === 'data-science') {
      setLabCommandOutput(
        '[+] Python Pandas Pipeline:\n' +
        'DataFrame Shape: (12500, 8)\n' +
        'Model Accuracy: 96.4% • RMSE: 0.082\n' +
        '✅ Lab Test Passed: Training completed with cross-validation.'
      );
    } else {
      setLabCommandOutput(
        '[+] Node.js / TypeScript Test Runner:\n' +
        'PASS src/services/rate-limiter.test.ts (4 tests passed, 0 failed)\n' +
        'Execution Time: 42ms\n' +
        '✅ Lab Test Passed: All assertions succeeded.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Simple Student Bar */}
      <div className="border-b border-slate-800 bg-slate-900/90 py-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/40"
            />

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">{currentStudent.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {currentStudent.cohortId}
                </span>
              </div>

              {/* Quick Program Switcher */}
              <div className="relative mt-0.5">
                <button
                  onClick={() => setShowProgramPicker(!showProgramPicker)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  <span>Program: {currentProgram.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showProgramPicker && (
                  <div 
                    className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl p-2 z-50 text-xs"
                    onMouseLeave={() => setShowProgramPicker(false)}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">
                      Switch Active Track:
                    </div>
                    {Object.values(PROGRAMS).map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => {
                          switchEnrolledProgram(prog.id);
                          setActiveNoteProgramId(prog.id);
                          setShowProgramPicker(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors cursor-pointer ${
                          prog.id === currentProgram.id
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {prog.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-400 hidden md:inline">Demo Student:</span>
            <select
              value={currentStudent.id}
              onChange={(e) => {
                loginAsDemoStudent(e.target.value);
                const st = allStudents.find(s => s.id === e.target.value);
                if (st) setActiveNoteProgramId(st.enrolledProgramId);
              }}
              className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              {allStudents.slice(0, 5).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.enrolledProgramId.split('-')[0]})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 flex-1">
        
        {/* 3 Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
              <span>Overall Progress</span>
              <span className="text-indigo-400 font-bold">{stats.completedLessons}/{stats.totalLessons} Lessons</span>
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">{stats.completionPercent}%</div>
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${stats.completionPercent}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Academic Grade &amp; GPA</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              {currentStudent.gpa.toFixed(2)} GPA
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Average Score: {stats.averageScore}% (Grade A)</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Attendance &amp; Streak</div>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">
              {currentStudent.attendancePercent}%
            </div>
            <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{currentStudent.streakDays} Day Learning Streak</span>
            </div>
          </div>
        </div>

        {/* 4 Simple Tabs (Including Full Course Notes) */}
        <div className="flex flex-wrap rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs font-bold gap-1">
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex-1 min-w-[120px] py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'modules' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Weekly Lessons</span>
          </button>

          <button
            onClick={() => {
              setActiveNoteProgramId(currentProgram.id);
              setActiveTab('notes');
            }}
            className={`flex-1 min-w-[120px] py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'notes' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookMarked className="w-4 h-4 text-amber-400" />
            <span>Program Study Notes</span>
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 min-w-[120px] py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'assignments' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Assignments ({currentStudent.assignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex-1 min-w-[120px] py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'certificate' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Certificate &amp; Lab</span>
          </button>
        </div>

        {/* TAB 1: Weekly Lessons Checklist */}
        {activeTab === 'modules' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 px-1 gap-2">
              <span>Click circle to check off lessons. Click "Study Notes" for in-depth lecture notes:</span>
              <button
                onClick={() => {
                  setActiveNoteProgramId(currentProgram.id);
                  setActiveTab('notes');
                }}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>Open Full Study Guide →</span>
              </button>
            </div>

            {currentProgram.modules.map((mod) => (
              <div key={mod.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[11px] font-bold">
                      WEEK {mod.week}
                    </span>
                    <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenTopicNotes(mod.week)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold hover:bg-indigo-900/40 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Study Notes</span>
                    </button>
                    <span className="text-[11px] text-slate-400">{mod.lessons.length} Lessons</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {mod.lessons.map((lesson) => {
                    const isDone = currentStudent.completedLessonIds.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleToggle(lesson.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                          isDone
                            ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                            : 'bg-slate-950 border-slate-800 hover:border-indigo-500 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <button type="button" className="text-slate-400">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                          <span className={`text-xs ${isDone ? 'line-through text-slate-500' : 'font-medium'}`}>
                            {lesson.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                          <span>{lesson.durationMinutes} min</span>
                          <span className={`px-2 py-0.5 rounded font-sans ${isDone ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                            {isDone ? 'Done ✓' : 'Mark'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Program Full Study Notes */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            
            {/* Notes Control Header */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">
                  <BookMarked className="w-4 h-4 text-amber-400" />
                  <span>Full Course Lecture Notes &amp; Handbooks</span>
                </div>
                <h3 className="text-lg font-bold text-white">{currentGuide.programTitle}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Faculty Lead: {currentGuide.leadInstructor}</p>
              </div>

              {/* Program Selector for Notes */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">Select Program:</span>
                <select
                  value={activeNoteProgramId}
                  onChange={(e) => {
                    const nextId = e.target.value as ProgramId;
                    setActiveNoteProgramId(nextId);
                    const guide = PROGRAM_STUDY_GUIDES[nextId];
                    if (guide && guide.topics.length > 0) {
                      setSelectedTopicId(guide.topics[0].id);
                    }
                  }}
                  className="bg-slate-950 text-slate-200 border border-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                >
                  {Object.values(PROGRAMS).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  title="Print Notes"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Rules Banner */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Core Engineering Rules &amp; Best Practices:</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-slate-300">
                {currentGuide.cheatSheetSummary.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Notes Layout (Sidebar Topics + Reader) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left 4 Cols: Topic List */}
              <div className="md:col-span-4 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Study Topics ({currentGuide.topics.length}):
                </div>
                {currentGuide.topics.map((t) => {
                  const isSelected = t.id === activeTopic?.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopicId(t.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono font-bold">
                            WEEK {t.week}
                          </span>
                          <span>• {t.readingTimeMinutes} min</span>
                        </div>
                        <div className="line-clamp-2 leading-snug">{t.title}</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right 8 Cols: Topic Reader */}
              <div className="md:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                {activeTopic ? (
                  <div>
                    <div className="border-b border-slate-800 pb-4 mb-5">
                      <div className="text-xs font-mono text-indigo-400 font-bold mb-1">
                        WEEK {activeTopic.week} STUDY GUIDE
                      </div>
                      <h2 className="text-xl font-bold text-white">{activeTopic.title}</h2>
                      <p className="text-xs text-slate-300 mt-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        {activeTopic.summary}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {activeTopic.sections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full" />
                            <span>{section.heading}</span>
                          </h4>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {section.content}
                          </p>

                          {section.codeSnippet && (
                            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
                              <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px]">
                                <span className="font-mono text-indigo-300 font-semibold lowercase">
                                  {section.codeSnippet.language}
                                </span>
                                <button
                                  onClick={() => handleCopyCode(section.codeSnippet!.code, `${activeTopic.id}-${idx}`)}
                                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                >
                                  {copiedCodeId === `${activeTopic.id}-${idx}` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-emerald-400 font-bold">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                {section.codeSnippet.code}
                              </pre>
                            </div>
                          )}

                          {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                              <div className="text-[10px] font-bold uppercase text-slate-400">Key Points:</div>
                              {section.keyTakeaways.map((point, pIdx) => (
                                <div key={pIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-slate-500">
                    Select a topic to start reading.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: Assignments Tracker */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400 px-1">
              Submit your project repository or code review notes below:
            </div>

            {currentStudent.assignments.map((asg) => {
              const isGraded = asg.status === 'graded';

              return (
                <div key={asg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-bold">
                          WEEK {asg.week} • {asg.category}
                        </span>
                        <span className="text-xs text-slate-400">Max: {asg.totalPoints} pts</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{asg.title}</h3>
                    </div>

                    <div className="text-right">
                      {isGraded ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/20">
                          <Check className="w-3.5 h-3.5" />
                          <span>Score: {asg.score}%</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => setSubmittingAssignment(asg)}
                          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Submit Work</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {asg.feedback && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                      "Instructor Feedback: {asg.feedback}"
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: Certificate & Simple Lab */}
        {activeTab === 'certificate' && (
          <div className="space-y-6">
            
            {/* Certificate of Completion Frame */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/40 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>

              <div className="text-[10px] tracking-widest font-extrabold uppercase text-amber-400">
                Callie Academy of Technology • Nairobi
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Certificate of Completion
              </h3>

              <p className="text-xs text-slate-400 italic">
                Awarded to
              </p>

              <div className="text-2xl sm:text-3xl font-extrabold text-amber-200 font-serif">
                {currentStudent.name}
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto">
                for successfully fulfilling all academic standards and practical examinations in:
              </p>

              <div className="inline-block px-4 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500/30 text-xs font-bold text-indigo-300 font-mono">
                {currentProgram.credential}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 max-w-sm mx-auto">
                <span>GPA: <strong className="text-white">{currentStudent.gpa.toFixed(2)}</strong></span>
                <span>Date: <strong className="text-white">{new Date().toLocaleDateString('en-GB')}</strong></span>
                <span>Cert: <strong className="text-white font-mono">CL-2026-VAL</strong></span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    triggerGraduationConfetti();
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Certificate</span>
                </button>
              </div>
            </div>

            {/* Simple Hands-on Sandbox Tester */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-rose-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Quick Virtual Lab Tester ({currentProgram.name})
                  </h4>
                </div>
                <button
                  onClick={handleRunLab}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Run Lab Test</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 whitespace-pre-wrap border border-slate-800">
                {labCommandOutput}
              </pre>
            </div>

          </div>
        )}

      </main>

      {/* Quick Notes Modal (if opened via module popup) */}
      {popupNotesProgram && (
        <ProgramNotesModal
          initialProgramId={popupNotesProgram}
          initialTopicId={popupTopicId}
          onClose={() => setPopupNotesProgram(null)}
        />
      )}

      {/* Simple Assignment Submission Modal */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Submit: {submittingAssignment.title}</h3>
            <p className="text-xs text-slate-400">Week {submittingAssignment.week} • {submittingAssignment.totalPoints} points</p>

            <form onSubmit={handleAssignmentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project GitHub Link or Solution URL
                </label>
                <input
                  type="url"
                  required
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/your-username/solution"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittingAssignment(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Submit &amp; Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
