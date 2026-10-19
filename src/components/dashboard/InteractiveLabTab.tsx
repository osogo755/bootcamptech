import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Database, 
  Code2, 
  Cloud, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { triggerConfetti } from '../../utils/confetti';

export const InteractiveLabTab: React.FC = () => {
  const { currentProgram, currentStudent } = useStudent();

  // Mode selection: default based on program, but can toggle between all 4 sandboxes!
  const getDefaultMode = () => {
    if (currentProgram.id === 'ethical-hacking' || currentProgram.id === 'cyber-security') return 'terminal';
    if (currentProgram.id === 'data-science') return 'sql';
    if (currentProgram.id === 'cloud-computing') return 'cloud';
    return 'code';
  };

  const [activeSandbox, setActiveSandbox] = useState<'terminal' | 'code' | 'sql' | 'cloud'>(getDefaultMode);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Callie Cloud OS v6.8.0-kali2-amd64 (tty1)',
    'Type "help" for a list of available security recon commands.',
    'Student environment provisioned. Ready for target penetration test.',
    '----------------------------------------------------------------'
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Code editor state
  const [codeContent, setCodeContent] = useState<string>(`// Callie Full-Stack Lab: Token Bucket Distributed Rate Limiter
class TokenBucket {
  private capacity: number;
  private refillRatePerSec: number;
  private tokens: number;
  private lastRefillTimestamp: number;

  constructor(capacity: number, refillRatePerSec: number) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
    this.tokens = capacity;
    this.lastRefillTimestamp = Date.now();
  }

  public allowRequest(cost: number = 1): boolean {
    this.refill();
    if (this.tokens >= cost) {
      this.tokens -= cost;
      return true;
    }
    return false;
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSeconds * this.refillRatePerSec);
    this.lastRefillTimestamp = now;
  }
}

// Test runner execution
const limiter = new TokenBucket(5, 2);
console.log("Bucket created with capacity: 5 tokens, refill: 2 tokens/sec");
console.log("Request 1:", limiter.allowRequest(3) ? "✅ Allowed" : "❌ Rate Limited");
console.log("Request 2:", limiter.allowRequest(2) ? "✅ Allowed" : "❌ Rate Limited");
console.log("Request 3 (Exhausted):", limiter.allowRequest(1) ? "✅ Allowed" : "❌ Rate Limited");
`);
  const [codeOutput, setCodeOutput] = useState<string>('Click "Run Code" to execute TypeScript script in V8 runtime...');
  const [isRunningCode, setIsRunningCode] = useState(false);

  // SQL state
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT student_name, track, gpa, attendance_pct\nFROM bootcamp_students\nWHERE gpa >= 3.85\nORDER BY gpa DESC;');
  const [sqlResult, setSqlResult] = useState<any[]>([
    { student_name: 'Sofia Rodriguez', track: 'Cyber Security', gpa: 4.00, attendance_pct: 100.0 },
    { student_name: 'Amina Al-Mansoor', track: 'Data Science', gpa: 3.96, attendance_pct: 99.4 },
    { student_name: 'Marcus Chen', track: 'Ethical Hacking', gpa: 3.94, attendance_pct: 100.0 },
    { student_name: 'Elena Rostova', track: 'Software Eng', gpa: 3.88, attendance_pct: 98.2 }
  ]);

  // Cloud CLI state
  const [cloudLogs, setCloudLogs] = useState<string[]>([
    'AWS CLI v2.15.22 / Terraform v1.8.2 / kubectl v1.30.1',
    'Connected to cluster: callie-prod-af-south-1.eks.amazonaws.com',
    'Type commands like "kubectl get pods", "terraform plan", or "aws s3 ls".'
  ]);
  const [cloudInput, setCloudInput] = useState('');

  // Terminal command executor
  const executeTerminalCommand = (cmdStr: string) => {
    const clean = cmdStr.trim();
    if (!clean) return;

    const newLogs = [...terminalHistory, `student@callie-kali:~$ ${clean}`];

    const lower = clean.toLowerCase();
    if (lower === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lower === 'help') {
      newLogs.push(
        'Available commands in virtual offensive security sandbox:',
        '  whoami                 - Display current user context',
        '  nmap -sV 10.0.4.12     - Service version scan on staging target',
        '  sqlmap -u target.com   - Automated SQL injection test payload',
        '  cat /etc/passwd        - Inspect local shadow user accounts',
        '  hydra -l admin         - Brute-force simulation against SSH',
        '  hashcat -m 0           - SHA256 cracking simulation',
        '  nikto -h target.lan    - Web server vulnerability assessment',
        '  clear                  - Clear terminal screen'
      );
    } else if (lower.startsWith('nmap')) {
      newLogs.push(
        'Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-19 10:45 UTC',
        'Nmap scan report for staging-api.callie.internal (10.0.4.12)',
        'Host is up (0.0012s latency).',
        'PORT     STATE SERVICE     VERSION',
        '22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu',
        '80/tcp   open  http        nginx 1.18.0 (vulnerable headers exposed)',
        '5432/tcp open  postgresql  PostgreSQL 14.5 (unauthenticated read socket)',
        '8080/tcp open  http-proxy  Apache Tomcat 9.0.41',
        'Nmap done: 1 IP address (1 host up) scanned in 1.44 seconds.'
      );
      triggerConfetti();
    } else if (lower.startsWith('sqlmap')) {
      newLogs.push(
        '[+] Testing parameter: id (GET)',
        '[INFO] testing connection to the target URL',
        '[CRITICAL] heuristic (basic) test shows that GET parameter "id" might be injectable',
        '[!] injectable parameter detected: boolean-based blind, time-based blind, stacked queries',
        '[SUCCESS] Target DBMS: PostgreSQL 14.5 - Database: "production_users"',
        '[+] Vulnerability verified. PoC payload generated.'
      );
      triggerConfetti();
    } else if (lower.startsWith('whoami')) {
      newLogs.push('uid=1000(student) gid=1000(student) groups=1000(student),27(sudo),105(secops)');
    } else if (lower.startsWith('cat /etc/passwd')) {
      newLogs.push(
        'root:x:0:0:root:/root:/bin/bash',
        'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin',
        'www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin',
        'callie-admin:x:1001:1001:Callie Admin:/home/callie-admin:/bin/bash (SUID flag enabled!)'
      );
    } else if (lower.startsWith('hashcat')) {
      newLogs.push(
        'hashcat (v6.2.6) starting in benchmark attack mode...',
        'Hash: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8 (SHA-256)',
        'Dictionary: rockyou.txt (14,344,392 words loaded)',
        '[SUCCESS] Hash cracked in 0.38s! Plaintext: "password"'
      );
      triggerConfetti();
    } else {
      newLogs.push(`nexus-sh: command not found: ${clean}. Type "help" for valid commands.`);
    }

    setTerminalHistory(newLogs);
    setTerminalInput('');
  };

  // Run code handler
  const handleRunCode = () => {
    setIsRunningCode(true);
    setCodeOutput('Compiling in sandbox worker...\n');

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
          warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' '))
        };

        // Strip typescript annotations for simple eval
        const jsCode = codeContent
          .replace(/:\s*number/g, '')
          .replace(/:\s*string/g, '')
          .replace(/:\s*boolean/g, '')
          .replace(/:\s*void/g, '')
          .replace(/private\s+/g, '')
          .replace(/public\s+/g, '');

        const runFn = new Function('console', jsCode);
        runFn(customConsole);

        setCodeOutput(logs.join('\n') || 'Code executed successfully with zero stdout.');
        triggerConfetti();
      } catch (err: any) {
        setCodeOutput(`Runtime Error: ${err.message}`);
      } finally {
        setIsRunningCode(false);
      }
    }, 400);
  };

  // Cloud CLI executor
  const executeCloudCommand = (cmdStr: string) => {
    const clean = cmdStr.trim();
    if (!clean) return;

    const newLogs = [...cloudLogs, `[cloud-engineer@aws-us-east-1 ~]$ ${clean}`];
    const lower = clean.toLowerCase();

    if (lower === 'clear') {
      setCloudLogs([]);
      setCloudInput('');
      return;
    } else if (lower.startsWith('kubectl get pods')) {
      newLogs.push(
        'NAME                                  READY   STATUS    RESTARTS   AGE',
        'auth-service-78dfb85848-2z9xk         1/1     Running   0          4d2h',
        'billing-worker-5f79599d45-qlw2j       1/1     Running   0          4d2h',
        'gateway-ingress-64c8d5789d-7qvm9      1/1     Running   0          12d',
        'callie-frontend-5df676458d-m52p4       1/1     Running   0          2d'
      );
      triggerConfetti();
    } else if (lower.startsWith('aws s3 ls')) {
      newLogs.push(
        '2026-09-01 14:22:10 callie-production-backups',
        '2026-09-15 09:12:44 callie-telemetry-data-lake-nairobi',
        '2026-10-02 18:45:01 tfstate-remote-locking-s3-vault'
      );
    } else if (lower.startsWith('terraform plan')) {
      newLogs.push(
        'Terraform will perform the following actions:',
        '  # module.vpc.aws_subnet.private[0] will be created',
        '  # module.eks.aws_eks_node_group.spot_workers will be updated in-place',
        'Plan: 3 to add, 1 to change, 0 to destroy.',
        '─────────────────────────────────────────────────────────────────'
      );
      triggerConfetti();
    } else {
      newLogs.push(`Command recognized: ${clean}. Provisioning simulation response.`);
    }

    setCloudLogs(newLogs);
    setCloudInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Sandbox Switcher */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
            INTERACTIVE CLOUD SANDBOX
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Virtual Lab Environment</h2>
          <p className="text-xs text-slate-400 mt-1">
            Browser-based live runtime for practicing real terminal reconnaissance, TypeScript algorithms, SQL queries, and Cloud CLI commands.
          </p>
        </div>

        {/* 4 Sandbox Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveSandbox('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSandbox === 'terminal' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Kali Linux Shell</span>
          </button>

          <button
            onClick={() => setActiveSandbox('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSandbox === 'code' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>TypeScript Runner</span>
          </button>

          <button
            onClick={() => setActiveSandbox('sql')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSandbox === 'sql' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>SQL Data Explorer</span>
          </button>

          <button
            onClick={() => setActiveSandbox('cloud')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSandbox === 'cloud' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloud &amp; K8s CLI</span>
          </button>
        </div>
      </div>

      {/* Sandbox 1: Kali Linux / Defensive Cyber Terminal */}
      {activeSandbox === 'terminal' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Window Chrome */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-xs ml-2 font-semibold">kali-container@callie-academy:~</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Sandbox Connected (10.0.4.12)
              </span>
            </div>
          </div>

          {/* Quick Command Presets */}
          <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-slate-400 text-[10px] uppercase font-bold">1-Click Recon Commands:</span>
            <button
              onClick={() => executeTerminalCommand('nmap -sV 10.0.4.12')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 font-mono transition-colors"
            >
              nmap -sV 10.0.4.12
            </button>
            <button
              onClick={() => executeTerminalCommand('sqlmap -u "http://target.com/item?id=1"')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition-colors"
            >
              sqlmap -u target.com
            </button>
            <button
              onClick={() => executeTerminalCommand('hashcat -m 0')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono transition-colors"
            >
              hashcat -m 0
            </button>
            <button
              onClick={() => executeTerminalCommand('cat /etc/passwd')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono transition-colors"
            >
              cat /etc/passwd
            </button>
          </div>

          {/* Terminal Screen Output */}
          <div className="p-5 h-80 overflow-y-auto space-y-1.5 text-slate-300">
            {terminalHistory.map((line, idx) => (
              <div 
                key={idx} 
                className={line.includes('SUCCESS') ? 'text-emerald-400 font-bold' : line.includes('open') ? 'text-amber-300' : ''}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Terminal Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeTerminalCommand(terminalInput);
            }}
            className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-rose-400 font-bold">student@callie-kali:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type nmap, sqlmap, whoami, help, or clear..."
              className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
            >
              Exec ↵
            </button>
          </form>
        </div>
      )}

      {/* Sandbox 2: TypeScript & Web Runtime */}
      {activeSandbox === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Code Editor */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col justify-between">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 font-mono">rate-limiter.ts</span>
              <button
                onClick={handleRunCode}
                disabled={isRunningCode}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunningCode ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>

            <textarea
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              rows={14}
              className="w-full p-4 bg-slate-950 text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
            />

            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>TypeScript V8 Runtime</span>
              <button
                onClick={() => setCodeContent(`// Fresh Algorithm Sandbox\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\nconsole.log("Fibonacci(10):", fibonacci(10));`)}
                className="hover:text-white"
              >
                Reset to Sample
              </button>
            </div>
          </div>

          {/* Console Output */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 font-mono">Console Output (stdout)</span>
              <button
                onClick={() => setCodeOutput('Console cleared.')}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Clear Output
              </button>
            </div>
            <pre className="p-4 flex-1 h-72 font-mono text-xs text-emerald-400 whitespace-pre-wrap overflow-y-auto">
              {codeOutput}
            </pre>
          </div>
        </div>
      )}

      {/* Sandbox 3: SQL & Data Science Explorer */}
      {activeSandbox === 'sql' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden space-y-4 p-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 font-mono">
                PostgreSQL Query Sandbox (Schema: public.bootcamp_students)
              </label>
              <button
                onClick={() => {
                  triggerConfetti();
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Execute Query</span>
              </button>
            </div>

            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Table Results */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Query Result Set (4 Rows Returned in 1.8ms):
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">student_name</th>
                    <th className="p-3">track</th>
                    <th className="p-3">gpa</th>
                    <th className="p-3">attendance_pct</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {sqlResult.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">{row.student_name}</td>
                      <td className="p-3 text-indigo-300">{row.track}</td>
                      <td className="p-3 text-emerald-400 font-bold">{row.gpa.toFixed(2)}</td>
                      <td className="p-3 text-cyan-300">{row.attendance_pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sandbox 4: Cloud CLI & K8s */}
      {activeSandbox === 'cloud' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono text-xs">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300 font-semibold">aws-cli / kubernetes-agent / terraform</span>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Production EKS Cluster Active
            </span>
          </div>

          {/* Quick presets */}
          <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Quick Cloud Commands:</span>
            <button
              onClick={() => executeCloudCommand('kubectl get pods')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors"
            >
              kubectl get pods
            </button>
            <button
              onClick={() => executeCloudCommand('aws s3 ls')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
            >
              aws s3 ls
            </button>
            <button
              onClick={() => executeCloudCommand('terraform plan')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 transition-colors"
            >
              terraform plan
            </button>
          </div>

          <div className="p-5 h-72 overflow-y-auto space-y-1.5 text-slate-300">
            {cloudLogs.map((log, i) => (
              <div key={i} className={log.includes('Running') ? 'text-emerald-400' : ''}>
                {log}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCloudCommand(cloudInput);
            }}
            className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-amber-400 font-bold">[cloud-engineer@aws ~]$</span>
            <input
              type="text"
              value={cloudInput}
              onChange={(e) => setCloudInput(e.target.value)}
              placeholder="type kubectl get pods, aws s3 ls, terraform plan..."
              className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer"
            >
              Run ↵
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
