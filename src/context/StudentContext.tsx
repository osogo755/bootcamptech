import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, Program, ProgramId, Assignment } from '../types';
import { MOCK_STUDENTS } from '../data/mockStudents';
import { PROGRAMS } from '../data/programsData';

interface StudentContextType {
  currentStudent: StudentProfile | null;
  allStudents: StudentProfile[];
  currentProgram: Program;
  stats: {
    completionPercent: number;
    completedLessons: number;
    totalLessons: number;
    gradedAssignmentsCount: number;
    pendingAssignmentsCount: number;
    averageScore: number;
  };
  login: (email: string) => boolean;
  loginAsDemoStudent: (studentId: string) => void;
  registerStudent: (name: string, email: string, programId: ProgramId, cohortType: 'Full-time Immersive' | 'Part-time Flex') => void;
  logout: () => void;
  toggleLessonCompletion: (lessonId: string) => void;
  submitAssignment: (assignmentId: string, githubUrl: string, notes: string) => void;
  bookMentorSlot: (mentorName: string, topic: string, datetime: string) => void;
  switchEnrolledProgram: (programId: ProgramId) => void;
  issueCertificate: () => void;
  updateAttendance: (newAttendance: number) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEY = 'callie_bootcamp_students_v3';
const ACTIVE_STUDENT_KEY = 'callie_bootcamp_active_student_id';

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return MOCK_STUDENTS;
  });

  const [activeStudentId, setActiveStudentId] = useState<string | null>(() => {
    try {
      const savedId = localStorage.getItem(ACTIVE_STUDENT_KEY);
      if (savedId) return savedId;
    } catch {
      // fallback
    }
    return 'std-101'; // Default Elena Rostova for immediate rich experience
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (err) {
      console.error('Error saving students to localStorage:', err);
    }
  }, [students]);

  useEffect(() => {
    try {
      if (activeStudentId) {
        localStorage.setItem(ACTIVE_STUDENT_KEY, activeStudentId);
      } else {
        localStorage.removeItem(ACTIVE_STUDENT_KEY);
      }
    } catch (err) {
      console.error('Error saving activeStudentId:', err);
    }
  }, [activeStudentId]);

  const currentStudent = students.find((s) => s.id === activeStudentId) || null;

  const currentProgram = currentStudent
    ? PROGRAMS[currentStudent.enrolledProgramId] || PROGRAMS['software-engineering']
    : PROGRAMS['software-engineering'];

  // Calculate Academic Stats
  const allLessons = currentProgram.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = currentStudent
    ? allLessons.filter((l) => currentStudent.completedLessonIds.includes(l.id)).length
    : 0;
  const completionPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const assignments = currentStudent?.assignments || [];
  const gradedAssignments = assignments.filter((a) => a.status === 'graded' && typeof a.score === 'number');
  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const averageScore = gradedAssignments.length > 0
    ? Math.round(gradedAssignments.reduce((acc, curr) => acc + (curr.score || 0), 0) / gradedAssignments.length)
    : 0;

  const login = (email: string): boolean => {
    const found = students.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      setActiveStudentId(found.id);
      return true;
    }
    // If not found, log into default or create instant profile
    const newStudent: StudentProfile = {
      id: `std-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      enrolledProgramId: 'software-engineering',
      cohortId: 'SWE-2026-FLEX',
      cohortStartDate: 'October 2026',
      cohortType: 'Full-time Immersive',
      currentWeek: 1,
      gpa: 4.0,
      attendancePercent: 100,
      streakDays: 1,
      completedLessonIds: [],
      assignments: [
        {
          id: `asg-${Date.now()}`,
          title: 'Foundational Programming Environment Setup',
          week: 1,
          dueDate: 'Next Week',
          category: 'Coding Lab',
          totalPoints: 100,
          status: 'pending'
        }
      ],
      badges: [
        {
          id: 'b-welcome',
          title: 'New Initiate',
          description: 'Enrolled in Callie Tech Academy',
          icon: 'Sparkles',
          earnedDate: 'Today'
        }
      ],
      bookedSessions: []
    };
    setStudents((prev) => [newStudent, ...prev]);
    setActiveStudentId(newStudent.id);
    return true;
  };

  const loginAsDemoStudent = (studentId: string) => {
    setActiveStudentId(studentId);
  };

  const registerStudent = (
    name: string,
    email: string,
    programId: ProgramId,
    cohortType: 'Full-time Immersive' | 'Part-time Flex'
  ) => {
    const newStudent: StudentProfile = {
      id: `std-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      enrolledProgramId: programId,
      cohortId: `${programId.slice(0, 3).toUpperCase()}-2026-NEW`,
      cohortStartDate: 'November 2026',
      cohortType,
      currentWeek: 1,
      gpa: 4.0,
      attendancePercent: 100,
      streakDays: 1,
      completedLessonIds: [],
      assignments: [
        {
          id: `asg-${Date.now()}-1`,
          title: `${PROGRAMS[programId].name} Orientation & Toolchain Setup`,
          week: 1,
          dueDate: 'Next Monday',
          category: 'Coding Lab',
          totalPoints: 100,
          status: 'pending'
        }
      ],
      badges: [
        {
          id: `b-${Date.now()}`,
          title: 'Enrolled Scholar',
          description: `Began ${PROGRAMS[programId].name} Journey`,
          icon: 'Sparkles',
          earnedDate: 'Today'
        }
      ],
      bookedSessions: []
    };
    setStudents((prev) => [newStudent, ...prev]);
    setActiveStudentId(newStudent.id);
  };

  const logout = () => {
    setActiveStudentId(null);
  };

  const toggleLessonCompletion = (lessonId: string) => {
    if (!currentStudent) return;
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== currentStudent.id) return student;
        const isCompleted = student.completedLessonIds.includes(lessonId);
        const updatedCompleted = isCompleted
          ? student.completedLessonIds.filter((id) => id !== lessonId)
          : [...student.completedLessonIds, lessonId];
        
        return {
          ...student,
          completedLessonIds: updatedCompleted,
          streakDays: !isCompleted ? student.streakDays + 1 : student.streakDays
        };
      })
    );
  };

  const submitAssignment = (assignmentId: string, githubUrl: string, notes: string) => {
    if (!currentStudent) return;
    const simulatedScore = Math.floor(Math.random() * 8) + 92; // 92-100 realistic top grade

    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== currentStudent.id) return student;
        const updatedAssignments = student.assignments.map((asg) => {
          if (asg.id === assignmentId) {
            return {
              ...asg,
              status: 'graded' as const,
              score: simulatedScore,
              githubUrl: githubUrl || asg.githubUrl,
              notes: notes || asg.notes,
              submissionDate: 'Just now',
              feedback: 'Instructor evaluation: Excellent execution, robust handling of edge-cases, and clean documentation.'
            };
          }
          return asg;
        });

        // Recalculate GPA based on graded assignments
        const graded = updatedAssignments.filter((a) => a.status === 'graded' && typeof a.score === 'number');
        const avgPct = graded.length > 0 ? graded.reduce((a, b) => a + (b.score || 0), 0) / graded.length : 100;
        const calculatedGpa = Number(((avgPct / 100) * 4.0).toFixed(2));

        return {
          ...student,
          assignments: updatedAssignments,
          gpa: calculatedGpa
        };
      })
    );
  };

  const bookMentorSlot = (mentorName: string, topic: string, datetime: string) => {
    if (!currentStudent) return;
    const newSession = {
      id: `bs-${Date.now()}`,
      mentorName,
      topic,
      datetime,
      status: 'confirmed' as const
    };
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== currentStudent.id) return student;
        return {
          ...student,
          bookedSessions: [newSession, ...student.bookedSessions]
        };
      })
    );
  };

  const switchEnrolledProgram = (programId: ProgramId) => {
    if (!currentStudent) return;
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== currentStudent.id) return student;
        return {
          ...student,
          enrolledProgramId: programId,
          cohortId: `${programId.slice(0, 3).toUpperCase()}-2026-ENR`
        };
      })
    );
  };

  const issueCertificate = () => {
    if (!currentStudent) return;
    const hash = '0x' + Array.from({ length: 30 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const certNumber = `CL-${currentStudent.enrolledProgramId.slice(0, 3).toUpperCase()}-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== currentStudent.id) return student;
        return {
          ...student,
          certificateIssued: {
            issueDate: today,
            certificateNumber: certNumber,
            verificationHash: hash
          }
        };
      })
    );
  };

  const updateAttendance = (newAttendance: number) => {
    if (!currentStudent) return;
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== currentStudent.id) return student;
        return {
          ...student,
          attendancePercent: Math.min(100, Math.max(0, newAttendance))
        };
      })
    );
  };

  return (
    <StudentContext.Provider
      value={{
        currentStudent,
        allStudents: students,
        currentProgram,
        stats: {
          completionPercent,
          completedLessons,
          totalLessons,
          gradedAssignmentsCount: gradedAssignments.length,
          pendingAssignmentsCount: pendingAssignments.length,
          averageScore
        },
        login,
        loginAsDemoStudent,
        registerStudent,
        logout,
        toggleLessonCompletion,
        submitAssignment,
        bookMentorSlot,
        switchEnrolledProgram,
        issueCertificate,
        updateAttendance
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
