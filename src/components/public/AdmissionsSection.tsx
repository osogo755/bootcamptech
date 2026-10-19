import React, { useState } from 'react';
import { 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Check, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ProgramId } from '../../types';

interface AdmissionsSectionProps {
  onApply: (programId?: ProgramId) => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onApply }) => {
  const [fundingOption, setFundingOption] = useState<'upfront' | 'isa' | 'installments'>('upfront');

  return (
    <section id="admissions-section" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            TUITION &amp; ADMISSIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Pricing &amp; Flexible Funding
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            We believe world-class technical education should be accessible. Choose from upfront tuition discounts, employer sponsorship, or zero-upfront Income Share Agreements.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* Plan 1: Upfront */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Maximum Value</div>
              <h3 className="text-2xl font-bold text-white">Upfront Tuition</h3>
              <p className="text-xs text-slate-400 mt-1">Includes KSh 20,000 Early Bird scholarship</p>
              
              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">KSh 125,000</span>
                  <span className="text-xs text-slate-400">total</span>
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">Save KSh 20,000 compared to installments</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Immediate access to pre-work preparatory labs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All 5 program cloud sandboxes &amp; AWS credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lifetime career concierge &amp; alumni network</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onApply('software-engineering')}
              className="w-full mt-8 py-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              Select Upfront Plan
            </button>
          </div>

          {/* Plan 2: ISA / Deferred (Featured) */}
          <div className="rounded-3xl border-2 border-indigo-500 bg-slate-900/90 p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-indigo-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Zero Risk</div>
              <h3 className="text-2xl font-bold text-white">Income Share Agreement (ISA)</h3>
              <p className="text-xs text-slate-400 mt-1">Pay zero tuition until you land a KSh 80,000/mo+ role</p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-indigo-400 font-mono">KSh 0</span>
                  <span className="text-xs text-slate-400">upfront tuition</span>
                </div>
                <div className="text-xs text-indigo-300 font-semibold mt-1">10% monthly salary cap for 24 months</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>KSh 0 upfront payments or application deposit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Payments pause if you ever make less than KSh 80,000/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Full money-back job guarantee policy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Includes all 1-on-1 staff mentor office hours</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onApply('software-engineering')}
              className="w-full mt-8 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Apply for Zero-Upfront ISA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3: 0% Interest Installments */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Monthly Flexibility</div>
              <h3 className="text-2xl font-bold text-white">Monthly Installments</h3>
              <p className="text-xs text-slate-400 mt-1">Split payments evenly over 12 or 24 months</p>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">KSh 12,500</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <div className="text-xs text-slate-400 font-semibold mt-1">0% interest financing through local education partners &amp; SACCOs</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Low fixed monthly payments via M-Pesa or bank transfer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant pre-approval with zero hidden processing charges</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Eligible for Tech Retraining Grants &amp; Corporate Sponsorships</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onApply('cloud-computing')}
              className="w-full mt-8 py-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              Check Monthly Eligibility
            </button>
          </div>

        </div>

        {/* Next Cohort Deadlines banner */}
        <div className="p-6 rounded-3xl bg-indigo-950/30 border border-indigo-900/40 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-white">Next Cohort Admissions Deadline: November 2, 2026</div>
              <p className="text-xs text-slate-300">Admissions are competitive and capped at 24 students per cohort to preserve 1:8 mentor ratios.</p>
            </div>
          </div>
          <button
            onClick={() => onApply()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold whitespace-nowrap transition-colors cursor-pointer"
          >
            Start 10-Min Application
          </button>
        </div>

      </div>
    </section>
  );
};
