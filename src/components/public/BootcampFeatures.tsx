import React from 'react';
import { 
  Terminal, 
  Users, 
  Briefcase, 
  Cpu, 
  Award, 
  Sparkles, 
  CheckCircle,
  Video,
  Code
} from 'lucide-react';
import { MENTORS } from '../../data/programsData';

export const BootcampFeatures: React.FC = () => {
  return (
    <section className="py-20 border-t border-b border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            PEDAGOGICAL EXCELLENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Callie Prepares You for Staff-Level Impact
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Forget passive video tutorials. Our methodology combines daily live architectural debates, real-world cloud sandbox terminals, and dedicated 1-on-1 mentorship.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <Terminal className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">In-Browser Virtual Labs &amp; Sandboxes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every student gets a personal cloud container with live Kali Linux, Docker, AWS CLI, and PostgreSQL playgrounds built right into the portal.
            </p>
            <div className="mt-5 space-y-2">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Zero local environment setup roadblocks</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Automated code scoring &amp; security linting</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1-on-1 Staff Industry Mentors</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Book private weekly 45-minute architectural consultations with principal engineers and security leads from Google, Stripe, and CrowdStrike.
            </p>
            <div className="mt-5 space-y-2">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real production PR review &amp; code critiques</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>System design &amp; whiteboarding interview drills</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Career Concierge &amp; Direct Placement</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Lifetime career services including resume optimization, reverse recruitment, salary negotiation coaching, and direct partner referrals.
            </p>
            <div className="mt-5 space-y-2">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Over 380 hiring partners actively recruiting</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>KSh 1,750,000 audited average first-year compensation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Showcase */}
        <div id="mentors-section" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">Learn Directly from Engineering Leaders</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our faculty aren't full-time lecturers; they are active practitioners shaping the tech ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENTORS.map((m) => (
              <div key={m.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center">
                <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 mb-3" />
                <h4 className="text-base font-bold text-white">{m.name}</h4>
                <p className="text-xs font-semibold text-indigo-400">{m.role}</p>
                <p className="text-xs text-slate-500 mb-3 font-medium">{m.company}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">{m.bio}</p>
                <div className="flex flex-wrap gap-1 justify-center mt-auto">
                  {m.specialties.slice(0, 2).map((s: string) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
