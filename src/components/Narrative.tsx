import React from 'react';
import { WatchdogMascot } from './WatchdogMascot';
import { ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const Narrative: React.FC = () => {
  return (
    <section id="narrative" className="py-24 border-t border-slate-900 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>THE LEASH PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Useful agent autonomy <br className="hidden sm:inline" />
              needs clear boundaries.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              As AI models advance into autonomous agents, they gain tools to touch the real world: inspecting private files, running shell commands, querying APIs, and executing transactions.
            </p>

            <div className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              <p>
                When an agent lacks explicit boundaries, users hesitate to let it run. They fear accidental deletions, secret leakage, unauthorized external communications, or runaway API bills.
              </p>
              <p>
                <strong>LEASH is built on a simple premise:</strong> A good leash doesn&apos;t suppress capability—it creates confidence. When you know exactly where the boundary lines are, you can let your agent move at full speed within safe perimeters.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Terminal className="w-4 h-4 text-lime-400" />
                  <span>Readable Instructions</span>
                </div>
                <p className="text-xs text-slate-400">
                  Plain language guidelines that any developer or agent model can interpret unambiguously.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Reusable Standards</span>
                </div>
                <p className="text-xs text-slate-400">
                  Exportable schemas you can commit directly to repository roots or load into execution harnesses.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mascot & Anchor Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0f131a] border border-slate-800 shadow-2xl relative max-w-sm w-full text-center">
              <div className="mx-auto mb-6">
                <WatchdogMascot size="lg" className="mx-auto" showCable={true} status="guarding" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The Watchdog Standard</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                &ldquo;Your agent. Your rules.&rdquo; Define what is allowed, what requires permission, and what is strictly blocked.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-[11px] text-slate-400 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Autonomous Scope:</span>
                  <span className="text-emerald-400 font-semibold">Strictly Bounded</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Credentials & Spend:</span>
                  <span className="text-rose-400 font-semibold">Blocked by Default</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Irreversible Acts:</span>
                  <span className="text-amber-400 font-semibold">Ask First</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
