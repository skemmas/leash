import React from 'react';
import { Sliders, Eye, Download } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Define',
      icon: Sliders,
      detail: 'Configure scope and 8 operational toggles: filesystem, network, commands, credentials, and spending caps.',
    },
    {
      step: '02',
      title: 'Review',
      icon: Eye,
      detail: 'Inspect the generated plain-language instructions and documented JSON spec for missed edge cases or loopholes.',
    },
    {
      step: '03',
      title: 'Export',
      icon: Download,
      detail: 'Drop directly into AGENTS.md, CLAUDE.md, .cursorrules, or load as runtime boundary schema.',
    },
  ];

  return (
    <section id="workflow" className="border-b border-[#D5D1C3] py-10">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-[#D5D1C3]/80">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-semibold">
            Execution Flow
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20231F] mt-1">
            Standard Operating Sequence
          </h2>
        </div>
        <span className="text-xs font-mono text-[#575B52] mt-1 sm:mt-0">
          3-step boundary synthesis
        </span>
      </div>

      {/* Schematic Layout with Subtle Cable-Line Motif */}
      <div className="relative">
        {/* Subtle Horizontal Cable Line Connecting Steps on desktop */}
        <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 border-t border-dashed border-[#697255]/40 -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#FFFFFF] border border-[#D5D1C3] rounded p-5 relative space-y-3"
              >
                {/* Step header line */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#20231F] text-[#F3F1EA] flex items-center justify-center font-mono text-xs font-bold">
                      {item.step}
                    </span>
                    <span className="font-bold text-sm text-[#20231F] uppercase tracking-wider">
                      {item.title}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded border border-[#D5D1C3] bg-[#F3F1EA] flex items-center justify-center text-[#697255]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-xs text-[#575B52] leading-relaxed">
                  {item.detail}
                </p>

                {/* Cable Connector Node on the right */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-6 w-5 h-5 rounded-full bg-[#F3F1EA] border border-[#D65A31] items-center justify-center z-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D65A31]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
