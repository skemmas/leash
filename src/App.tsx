import React, { useState, useEffect, useRef } from 'react';
import type { AgentPolicy } from './types/policy';
import { DEFAULT_POLICY } from './types/policy';
import { SidebarRail } from './components/SidebarRail';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { PermissionBuilder } from './components/PermissionBuilder';
import { PolicyCheck } from './components/PolicyCheck';
import { Narrative } from './components/Narrative';
import { TokenRole } from './components/TokenRole';
import { Roadmap } from './components/Roadmap';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { tokenConfig } from './config/tokenConfig';

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const keyBuffer = useRef<string>('');

  // Track live policy metrics for the sidebar widget
  const [policySummary, setPolicySummary] = useState({
    allowed: Object.values(DEFAULT_POLICY.permissions).filter(v => v === 'allowed').length,
    askFirst: Object.values(DEFAULT_POLICY.permissions).filter(v => v === 'ask_first').length,
    blocked: Object.values(DEFAULT_POLICY.permissions).filter(v => v === 'blocked').length,
  });
  const [activeAgentName, setActiveAgentName] = useState(DEFAULT_POLICY.name);
  const [lastSavedTime, setLastSavedTime] = useState('Draft active');

  // Super invisible secret keystroke listener strictly complying with PumpSites Rule #6
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes when typing inside inputs or textareas
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      keyBuffer.current = (keyBuffer.current + e.key.toLowerCase()).slice(-10);
      if (keyBuffer.current.includes('fuku2026') || keyBuffer.current.includes('fuku')) {
        setIsAdminOpen(true);
        keyBuffer.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePolicyChange = (updated: AgentPolicy) => {
    setActiveAgentName(updated.name);
    setPolicySummary({
      allowed: Object.values(updated.permissions).filter(v => v === 'allowed').length,
      askFirst: Object.values(updated.permissions).filter(v => v === 'ask_first').length,
      blocked: Object.values(updated.permissions).filter(v => v === 'blocked').length,
    });
    setLastSavedTime(
      `Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    );
  };

  const handleUpdateMint = (newMint: string, newPumpUrl?: string) => {
    tokenConfig.mintAddress = newMint;
    if (newPumpUrl) {
      tokenConfig.pumpFunUrl = newPumpUrl;
    }
    tokenConfig.status.isLaunched = true;
    tokenConfig.status.statusText = 'Token Live';
    tokenConfig.status.note = `Live CA: ${newMint}`;
  };

  return (
    <div className="min-h-screen bg-[#F3F1EA] text-[#20231F] flex flex-col md:flex-row selection:bg-[#D65A31] selection:text-white">
      {/* Asymmetric Desktop Left Rail */}
      <div className="hidden md:block">
        <SidebarRail
          policySummary={policySummary}
          agentName={activeAgentName}
          lastSaved={lastSavedTime}
        />
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Navigation Header */}
        <Navbar />

        {/* Content Canvas */}
        <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-6 space-y-12 flex-1">
          <Hero />
          <HowItWorks />
          <PermissionBuilder onPolicyChange={handlePolicyChange} />
          <PolicyCheck />
          <Narrative />
          <TokenRole />
          <Roadmap />
          <Faq />
          <Footer />
        </main>
      </div>

      {/* Invisible Secret Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onUpdateMint={handleUpdateMint}
      />
    </div>
  );
};

export default App;
