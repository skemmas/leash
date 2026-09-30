import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const roadmapItems = [
    {
      phase: 'Phase 1',
      title: 'Core Protocol & Local Tools',
      status: 'working_now',
      statusLabel: 'Working Now',
      items: [
        'Interactive 8-permission agent boundary builder',
        'Export formats: Human Markdown, Plain Text, and Documented JSON',
        'Deterministic 5-rule client-side instruction validator',
        'Local draft auto-persistence with reset controls',
        'Preconfigured presets for Research, Coding, and Content agents',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Ecosystem & Community Sync',
      status: 'planned',
      statusLabel: 'Planned',
      items: [
        'Solana holder signature verification for accountless access',
        'Encrypted remote workspace sync for multi-device setups',
        'Community template publishing with upvotes and star ratings',
        'CLI helper package (`npx leash-policy init`) for local git repos',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Runtime Enforcers & Extensions',
      status: 'planned',
      statusLabel: 'Planned',
      items: [
        'Pre-execution bash hook to physically intercept flagged commands',
        'API proxy middleware for hard spending limit enforcement',
        'Browser extension to monitor web agent tool calls in real time',
        'GitHub Actions policy compliance linter for agent PRs',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-20 border-t border-slate-900 bg-[#07090d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-lime-400/10 text-lime-400 border border-lime-400/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Development Milestones
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            No ambiguous promises. We clearly demarcate what is active in your hands today and what is on our engineering roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roadmapItems.map(item => {
            const isWorking = item.status === 'working_now';

            return (
              <div
                key={item.phase}
                className={`p-7 rounded-3xl border flex flex-col justify-between transition-all ${
                  isWorking
                    ? 'bg-[#0f141d] border-lime-500/40 shadow-xl shadow-lime-950/20 ring-1 ring-lime-400/20'
                    : 'bg-[#0e1117] border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.phase}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                        isWorking
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isWorking ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WORKING NOW</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>PLANNED</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>

                  <ul className="space-y-3 font-mono text-xs text-slate-300">
                    {item.items.map((sub, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-snug">
                        {isWorking ? (
                          <span className="text-emerald-400 font-bold mt-0.5">✔</span>
                        ) : (
                          <span className="text-slate-600 font-bold mt-0.5">○</span>
                        )}
                        <span className={isWorking ? 'text-slate-200' : 'text-slate-400'}>
                          {sub}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  {isWorking ? (
                    <span className="text-emerald-400 font-semibold">Ready to test above</span>
                  ) : (
                    <span>Subject to technical specification</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
