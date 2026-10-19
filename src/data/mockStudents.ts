import { StudentProfile } from '../types';

export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: 'std-101',
    name: 'Elena Rostova',
    email: 'elena.rostova@callie.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    enrolledProgramId: 'software-engineering',
    cohortId: 'SWE-2026-ALPHA',
    cohortStartDate: 'September 1, 2026',
    cohortType: 'Full-time Immersive',
    currentWeek: 5,
    gpa: 3.88,
    attendancePercent: 98.2,
    streakDays: 24,
    completedLessonIds: [
      'se-l1-1', 'se-l1-2', 'se-l1-3', 'se-l1-4',
      'se-l2-1', 'se-l2-2', 'se-l2-3', 'se-l2-4',
      'se-l3-1', 'se-l3-2', 'se-l3-3', 'se-l3-4',
      'se-l4-1', 'se-l4-2', 'se-l4-3', 'se-l4-4',
      'se-l5-1', 'se-l5-2', 'se-l5-3', 'se-l5-4'
    ],
    assignments: [
      {
        id: 'asg-se-1',
        title: 'Full-Stack Type-Safe Query Engine',
        week: 1,
        dueDate: 'Sep 7, 2026',
        category: 'Coding Lab',
        totalPoints: 100,
        status: 'graded',
        score: 98,
        submissionDate: 'Sep 6, 2026',
        githubUrl: 'https://github.com/elena-dev/nexus-type-engine',
        feedback: 'Superb implementation of mapped types and recursive discriminant unions. Code is pristine and passes all edge-case tests.'
      },
      {
        id: 'asg-se-2',
        title: 'Virtual DOM Grid with Concurrent Transitions',
        week: 2,
        dueDate: 'Sep 14, 2026',
        category: 'Project',
        totalPoints: 100,
        status: 'graded',
        score: 95,
        submissionDate: 'Sep 13, 2026',
        githubUrl: 'https://github.com/elena-dev/react19-virtual-grid',
        feedback: 'Great use of useTransition and windowing. Memory footprint remained under 12MB during stress testing with 50,000 items.'
      },
      {
        id: 'asg-se-3',
        title: 'Hardened Express API with JWT Refresh Rotation',
        week: 3,
        dueDate: 'Sep 21, 2026',
        category: 'Coding Lab',
        totalPoints: 100,
        status: 'graded',
        score: 94,
        submissionDate: 'Sep 20, 2026',
        githubUrl: 'https://github.com/elena-dev/secure-auth-service',
        feedback: 'Well architected middleware pipeline. Excellent mitigation of CSRF via SameSite=Strict cookies.'
      },
      {
        id: 'asg-se-4',
        title: 'PostgreSQL ACID Ledger & High-Concurrency Benchmarks',
        week: 4,
        dueDate: 'Sep 28, 2026',
        category: 'Project',
        totalPoints: 100,
        status: 'graded',
        score: 96,
        submissionDate: 'Sep 27, 2026',
        githubUrl: 'https://github.com/elena-dev/postgres-ledger-benchmarks',
        feedback: 'Proper SELECT FOR UPDATE usage prevented race conditions under 1,000 parallel transaction tests.'
      },
      {
        id: 'asg-se-5',
        title: 'Redis Async Task Queue & Rate Limiter',
        week: 5,
        dueDate: 'Oct 5, 2026',
        category: 'Coding Lab',
        totalPoints: 100,
        status: 'graded',
        score: 91,
        submissionDate: 'Oct 4, 2026',
        githubUrl: 'https://github.com/elena-dev/redis-bullmq-worker',
        feedback: 'Clean sliding window rate limiter. Handled exponential backoff retry policies smoothly.'
      },
      {
        id: 'asg-se-6',
        title: 'Real-Time WebSocket Canvas Collaboration Engine',
        week: 6,
        dueDate: 'Oct 23, 2026',
        category: 'Project',
        totalPoints: 100,
        status: 'pending',
        notes: 'In active development. Implementing operational transformation and conflict resolution algorithms.'
      },
      {
        id: 'asg-se-7',
        title: 'Multi-Tenant Microservices Capstone Proposal',
        week: 8,
        dueDate: 'Nov 6, 2026',
        category: 'Capstone',
        totalPoints: 150,
        status: 'pending',
        notes: 'Architecture blueprint draft under review by mentor Marcus Brody.'
      }
    ],
    badges: [
      {
        id: 'b-1',
        title: 'TypeScript Titan',
        description: 'Achieved 100% on strict type systems and generic constraints challenge',
        icon: 'Code',
        earnedDate: 'Sep 8, 2026'
      },
      {
        id: 'b-2',
        title: 'Query Optimizer',
        description: 'Constructed an indexing strategy that reduced query latency by 92%',
        icon: 'Database',
        earnedDate: 'Sep 29, 2026'
      },
      {
        id: 'b-3',
        title: 'Consistency Champion',
        description: 'Logged 20 consecutive days of lecture attendance & code commits',
        icon: 'Flame',
        earnedDate: 'Oct 1, 2026'
      }
    ],
    bookedSessions: [
      {
        id: 'bs-1',
        mentorName: 'Marcus Brody',
        topic: 'Capstone System Architecture Review & DB Sharding',
        datetime: 'Tomorrow at 9:00 AM PDT',
        status: 'confirmed'
      }
    ]
  },

  {
    id: 'std-102',
    name: 'Marcus Chen',
    email: 'marcus.chen@callie.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    enrolledProgramId: 'ethical-hacking',
    cohortId: 'HACK-2026-BETA',
    cohortStartDate: 'September 15, 2026',
    cohortType: 'Full-time Immersive',
    currentWeek: 3,
    gpa: 3.94,
    attendancePercent: 100.0,
    streakDays: 31,
    completedLessonIds: [
      'eh-l1-1', 'eh-l1-2', 'eh-l1-3', 'eh-l1-4',
      'eh-l2-1', 'eh-l2-2', 'eh-l2-3', 'eh-l2-4',
      'eh-l3-1', 'eh-l3-2', 'eh-l3-3', 'eh-l3-4'
    ],
    assignments: [
      {
        id: 'asg-eh-1',
        title: 'Passive & Active Reconnaissance Audit on Staging Target',
        week: 1,
        dueDate: 'Sep 22, 2026',
        category: 'Security Audit',
        totalPoints: 100,
        status: 'graded',
        score: 99,
        submissionDate: 'Sep 21, 2026',
        githubUrl: 'https://github.com/marcus-sec/recon-stage-audit',
        feedback: 'Incredible OSINT work. Discovered an unmapped subdomain with an exposed staging Grafana dashboard.'
      },
      {
        id: 'asg-eh-2',
        title: 'OWASP Blind SQL Injection & Filter Bypass PoC',
        week: 2,
        dueDate: 'Sep 29, 2026',
        category: 'Coding Lab',
        totalPoints: 100,
        status: 'graded',
        score: 94,
        submissionDate: 'Sep 28, 2026',
        githubUrl: 'https://github.com/marcus-sec/sqli-time-poc',
        feedback: 'Demonstrated precise timing payload extraction without getting rate-limited.'
      },
      {
        id: 'asg-eh-3',
        title: 'Blind SSRF Cloud Metadata Exfiltration',
        week: 3,
        dueDate: 'Oct 6, 2026',
        category: 'Coding Lab',
        totalPoints: 100,
        status: 'graded',
        score: 98,
        submissionDate: 'Oct 5, 2026',
        githubUrl: 'https://github.com/marcus-sec/ssrf-metadata-pivoting',
        feedback: 'Exemplary proof-of-concept demonstrating IAM role escalation path.'
      },
      {
        id: 'asg-eh-4',
        title: 'Linux Kernel & SUID Privilege Escalation Challenge',
        week: 4,
        dueDate: 'Oct 24, 2026',
        category: 'Security Audit',
        totalPoints: 100,
        status: 'pending'
      }
    ],
    badges: [
      {
        id: 'b-h1',
        title: 'CTF First Blood',
        description: 'First student in cohort to capture all 4 flags in the Reconnaissance CTF',
        icon: 'Crosshair',
        earnedDate: 'Sep 24, 2026'
      },
      {
        id: 'b-h2',
        title: 'Zero-Day Hunter',
        description: 'Successfully drafted a comprehensive CVSS 9.8 vulnerability report',
        icon: 'Bug',
        earnedDate: 'Oct 6, 2026'
      }
    ],
    bookedSessions: [
      {
        id: 'bs-2',
        mentorName: 'Alexandre Dubois',
        topic: 'Bypassing Cloud WAF Rules & Red Team Career Paths',
        datetime: 'Friday at 11:00 AM PDT',
        status: 'confirmed'
      }
    ]
  },

  {
    id: 'std-103',
    name: 'Amina Al-Mansoor',
    email: 'amina.m@callie.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    enrolledProgramId: 'data-science',
    cohortId: 'DS-2026-GAMMA',
    cohortStartDate: 'September 1, 2026',
    cohortType: 'Full-time Immersive',
    currentWeek: 3,
    gpa: 3.96,
    attendancePercent: 99.4,
    streakDays: 28,
    completedLessonIds: [
      'ds-l1-1', 'ds-l1-2', 'ds-l1-3', 'ds-l1-4',
      'ds-l2-1', 'ds-l2-2', 'ds-l2-3', 'ds-l2-4',
      'ds-l3-1', 'ds-l3-2', 'ds-l3-3', 'ds-l3-4'
    ],
    assignments: [
      {
        id: 'asg-ds-1',
        title: 'Vectorized Financial Tick Processing Engine',
        week: 1,
        dueDate: 'Sep 7, 2026',
        category: 'Coding Lab',
        totalPoints: 100,
        status: 'graded',
        score: 97,
        submissionDate: 'Sep 6, 2026',
        githubUrl: 'https://github.com/amina-ds/fast-tick-processor',
        feedback: 'Brilliant use of NumPy memory striding and DuckDB parallel queries.'
      },
      {
        id: 'asg-ds-2',
        title: 'Healthcare Epidemiological Statistical Audit',
        week: 2,
        dueDate: 'Sep 14, 2026',
        category: 'Project',
        totalPoints: 100,
        status: 'graded',
        score: 94,
        submissionDate: 'Sep 13, 2026',
        githubUrl: 'https://github.com/amina-ds/epidemic-stats-audit',
        feedback: 'Rigorous ANOVA tests and Bonferroni correction for multiple hypothesis testing.'
      },
      {
        id: 'asg-ds-3',
        title: 'XGBoost Multi-Feature Valuation & Optuna Tuning',
        week: 3,
        dueDate: 'Sep 21, 2026',
        category: 'Project',
        totalPoints: 100,
        status: 'graded',
        score: 96,
        submissionDate: 'Sep 20, 2026',
        githubUrl: 'https://github.com/amina-ds/xgboost-optuna-valuation',
        feedback: 'Cross-validated model achieved state-of-the-art RMSE of 0.089.'
      }
    ],
    badges: [
      {
        id: 'b-ds1',
        title: 'Statistical Maestro',
        description: 'Calculated and defended hypothesis tests with 99.9% statistical confidence',
        icon: 'LineChart',
        earnedDate: 'Sep 15, 2026'
      }
    ],
    bookedSessions: []
  },

  {
    id: 'std-104',
    name: 'Devon Washington',
    email: 'devon.w@callie.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    enrolledProgramId: 'cloud-computing',
    cohortId: 'CLOUD-2026-DELTA',
    cohortStartDate: 'September 20, 2026',
    cohortType: 'Part-time Flex',
    currentWeek: 2,
    gpa: 3.82,
    attendancePercent: 95.0,
    streakDays: 14,
    completedLessonIds: [
      'cc-l1-1', 'cc-l1-2', 'cc-l1-3', 'cc-l1-4',
      'cc-l2-1', 'cc-l2-2', 'cc-l2-3', 'cc-l2-4'
    ],
    assignments: [
      {
        id: 'asg-cc-1',
        title: 'Multi-AZ High-Availability VPC Architecture',
        week: 1,
        dueDate: 'Sep 28, 2026',
        category: 'Project',
        totalPoints: 100,
        status: 'graded',
        score: 96,
        submissionDate: 'Sep 27, 2026',
        githubUrl: 'https://github.com/devon-cloud/aws-vpc-multi-az',
        feedback: 'Isolated database subnets with zero public routing. Implemented flow logging to CloudWatch.'
      },
      {
        id: 'asg-cc-2',
        title: 'Reusable Terraform Cloud Modules & KMS Encryption',
        week: 2,
        dueDate: 'Oct 5, 2026',
        category: 'Coding Lab',
        totalPoints: 100,
        status: 'graded',
        score: 98,
        submissionDate: 'Oct 4, 2026',
        githubUrl: 'https://github.com/devon-cloud/terraform-enterprise-modules',
        feedback: 'Flawless HCL modules with strict input validation and automated tfsec vulnerability scan.'
      }
    ],
    badges: [
      {
        id: 'b-cc1',
        title: 'Terraform Prodigy',
        description: 'Provisioned multi-region cloud cluster with zero manual intervention',
        icon: 'Cloud',
        earnedDate: 'Oct 5, 2026'
      }
    ],
    bookedSessions: []
  },

  {
    id: 'std-105',
    name: 'Sofia Rodriguez',
    email: 'sofia.rodriguez@callie.ac.ke',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    enrolledProgramId: 'cyber-security',
    cohortId: 'SEC-2026-EPSILON',
    cohortStartDate: 'July 1, 2026',
    cohortType: 'Full-time Immersive',
    currentWeek: 14,
    gpa: 4.00,
    attendancePercent: 100.0,
    streakDays: 45,
    completedLessonIds: [
      'cs-l1-1', 'cs-l1-2', 'cs-l1-3', 'cs-l1-4',
      'cs-l2-1', 'cs-l2-2', 'cs-l2-3', 'cs-l2-4',
      'cs-l3-1', 'cs-l3-2', 'cs-l3-3', 'cs-l3-4'
    ],
    assignments: [
      {
        id: 'asg-cs-1',
        title: 'Deep Packet Dissection & DNS Exfiltration Containment',
        week: 1,
        dueDate: 'Jul 8, 2026',
        category: 'Security Audit',
        totalPoints: 100,
        status: 'graded',
        score: 98,
        feedback: 'Extracted base64 encoded payload from DNS txt records.'
      },
      {
        id: 'asg-cs-2',
        title: 'Enterprise Splunk Correlation & Pass-the-Hash Detection',
        week: 2,
        dueDate: 'Jul 15, 2026',
        category: 'Project',
        totalPoints: 100,
        status: 'graded',
        score: 95,
        feedback: 'Crafted SPL query that surfaced lateral movement across 24 enterprise endpoints.'
      },
      {
        id: 'asg-cs-capstone',
        title: 'Enterprise SOC Incident Response & Breach Post-Mortem',
        week: 14,
        dueDate: 'Oct 15, 2026',
        category: 'Capstone',
        totalPoints: 200,
        status: 'graded',
        score: 198,
        submissionDate: 'Oct 14, 2026',
        githubUrl: 'https://github.com/sofia-sec/capstone-soc-incident-audit',
        feedback: 'Masterful breach analysis, IOC correlation, and executive briefing. Ready for graduation!'
      }
    ],
    badges: [
      {
        id: 'b-cs-valedictorian',
        title: 'Cohort Valedictorian',
        description: 'Maintained a perfect 4.00 GPA throughout the Cyber Security Defense program',
        icon: 'Award',
        earnedDate: 'Oct 15, 2026'
      },
      {
        id: 'b-cs-capstone',
        title: 'Master Defender',
        description: 'Successfully authored enterprise post-mortem for advanced persistent threat',
        icon: 'Shield',
        earnedDate: 'Oct 14, 2026'
      }
    ],
    bookedSessions: [],
    certificateIssued: {
      issueDate: 'October 16, 2026',
      certificateNumber: 'CL-SEC-2026-88492',
      verificationHash: '0x8f3c71a9e25d04bb939c01f41da52e'
    }
  }
];
