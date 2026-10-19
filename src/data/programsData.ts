import { Program, Mentor, LiveSession } from '../types';

export const PROGRAMS: Record<string, Program> = {
  'software-engineering': {
    id: 'software-engineering',
    name: 'Full-Stack Software Engineering',
    tagline: 'Master modern web applications, distributed systems, and cloud-native architecture.',
    description: 'A comprehensive 16-week immersive program that prepares students for Senior-track engineering roles. Build robust full-stack applications with TypeScript, React, Node.js, PostgreSQL, Docker, and Microservices.',
    durationWeeks: 16,
    hoursPerWeek: 40,
    credential: 'Certified Full-Stack Software Engineer (CFSE)',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    gradient: 'from-blue-600 to-indigo-600',
    iconName: 'Code2',
    tuition: 145000,
    nextCohortDate: 'November 9, 2026',
    careerOutcomes: {
      roles: ['Full-Stack Engineer', 'Frontend Architect', 'Backend Developer', 'Systems Engineer'],
      avgStartingSalary: 'KSh 1,650,000/yr',
      placementRate: '95.4%'
    },
    technologies: ['TypeScript', 'React 19', 'Node.js', 'PostgreSQL', 'Docker', 'Next.js', 'GraphQL', 'Redis', 'Jest'],
    capstoneProject: {
      title: 'Enterprise Multi-Tenant SaaS Platform',
      description: 'Design and deploy an end-to-end distributed collaborative application with real-time WebSockets, role-based access control, Stripe billing integration, and automated CI/CD pipeline.',
      deliverables: [
        'Production deployed web application with custom domain',
        'Microservice backend with relational DB and Redis caching',
        'Comprehensive unit & integration test suite (>85% coverage)',
        'System architecture design document & recorded technical walk-through'
      ]
    },
    modules: [
      {
        id: 'se-m1',
        week: 1,
        title: 'Modern TypeScript & ESNext Foundations',
        description: 'Advanced type systems, generics, structural typing, asynchronous patterns, and memory management.',
        learningObjectives: ['Master generic constraints & mapped types', 'Handle asynchronous I/O and Promise concurrency', 'Configure strict TypeScript build toolchains'],
        lessons: [
          { id: 'se-l1-1', title: 'Generics, Utility Types, & Type Narrowing', durationMinutes: 65, type: 'video', completed: true },
          { id: 'se-l1-2', title: 'Deep Dive: Event Loop & Microtasks in V8', durationMinutes: 45, type: 'reading', completed: true },
          { id: 'se-l1-3', title: 'Lab: Building a Type-Safe State Machine', durationMinutes: 90, type: 'lab', completed: true, score: 98 },
          { id: 'se-l1-4', title: 'Knowledge Check: TypeScript Strict Mode Quiz', durationMinutes: 25, type: 'quiz', completed: true, score: 100 }
        ]
      },
      {
        id: 'se-m2',
        week: 2,
        title: 'Component Architecture & State Systems in React 19',
        description: 'Server components, hooks architecture, synthetic event systems, and performant state managers.',
        learningObjectives: ['Implement custom reusable hook libraries', 'Understand concurrent rendering and transitions', 'Optimize bundle splits and render waterfalls'],
        lessons: [
          { id: 'se-l2-1', title: 'React 19 Hooks: useTransition, useActionState & Actions', durationMinutes: 70, type: 'video', completed: true },
          { id: 'se-l2-2', title: 'Virtual DOM Diffing & Fiber Reconciler Internal Mechanics', durationMinutes: 50, type: 'reading', completed: true },
          { id: 'se-l2-3', title: 'Lab: High-Throughput Real-time Data Table with Virtualization', durationMinutes: 120, type: 'lab', completed: true, score: 95 },
          { id: 'se-l2-4', title: 'Component Lifecycle and Hook Dependencies Quiz', durationMinutes: 30, type: 'quiz', completed: true, score: 92 }
        ]
      },
      {
        id: 'se-m3',
        week: 3,
        title: 'Backend Engineering: Express, Fastify & RESTful APIs',
        description: 'Production Node.js service design, middleware pipelines, error propagation, and API contracts.',
        learningObjectives: ['Structure scalable layered controller-service-repository pattern', 'Implement robust token-based JWT and session authentication', 'Benchmark request latency with autocannon'],
        lessons: [
          { id: 'se-l3-1', title: 'Clean Architecture Patterns in Node.js Services', durationMinutes: 60, type: 'video', completed: true },
          { id: 'se-l3-2', title: 'API Security: Rate Limiting, CORS, and Helmet Hardening', durationMinutes: 40, type: 'reading', completed: true },
          { id: 'se-l3-3', title: 'Lab: Authenticated REST API with Refresh Token Rotation', durationMinutes: 110, type: 'lab', completed: true, score: 94 },
          { id: 'se-l3-4', title: 'Backend Authentication & Security Quiz', durationMinutes: 25, type: 'quiz', completed: true, score: 90 }
        ]
      },
      {
        id: 'se-m4',
        week: 4,
        title: 'Relational Databases & Data Modeling with PostgreSQL',
        description: 'Schema normalization (3NF), indexing strategies (B-Tree, GIN, GiST), ACID transactions, and query plans.',
        learningObjectives: ['Write optimal complex SQL joins, aggregations, and window functions', 'Analyze query performance using EXPLAIN ANALYZE', 'Utilize ORMs without creating N+1 query bottlenecks'],
        lessons: [
          { id: 'se-l4-1', title: 'Postgres Indexing Internals and Execution Plans', durationMinutes: 75, type: 'video', completed: true },
          { id: 'se-l4-2', title: 'ACID Guarantees and Transaction Isolation Levels', durationMinutes: 45, type: 'reading', completed: true },
          { id: 'se-l4-3', title: 'Lab: High-Volume E-Commerce Inventory Ledger with Row Locking', durationMinutes: 130, type: 'lab', completed: true, score: 96 },
          { id: 'se-l4-4', title: 'SQL Performance and Schema Design Challenge', durationMinutes: 35, type: 'quiz', completed: true, score: 95 }
        ]
      },
      {
        id: 'se-m5',
        week: 5,
        title: 'Caching, In-Memory Stores & Async Jobs with Redis',
        description: 'Cache-aside, write-through patterns, Redis data types (hashes, sorted sets, streams), and BullMQ worker queues.',
        learningObjectives: ['Implement distributed cache invalidation strategies', 'Process background jobs and asynchronous worker tasks', 'Implement distributed rate limiters using Redis sliding window'],
        lessons: [
          { id: 'se-l5-1', title: 'Distributed Caching Architectures with Redis', durationMinutes: 60, type: 'video', completed: true },
          { id: 'se-l5-2', title: 'Job Queues, Exponential Backoff, and Dead Letter Queues', durationMinutes: 40, type: 'reading', completed: true },
          { id: 'se-l5-3', title: 'Lab: Background Video Processing Worker with BullMQ', durationMinutes: 100, type: 'lab', completed: true, score: 91 },
          { id: 'se-l5-4', title: 'Redis Data Structures & Concurrency Quiz', durationMinutes: 20, type: 'quiz', completed: true, score: 88 }
        ]
      },
      {
        id: 'se-m6',
        week: 6,
        title: 'Real-Time Communication & WebSockets',
        description: 'Socket.io, raw WebSockets, Server-Sent Events (SSE), and publish-subscribe coordination.',
        learningObjectives: ['Build bidirectional real-time event pipelines', 'Handle reconnection loops, heartbeat pings, and room orchestration', 'Scale WebSockets horizontally across multi-instance clusters'],
        lessons: [
          { id: 'se-l6-1', title: 'WebSockets vs SSE vs Long-Polling: Choosing the Right Transport', durationMinutes: 50, type: 'video', completed: false },
          { id: 'se-l6-2', title: 'Scaling Stateful Socket Connections with Redis Pub/Sub', durationMinutes: 45, type: 'reading', completed: false },
          { id: 'se-l6-3', title: 'Lab: Real-Time Collaborative Whiteboard and Chat Engine', durationMinutes: 120, type: 'lab', completed: false },
          { id: 'se-l6-4', title: 'Real-Time Networking Evaluation', durationMinutes: 25, type: 'quiz', completed: false }
        ]
      },
      {
        id: 'se-m7',
        week: 7,
        title: 'Docker, Containerization & Microservice Decomposition',
        description: 'Dockerfile multi-stage builds, Docker Compose, network bridging, volume mounts, and service communication.',
        learningObjectives: ['Containerize full-stack polyglot microservices', 'Minimize production container images (<50MB)', 'Establish container healthchecks and bridge networking'],
        lessons: [
          { id: 'se-l7-1', title: 'Mastering Multi-Stage Docker Builds for Node and Go', durationMinutes: 65, type: 'video', completed: false },
          { id: 'se-l7-2', title: 'Container Security: Non-Root Execution and CVE Scanning', durationMinutes: 40, type: 'reading', completed: false },
          { id: 'se-l7-3', title: 'Lab: Composing a 4-Tier Web Application Environment', durationMinutes: 110, type: 'lab', completed: false },
          { id: 'se-l7-4', title: 'Docker Orchestration Assessment', durationMinutes: 25, type: 'quiz', completed: false }
        ]
      },
      {
        id: 'se-m8',
        week: 8,
        title: 'CI/CD Pipelines, Testing Suites & Automated Deployment',
        description: 'GitHub Actions, unit testing with Vitest/Jest, end-to-end testing with Playwright, and zero-downtime releases.',
        learningObjectives: ['Build automated CI pipelines testing PRs on commit', 'Automate end-to-end user journeys with Playwright', 'Deploy release artifacts to staging and production safely'],
        lessons: [
          { id: 'se-l8-1', title: 'Continuous Integration Workflows with GitHub Actions', durationMinutes: 55, type: 'video', completed: false },
          { id: 'se-l8-2', title: 'Test Pyramids: Unit, Integration, and Contract Testing', durationMinutes: 35, type: 'reading', completed: false },
          { id: 'se-l8-3', title: 'Lab: Building a Production CI/CD Pipeline with Automated E2E', durationMinutes: 120, type: 'lab', completed: false },
          { id: 'se-l8-4', title: 'Testing Strategies Certification Quiz', durationMinutes: 30, type: 'quiz', completed: false }
        ]
      }
    ]
  },

  'data-science': {
    id: 'data-science',
    name: 'Applied Data Science & Machine Learning',
    tagline: 'Transform raw data into predictive intelligence with Python, SQL, and deep neural networks.',
    description: 'An intensive 16-week journey from exploratory data analysis to production MLOps. Master statistics, predictive modeling, machine learning pipelines, NLP, and model deployment on cloud infrastructure.',
    durationWeeks: 16,
    hoursPerWeek: 40,
    credential: 'Certified Applied Data Scientist (CADS)',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    gradient: 'from-emerald-600 to-teal-600',
    iconName: 'LineChart',
    tuition: 155000,
    nextCohortDate: 'November 16, 2026',
    careerOutcomes: {
      roles: ['Data Scientist', 'Machine Learning Engineer', 'Quantitative Analyst', 'BI Solutions Architect'],
      avgStartingSalary: 'KSh 1,800,000/yr',
      placementRate: '94.8%'
    },
    technologies: ['Python', 'Pandas & NumPy', 'Scikit-Learn', 'PyTorch', 'SQL / DuckDB', 'FastAPI', 'MLflow', 'Tableau', 'Docker'],
    capstoneProject: {
      title: 'End-to-End Predictive Intelligence & Real-time Inference Engine',
      description: 'Build a production ML service that ingests real-time telemetry, trains cross-validated gradient boosted and transformer models, and provides low-latency REST inference with drift monitoring.',
      deliverables: [
        'Exploratory data analysis report with statistical significance testing',
        'Reproducible training pipeline with hyperparameter tuning & MLflow tracking',
        'Containerized FastAPI model server with Docker and latency benchmarks',
        'Interactive Streamlit / React analytics dashboard for stakeholder insights'
      ]
    },
    modules: [
      {
        id: 'ds-m1',
        week: 1,
        title: 'Advanced Python for Data Science & Vectorized Computing',
        description: 'NumPy array manipulation, memory layouts, broadcast semantics, and Pandas vectorization optimization.',
        learningObjectives: ['Vectorize algorithms eliminating Python loops', 'Manipulate multi-dimensional NDArrays', 'Perform high-speed memory-efficient data filtering'],
        lessons: [
          { id: 'ds-l1-1', title: 'Vectorization vs Iteration: NumPy Memory Architecture', durationMinutes: 60, type: 'video', completed: true },
          { id: 'ds-l1-2', title: 'Clean Pandas Idioms: Method Chaining and Indexing', durationMinutes: 45, type: 'reading', completed: true },
          { id: 'ds-l1-3', title: 'Lab: Processing 5 Million Financial Tick Records', durationMinutes: 100, type: 'lab', completed: true, score: 97 },
          { id: 'ds-l1-4', title: 'NumPy & Pandas Mastery Quiz', durationMinutes: 25, type: 'quiz', completed: true, score: 100 }
        ]
      },
      {
        id: 'ds-m2',
        week: 2,
        title: 'Exploratory Data Analysis & Inferential Statistics',
        description: 'Hypothesis testing, p-values, confidence intervals, distributions, outlier detection, and Seaborn visualization.',
        learningObjectives: ['Execute A/B hypothesis tests (t-tests, ANOVA, Chi-Square)', 'Detect anomalies and imputation strategies', 'Communicate statistical findings visually'],
        lessons: [
          { id: 'ds-l2-1', title: 'Frequentist Inference: Formulating Null & Alternative Hypotheses', durationMinutes: 70, type: 'video', completed: true },
          { id: 'ds-l2-2', title: 'Handling Imbalanced Datasets & Skewed Distributions', durationMinutes: 40, type: 'reading', completed: true },
          { id: 'ds-l2-3', title: 'Lab: Complete Healthcare Outcomes Statistical Audit', durationMinutes: 110, type: 'lab', completed: true, score: 94 },
          { id: 'ds-l2-4', title: 'Statistical Inference Assessment', durationMinutes: 30, type: 'quiz', completed: true, score: 93 }
        ]
      },
      {
        id: 'ds-m3',
        week: 3,
        title: 'Supervised Learning: Regression, Regularization & Ensembles',
        description: 'OLS, Ridge, Lasso, ElasticNet, Decision Trees, Random Forests, and XGBoost gradient boosting.',
        learningObjectives: ['Evaluate models with RMSE, MAE, R², and cross-validation', 'Mitigate overfitting using L1/L2 penalties', 'Tune tree depth and learning rate in XGBoost'],
        lessons: [
          { id: 'ds-l3-1', title: 'Bias-Variance Tradeoff and Gradient Descent Mechanics', durationMinutes: 65, type: 'video', completed: true },
          { id: 'ds-l3-2', title: 'Tree Ensemble Mathematics: Bagging vs Boosting', durationMinutes: 50, type: 'reading', completed: true },
          { id: 'ds-l3-3', title: 'Lab: Predicting Real Estate Valuations with XGBoost & Optuna', durationMinutes: 125, type: 'lab', completed: true, score: 96 },
          { id: 'ds-l3-4', title: 'Supervised Regression Benchmark Quiz', durationMinutes: 25, type: 'quiz', completed: true, score: 96 }
        ]
      },
      {
        id: 'ds-m4',
        week: 4,
        title: 'Classification, Metrics & Imbalanced Target Engineering',
        description: 'Logistic regression, SVMs, Precision-Recall AUC, ROC curves, Cost-benefit matrix, and SMOTE synthesis.',
        learningObjectives: ['Choose the correct metric when accuracy is misleading', 'Tune classification decision thresholds for enterprise cost optimization', 'Engineer features for churn and fraud detection'],
        lessons: [
          { id: 'ds-l4-1', title: 'ROC-AUC vs PR-AUC: Evaluating Severe Class Imbalance', durationMinutes: 55, type: 'video', completed: false },
          { id: 'ds-l4-2', title: 'Feature Importance and Interpretability with SHAP Values', durationMinutes: 45, type: 'reading', completed: false },
          { id: 'ds-l4-3', title: 'Lab: Credit Card Fraud Detection Classifier', durationMinutes: 130, type: 'lab', completed: false },
          { id: 'ds-l4-4', title: 'Classification Metrics & Model Evaluation Quiz', durationMinutes: 25, type: 'quiz', completed: false }
        ]
      }
    ]
  },

  'cyber-security': {
    id: 'cyber-security',
    name: 'Enterprise Cyber Security & Defensive SecOps',
    tagline: 'Defend critical infrastructure, orchestrate SOC telemetry, and engineer threat resilience.',
    description: 'A 14-week defensive security program covering threat hunting, SIEM configuration, network intrusion detection, incident response, digital forensics, and compliance frameworks like NIST CSF and ISO 27001.',
    durationWeeks: 14,
    hoursPerWeek: 35,
    credential: 'Certified Information Defense Specialist (CIDS)',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    gradient: 'from-cyan-600 to-blue-600',
    iconName: 'ShieldCheck',
    tuition: 140000,
    nextCohortDate: 'November 2, 2026',
    careerOutcomes: {
      roles: ['SOC Analyst (Tier 2/3)', 'Cyber Security Engineer', 'Incident Response Lead', 'Security Compliance Auditor'],
      avgStartingSalary: 'KSh 1,550,000/yr',
      placementRate: '96.1%'
    },
    technologies: ['Splunk', 'Wireshark', 'Suricata / Zeek', 'Snort', 'Linux Hardening', 'YARA', 'NIST CSF', 'Python for SecOps'],
    capstoneProject: {
      title: 'Enterprise SOC Incident Response & Breach Post-Mortem',
      description: 'Investigate a simulated APT intrusion scenario across enterprise network pcaps and endpoint event logs. Isolate patient zero, identify lateral movement, contain the breach, and author an executive report.',
      deliverables: [
        'Comprehensive timeline of attacker IOCs, TTPs, and MITRE ATT&CK mapping',
        'Custom Suricata detection rules and Splunk correlation queries',
        'Hardening playbook to remediate identified architectural vulnerabilities',
        'Executive C-suite security briefing presentation'
      ]
    },
    modules: [
      {
        id: 'cs-m1',
        week: 1,
        title: 'Network Protocols, Deep Packet Inspection & Wireshark',
        description: 'TCP/IP handshake anomalies, DNS tunneling, TLS negotiation, packet analysis, and flow export.',
        learningObjectives: ['Deconstruct raw packet captures in Wireshark', 'Detect port scans, SYN floods, and DNS exfiltration', 'Analyze unencrypted protocols and extract transmitted payloads'],
        lessons: [
          { id: 'cs-l1-1', title: 'TCP/IP Flags, Handshakes & Session Teardown Mechanics', durationMinutes: 65, type: 'video', completed: true },
          { id: 'cs-l1-2', title: 'Protocol Dissection: DNS, HTTP/2, and TLS 1.3 Key Exchange', durationMinutes: 45, type: 'reading', completed: true },
          { id: 'cs-l1-3', title: 'Lab: Wireshark Investigation of an Active Malware Exfiltration', durationMinutes: 110, type: 'lab', completed: true, score: 98 },
          { id: 'cs-l1-4', title: 'Network Security Fundamentals Exam', durationMinutes: 30, type: 'quiz', completed: true, score: 96 }
        ]
      },
      {
        id: 'cs-m2',
        week: 2,
        title: 'SIEM Deployment, Telemetry Ingestion & Splunk Querying',
        description: 'Syslog forwarding, Windows Event Logs, Sysmon telemetry, search processing language (SPL), and alerting.',
        learningObjectives: ['Deploy Sysmon agent for process creation telemetry', 'Write high-performance SPL queries to isolate suspicious spikes', 'Construct executive security dashboards with real-time alerts'],
        lessons: [
          { id: 'cs-l2-1', title: 'Splunk Architecture: Indexers, Forwarders, and Search Heads', durationMinutes: 60, type: 'video', completed: true },
          { id: 'cs-l2-2', title: 'Sysmon Event IDs: 1, 3, 7, and 11 Telemetry Breakdown', durationMinutes: 45, type: 'reading', completed: true },
          { id: 'cs-l2-3', title: 'Lab: Detecting Pass-the-Hash Attacks via Windows Event Logs', durationMinutes: 115, type: 'lab', completed: true, score: 95 },
          { id: 'cs-l2-4', title: 'Splunk Search Processing Language (SPL) Exam', durationMinutes: 25, type: 'quiz', completed: true, score: 92 }
        ]
      },
      {
        id: 'cs-m3',
        week: 3,
        title: 'Intrusion Detection Systems (IDS/IPS) & Signature Rules',
        description: 'Suricata, Snort, signature grammar, rule thresholds, false positive tuning, and network taps.',
        learningObjectives: ['Write custom Suricata rules detecting specific shellcode signatures', 'Tune IDS engines to minimize noise without compromising visibility', 'Integrate IDS logs with centralized SIEM pipelines'],
        lessons: [
          { id: 'cs-l3-1', title: 'Writing Custom Snort & Suricata Signatures from Scratch', durationMinutes: 70, type: 'video', completed: false },
          { id: 'cs-l3-2', title: 'Evasion Techniques: Fragmentation, Padding, and Encoding', durationMinutes: 40, type: 'reading', completed: false },
          { id: 'cs-l3-3', title: 'Lab: Blocking C2 Beacon Traffic with Suricata Inline IPS', durationMinutes: 120, type: 'lab', completed: false },
          { id: 'cs-l3-4', title: 'Network Defense & Rule Crafting Quiz', durationMinutes: 25, type: 'quiz', completed: false }
        ]
      }
    ]
  },

  'ethical-hacking': {
    id: 'ethical-hacking',
    name: 'Offensive Security & Ethical Hacking',
    tagline: 'Think like an adversary to expose critical vulnerabilities before malicious actors strike.',
    description: 'A 14-week offensive security masterclass focusing on penetration testing, web application exploitation (OWASP Top 10), network reconnaissance, privilege escalation, Active Directory attack paths, and bug hunting.',
    durationWeeks: 14,
    hoursPerWeek: 40,
    credential: 'Certified Ethical Penetration Tester (CEPT)',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    gradient: 'from-rose-600 to-red-700',
    iconName: 'Terminal',
    tuition: 160000,
    nextCohortDate: 'November 23, 2026',
    careerOutcomes: {
      roles: ['Penetration Tester', 'Red Team Operator', 'Vulnerability Researcher', 'AppSec Engineer'],
      avgStartingSalary: 'KSh 1,900,000/yr',
      placementRate: '96.7%'
    },
    technologies: ['Kali Linux', 'Burp Suite Pro', 'Metasploit', 'Nmap', 'SQLmap', 'BloodHound', 'Ghidra', 'Python Exploits'],
    capstoneProject: {
      title: 'Full-Scope Red Team Engagement & Multi-Stage Network Penetration',
      description: 'Execute an authorized, full-scope penetration test against an enterprise staging domain. Perform OSINT, perimeter breach, local privilege escalation, Active Directory Kerberoasting, and domain compromise.',
      deliverables: [
        'Executive Risk Summary with CVSS 3.1 severity scores',
        'Detailed Proof-of-Concept (PoC) exploit scripts with step-by-step reproduction',
        'Technical Remediation Roadmap for corporate IT and development staff',
        'Complete engagement timeline and sanitized artifacts'
      ]
    },
    modules: [
      {
        id: 'eh-m1',
        week: 1,
        title: 'Adversary Reconnaissance & Stealth Network Enumeration',
        description: 'Passive OSINT, Shodan querying, sublist3r, active Nmap scripting engine (NSE), firewall evasion.',
        learningObjectives: ['Execute stealth SYN and FIN scans avoiding early IDS triggers', 'Utilize Shodan and Certificate Transparency logs for asset discovery', 'Map network topologies and service banners accurately'],
        lessons: [
          { id: 'eh-l1-1', title: 'Target Reconnaissance: Passive OSINT, WHOIS & ASN Mapping', durationMinutes: 60, type: 'video', completed: true },
          { id: 'eh-l1-2', title: 'Deep Nmap: Timing Templates, NSE Scripts, and Fragmentation', durationMinutes: 50, type: 'reading', completed: true },
          { id: 'eh-l1-3', title: 'Lab: Mapping a Fortified Multi-Subnet Target Network', durationMinutes: 120, type: 'lab', completed: true, score: 99 },
          { id: 'eh-l1-4', title: 'Reconnaissance & Footprinting Assessment', durationMinutes: 25, type: 'quiz', completed: true, score: 96 }
        ]
      },
      {
        id: 'eh-m2',
        week: 2,
        title: 'Web Application Exploitation: OWASP Top 10 (Part I)',
        description: 'SQL Injection (Union, Boolean, Time-based Blind), Cross-Site Scripting (Reflected, Stored, DOM), and Burp Suite Pro.',
        learningObjectives: ['Exploit blind SQL injections manually without relying solely on automated tools', 'Construct weaponized XSS payloads bypassing standard regex filters', 'Automate fuzzing using Burp Suite Intruder and custom wordlists'],
        lessons: [
          { id: 'eh-l2-1', title: 'Burp Suite Pro Workflow: Repeater, Match/Replace & Extensions', durationMinutes: 65, type: 'video', completed: true },
          { id: 'eh-l2-2', title: 'Advanced SQLi: Extracting Data via Out-of-Band & Time Delays', durationMinutes: 55, type: 'reading', completed: true },
          { id: 'eh-l2-3', title: 'Lab: Bypassing WAF Filters on an E-Commerce Target', durationMinutes: 130, type: 'lab', completed: true, score: 94 },
          { id: 'eh-l2-4', title: 'OWASP Vulnerability Exploitation Exam', durationMinutes: 30, type: 'quiz', completed: true, score: 94 }
        ]
      },
      {
        id: 'eh-m3',
        week: 3,
        title: 'Authentication Bypasses, SSRF & Broken Access Controls (BAC)',
        description: 'Server-Side Request Forgery against cloud metadata endpoints, JWT secret cracking, and IDOR vulnerabilities.',
        learningObjectives: ['Extract cloud credentials from AWS IMDSv1 via blind SSRF', 'Tamper and forge JWT signatures utilizing null cipher and algorithm confusion', 'Audit multi-tenant boundary permissions'],
        lessons: [
          { id: 'eh-l3-1', title: 'SSRF Attack Vectors: Pivoting from Web to Cloud Metadata', durationMinutes: 70, type: 'video', completed: true },
          { id: 'eh-l3-2', title: 'Cryptographic Weaknesses in JWT Implementations', durationMinutes: 45, type: 'reading', completed: true },
          { id: 'eh-l3-3', title: 'Lab: Compromising AWS IAM Keys via Blind SSRF', durationMinutes: 125, type: 'lab', completed: true, score: 98 },
          { id: 'eh-l3-4', title: 'Cloud & API Exploitation Quiz', durationMinutes: 25, type: 'quiz', completed: true, score: 92 }
        ]
      },
      {
        id: 'eh-m4',
        week: 4,
        title: 'Linux & Windows Privilege Escalation',
        description: 'Kernel exploits, SUID binaries, sudoer misconfigurations, Windows Token Impersonation, unquoted service paths.',
        learningObjectives: ['Enumerate unquoted service paths and vulnerable DLL hijacking targets', 'Exploit misconfigured SUID binaries via GTFOBins', 'Maintain stealthy root persistence without tripping AV alerts'],
        lessons: [
          { id: 'eh-l4-1', title: 'Automating Enumeration: LinPEAS and WinPEAS In-Depth', durationMinutes: 60, type: 'video', completed: false },
          { id: 'eh-l4-2', title: 'Rotten Potato, PrintSpoofer & Windows Token Stealing', durationMinutes: 50, type: 'reading', completed: false },
          { id: 'eh-l4-3', title: 'Lab: Rooting an Hardened Linux Server via Shared Library Hijack', durationMinutes: 140, type: 'lab', completed: false },
          { id: 'eh-l4-4', title: 'Privilege Escalation Challenge Exam', durationMinutes: 30, type: 'quiz', completed: false }
        ]
      }
    ]
  },

  'cloud-computing': {
    id: 'cloud-computing',
    name: 'Cloud Architecture & DevOps Engineering',
    tagline: 'Design resilient, auto-scaling cloud systems with AWS, Kubernetes, and Terraform.',
    description: 'A 12-week comprehensive cloud engineering program covering multi-region VPC design, Kubernetes cluster orchestration, infrastructure as code (Terraform), serverless event architectures, and cloud security.',
    durationWeeks: 12,
    hoursPerWeek: 35,
    credential: 'Certified Cloud Solutions Architect (CCSA)',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    gradient: 'from-amber-500 to-orange-600',
    iconName: 'Cloud',
    tuition: 140000,
    nextCohortDate: 'November 30, 2026',
    careerOutcomes: {
      roles: ['Cloud Solutions Architect', 'DevOps / SRE Engineer', 'Platform Engineer', 'Infrastructure Developer'],
      avgStartingSalary: 'KSh 1,750,000/yr',
      placementRate: '95.2%'
    },
    technologies: ['AWS (VPC, EKS, Lambda)', 'Google Cloud', 'Kubernetes', 'Terraform', 'Helm', 'Prometheus & Grafana', 'GitOps / ArgoCD'],
    capstoneProject: {
      title: 'Multi-Region High-Availability Infrastructure as Code Suite',
      description: 'Provision a globally distributed, zero-trust infrastructure on AWS using Terraform modules, deploy an auto-scaling Kubernetes cluster running microservices, and instrument full observability.',
      deliverables: [
        'Modularized Terraform repository with state locking and remote S3 backend',
        'Production EKS cluster with Karpenter autoscaling and ingress controllers',
        'Prometheus and Grafana dashboards for SLI/SLO latency and error budgeting',
        'Disaster recovery runbook with automated failover drill demonstration'
      ]
    },
    modules: [
      {
        id: 'cc-m1',
        week: 1,
        title: 'Virtual Private Clouds (VPC), Subnetting & Network Routing',
        description: 'CIDR blocks, public/private subnets, NAT Gateways, Internet Gateways, Route Tables, and VPC Peering.',
        learningObjectives: ['Calculate and allocate IP CIDR blocks for multi-tier applications', 'Isolate database subnets with strict Security Groups and Network ACLs', 'Configure Transit Gateways and VPC Peering connections'],
        lessons: [
          { id: 'cc-l1-1', title: 'Designing High-Availability Multi-AZ VPC Topologies', durationMinutes: 65, type: 'video', completed: true },
          { id: 'cc-l1-2', title: 'Network Security: Stateful SGs vs Stateless NACLs', durationMinutes: 40, type: 'reading', completed: true },
          { id: 'cc-l1-3', title: 'Lab: Provisioning a Secure 3-Tier Multi-AZ VPC in AWS', durationMinutes: 105, type: 'lab', completed: true, score: 96 },
          { id: 'cc-l1-4', title: 'Cloud Networking & VPC Architecture Quiz', durationMinutes: 25, type: 'quiz', completed: true, score: 94 }
        ]
      },
      {
        id: 'cc-m2',
        week: 2,
        title: 'Infrastructure as Code (IaC) with Modern Terraform',
        description: 'HCL syntax, state management, S3 backend locking, reusable modules, variables, and dynamic blocks.',
        learningObjectives: ['Write clean, DRY, reusable Terraform modules', 'Manage sensitive environment secrets securely with KMS', 'Execute speculative execution plans and handle drift detection'],
        lessons: [
          { id: 'cc-l2-1', title: 'Terraform State Management, Locking & Remote Backends', durationMinutes: 60, type: 'video', completed: true },
          { id: 'cc-l2-2', title: 'Module Design Patterns and Terraform Workspaces', durationMinutes: 45, type: 'reading', completed: true },
          { id: 'cc-l2-3', title: 'Lab: Deploying Auto-Scaling EC2 Web Fleet via Terraform Modules', durationMinutes: 120, type: 'lab', completed: true, score: 98 },
          { id: 'cc-l2-4', title: 'Terraform Associate Practice Assessment', durationMinutes: 30, type: 'quiz', completed: true, score: 98 }
        ]
      },
      {
        id: 'cc-m3',
        week: 3,
        title: 'Kubernetes Cluster Architecture, Pods & Deployments',
        description: 'Control plane internals, kube-scheduler, kubelet, etcd consensus, Pod lifecycle, and declarative manifests.',
        learningObjectives: ['Configure deployments with rolling updates and zero downtime', 'Define ConfigMaps, Secrets, and persistent volume claims', 'Debug crashing pods using kubectl describe, logs, and exec'],
        lessons: [
          { id: 'cc-l3-1', title: 'K8s Architecture: Control Plane vs Worker Node Components', durationMinutes: 70, type: 'video', completed: false },
          { id: 'cc-l3-2', title: 'Declarative YAML Manifests and Health Probes (Liveness/Readiness)', durationMinutes: 40, type: 'reading', completed: false },
          { id: 'cc-l3-3', title: 'Lab: Self-Healing Microservice Deployment on Minikube', durationMinutes: 110, type: 'lab', completed: false },
          { id: 'cc-l3-4', title: 'Kubernetes Foundations Exam', durationMinutes: 25, type: 'quiz', completed: false }
        ]
      }
    ]
  }
};

export const MENTORS: Mentor[] = [
  {
    id: 'm-1',
    name: 'Sarah Lin',
    role: 'Staff Infrastructure Architect',
    company: 'Google Cloud',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: '12+ years building planetary-scale distributed systems and Kubernetes networking.',
    specialties: ['Distributed Systems', 'Cloud Networking', 'System Design Interviews'],
    availableSlots: ['Today, 3:00 PM', 'Tomorrow, 10:30 AM', 'Friday, 1:00 PM', 'Next Monday, 4:00 PM']
  },
  {
    id: 'm-2',
    name: 'Alexandre Dubois',
    role: 'Principal Security Researcher',
    company: 'CrowdStrike',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Former NSA vulnerability analyst, DEF CON speaker, specialized in kernel exploits & AD attacks.',
    specialties: ['Penetration Testing', 'Reverse Engineering', 'Active Directory Hacking'],
    availableSlots: ['Today, 5:30 PM', 'Thursday, 2:00 PM', 'Friday, 11:00 AM']
  },
  {
    id: 'm-3',
    name: 'Dr. Priya Patel',
    role: 'Lead ML Scientist',
    company: 'DeepMind / Waymo',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    bio: 'PhD in Machine Learning from Stanford. Passionate about helping students deploy real-world models.',
    specialties: ['Deep Learning', 'PyTorch', 'MLOps & Inference Optimization'],
    availableSlots: ['Tomorrow, 1:00 PM', 'Thursday, 4:30 PM', 'Next Tuesday, 2:00 PM']
  },
  {
    id: 'm-4',
    name: 'Marcus Brody',
    role: 'VP of Engineering',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Scales web applications to millions of transactions per second. Mentored over 300 bootcamp grads.',
    specialties: ['Full-Stack TypeScript', 'High-Concurreny DBs', 'Tech Leadership & Career Prep'],
    availableSlots: ['Tomorrow, 9:00 AM', 'Thursday, 12:00 PM', 'Next Wednesday, 3:30 PM']
  }
];

export const UPCOMING_LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'ls-1',
    title: 'Live Architecture Critique: Scalable Distributed Message Queues',
    instructor: 'Marcus Brody (Stripe)',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    programId: 'software-engineering',
    date: 'Today',
    time: '2:00 PM - 3:30 PM PDT',
    type: 'Live Coding',
    meetingUrl: 'https://meet.callie.ac.ke/swe-cohort-live',
    status: 'live'
  },
  {
    id: 'ls-2',
    title: 'CTF War Room: Bypassing Modern Web Application Firewalls (WAF)',
    instructor: 'Alexandre Dubois (CrowdStrike)',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    programId: 'ethical-hacking',
    date: 'Tomorrow',
    time: '4:00 PM - 6:00 PM PDT',
    type: 'CTF War Room',
    meetingUrl: 'https://meet.callie.ac.ke/ctf-live-room',
    status: 'upcoming'
  },
  {
    id: 'ls-3',
    title: 'Zero to Production: Multi-Cluster Service Mesh with Istio & Envoy',
    instructor: 'Sarah Lin (Google Cloud)',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    programId: 'cloud-computing',
    date: 'Wednesday',
    time: '11:00 AM - 12:30 PM PDT',
    type: 'Lecture',
    meetingUrl: 'https://meet.callie.ac.ke/cloud-masterclass',
    status: 'upcoming'
  },
  {
    id: 'ls-4',
    title: 'Productionizing Transformer Embeddings for Vector Search',
    instructor: 'Dr. Priya Patel (DeepMind)',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    programId: 'data-science',
    date: 'Thursday',
    time: '1:00 PM - 2:30 PM PDT',
    type: 'Guest Masterclass',
    meetingUrl: 'https://meet.callie.ac.ke/mlops-symposium',
    status: 'upcoming'
  }
];
