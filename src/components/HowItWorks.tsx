import React from 'react';
import { Sliders, Eye, Download, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Define',
      icon: Sliders,
      desc: 'Set your agent’s explicit role, operational scope, and 8 core permission levels. Lock down credentials, filesystems, and spend caps.',
    },
    {
      step: '02',
      title: 'Review',
      icon: Eye,
      desc: 'Inspect human-readable guidelines and standardized JSON. Verify that high-risk actions like force pushes or token spends require human sign-off.',
    },
    {
      step: '03',
      title: 'Export',
      icon: Download,
      desc: 'Copy directly into your agent prompt, drop into AGENTS.md / CLAUDE.md, or export structured JSON for your custom agent runtime harness.',
    },
  ];

  return (
    <section className="py-20 border-t border-slate-900 bg-[#080a0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 mb-3">
            <span>WORKFLOW OVERVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Three simple steps to safe autonomy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-7 rounded-2xl bg-[#0f131a] border border-slate-800/80 hover:border-lime-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-slate-700 group-hover:text-lime-400/80 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lime-400 group-hover:border-lime-500/40 transition-colors shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850 flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-slate-300">
                  <span>Fast setup</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime-400 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
