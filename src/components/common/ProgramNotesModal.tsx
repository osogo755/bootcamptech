import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Clock, 
  Copy, 
  Check, 
  Search, 
  Printer, 
  Code2, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  FileText
} from 'lucide-react';
import { ProgramId, TopicNote } from '../../types';
import { PROGRAM_STUDY_GUIDES } from '../../data/programNotesData';
import { PROGRAMS } from '../../data/programsData';

interface ProgramNotesModalProps {
  initialProgramId: ProgramId;
  initialTopicId?: string;
  onClose: () => void;
}

export const ProgramNotesModal: React.FC<ProgramNotesModalProps> = ({
  initialProgramId,
  initialTopicId,
  onClose
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>(initialProgramId);
  const guide = PROGRAM_STUDY_GUIDES[selectedProgramId] || PROGRAM_STUDY_GUIDES['software-engineering'];

  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || guide.topics[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const activeTopic = guide.topics.find((t) => t.id === selectedTopicId) || guide.topics[0];

  const filteredTopics = guide.topics.filter((t) => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400">
                  Official Course Notes &amp; Handbook
                </span>
                <span className="text-xs text-slate-400 hidden md:inline">
                  Lead: {guide.leadInstructor}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {guide.programTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Program Switcher */}
            <select
              value={selectedProgramId}
              onChange={(e) => {
                const nextId = e.target.value as ProgramId;
                setSelectedProgramId(nextId);
                const nextGuide = PROGRAM_STUDY_GUIDES[nextId];
                if (nextGuide && nextGuide.topics.length > 0) {
                  setSelectedTopicId(nextGuide.topics[0].id);
                }
              }}
              className="bg-slate-900 text-slate-200 border border-slate-700 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              {Object.values(PROGRAMS).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => window.print()}
              title="Print Notes"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cheat Sheet Top Bar */}
        <div className="px-5 py-3 bg-indigo-950/30 border-b border-indigo-900/30 text-xs text-slate-300 shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-bold text-indigo-300 shrink-0">Faculty Rule:</span>
          <span className="italic truncate">{guide.cheatSheetSummary[0]}</span>
        </div>

        {/* Main Body (Split 2-columns: Sidebar + Notes Reader) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Topics Sidebar (4 cols) */}
          <div className="md:col-span-4 border-r border-slate-800 bg-slate-950/70 p-4 flex flex-col gap-3 overflow-y-auto">
            {/* Search filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes & topics..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Lecture Modules ({filteredTopics.length}):
            </div>

            <div className="space-y-1.5 overflow-y-auto pr-1">
              {filteredTopics.map((topic) => {
                const isActive = topic.id === activeTopic?.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-400">
                          W{topic.week}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{topic.readingTimeMinutes} min</span>
                        </span>
                      </div>
                      <div className="line-clamp-2 leading-snug">{topic.title}</div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 transition-transform ${isActive ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Study Notes Reader (8 cols) */}
          <div className="md:col-span-8 p-5 sm:p-7 overflow-y-auto space-y-6 bg-slate-900">
            {activeTopic ? (
              <div>
                {/* Topic Header */}
                <div className="border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-xs text-indigo-400 mb-1.5 font-semibold">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 font-mono">WEEK {activeTopic.week}</span>
                    <span>• {activeTopic.readingTimeMinutes} Minute Core Study Guide</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeTopic.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {activeTopic.summary}
                  </p>
                </div>

                {/* Topic Sections */}
                <div className="space-y-6">
                  {activeTopic.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                        <span>{section.heading}</span>
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {section.content}
                      </p>

                      {/* Code Snippet if present */}
                      {section.codeSnippet && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
                          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                            <span className="font-mono text-indigo-300 font-semibold lowercase">
                              {section.codeSnippet.language}
                            </span>
                            <button
                              onClick={() => handleCopyCode(section.codeSnippet!.code, `${activeTopic.id}-${idx}`)}
                              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                            >
                              {copiedCodeId === `${activeTopic.id}-${idx}` ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Snippet</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                            {section.codeSnippet.code}
                          </pre>
                        </div>
                      )}

                      {/* Key Takeaways */}
                      {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 mt-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Key Takeaways &amp; Exam Checklist:
                          </div>
                          {section.keyTakeaways.map((takeaway, tIdx) => (
                            <div key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{takeaway}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cheat Sheet Box at bottom */}
                <div className="mt-8 pt-6 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Program Quick Reference Rules:</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {guide.cheatSheetSummary.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select a topic from the sidebar to view full notes.
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0 px-5">
          <span>Callie Academy Student Academic Resource</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Notes
          </button>
        </div>

      </div>
    </div>
  );
};
