import React, { useState, useEffect } from 'react';
import { WatchdogMascot } from './WatchdogMascot';
import { tokenConfig } from '../config/tokenConfig';
import { Menu, X, Shield, Terminal, BookOpen, HelpCircle, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSecretTrigger?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Policy Builder', href: '#builder', icon: Shield },
    { label: 'Policy Check', href: '#checker', icon: Terminal },
    { label: 'Why LEASH', href: '#narrative', icon: BookOpen },
    { label: 'Roadmap', href: '#roadmap', icon: Sparkles },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090b0f]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1 group-hover:border-lime-500/50 transition-colors shadow-inner">
              <WatchdogMascot size="sm" className="w-8 h-8" showCable={false} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider text-white">LEASH</span>
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                  {tokenConfig.ticker}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
                {tokenConfig.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Token Status Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-slate-900/90 border border-slate-800 text-slate-300"
              title={tokenConfig.status.note}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-amber-300/90">
                {tokenConfig.status.statusText}
              </span>
            </div>

            <a
              href="#builder"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold bg-lime-400 text-slate-950 hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20 transition-all cursor-pointer"
            >
              Build Policy
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400">
              Free Tool
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800/80 mb-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">Status:</span>
              <span className="text-xs font-mono font-semibold text-amber-400">
                {tokenConfig.status.statusText}
              </span>
            </div>
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-200 hover:text-lime-400 hover:bg-slate-800/50 rounded-xl transition-all"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {link.label}
                </a>
              );
            })}
            <a
              href="#builder"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-2.5 rounded-xl text-sm font-bold bg-lime-400 text-slate-950 hover:bg-lime-300 transition-all shadow-md shadow-lime-400/10"
            >
              Open Agent Policy Builder
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
