import React from 'react';
import { WatchdogMascot } from './WatchdogMascot';
import { tokenConfig } from '../config/tokenConfig';
import {
  Sliders,
  Terminal,
  Compass,
  FileText,
  Clock,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface SidebarRailProps {
  activeSection?: string;
  policySummary?: {
    allowed: number;
    askFirst: number;
    blocked: number;
  };
  agentName?: string;
  lastSaved?: string;
}

export const SidebarRail: React.FC<SidebarRailProps> = ({
  activeSection = 'builder',
  policySummary = { allowed: 2, askFirst: 4, blocked: 2 },
  agentName = 'Watchdog-Alpha',
  lastSaved = 'Draft ready',
}) => {
  const navItems = [
    { id: 'builder', label: 'Permission Builder', step: '01', icon: Sliders },
    { id: 'checker', label: 'Policy Check', step: '02', icon: Terminal },
    { id: 'workflow', label: 'Execution Process', step: '03', icon: Compass },
    { id: 'narrative', label: 'Control Philosophy', step: '04', icon: FileText },
    { id: 'roadmap', label: 'Milestones', step: '05', icon: Clock },
    { id: 'faq', label: 'Documentation & FAQ', step: '06', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 xl:w-72 border-r border-[#D5D1C3] bg-[#EBE8DE]/70 flex flex-col justify-between shrink-0 p-5 sticky top-0 h-screen overflow-y-auto">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="border-b border-[#D5D1C3] pb-4">
          <div className="flex items-center gap-2.5 mb-2">
            <WatchdogMascot size="sm" variant="emblem" />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg tracking-tight text-[#20231F]">LEASH</span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#20231F]/10 text-[#20231F] font-semibold">
                {tokenConfig.ticker}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#575B52] font-mono leading-tight">
            {tokenConfig.tagline}
          </p>
        </div>

        {/* Section Navigation */}
        <nav className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] px-2 mb-2 font-semibold">
            Control Navigation
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center justify-between px-2.5 py-2 rounded text-xs transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#20231F] text-[#F3F1EA] font-semibold'
                    : 'text-[#20231F] hover:bg-[#D5D1C3]/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D65A31]' : 'text-[#697255]'}`} />
                  <span>{item.label}</span>
                </div>
                <span className={`text-[10px] font-mono ${isActive ? 'text-[#F3F1EA]/70' : 'text-[#7A7F73]'}`}>
                  {item.step}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Compact Policy Telemetry Widget */}
        <div className="p-3.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7F73] uppercase tracking-wider">
            <span>Active Spec</span>
            <span className="text-[#D65A31] font-semibold">Spec v1.0</span>
          </div>

          <div>
            <div className="text-xs font-bold text-[#20231F] truncate" title={agentName}>
              {agentName || 'Unnamed Agent'}
            </div>
            <div className="text-[11px] font-mono text-[#575B52] mt-0.5">
              {policySummary.allowed} allowed / {policySummary.askFirst} approval / {policySummary.blocked} blocked
            </div>
          </div>

          <div className="pt-2 border-t border-[#EBE8DE] flex items-center justify-between text-[10px] font-mono text-[#7A7F73]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#697255]" />
              <span>{lastSaved}</span>
            </span>
            <a href="#builder" className="text-[#D65A31] hover:underline font-semibold">
              Edit →
            </a>
          </div>
        </div>

        {/* Token State */}
        <div className="p-3 rounded border border-[#D5D1C3] bg-[#EBE8DE] text-xs space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73]">
            Network Status
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#20231F]">
            <span className="w-2 h-2 rounded-full bg-[#D65A31]" />
            <span>{tokenConfig.status.statusText}</span>
          </div>
          <p className="text-[11px] text-[#575B52] leading-tight pt-1">
            Builder and checker are 100% free and run locally in browser.
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="pt-4 border-t border-[#D5D1C3] text-[11px] font-mono text-[#575B52] space-y-2">
        <div className="flex items-center justify-between">
          <a
            href={tokenConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#20231F] flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href={tokenConfig.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#20231F] flex items-center gap-1"
          >
            <span>Twitter/X</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
        <div className="text-[10px] text-[#7A7F73]">
          Open Source Control Schema
        </div>
      </div>
    </aside>
  );
};
