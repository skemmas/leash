import React from 'react';
import { tokenConfig } from '../config/tokenConfig';
import { Coins, CheckCircle, Clock, ShieldCheck, Database, Share2, Layers } from 'lucide-react';

export const TokenRole: React.FC = () => {
  return (
    <section className="py-20 border-t border-slate-900 bg-[#080a0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-lime-400/10 text-lime-400 border border-lime-400/20 mb-4">
            <Coins className="w-3.5 h-3.5" />
            <span>TOKEN ROLE & UTILITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Free utility first. Community-powered growth.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            The core LEASH permission builder and policy check are 100% free and client-side. The $LEASH token represents community governance and future cloud tier expansions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier: Available Now to Everyone */}
          <div className="p-8 rounded-3xl bg-[#0f131a] border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AVAILABLE NOW
                </span>
                <span className="text-sm font-mono text-slate-400">Free Forever</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Public Core Tools</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Open access for individual developers, researchers, and tinkerers without wallets, accounts, or fees.
              </p>

              <ul className="space-y-3 font-mono text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Interactive 8-factor agent permission builder</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Instant Markdown, Plaintext, and JSON spec export</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Deterministic 5-point instruction policy checker</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>LocalStorage draft auto-persistence</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero wallet or API keys needed</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              Run locally in any modern browser. No tracking or telemetry.
            </div>
          </div>

          {/* Planned Token Utilities: Clearly Marked */}
          <div className="p-8 rounded-3xl bg-[#0f131a]/60 border border-dashed border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>PLANNED ECOSYSTEM</span>
                </span>
                <span className="text-sm font-mono text-lime-400">{tokenConfig.ticker} Utility</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Planned Holder Workspaces</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Advanced features under architectural design for verified $LEASH token holders and teams.
              </p>

              <ul className="space-y-3 font-mono text-xs text-slate-400">
                <li className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-300">Holder Workspaces:</strong> Cloud encrypted policy sync across machines (Planned)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-300">Policy Version History:</strong> Audit logs and diff tracking over time (Planned)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Share2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-300">Community Template Registry:</strong> Share and upvote vetted agent guardrails (Planned)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-300">Runtime Enforcement Hooks:</strong> Pre-execution sandbox connectors (Planned)
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs text-amber-300/80 font-mono">
              ★ Honest note: These cloud features are planned additions. The local tools remain free and open.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
