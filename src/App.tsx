import React, { useState } from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/public/Hero';
import { ProgramsCatalog } from './components/public/ProgramsCatalog';
import { AdmissionsSection } from './components/public/AdmissionsSection';
import { Footer } from './components/Footer';
import { CurriculumModal } from './components/public/CurriculumModal';
import { AuthPage } from './components/auth/AuthPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Program, ProgramId } from './types';
import { PROGRAMS } from './data/programsData';

import { ProgramNotesModal } from './components/common/ProgramNotesModal';

function MainApp() {
  const { currentStudent, switchEnrolledProgram, logout } = useStudent();
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'auth'>('home');
  const [inspectedProgram, setInspectedProgram] = useState<Program | null>(null);
  const [notesProgramId, setNotesProgramId] = useState<ProgramId | null>(null);
  const [enrollTargetProgram, setEnrollTargetProgram] = useState<ProgramId>('software-engineering');

  const handleOpenCurriculum = (program: Program) => {
    setInspectedProgram(program);
  };

  const handleEnroll = (programId?: ProgramId) => {
    if (programId) {
      setEnrollTargetProgram(programId);
    }
    setCurrentView('auth');
  };

  const handleLaunchDashboardWithTrack = (programId: ProgramId) => {
    if (currentStudent) {
      switchEnrolledProgram(programId);
      setCurrentView('dashboard');
    } else {
      setEnrollTargetProgram(programId);
      setCurrentView('auth');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onScrollToPrograms={() => {
          const el = document.getElementById('programs-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Router */}
      {currentView === 'home' && (
        <main className="flex-1">
          <Hero
            onExplorePrograms={() => {
              const el = document.getElementById('programs-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onGoToDashboard={() => {
              if (currentStudent) {
                setCurrentView('dashboard');
              } else {
                setCurrentView('auth');
              }
            }}
            onSelectProgram={(id) => {
              setInspectedProgram(PROGRAMS[id]);
            }}
          />

          <ProgramsCatalog
            onOpenCurriculum={handleOpenCurriculum}
            onOpenNotes={(id) => setNotesProgramId(id)}
            onEnroll={handleEnroll}
            onLaunchDashboardWithTrack={handleLaunchDashboardWithTrack}
          />

          <AdmissionsSection
            onApply={(id) => handleEnroll(id)}
          />

          <Footer
            onSelectProgram={(id) => setInspectedProgram(PROGRAMS[id])}
            onGoToDashboard={() => {
              if (currentStudent) setCurrentView('dashboard');
              else setCurrentView('auth');
            }}
          />

          {/* Curriculum Modal */}
          {inspectedProgram && (
            <CurriculumModal
              program={inspectedProgram}
              onClose={() => setInspectedProgram(null)}
              onOpenNotes={(id) => setNotesProgramId(id)}
              onEnroll={(id) => {
                setInspectedProgram(null);
                handleEnroll(id as ProgramId);
              }}
              onGoToDashboard={() => {
                setInspectedProgram(null);
                if (currentStudent) {
                  switchEnrolledProgram(inspectedProgram.id);
                  setCurrentView('dashboard');
                } else {
                  setCurrentView('auth');
                }
              }}
            />
          )}

          {/* Program Notes Modal */}
          {notesProgramId && (
            <ProgramNotesModal
              initialProgramId={notesProgramId}
              onClose={() => setNotesProgramId(null)}
            />
          )}
        </main>
      )}

      {currentView === 'auth' && (
        <AuthPage
          defaultProgramId={enrollTargetProgram}
          onSuccess={() => setCurrentView('dashboard')}
          onCancel={() => setCurrentView('home')}
        />
      )}

      {currentView === 'dashboard' && (
        <DashboardLayout
          onBackToHome={() => setCurrentView('home')}
          onLogout={() => {
            logout();
            setCurrentView('home');
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <MainApp />
    </StudentProvider>
  );
}
