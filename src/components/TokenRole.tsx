import React from 'react';
import { tokenConfig } from '../config/tokenConfig';
import { Check, Clock } from 'lucide-react';

export const TokenRole: React.FC = () => {
  return (
    <section className="border-b border-[#D5D1C3] py-10">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-3 border-b border-[#D5D1C3]">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-semibold">
            Utility & Token Scope
          </div>
          <h2 className="text-2xl font-bold text-[#20231F] mt-1">
            Free Utility Standard · Planned Ecosystem
          </h2>
        </div>
        <span className="text-xs font-mono text-[#575B52] mt-1 sm:mt-0">
          Provisional ticker: {tokenConfig.ticker}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Core Tier */}
        <div className="p-5 rounded border border-[#D5D1C3] bg-[#FFFFFF] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EBE8DE]">
            <span className="text-xs font-bold font-mono uppercase text-[#2E5A36]">
              ● Available Now (Free For All)
            </span>
            <span className="text-[10px] font-mono text-[#7A7F73]">Zero Wallet</span>
          </div>

          <p className="text-xs text-[#575B52] leading-relaxed">
            The standalone permission builder and policy validation rules run completely client-side in the browser. Anyone can construct, test, and export agent policies with zero fees or tokens.
          </p>

          <ul className="space-y-2 text-xs font-mono text-[#20231F]">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Full 8-factor permission configuration</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Markdown, Documented JSON, and Plain Text exports</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Deterministic instruction audit for missing guardrails</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Local browser draft persistence (localStorage)</span>
            </li>
          </ul>
        </div>

        {/* Planned Token Tier */}
        <div className="p-5 rounded border border-[#D5D1C3] bg-[#EBE8DE]/50 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#D5D1C3]">
            <span className="text-xs font-bold font-mono uppercase text-[#8A5812] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Planned Features (Ecosystem Tier)</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#8A5812]/10 text-[#8A5812] font-semibold">
              Planned
            </span>
          </div>

          <p className="text-xs text-[#575B52] leading-relaxed">
            Planned additions for community verification and team workflows. These features are in architectural design and will require {tokenConfig.ticker} verification:
          </p>

          <ul className="space-y-2 text-xs font-mono text-[#575B52]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A5812]" />
              <span>Holder Workspaces (Encrypted remote sync) — Planned</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A5812]" />
              <span>Policy Revision History and Audit Diffing — Planned</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A5812]" />
              <span>Community Guardrail Template Registry — Planned</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A5812]" />
              <span>Runtime Enforcement CLI Sidecar Integration — Planned</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
