import React from 'react';
import { WatchdogMascot } from './WatchdogMascot';
import { ArrowDownRight, Terminal, CheckCircle2, ShieldAlert, Sliders } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Subtle Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-lime-400/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f243010_1px,transparent_1px),linear-gradient(to_bottom,#1f243010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="font-mono text-lime-400 font-semibold tracking-wide">LEASH PROTOCOL</span>
              <span className="text-slate-500">•</span>
              <span>Your agent. Your rules.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
              Give your agent <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 inline-flex items-center gap-3">
                a leash.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Define its permissions. Set its limits. Export your rules.
            </p>

            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-sans">
              AI agents are becoming more autonomous. People need a simple, readable way to specify what their agents can access, change, spend, and publish—before granting execution power.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-lime-400 text-slate-950 hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/20 group hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Build agent policy</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#narrative"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <span>Explore the project</span>
              </a>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Execution</div>
                <div className="text-sm font-semibold text-slate-200">100% Client-Side</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Standard</div>
                <div className="text-sm font-semibold text-slate-200">MD + JSON Spec</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Access</div>
                <div className="text-sm font-semibold text-lime-400">Zero Wallet Needed</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Policy Card with Mascot */}
          <div className="lg:col-span-5 relative">
            {/* Floating Watchdog Badge */}
            <div className="relative mx-auto max-w-md">
              {/* Decorative top collar badge */}
              <div className="absolute -top-12 -right-4 z-20 hidden sm:block">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-mono text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span>WATCHDOG HARNESS v1.0</span>
                </div>
              </div>

              {/* Main Policy Card Container */}
              <div className="bg-gradient-to-b from-[#131720] to-[#0c0f15] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/80 relative overflow-hidden">
                {/* Accent top edge */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-500 via-lime-400 to-emerald-400" />

                {/* Header with Mascot & Title */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 shadow-inner">
                      <WatchdogMascot size="sm" className="w-11 h-11" showCable={true} />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Policy</div>
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        <span>Research-Scout</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400 block">ENFORCEMENT</span>
                    <span className="text-xs font-semibold text-emerald-400 font-mono">STRICT LEASH</span>
                  </div>
                </div>

                {/* Permission Mock Rows */}
                <div className="space-y-2.5 mb-5 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Browse public web</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ALLOWED
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <span>Edit local files</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      ASK FIRST
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Access credentials (.env)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      BLOCKED
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Spend funds / wallet</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      $0.00 BLOCKED
                    </span>
                  </div>
                </div>

                {/* Boundaries Snippet */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">STOP TRIGGER:</span>
                    <span className="text-amber-300">Uncommitted API Keys or 3 fails</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">ALLOWED HOSTS:</span>
                    <span className="text-slate-300 truncate max-w-[200px]">github.com, arxiv.org</span>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-lime-400" />
                    <span>Plain Markdown & JSON Ready</span>
                  </span>
                  <a
                    href="#builder"
                    className="text-lime-400 hover:text-lime-300 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Customize</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
