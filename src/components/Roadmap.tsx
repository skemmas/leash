import React from 'react';

export const Roadmap: React.FC = () => {
  const milestones = [
    {
      phase: '01',
      title: 'Local Boundary Synthesis & Instruction Validator',
      date: 'Q3 2026',
      status: 'working_now',
      statusLabel: 'Working Now',
      deliverables: [
        'Interactive 8-permission agent control matrix with Allowed / Ask First / Blocked states',
        'Multi-format exports: Standardized Markdown, plain-language text, and documented JSON spec',
        'Client-side deterministic instruction auditor detecting 5 missing guardrails',
        'Local draft persistence in browser memory (localStorage) with factory reset',
        'Baseline presets for Research, Coding, Content, and Cautious modes',
      ],
    },
    {
      phase: '02',
      title: 'Solana Verification & Holder Workspaces',
      date: 'Planned',
      status: 'planned',
      statusLabel: 'Planned',
      deliverables: [
        'Solana signature verification for accountless operator access',
        'End-to-end encrypted remote workspace sync across development machines',
        'Policy revision history logs with visual diff tracking',
        'Community template registry for sharing and voting on specialized agent policies',
      ],
    },
    {
      phase: '03',
      title: 'Execution Interceptors & Enforcement Bridges',
      date: 'Planned',
      status: 'planned',
      statusLabel: 'Planned',
      deliverables: [
        'Local CLI hook (`npx leash-guard`) to physically halt unapproved terminal commands',
        'HTTP proxy middleware for hard spending limit enforcement on paid APIs',
        'GitHub Actions compliance checker for agent code commits and pull requests',
      ],
    },
  ];

  return (
    <section id="roadmap" className="border-b border-[#D5D1C3] py-10 scroll-mt-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-3 border-b border-[#D5D1C3]">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-semibold">
            Engineering Milestones
          </div>
          <h2 className="text-2xl font-bold text-[#20231F] mt-1">
            Status & Development Schedule
          </h2>
        </div>
        <span className="text-xs font-mono text-[#575B52] mt-1 sm:mt-0">
          Transparent delivery log
        </span>
      </div>

      {/* Simple Dated / Status List (No grid of rounded cards!) */}
      <div className="divide-y divide-[#D5D1C3] border-y border-[#D5D1C3]">
        {milestones.map(m => {
          const isWorking = m.status === 'working_now';

          return (
            <div
              key={m.phase}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
            >
              {/* Col 1: Phase & Date */}
              <div className="md:col-span-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#20231F]">
                    PHASE {m.phase}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isWorking
                        ? 'bg-[#2E5A36] text-[#FFFFFF]'
                        : 'bg-[#D5D1C3] text-[#575B52]'
                    }`}
                  >
                    {m.statusLabel}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#7A7F73]">
                  {m.date}
                </div>
              </div>

              {/* Col 2: Milestone Title & Items */}
              <div className="md:col-span-9 space-y-2">
                <h3 className="font-bold text-sm text-[#20231F]">
                  {m.title}
                </h3>
                <ul className="space-y-1 text-xs text-[#575B52] font-mono">
                  {m.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={isWorking ? 'text-[#2E5A36]' : 'text-[#7A7F73]'}>
                        {isWorking ? '✔' : '—'}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
