import React, { useState } from 'react';
import { WatchdogMascot } from './WatchdogMascot';
import { tokenConfig } from '../config/tokenConfig';
import { Menu, X, Sliders, Terminal, FileText, Clock, HelpCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Builder', href: '#builder', icon: Sliders },
    { label: 'Policy Check', href: '#checker', icon: Terminal },
    { label: 'Philosophy', href: '#narrative', icon: FileText },
    { label: 'Milestones', href: '#roadmap', icon: Clock },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  return (
    <header className="md:hidden border-b border-[#D5D1C3] bg-[#EBE8DE]/90 backdrop-blur-xs sticky top-0 z-40 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2">
          <WatchdogMascot size="xs" variant="emblem" />
          <span className="font-bold text-sm tracking-tight text-[#20231F]">LEASH</span>
          <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#20231F]/10 text-[#20231F] font-semibold">
            {tokenConfig.ticker}
          </span>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#builder"
            className="px-2.5 py-1 rounded bg-[#D65A31] text-[#FFFFFF] font-semibold text-[11px] hover:bg-[#C04A22] transition-colors"
          >
            Builder
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-[#20231F]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mt-3 pt-3 border-t border-[#D5D1C3] space-y-1 text-xs font-mono">
          <div className="px-2 py-1 text-[10px] text-[#7A7F73] uppercase font-bold">
            Navigation
          </div>
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-2.5 py-2 rounded text-[#20231F] hover:bg-[#D5D1C3]/60 transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-[#697255]" />
                <span>{link.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-[#D5D1C3]/60 px-2 text-[10px] text-[#7A7F73]">
            Status: {tokenConfig.status.statusText}
          </div>
        </div>
      )}
    </header>
  );
};
