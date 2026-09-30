import React, { useState, useEffect } from 'react';
import type {
  AgentPolicy,
  PermissionKey,
  PermissionLevel,
} from '../types/policy';
import {
  PERMISSION_DEFINITIONS,
  DEFAULT_POLICY,
  POLICY_PRESETS,
} from '../types/policy';
import {
  formatPolicyToMarkdown,
  formatPolicyToJson,
  formatPolicyToPlainLanguage,
} from '../utils/policyFormatter';
import {
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileCode,
  FileText,
  Sliders,
  Info,
  DollarSign,
  FolderLock,
  Globe,
  OctagonAlert,
} from 'lucide-react';

const STORAGE_KEY = 'leash_agent_policy_draft_v1';

export const PermissionBuilder: React.FC = () => {
  // Load draft from localStorage or fallback to default
  const [policy, setPolicy] = useState<AgentPolicy>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_POLICY,
          ...parsed,
          permissions: {
            ...DEFAULT_POLICY.permissions,
            ...(parsed.permissions || {}),
          },
          boundaries: {
            ...DEFAULT_POLICY.boundaries,
            ...(parsed.boundaries || {}),
          },
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_POLICY;
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'json' | 'plain'>('preview');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('Loaded');

  // Auto-save draft on changes
  useEffect(() => {
    try {
      const updated = {
        ...policy,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      // Ignore storage errors in restricted iframes
    }
  }, [policy]);

  const updatePermission = (key: PermissionKey, level: PermissionLevel) => {
    setPolicy(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: level,
      },
    }));
  };

  const updateBoundary = (field: keyof AgentPolicy['boundaries'], value: string) => {
    setPolicy(prev => ({
      ...prev,
      boundaries: {
        ...prev.boundaries,
        [field]: value,
      },
    }));
  };

  const applyPreset = (presetId: string) => {
    const preset = POLICY_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setPolicy(prev => ({
      ...prev,
      name: preset.policy.name,
      purpose: preset.policy.purpose,
      permissions: { ...preset.policy.permissions },
      boundaries: { ...preset.policy.boundaries },
      updatedAt: new Date().toISOString(),
    }));
  };

  const resetToDefaults = () => {
    setPolicy({
      ...DEFAULT_POLICY,
      updatedAt: new Date().toISOString(),
    });
    localStorage.removeItem(STORAGE_KEY);
    setShowResetConfirm(false);
  };

  // Export content
  const markdownContent = formatPolicyToMarkdown(policy);
  const jsonContent = formatPolicyToJson(policy);
  const plainTextContent = formatPolicyToPlainLanguage(policy);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = (policy.name || 'agent-policy').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    link.download = `${safeName}-${filename}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="builder" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-lime-400/10 text-lime-400 border border-lime-400/20 mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Agent Permission Builder
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Define clear operational boundaries for your AI assistant. Toggle access levels, specify spending and filesystem constraints, and export ready-to-use policies.
          </p>

          {/* Mandatory Clear Note */}
          <div className="mt-6 p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start sm:items-center justify-center gap-2.5 max-w-2xl mx-auto shadow-inner text-left sm:text-center">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Note:</strong> LEASH helps write instructions. Enforcement depends on your agent platform.
            </span>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-[#0f131a] border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>Quick Role Presets</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Local draft auto-saved ({lastSaved})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {POLICY_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="text-left p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-lime-500/50 transition-all group focus:outline-none focus:ring-1 focus:ring-lime-400"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-white group-hover:text-lime-300 transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Agent Identification */}
            <div className="p-6 rounded-2xl bg-[#0f131a] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center text-xs font-mono font-bold">
                    1
                  </span>
                  <span>Agent Identity & Purpose</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="agent-name" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Agent Name / Identifier
                  </label>
                  <input
                    id="agent-name"
                    type="text"
                    value={policy.name}
                    onChange={e => setPolicy(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Watchdog-Alpha, DocReader-01"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="agent-purpose" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Core Purpose & Scope
                  </label>
                  <textarea
                    id="agent-purpose"
                    rows={2}
                    value={policy.purpose}
                    onChange={e => setPolicy(prev => ({ ...prev, purpose: e.target.value }))}
                    placeholder="Describe what this agent is allowed to do and what tasks it specializes in..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 2. Core Permissions (8 Items) */}
            <div className="p-6 rounded-2xl bg-[#0f131a] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center text-xs font-mono font-bold">
                      2
                    </span>
                    <span>Operational Permissions</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose: Allowed, Ask first, or Blocked. Credentials and spending default to Blocked.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {PERMISSION_DEFINITIONS.map(def => {
                  const currentLevel = policy.permissions[def.key] || 'ask_first';

                  return (
                    <div
                      key={def.key}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-slate-800"
                    >
                      <div className="space-y-0.5 max-w-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-200">{def.label}</span>
                          {def.category === 'sensitive' && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              High Risk
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-snug">{def.description}</p>
                      </div>

                      {/* 3-State Radio Segmented Toggle */}
                      <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0 self-start sm:self-center">
                        <button
                          type="button"
                          onClick={() => updatePermission(def.key, 'allowed')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            currentLevel === 'allowed'
                              ? 'bg-emerald-500 text-slate-950 shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Allowed
                        </button>
                        <button
                          type="button"
                          onClick={() => updatePermission(def.key, 'ask_first')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            currentLevel === 'ask_first'
                              ? 'bg-amber-400 text-slate-950 shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Ask first
                        </button>
                        <button
                          type="button"
                          onClick={() => updatePermission(def.key, 'blocked')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            currentLevel === 'blocked'
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Blocked
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Optional Boundaries */}
            <div className="p-6 rounded-2xl bg-[#0f131a] border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center text-xs font-mono font-bold">
                    3
                  </span>
                  <span>Guardrail Boundaries</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">Strict Constraints</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Allowed Domains */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-lime-400" />
                    <span>ALLOWED DOMAINS</span>
                  </label>
                  <input
                    type="text"
                    value={policy.boundaries.allowedDomains}
                    onChange={e => updateBoundary('allowedDomains', e.target.value)}
                    placeholder="github.com, docs.rs, npmjs.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-lime-400"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Comma-separated domain list</span>
                </div>

                {/* Permitted Folders */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <FolderLock className="w-3.5 h-3.5 text-lime-400" />
                    <span>PERMITTED FOLDERS</span>
                  </label>
                  <input
                    type="text"
                    value={policy.boundaries.permittedFolders}
                    onChange={e => updateBoundary('permittedFolders', e.target.value)}
                    placeholder="./src, ./tests, ./docs"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-lime-400"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Limit filesystem writes to these roots</span>
                </div>

                {/* Spending Limit & Currency */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-lime-400" />
                    <span>SPENDING LIMIT & CURRENCY</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={policy.boundaries.spendingLimit}
                      onChange={e => updateBoundary('spendingLimit', e.target.value)}
                      placeholder="0.00"
                      className="w-2/3 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-lime-400"
                    />
                    <select
                      value={policy.boundaries.spendingCurrency}
                      onChange={e => updateBoundary('spendingCurrency', e.target.value as any)}
                      aria-label="Spending Currency"
                      className="w-1/3 px-2 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-lime-400"
                    >
                      <option value="USDC">USDC</option>
                      <option value="SOL">SOL</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Maximum expenditure cap per run</span>
                </div>

                {/* Always Require Approval Actions */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                    <span>ALWAYS REQUIRE APPROVAL FOR</span>
                  </label>
                  <input
                    type="text"
                    value={policy.boundaries.approvalRequiredActions}
                    onChange={e => updateBoundary('approvalRequiredActions', e.target.value)}
                    placeholder="git push, rm -rf, sending emails"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-lime-400"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">High-consequence commands</span>
                </div>
              </div>

              {/* Stop Conditions */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <OctagonAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>AUTOMATED STOP CONDITIONS</span>
                </label>
                <input
                  type="text"
                  value={policy.boundaries.stopConditions}
                  onChange={e => updateBoundary('stopConditions', e.target.value)}
                  placeholder="Encountering API keys, 3 consecutive errors, or user saying STOP"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-rose-400"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Emergency trigger to immediately cease agent execution</span>
              </div>

              {/* Reset Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">Want to start over?</span>
                {showResetConfirm ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-400">Reset all fields?</span>
                    <button
                      onClick={resetToDefaults}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500 text-white hover:bg-rose-600"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Policy Preview & Export Controls (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-[#0f131a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              {/* Tab Header */}
              <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                      activeTab === 'preview'
                        ? 'bg-slate-800 text-lime-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Markdown</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                      activeTab === 'json'
                        ? 'bg-slate-800 text-lime-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>JSON Spec</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('plain')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                      activeTab === 'plain'
                        ? 'bg-slate-800 text-lime-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Plain Text</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      const text =
                        activeTab === 'json'
                          ? jsonContent
                          : activeTab === 'plain'
                          ? plainTextContent
                          : markdownContent;
                      handleCopy(text, activeTab);
                    }}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs inline-flex items-center gap-1 border border-slate-700/60"
                    title="Copy active tab"
                  >
                    {copiedType === activeTab ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code / Content Viewer */}
              <div className="p-4 bg-slate-950/80 font-mono text-xs overflow-x-auto max-h-[460px] select-text">
                {activeTab === 'preview' && (
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                    {markdownContent}
                  </pre>
                )}

                {activeTab === 'json' && (
                  <pre className="text-emerald-400/90 whitespace-pre-wrap leading-relaxed font-mono">
                    {jsonContent}
                  </pre>
                )}

                {activeTab === 'plain' && (
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                    {plainTextContent}
                  </pre>
                )}
              </div>

              {/* Export Action Buttons */}
              <div className="p-4 bg-slate-900/60 border-t border-slate-800 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => downloadFile('policy.md', markdownContent, 'text/markdown')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-lime-400" />
                    <span>Download .MD</span>
                  </button>

                  <button
                    onClick={() => downloadFile('policy.json', jsonContent, 'application/json')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-lime-400" />
                    <span>Download JSON</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Info className="w-3 h-3 text-slate-400" />
                    <span>Paste into AGENTS.md or System Prompt</span>
                  </span>
                  <span className="font-mono text-lime-400">Spec v1.0.0</span>
                </div>
              </div>
            </div>

            {/* Quick Compatibility Note */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">Format Portability:</span> This export follows standard Markdown and structured JSON. Compatible with Cursor, Claude Code, Cline, Windsurf, AutoGPT, custom Python/Node agent harnesses, and team repositories.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
