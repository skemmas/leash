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
  RefreshCw,
} from 'lucide-react';

const SAMPLE_UNHARDENED_PROMPT = `You are a helpful AI assistant with access to bash and file tools.
Complete user tasks by editing files and browsing the web whenever needed.
Feel free to deploy updates when tests pass.`;

export const PolicyCheck: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const checkResult: PolicyCheckResult = checkAgentPolicyText(inputText);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
      return `${trimmed}\n\n# --- LEASH GUARDRAIL BOUNDARIES ---\n${fixes}`;
    });
  };

  return (
    <section id="checker" className="py-20 border-t border-slate-900 bg-[#07090d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>DETERMINISTIC INSTRUCTION CHECK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Policy Check
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Paste your existing system prompt, AGENTS.md, or .cursorrules to inspect missing boundaries before running your agent.
          </p>

          {/* Privacy and Scope Disclaimers */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-lime-400" />
              <span>100% Client-Side Evaluation (Zero Data Transmitted)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
              <span>Basic instruction check — not a formal security audit</span>
            </div>
          </div>
        </div>

        {/* Checker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Text Input Area (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0e1219] border border-slate-800 shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                  Agent Instruction Prompt
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadSample}
                    className="text-xs text-lime-400 hover:text-lime-300 underline font-mono cursor-pointer"
                  >
                    Load Sample Prompt
                  </button>
                  {inputText && (
                    <button
                      onClick={() => setInputText('')}
                      className="text-xs text-slate-500 hover:text-slate-300 ml-2"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={14}
                placeholder="Paste your system prompt, AGENTS.md, CLAUDE.md, or custom agent rules here...
e.g.
'You are a code refactoring assistant. Read files in ./src. Do not run any terminal commands without approval.'"
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 font-mono text-xs focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all resize-y leading-relaxed"
              />

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Characters: {inputText.length}</span>
                {checkResult.flaggedCount > 0 && inputText.trim().length > 0 && (
                  <button
                    onClick={appendSuggestedFixes}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 border border-lime-400/30 text-xs font-semibold transition-all"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Append Suggested Fixes</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Deterministic Rule Results (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0e1219] border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                    Deterministic Checks ({checkResult.passedCount}/{checkResult.totalRules} Found)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  {checkResult.flaggedCount === 0 && inputText.trim().length > 0 ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      All 5 Found
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {checkResult.flaggedCount} Missing Guardrail{checkResult.flaggedCount === 1 ? '' : 's'}
                    </span>
                  )}
                </div>
              </div>

              {inputText.trim().length === 0 ? (
                <div className="py-12 px-6 text-center rounded-xl bg-slate-950/60 border border-dashed border-slate-800">
                  <Terminal className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-300 mb-1">
                    No prompt provided yet
                  </p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    Paste your prompt on the left, or click below to see how LEASH validates unhardened instructions.
                  </p>
                  <button
                    onClick={loadSample}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all border border-slate-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-lime-400" />
                    <span>Load sample test prompt</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {checkResult.items.map(item => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all ${
                        item.passed
                          ? 'bg-emerald-950/10 border-emerald-500/20'
                          : 'bg-rose-950/10 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2">
                          {item.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          )}
                          <span
                            className={`text-xs font-bold font-mono ${
                              item.passed ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                            item.passed
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {item.passed ? 'DETECTED' : 'FLAGGED'}
                        </span>
                      </div>

                      {/* Reason */}
                      <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                        {item.reason}
                      </p>

                      {/* Suggested Wording (if flagged) */}
                      {!item.passed && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-850">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                            <span>Suggested wording snippet:</span>
                            <button
                              onClick={() => handleCopy(item.suggestedWording, item.id)}
                              className="text-lime-400 hover:text-lime-300 inline-flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy snippet</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-snug border border-slate-800">
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
      </div>
    </section>
  );
};
