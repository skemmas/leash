import React, { useState } from 'react';
import { checkAgentPolicyText } from '../utils/policyChecker';
import type { PolicyCheckResult } from '../utils/policyChecker';
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Terminal,
  Lock,
  PlusCircle,
} from 'lucide-react';

const SAMPLE_UNHARDENED_PROMPT = `You are a helpful software assistant with bash and file tools.
Complete user tasks by editing files and browsing the web when necessary.
Feel free to deploy updates when tests pass.`;

export const PolicyCheck: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const checkResult: PolicyCheckResult = checkAgentPolicyText(inputText);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const loadSample = () => {
    setInputText(SAMPLE_UNHARDENED_PROMPT);
  };

  const appendSuggestedFixes = () => {
    const fixes = checkResult.items
      .filter(item => !item.passed)
      .map(item => item.suggestedWording)
      .join('\n\n');

    if (!fixes) return;

    setInputText(prev => {
      const trimmed = prev.trim();
      return `${trimmed}\n\n# --- LEASH OPERATIONAL GUARDRAILS ---\n${fixes}`;
    });
  };

  return (
    <section id="checker" className="border-b border-[#D5D1C3] py-10 scroll-mt-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-3 border-b border-[#D5D1C3]">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-semibold">
            Instruction Audit
          </div>
          <h2 className="text-2xl font-bold text-[#20231F] mt-1">
            Deterministic Policy Check
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#575B52] mt-1 sm:mt-0">
          <Lock className="w-3.5 h-3.5 text-[#697255]" />
          <span>Local Browser Evaluation (Zero Network Calls)</span>
        </div>
      </div>

      {/* Scope Disclaimer */}
      <div className="p-3 mb-6 rounded border border-[#D5D1C3] bg-[#EBE8DE] text-xs text-[#575B52]">
        <strong className="text-[#20231F]">Scope Note:</strong> This is a basic deterministic instruction check to identify missing operational boundaries—not a security audit or cryptographic guarantee. Evaluated entirely in memory.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Prompt (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-[#FFFFFF] border border-[#D5D1C3] rounded p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBE8DE] text-xs font-mono">
              <span className="font-semibold text-[#20231F] uppercase">
                Input System Prompt or AGENTS.md
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={loadSample}
                  className="text-[#D65A31] hover:underline cursor-pointer"
                >
                  Load Sample
                </button>
                {inputText && (
                  <button
                    onClick={() => setInputText('')}
                    className="text-[#7A7F73] hover:text-[#20231F]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              rows={13}
              placeholder="Paste existing agent prompt, system prompt, or markdown instructions to check for missing guardrails..."
              className="w-full p-3 rounded border border-[#D5D1C3] bg-[#F3F1EA] font-mono text-xs text-[#20231F] focus:outline-none focus:border-[#D65A31] leading-relaxed resize-y"
            />

            <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7F73]">
              <span>Length: {inputText.length} chars</span>
              {checkResult.flaggedCount > 0 && inputText.trim().length > 0 && (
                <button
                  onClick={appendSuggestedFixes}
                  className="px-2.5 py-1 rounded bg-[#20231F] text-[#F3F1EA] text-xs font-semibold inline-flex items-center gap-1 hover:bg-[#343831] transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#D65A31]" />
                  <span>Append Suggested Fixes</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 5 Deterministic Rule Checks (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-[#FFFFFF] border border-[#D5D1C3] rounded p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBE8DE] text-xs font-mono">
              <span className="font-semibold text-[#20231F] uppercase">
                5 Boundary Checks ({checkResult.passedCount}/{checkResult.totalRules} Validated)
              </span>
              <span
                className={`font-bold ${
                  checkResult.flaggedCount === 0 && inputText.trim().length > 0
                    ? 'text-[#2E5A36]'
                    : 'text-[#8A5812]'
                }`}
              >
                {checkResult.flaggedCount === 0 && inputText.trim().length > 0
                  ? 'All Passed'
                  : `${checkResult.flaggedCount} Missing`}
              </span>
            </div>

            {inputText.trim().length === 0 ? (
              <div className="py-10 text-center rounded border border-dashed border-[#D5D1C3] bg-[#F3F1EA] p-6 space-y-3">
                <Terminal className="w-6 h-6 text-[#7A7F73] mx-auto" />
                <div className="text-xs font-semibold text-[#20231F]">
                  Paste instructions on the left to inspect boundaries
                </div>
                <p className="text-[11px] text-[#575B52] max-w-xs mx-auto">
                  LEASH will parse for role scope, spending limits, messaging approvals, credential protection, and stop triggers.
                </p>
                <button
                  onClick={loadSample}
                  className="px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-xs font-semibold text-[#20231F] hover:bg-[#EBE8DE]"
                >
                  Load Sample Unhardened Prompt
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {checkResult.items.map(item => (
                  <div
                    key={item.id}
                    className={`p-3 rounded border text-xs transition-colors ${
                      item.passed
                        ? 'border-[#2E5A36]/30 bg-[#2E5A36]/5'
                        : 'border-[#9A3215]/30 bg-[#9A3215]/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        {item.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36]" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-[#9A3215]" />
                        )}
                        <span
                          className={`font-semibold font-mono text-xs ${
                            item.passed ? 'text-[#2E5A36]' : 'text-[#9A3215]'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          item.passed
                            ? 'bg-[#2E5A36]/15 text-[#2E5A36]'
                            : 'bg-[#9A3215]/15 text-[#9A3215]'
                        }`}
                      >
                        {item.passed ? 'PASSED' : 'FLAGGED'}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#575B52] leading-tight mb-2">
                      {item.reason}
                    </p>

                    {!item.passed && (
                      <div className="pt-2 border-t border-[#D5D1C3]/60 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7F73]">
                          <span>Suggested Phrasing:</span>
                          <button
                            onClick={() => handleCopy(item.suggestedWording, item.id)}
                            className="text-[#D65A31] hover:underline inline-flex items-center gap-1"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-2.5 h-2.5" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span>Copy Phrasing</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-2 rounded bg-[#F3F1EA] border border-[#D5D1C3] font-mono text-[10px] text-[#20231F] whitespace-pre-wrap leading-tight">
                          {item.suggestedWording}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
