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
    const cleanMint = mintInput.trim();
    if (!cleanMint) {
      setErrorMsg('Please enter a valid mint address');
      return;
    }
    try {
      localStorage.setItem('leash_ca_mint', cleanMint);
      if (pumpUrlInput.trim()) {
        localStorage.setItem('leash_ca_pump', pumpUrlInput.trim());
      }
    } catch {
      // Ignore storage errors
    }
    onUpdateMint(cleanMint, pumpUrlInput.trim() || undefined);
    setSuccessMsg('Contract address applied successfully.');
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#20231F]/70 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#F3F1EA] border border-[#20231F] rounded p-6 shadow-xl relative text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#7A7F73] hover:text-[#20231F] rounded border border-[#D5D1C3] bg-[#FFFFFF]"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-4 h-4 text-[#D65A31]" />
          <h3 className="text-sm font-bold text-[#20231F] font-mono uppercase tracking-wider">
            Operator CA Control
          </h3>
        </div>

        {!authenticated ? (
          <form onSubmit={handleAuth} className="space-y-3">
            <p className="text-[11px] text-[#575B52]">
              Enter administrator passcode to configure dynamic contract address details.
            </p>
            <div>
              <input
                type="password"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                placeholder="Master Passcode"
                className="w-full px-3 py-2 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-[#20231F] font-mono text-xs focus:outline-none focus:border-[#D65A31]"
                autoFocus
              />
            </div>
            {errorMsg && (
              <div className="text-[11px] text-[#9A3215] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errorMsg}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 rounded bg-[#D65A31] text-[#FFFFFF] font-bold text-xs hover:bg-[#C04A22] transition-colors"
            >
              Verify Credentials
            </button>
          </form>
        ) : (
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#575B52] mb-1">
                Solana Mint Contract Address (CA)
              </label>
              <input
                type="text"
                value={mintInput}
                onChange={e => setMintInput(e.target.value)}
                placeholder="e.g. 7xKXtg...pump"
                className="w-full px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-[#20231F] font-mono text-xs focus:outline-none focus:border-[#D65A31]"
                autoFocus
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#575B52] mb-1">
                Pump.fun Market URL (Optional)
              </label>
              <input
                type="text"
                value={pumpUrlInput}
                onChange={e => setPumpUrlInput(e.target.value)}
                placeholder="https://pump.fun/coin/..."
                className="w-full px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-[#20231F] font-mono text-xs focus:outline-none focus:border-[#D65A31]"
              />
            </div>

            {errorMsg && (
              <div className="text-[11px] text-[#9A3215] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="text-[11px] text-[#2E5A36] flex items-center gap-1 font-semibold">
                <Check className="w-3 h-3" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded bg-[#20231F] text-[#F3F1EA] font-bold text-xs hover:bg-[#343831] transition-colors"
            >
              Apply Updates
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
