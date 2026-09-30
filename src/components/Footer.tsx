import React from 'react';
import { tokenConfig } from '../config/tokenConfig';
import { WatchdogMascot } from './WatchdogMascot';
import { Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-[#06080b] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1">
                <WatchdogMascot size="sm" className="w-7 h-7" showCable={false} />
              </div>
              <div>
                <span className="text-lg font-black tracking-wider text-white">LEASH</span>
                <span className="ml-2 text-xs font-mono px-1.5 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                  {tokenConfig.ticker}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Standardized boundary definitions and deterministic rule checking for autonomous AI agents. Your agent, your rules.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Token Status: {tokenConfig.status.statusText}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#builder" className="hover:text-lime-400 transition-colors">
                  Agent Permission Builder
                </a>
              </li>
              <li>
                <a href="#checker" className="hover:text-lime-400 transition-colors">
                  Deterministic Policy Check
                </a>
              </li>
              <li>
                <a href="#narrative" className="hover:text-lime-400 transition-colors">
                  The LEASH Narrative
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-lime-400 transition-colors">
                  Development Roadmap
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-lime-400 transition-colors">
                  FAQ & Privacy Model
                </a>
              </li>
            </ul>
          </div>

          {/* Channels & Status */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Links & Verification
            </div>
            <div className="space-y-2 text-xs">
              {tokenConfig.socials.twitter && (
                <div>
                  <a
                    href={tokenConfig.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-lime-400 transition-colors"
                  >
                    <span>Twitter / X</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                </div>
              )}
              {tokenConfig.socials.github && (
                <div>
                  <a
                    href={tokenConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-lime-400 transition-colors"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                </div>
              )}
              {tokenConfig.pumpFunUrl ? (
                <div>
                  <a
                    href={tokenConfig.pumpFunUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-lime-400 hover:underline"
                  >
                    <span>Pump.fun Market</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                <div className="text-slate-600 font-mono text-[11px]">
                  Pump.fun trading link: Hidden (Token not launched)
                </div>
              )}
              {tokenConfig.mintAddress ? (
                <div className="font-mono text-[11px] text-slate-400 break-all">
                  CA: {tokenConfig.mintAddress}
                </div>
              ) : (
                <div className="text-slate-600 font-mono text-[11px]">
                  Mint Contract: Not yet deployed
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>
              LEASH is an independent open-source tool and community project. Not affiliated with OpenAI, Anthropic, Solana, or Pump.fun.
            </span>
          </div>

          <div>
            &copy; {currentYear} LEASH Protocol. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
