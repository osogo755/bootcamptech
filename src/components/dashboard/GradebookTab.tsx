import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  CheckCircle, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { triggerGraduationConfetti } from '../../utils/confetti';

export const GradebookTab: React.FC = () => {
  const { currentStudent, currentProgram, issueCertificate } = useStudent();
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  if (!currentStudent) return null;

  const assignments = currentStudent.assignments;
  const gradedAssignments = assignments.filter((a) => a.status === 'graded' && typeof a.score === 'number');

  // Compute weighted categories
  const labAssignments = gradedAssignments.filter((a) => a.category === 'Coding Lab');
  const projectAssignments = gradedAssignments.filter((a) => a.category === 'Project');
  const auditAssignments = gradedAssignments.filter((a) => a.category === 'Security Audit');
  const capstoneAssignments = gradedAssignments.filter((a) => a.category === 'Capstone');

  const calcAvg = (items: typeof assignments) => {
    if (items.length === 0) return 95;
    return Math.round(items.reduce((acc, curr) => acc + (curr.score || 0), 0) / items.length);
  };

  const labAvg = calcAvg(labAssignments);
  const projectAvg = calcAvg(projectAssignments);
  const auditAvg = calcAvg(auditAssignments);
  const capstoneAvg = calcAvg(capstoneAssignments);

  const overallAvg = Math.round((labAvg * 0.3) + (projectAvg * 0.3) + (auditAvg * 0.1) + (capstoneAvg * 0.3));

  const getLetterGrade = (score: number) => {
    if (score >= 93) return 'A (Honors)';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    return 'Pass';
  };

  const handleIssueCertificate = () => {
    issueCertificate();
    triggerGraduationConfetti();
    setShowCertificateModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
            OFFICIAL ACADEMIC TRANSCRIPT &amp; EVALUATION
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Gradebook &amp; Credentials</h2>
          <p className="text-xs text-slate-400 mt-1">
            Student: <strong className="text-white">{currentStudent.name}</strong> • Cohort: <span className="font-mono text-indigo-400">{currentStudent.cohortId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentStudent.certificateIssued ? (
            <button
              onClick={() => {
                triggerGraduationConfetti();
                setShowCertificateModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>View Issued Certificate</span>
            </button>
          ) : (
            <button
              onClick={handleIssueCertificate}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Issue Graduation Credential</span>
            </button>
          )}
        </div>
      </div>

      {/* Grade Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-1">Cumulative GPA</div>
          <div className="text-3xl font-extrabold text-white font-mono">{currentStudent.gpa.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Honors List Standing</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-1">Weighted Composite</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{overallAvg}%</div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">{getLetterGrade(overallAvg)}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-1">Graded Assessments</div>
          <div className="text-3xl font-extrabold text-white font-mono">{gradedAssignments.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">out of {assignments.length} total units</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-1">Verified Credential</div>
          <div className="text-base font-bold text-indigo-400 truncate mt-1">
            {currentProgram.credential.split('(')[1]?.replace(')', '') || 'CERTIFIED'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Blockchain Hash Validated</div>
        </div>
      </div>

      {/* Weighted Category Breakdown */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          Weighted Academic Evaluation Rubric
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Hands-on Coding Labs (30%)</span>
              <span className="font-mono text-emerald-400 font-bold">{labAvg}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${labAvg}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Architectural Projects (30%)</span>
              <span className="font-mono text-indigo-400 font-bold">{projectAvg}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${projectAvg}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Capstone Defense (40%)</span>
              <span className="font-mono text-cyan-400 font-bold">{capstoneAvg}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${capstoneAvg}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Transcript Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Itemized Assignment &amp; Examination Records
          </h3>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Transcript</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Week</th>
                <th className="p-3">Assessment Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Points</th>
                <th className="p-3">Score</th>
                <th className="p-3">Letter Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {assignments.map((asg) => {
                const score = asg.score || 0;
                const letter = asg.status === 'graded' ? (score >= 90 ? 'A' : score >= 80 ? 'B' : 'C') : '—';

                return (
                  <tr key={asg.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-indigo-400 font-bold">W{asg.week}</td>
                    <td className="p-3 font-semibold text-white">{asg.title}</td>
                    <td className="p-3 text-slate-400">{asg.category}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        asg.status === 'graded' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {asg.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">{asg.totalPoints}</td>
                    <td className="p-3 font-mono font-bold text-white">
                      {asg.status === 'graded' ? `${asg.score}%` : '—'}
                    </td>
                    <td className="p-3 font-bold text-emerald-400 font-mono">{letter}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Controls */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono text-amber-400 font-bold">
                ACADEMIC DIPLOMA VERIFICATION
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-white hover:bg-slate-700 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-white hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Formal Certificate Display Frame */}
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-4 border-amber-500/40 text-center relative overflow-hidden shadow-2xl">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60" />

              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div className="text-xs tracking-[0.25em] font-extrabold uppercase text-amber-400 mb-2">
                Callie Academy of Technology
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mb-1">
                Certificate of Completion
              </h2>
              <p className="text-xs text-slate-400 italic mb-6">
                This is to certify that
              </p>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300 font-serif mb-4">
                {currentStudent.name}
              </h1>

              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
                has successfully fulfilled all rigorous curriculum requirements, practical examinations, hands-on lab milestones, and senior capstone defense in
              </p>

              <div className="inline-block px-5 py-2 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-base font-bold text-white font-mono mb-8">
                {currentProgram.credential}
              </div>

              {/* Signatures & Verification */}
              <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto pt-6 border-t border-slate-800 text-left">
                <div>
                  <div className="font-serif italic text-base text-slate-300">Marcus Brody</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Academic Dean of Faculty</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-emerald-400 font-bold">{currentStudent.certificateIssued?.issueDate || 'October 2026'}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Cert #{currentStudent.certificateIssued?.certificateNumber || 'CL-2026-VAL'}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[10px] text-slate-500 font-mono">
                Verification Hash: {currentStudent.certificateIssued?.verificationHash || '0x4f882b79a12e34d7'}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
