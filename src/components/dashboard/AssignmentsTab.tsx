import React, { useState } from 'react';
import { 
  FileCode, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Send, 
  Sparkles, 
  MessageSquare, 
  GitBranch, 
  Award,
  AlertTriangle,
  X
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { Assignment } from '../../types';
import { triggerConfetti } from '../../utils/confetti';

export const AssignmentsTab: React.FC = () => {
  const { currentStudent, submitAssignment } = useStudent();
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');
  
  // Submission modal state
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  if (!currentStudent) return null;

  const assignments = currentStudent.assignments;
  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'graded') return a.status === 'graded';
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment) return;

    submitAssignment(submittingAssignment.id, githubUrl, notes);
    triggerConfetti();
    setSubmissionSuccess(true);

    setTimeout(() => {
      setSubmissionSuccess(false);
      setSubmittingAssignment(null);
      setGithubUrl('');
      setNotes('');
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-2">
            ACADEMIC ASSIGNMENTS &amp; PROJECTS
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Assignment Submissions &amp; Evaluations</h2>
          <p className="text-xs text-slate-400 mt-1">
            Submit your coding repositories, architecture audits, and capstone drafts for faculty review.
          </p>
        </div>

        {/* Filter */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({assignments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'pending' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending ({assignments.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('graded')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === 'graded' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Graded ({assignments.filter((a) => a.status === 'graded').length})
          </button>
        </div>
      </div>

      {/* Assignment Cards List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => {
          const isGraded = asg.status === 'graded';
          const isPending = asg.status === 'pending';

          return (
            <div
              key={asg.id}
              className={`rounded-3xl border p-6 transition-all ${
                isGraded
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-slate-900 border-indigo-500/30 shadow-lg shadow-indigo-500/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                      WEEK {asg.week} • {asg.category}
                    </span>
                    <span className="text-xs text-slate-400">Total: {asg.totalPoints} pts</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{asg.title}</h3>
                </div>

                {/* Score & Status Badge */}
                <div className="text-right sm:text-right shrink-0">
                  {isGraded ? (
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Score: {asg.score}%</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">Submitted: {asg.submissionDate}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Due {asg.dueDate}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submitted Artifact / Notes */}
              {asg.githubUrl && (
                <div className="mb-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300 font-mono truncate">
                    <GitBranch className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate">{asg.githubUrl}</span>
                  </div>
                  <a
                    href={asg.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>View Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Instructor Evaluation Feedback */}
              {asg.feedback && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Faculty Code Review &amp; Rubric Feedback:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">
                    "{asg.feedback}"
                  </p>
                </div>
              )}

              {/* Action buttons */}
              {isPending && (
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Ready for grading? Submit your GitHub repository or solution writeup.
                  </span>
                  <button
                    onClick={() => {
                      setSubmittingAssignment(asg);
                      setGithubUrl(`https://github.com/${currentStudent.name.toLowerCase().replace(' ', '-')}/week${asg.week}-solution`);
                      setNotes('Completed all core requirements and unit tests.');
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Work</span>
                  </button>
                </div>
              )}

              {isGraded && (
                <div className="mt-3 text-right">
                  <button
                    onClick={() => {
                      setSubmittingAssignment(asg);
                      setGithubUrl(asg.githubUrl || '');
                      setNotes(asg.notes || '');
                    }}
                    className="text-xs text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    Resubmit Updated Artifact
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setSubmittingAssignment(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assignment Submission Portal</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{submittingAssignment.title}</h3>
            <p className="text-xs text-slate-400 mb-5">
              Week {submittingAssignment.week} • {submittingAssignment.category} ({submittingAssignment.totalPoints} points)
            </p>

            {submissionSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Work Submitted &amp; Graded!</h4>
                <p className="text-xs text-slate-300">
                  Faculty feedback and updated GPA recorded.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    GitHub / Cloud Project URL
                  </label>
                  <input
                    type="url"
                    required
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/project-repo"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student Notes / Implementation Highlights
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe design decisions, challenges resolved, and instructions to test your code..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-300">Grading Rubric Standards:</div>
                  <div>• Clean architecture, documentation, and error handling (40%)</div>
                  <div>• Successful unit test execution &amp; benchmark performance (40%)</div>
                  <div>• Security posture and input validation checks (20%)</div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmittingAssignment(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit &amp; Evaluate</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
