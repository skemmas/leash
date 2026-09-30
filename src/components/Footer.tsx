import React from 'react';
import { tokenConfig } from '../config/tokenConfig';
import { WatchdogMascot } from './WatchdogMascot';
import { ExternalLink, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-10 pb-16 text-xs text-[#575B52]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#D5D1C3]">
        {/* Brand & Ticker Col */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <WatchdogMascot size="sm" variant="emblem" />
            <span className="font-bold text-sm text-[#20231F]">LEASH PROTOCOL</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#20231F]/10 text-[#20231F] font-semibold">
              {tokenConfig.ticker}
            </span>
          </div>

          <p className="text-[11px] leading-relaxed max-w-sm">
            Practical boundary specifications and deterministic validation for autonomous agents. Designed to make machine autonomy readable, exportable, and safe.
          </p>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#20231F] pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D65A31]" />
            <span>Network Status: {tokenConfig.status.statusText}</span>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="md:col-span-3 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#7A7F73] font-semibold">
            Control Anchors
          </div>
          <ul className="space-y-1.5 font-mono text-[11px]">
            <li>
              <a href="#builder" className="hover:text-[#D65A31] transition-colors">
                § 01. Permission Builder
              </a>
            </li>
            <li>
              <a href="#checker" className="hover:text-[#D65A31] transition-colors">
                § 02. Policy Check Tool
              </a>
            </li>
            <li>
              <a href="#workflow" className="hover:text-[#D65A31] transition-colors">
                § 03. Execution Sequence
              </a>
            </li>
            <li>
              <a href="#narrative" className="hover:text-[#D65A31] transition-colors">
                § 04. Control Philosophy
              </a>
            </li>
            <li>
              <a href="#roadmap" className="hover:text-[#D65A31] transition-colors">
                § 05. Milestones
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#D65A31] transition-colors">
                § 06. Documentation & FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Links & Verification */}
        <div className="md:col-span-4 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#7A7F73] font-semibold">
            Verification & Channels
          </div>
          <div className="space-y-1.5 font-mono text-[11px]">
            {tokenConfig.socials.github && (
              <div>
                <a
                  href={tokenConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D65A31] inline-flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            )}
            {tokenConfig.socials.twitter && (
              <div>
                <a
                  href={tokenConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D65A31] inline-flex items-center gap-1"
                >
                  <span>Twitter / X</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            )}
            {tokenConfig.pumpFunUrl ? (
              <div>
                <a
                  href={tokenConfig.pumpFunUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D65A31] hover:underline inline-flex items-center gap-1"
                >
                  <span>Pump.fun Market</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ) : (
              <div className="text-[#7A7F73]">
                Pump.fun: Trading link hidden until launched
              </div>
            )}
            <div className="text-[#7A7F73]">
              Contract: {tokenConfig.mintAddress ? tokenConfig.mintAddress : 'Not yet deployed'}
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Non-Affiliation */}
      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#7A7F73]">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-[#697255]" />
          <span>
            LEASH is an independent community project. Not affiliated with OpenAI, Anthropic, Solana, or Pump.fun.
          </span>
        </div>
        <div>
          &copy; {currentYear} LEASH Protocol. Open specification.
        </div>
      </div>
    </footer>
  );
};
