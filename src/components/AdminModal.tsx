import React, { useState } from 'react';
import { KeyRound, X, Check, AlertCircle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateMint: (newMint: string, newPumpUrl?: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onUpdateMint }) => {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [mintInput, setMintInput] = useState('');
  const [pumpUrlInput, setPumpUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'fuku2026') {
      setAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid passcode');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mintInput.trim()) {
      setErrorMsg('Please enter a valid mint address');
      return;
    }
    onUpdateMint(mintInput.trim(), pumpUrlInput.trim() || undefined);
    setSuccessMsg('Contract address and market links updated successfully!');
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0f131a] border border-slate-700 rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-5 h-5 text-lime-400" />
          <h3 className="text-lg font-bold text-white">Secret CA Updater</h3>
        </div>

        {!authenticated ? (
          <form onSubmit={handleAuth} className="space-y-4">
            <p className="text-xs text-slate-400">
              Enter administrator passcode to configure dynamic contract details.
            </p>
            <div>
              <input
                type="password"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="Passcode"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-lime-400"
                autoFocus
              />
            </div>
            {errorMsg && (
              <div className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-lime-400 text-slate-950 font-bold text-xs hover:bg-lime-300 transition-colors"
            >
              Verify Passcode
            </button>
          </form>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Solana Mint Address (CA)
              </label>
              <input
                type="text"
                value={mintInput}
                onChange={e => setMintInput(e.target.value)}
                placeholder="e.g. 7xKXtg...pump"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-lime-400"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Pump.fun Market URL (Optional)
              </label>
              <input
                type="text"
                value={pumpUrlInput}
                onChange={e => setPumpUrlInput(e.target.value)}
                placeholder="https://pump.fun/coin/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-lime-400"
              />
            </div>

            {errorMsg && (
              <div className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-lime-400 text-slate-950 font-bold text-xs hover:bg-lime-300 transition-colors"
            >
              Save & Apply Contract
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
