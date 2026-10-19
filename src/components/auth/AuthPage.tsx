import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Lock, 
  Mail, 
  Sparkles,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { ProgramId } from '../../types';
import { PROGRAMS } from '../../data/programsData';

interface AuthPageProps {
  onSuccess: () => void;
  onCancel: () => void;
  defaultProgramId?: ProgramId;
}

export const AuthPage: React.FC<AuthPageProps> = ({ 
  onSuccess, 
  onCancel,
  defaultProgramId = 'software-engineering'
}) => {
  const { allStudents, login, loginAsDemoStudent, registerStudent } = useStudent();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<ProgramId>(defaultProgramId);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    const success = login(email);
    if (success) onSuccess();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      setError('Please fill in your name and email');
      return;
    }
    registerStudent(fullName, email, selectedProgram, 'Full-time Immersive');
    onSuccess();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 py-10 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">
        
        {/* Top Back link */}
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* 1-Click Demo Profiles Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>1-Click Demo Logins</span>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            Click any student to test their active dashboard and academic progress:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allStudents.slice(0, 5).map((student) => {
              const progName = PROGRAMS[student.enrolledProgramId]?.name.split(' ')[0] || '';
              return (
                <button
                  key={student.id}
                  onClick={() => {
                    loginAsDemoStudent(student.id);
                    onSuccess();
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-950/20 text-left transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
                      {student.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {progName} • Wk {student.currentWeek}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Simple Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs mb-6">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                mode === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Student Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                mode === 'register' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              New Student Signup
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Student Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena.rostova@callie.ac.ke or your email"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    defaultValue="demo123"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Samuel Kimani"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="samuel@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enrolled Program Track
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value as ProgramId)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {Object.values(PROGRAMS).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (KSh {p.tuition.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>Create Profile &amp; Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
