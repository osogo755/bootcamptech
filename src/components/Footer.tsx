import React from 'react';
import { GraduationCap, ShieldCheck, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { ProgramId } from '../types';

interface FooterProps {
  onSelectProgram: (id: ProgramId) => void;
  onGoToDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectProgram, onGoToDashboard }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-base">CALLIE ACADEMY</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Kenya's premier technical bootcamp delivering industry-level software engineering, defensive cyber security, ethical hacking, data science, and cloud computing.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Academic Programs */}
          <div>
            <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Programs</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectProgram('software-engineering')} className="hover:text-white transition-colors">
                  Full-Stack Software Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProgram('data-science')} className="hover:text-white transition-colors">
                  Applied Data Science &amp; AI
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProgram('cyber-security')} className="hover:text-white transition-colors">
                  Enterprise Cyber Security
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProgram('ethical-hacking')} className="hover:text-white transition-colors">
                  Offensive Security &amp; Ethical Hacking
                </button>
              </li>
              <li>
                <button onClick={() => onSelectProgram('cloud-computing')} className="hover:text-white transition-colors">
                  Cloud Architecture &amp; DevOps
                </button>
              </li>
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Student Resources</div>
            <ul className="space-y-2">
              <li>
                <button onClick={onGoToDashboard} className="hover:text-white text-indigo-400 font-medium transition-colors">
                  Student Academic Portal Login
                </button>
              </li>
              <li><span className="hover:text-white cursor-pointer">Live Sandboxes &amp; Kali Linux</span></li>
              <li><span className="hover:text-white cursor-pointer">Academic Transcript Verification</span></li>
              <li><span className="hover:text-white cursor-pointer">Mentor Office Hours Booking</span></li>
              <li><span className="hover:text-white cursor-pointer">Career Concierge Network</span></li>
            </ul>
          </div>

          {/* Accreditation & Campus */}
          <div>
            <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Accreditation &amp; Campus</div>
            <p className="leading-relaxed mb-3">
              Nairobi Silicon Savannah Campus &amp; East Africa Remote Synchronous Hub.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] leading-relaxed">
              <span className="text-white font-semibold block mb-0.5">CIRR Audited Outcomes</span>
              Verified graduation, retention, and salary placement statistics published biannually.
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>© 2026 Callie Academy of Technology. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Enrollment</a>
            <a href="#" className="hover:text-slate-400">CIRR Outcomes Report</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
