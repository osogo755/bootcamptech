export type ProgramId = 
  | 'software-engineering'
  | 'data-science'
  | 'cyber-security'
  | 'ethical-hacking'
  | 'cloud-computing';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'reading' | 'lab' | 'quiz';
  completed: boolean;
  score?: number;
  resources?: { name: string; url: string }[];
}

export interface Module {
  id: string;
  week: number;
  title: string;
  description: string;
  learningObjectives: string[];
  lessons: Lesson[];
  isLocked?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  week: number;
  dueDate: string;
  category: 'Coding Lab' | 'Project' | 'Quiz' | 'Capstone' | 'Security Audit';
  totalPoints: number;
  status: 'submitted' | 'graded' | 'pending' | 'overdue';
  score?: number;
  feedback?: string;
  submissionDate?: string;
  githubUrl?: string;
  notes?: string;
}

export interface Program {
  id: ProgramId;
  name: string;
  tagline: string;
  description: string;
  durationWeeks: number;
  hoursPerWeek: number;
  credential: string;
  badgeColor: string;
  gradient: string;
  iconName: string;
  tuition: number;
  nextCohortDate: string;
  careerOutcomes: {
    roles: string[];
    avgStartingSalary: string;
    placementRate: string;
  };
  technologies: string[];
  modules: Module[];
  capstoneProject: {
    title: string;
    description: string;
    deliverables: string[];
  };
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  specialties: string[];
  availableSlots: string[];
}

export interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  programId: ProgramId;
  date: string;
  time: string;
  type: 'Lecture' | 'Live Coding' | 'Office Hours' | 'Guest Masterclass' | 'CTF War Room';
  meetingUrl: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledProgramId: ProgramId;
  cohortId: string;
  cohortStartDate: string;
  cohortType: 'Full-time Immersive' | 'Part-time Flex';
  currentWeek: number;
  gpa: number;
  attendancePercent: number;
  streakDays: number;
  completedLessonIds: string[];
  assignments: Assignment[];
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
  }[];
  bookedSessions: {
    id: string;
    mentorName: string;
    topic: string;
    datetime: string;
    status: 'confirmed' | 'completed';
  }[];
  certificateIssued?: {
    issueDate: string;
    certificateNumber: string;
    verificationHash: string;
  };
}

export interface TopicNote {
  id: string;
  title: string;
  week: number;
  summary: string;
  readingTimeMinutes: number;
  sections: {
    heading: string;
    content: string;
    codeSnippet?: {
      language: string;
      code: string;
    };
    keyTakeaways?: string[];
  }[];
}

export interface ProgramStudyGuide {
  programId: ProgramId;
  programTitle: string;
  leadInstructor: string;
  overview: string;
  cheatSheetSummary: string[];
  topics: TopicNote[];
}

