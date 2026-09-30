import React, { useState, useEffect } from 'react';
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
  const keyBuffer = React.useRef<string>('');

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
    <div className="min-h-screen bg-[#080a0e] text-[#f5f5f7] flex flex-col selection:bg-lime-400 selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <PermissionBuilder />
        <PolicyCheck />
        <Narrative />
        <TokenRole />
        <Roadmap />
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

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
