import React from 'react';
import { WatchdogMascot } from './WatchdogMascot';

export const Narrative: React.FC = () => {
  return (
    <section id="narrative" className="border-b border-[#D5D1C3] py-12 scroll-mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Short Editorial Text Block (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-semibold">
            Operating Philosophy
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#20231F] tracking-tight leading-tight">
            Useful agent autonomy requires unambiguous boundaries.
          </h2>

          <div className="space-y-3 text-sm text-[#575B52] leading-relaxed max-w-2xl">
            <p>
              When software agents can call terminal tools, edit repositories, query web endpoints, and touch financial rails, operators face a dilemma: grant complete permissions and risk unintended actions, or manually approve every sub-task and destroy the efficiency of autonomy.
            </p>
            <p>
              LEASH provides a middle path. A clear boundary does not choke an agent; it creates the operational certainty required to let it run unsupervised within safe perimeters.
            </p>
            <p>
              By formalizing constraints into plain language for system prompts and structured JSON for execution harnesses, human intent remains explicit and inspectable.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-6 text-xs font-mono text-[#20231F]">
            <div>
              <span className="text-[#D65A31] font-bold">01.</span> Explicit Permissions
            </div>
            <div>
              <span className="text-[#D65A31] font-bold">02.</span> Machine Exportable
            </div>
            <div>
              <span className="text-[#D65A31] font-bold">03.</span> Human Readable
            </div>
          </div>
        </div>

        {/* Right Column: One Small Technical Illustration (4 cols) */}
        <div className="lg:col-span-4 flex items-center justify-center p-6 bg-[#FFFFFF] border border-[#D5D1C3] rounded text-center">
          <div className="space-y-3">
            <WatchdogMascot size="lg" variant="illustration" className="mx-auto" />
            <div className="border-t border-[#EBE8DE] pt-2">
              <div className="text-xs font-bold text-[#20231F] font-mono uppercase">
                Schematic: Watchdog Control
              </div>
              <div className="text-[11px] text-[#7A7F73] font-mono">
                Cable Tether & Sensing Visor Spec
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
