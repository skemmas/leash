import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Clock } from 'lucide-react';

interface ContractAddressBarProps {
  mintAddress: string | null;
  pumpFunUrl: string | null;
  variant?: 'hero' | 'sidebar' | 'compact' | 'footer';
  className?: string;
}

export const ContractAddressBar: React.FC<ContractAddressBarProps> = ({
  mintAddress,
  pumpFunUrl,
  variant = 'hero',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!mintAddress) return;
    navigator.clipboard.writeText(mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncated = mintAddress
    ? `${mintAddress.slice(0, 6)}...${mintAddress.slice(-6)}`
    : null;

  // 1. Sidebar variant (lives in the left navigation rail on desktop)
  if (variant === 'sidebar') {
    return (
      <div className={`p-3.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] space-y-2.5 shadow-sm ${className}`}>
        <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7F73] uppercase tracking-wider">
          <span className="font-semibold text-[#20231F]">Contract Address</span>
          {mintAddress ? (
            <span className="px-1.5 py-0.2 rounded bg-[#2E5A36]/10 text-[#2E5A36] font-bold">
              VERIFIED
            </span>
          ) : (
            <span className="px-1.5 py-0.2 rounded bg-[#8A5812]/10 text-[#8A5812] font-semibold flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>PENDING</span>
            </span>
          )}
        </div>

        {mintAddress ? (
          <div className="space-y-2">
            <div className="p-2 rounded bg-[#F3F1EA] border border-[#D5D1C3] font-mono text-[11px] text-[#20231F] break-all select-all leading-tight">
              {mintAddress}
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <button
                onClick={handleCopy}
                className="flex-1 py-1.5 px-2 rounded bg-[#20231F] text-[#F3F1EA] font-mono text-xs font-semibold hover:bg-[#343831] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span className="text-[#A3E635]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy CA</span>
                  </>
                )}
              </button>

              {pumpFunUrl && (
                <a
                  href={pumpFunUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2 rounded bg-[#D65A31] text-[#FFFFFF] font-mono text-xs font-semibold hover:bg-[#C04A22] transition-colors flex items-center justify-center gap-1"
                  title="View on Pump.fun"
                >
                  <span>Trade</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 text-xs">
            <div className="p-2 rounded bg-[#F3F1EA] border border-dashed border-[#D5D1C3] font-mono text-[11px] text-[#575B52] leading-tight">
              Token not yet launched on-chain.
            </div>
            <p className="text-[10px] text-[#7A7F73] leading-tight">
              Official mint address will appear here with 1-click copy immediately upon launch.
            </p>
          </div>
        )}
      </div>
    );
  }

  // 2. Compact variant (for mobile top bar or sub-headers)
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {mintAddress ? (
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#D5D1C3] bg-[#FFFFFF] hover:bg-[#EBE8DE] text-xs font-mono text-[#20231F] transition-colors cursor-pointer"
            title="Click to copy Contract Address"
          >
            <span className="text-[#697255] font-semibold">CA:</span>
            <span>{truncated}</span>
            {copied ? (
              <Check className="w-3 h-3 text-[#2E5A36]" />
            ) : (
              <Copy className="w-3 h-3 text-[#7A7F73]" />
            )}
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[#D5D1C3] bg-[#EBE8DE] text-[11px] font-mono text-[#575B52]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A5812]" />
            <span>CA: Pending Launch</span>
          </span>
        )}
      </div>
    );
  }

  // 3. Hero variant (high-visibility prominent banner right below the headline)
  return (
    <div
      className={`p-3.5 sm:p-4 rounded border border-[#D5D1C3] bg-[#FFFFFF] shadow-sm max-w-2xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#20231F] text-[#F3F1EA] flex items-center justify-center font-mono text-[11px] font-bold">
            CA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-bold">
                Solana Contract Address
              </span>
              {mintAddress ? (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#2E5A36]/10 text-[#2E5A36] font-bold">
                  LIVE
                </span>
              ) : (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#8A5812]/10 text-[#8A5812] font-semibold">
                  PROVISIONAL
                </span>
              )}
            </div>

            {mintAddress ? (
              <div className="font-mono text-xs sm:text-sm font-bold text-[#20231F] select-all break-all sm:break-normal">
                {mintAddress}
              </div>
            ) : (
              <div className="font-mono text-xs text-[#575B52]">
                Token not yet launched · Contract pending deployment
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          {mintAddress ? (
            <>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded bg-[#20231F] text-[#F3F1EA] font-mono text-xs font-semibold hover:bg-[#343831] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#A3E635]" />
                    <span className="text-[#A3E635]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy CA</span>
                  </>
                )}
              </button>

              {pumpFunUrl && (
                <a
                  href={pumpFunUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#D65A31] text-[#FFFFFF] font-mono text-xs font-semibold hover:bg-[#C04A22] transition-colors flex items-center gap-1.5"
                >
                  <span>Pump.fun</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </>
          ) : (
            <span className="text-[11px] font-mono text-[#7A7F73] px-2 py-1 rounded bg-[#F3F1EA] border border-[#D5D1C3]">
              Pending Launch
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
