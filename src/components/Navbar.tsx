import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  User, 
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface NavbarProps {
  currentView: 'home' | 'dashboard' | 'auth';
  setCurrentView: (view: 'home' | 'dashboard' | 'auth') => void;
  onScrollToPrograms: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  setCurrentView,
  onScrollToPrograms
}) => {
  const { currentStudent, allStudents, loginAsDemoStudent, logout, currentProgram } = useStudent();
  const [showStudentMenu, setShowStudentMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">Callie Academy</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">KENYA</span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5">Tech Bootcamp &amp; Student Portal</p>
          </div>
        </button>

        {/* Navigation items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentView === 'home' ? 'text-white bg-slate-800' : 'text-slate-300 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setCurrentView('home');
              onScrollToPrograms();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            5 Programs
          </button>

          {currentStudent ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>My Dashboard</span>
              </button>

              {/* Student menu */}
              <div className="relative">
                <button
                  onClick={() => setShowStudentMenu(!showStudentMenu)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800 border border-slate-800 cursor-pointer"
                >
                  <img
                    src={currentStudent.avatar}
                    alt={currentStudent.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="text-xs font-medium text-white hidden sm:inline max-w-[100px] truncate">
                    {currentStudent.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showStudentMenu && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-2 z-50 text-xs"
                    onMouseLeave={() => setShowStudentMenu(false)}
                  >
                    <div className="p-2 border-b border-slate-800 mb-2">
                      <div className="text-slate-400 text-[10px]">Signed in as:</div>
                      <div className="font-bold text-white text-sm">{currentStudent.name}</div>
                      <div className="text-indigo-400 text-[11px] capitalize">{currentStudent.enrolledProgramId.replace('-', ' ')}</div>
                    </div>

                    <div className="text-[10px] text-slate-400 font-semibold px-2 py-1 uppercase">
                      Switch Demo Student:
                    </div>
                    {allStudents.slice(0, 5).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          loginAsDemoStudent(s.id);
                          setShowStudentMenu(false);
                          setCurrentView('dashboard');
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between cursor-pointer ${
                          s.id === currentStudent.id ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-[10px] text-slate-500 capitalize">{s.enrolledProgramId.split('-')[0]}</span>
                      </button>
                    ))}

                    <div className="border-t border-slate-800 pt-2 mt-2">
                      <button
                        onClick={() => {
                          logout();
                          setShowStudentMenu(false);
                          setCurrentView('home');
                        }}
                        className="w-full text-left p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('auth')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
