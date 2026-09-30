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
  CheckCircle2,
  AlertCircle,
  Ban,
  AlertTriangle,
  Globe,
  Folder,
  DollarSign,
  ShieldAlert,
  Octagon,
  Eye,
  Sliders,
} from 'lucide-react';

const STORAGE_KEY = 'leash_agent_policy_draft_v1';

interface PermissionBuilderProps {
  onPolicyChange?: (policy: AgentPolicy) => void;
}

export const PermissionBuilder: React.FC<PermissionBuilderProps> = ({ onPolicyChange }) => {
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
  const [lastSaved, setLastSaved] = useState<string>('Ready');
  // Mobile tab switch between 'edit' and 'preview'
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');

  // Compute live permission metrics
  const allowedCount = Object.values(policy.permissions).filter(v => v === 'allowed').length;
  const askFirstCount = Object.values(policy.permissions).filter(v => v === 'ask_first').length;
  const blockedCount = Object.values(policy.permissions).filter(v => v === 'blocked').length;

  // Auto-save draft on changes and notify parent
  useEffect(() => {
    try {
      const updated = {
        ...policy,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSaved(`Saved ${now}`);
      if (onPolicyChange) {
        onPolicyChange(updated);
      }
    } catch {
      // Storage safety
    }
  }, [policy, onPolicyChange]);

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
    setTimeout(() => setCopiedType(null), 1800);
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
    <section id="builder" className="border-b border-[#D5D1C3] py-10 scroll-mt-6">
      {/* Visual Center Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 mb-6 border-b border-[#D5D1C3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-[#D65A31] rounded-full" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-semibold">
              Visual Center / Primary Tool
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#20231F] tracking-tight">
            Agent Permission Builder
          </h2>
        </div>

        {/* Live Permission Summary Badge */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1 rounded border border-[#D5D1C3] bg-[#FFFFFF] flex items-center gap-2">
            <span className="text-[#20231F] font-semibold">Summary:</span>
            <span className="text-[#2E5A36] font-bold">{allowedCount} allowed</span>
            <span className="text-[#7A7F73]">/</span>
            <span className="text-[#8A5812] font-bold">{askFirstCount} need approval</span>
            <span className="text-[#7A7F73]">/</span>
            <span className="text-[#9A3215] font-bold">{blockedCount} blocked</span>
          </div>

          <span className="text-[11px] text-[#7A7F73]">
            {lastSaved}
          </span>
        </div>
      </div>

      {/* Enforcement Limitation Warning Line */}
      <div className="p-3 mb-6 rounded border border-[#D5D1C3] bg-[#EBE8DE] text-xs text-[#575B52] flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-[#D65A31] flex-shrink-0 mt-0.5" />
        <div className="leading-snug">
          <strong className="text-[#20231F]">Enforcement Note:</strong> LEASH standardizes instruction-level operational boundaries. Physical runtime enforcement depends on your agent execution harness, container sandboxes, and host environment.
        </div>
      </div>

      {/* Presets Bar */}
      <div className="mb-8 p-3.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7F73]">
          <span className="uppercase tracking-wider font-semibold">Baseline Presets</span>
          <span>Click to populate controls</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {POLICY_PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className="text-left px-3 py-2 rounded border border-[#D5D1C3] bg-[#F3F1EA] hover:bg-[#EBE8DE] hover:border-[#20231F]/40 transition-colors text-xs space-y-0.5"
            >
              <div className="font-semibold text-[#20231F] flex items-center justify-between">
                <span>{preset.name}</span>
                <span className="text-[10px] font-mono text-[#697255]">{preset.badge}</span>
              </div>
              <div className="text-[11px] text-[#575B52] line-clamp-1">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Switch between Edit and Preview */}
      <div className="flex sm:hidden mb-6 p-1 rounded border border-[#D5D1C3] bg-[#EBE8DE]">
        <button
          onClick={() => setMobileView('edit')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors ${
            mobileView === 'edit'
              ? 'bg-[#20231F] text-[#F3F1EA]'
              : 'text-[#575B52]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Edit Controls</span>
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors ${
            mobileView === 'preview'
              ? 'bg-[#20231F] text-[#F3F1EA]'
              : 'text-[#575B52]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Document Preview ({activeTab})</span>
        </button>
      </div>

      {/* Main Asymmetric Grid: Settings on Left, Generated Policy on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Settings & Controls (7 cols) */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            mobileView === 'preview' ? 'hidden sm:block' : 'block'
          }`}
        >
          {/* Section 1: Agent Identification */}
          <div className="bg-[#FFFFFF] border border-[#D5D1C3] rounded p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5D1C3]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#D65A31]">§ 1.0</span>
                <h3 className="font-bold text-sm text-[#20231F] uppercase tracking-wider">
                  Agent Identification
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7A7F73]">Required</span>
            </div>

            <div className="grid grid-cols-1 gap-4 text-xs">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#575B52] mb-1">
                  Identifier Name
                </label>
                <input
                  type="text"
                  value={policy.name}
                  onChange={e => setPolicy(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. CodeCompanion-01, Scout-Agent"
                  className="w-full px-3 py-2 rounded border border-[#D5D1C3] bg-[#F3F1EA] text-[#20231F] font-mono text-xs focus:outline-none focus:border-[#D65A31] focus:ring-1 focus:ring-[#D65A31]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#575B52] mb-1">
                  Operational Purpose & Scope
                </label>
                <textarea
                  rows={2}
                  value={policy.purpose}
                  onChange={e => setPolicy(prev => ({ ...prev, purpose: e.target.value }))}
                  placeholder="Describe the agent's core role and boundaries of responsibility..."
                  className="w-full px-3 py-2 rounded border border-[#D5D1C3] bg-[#F3F1EA] text-[#20231F] text-xs focus:outline-none focus:border-[#D65A31] focus:ring-1 focus:ring-[#D65A31] resize-y"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Operational Permissions (Structured Rows) */}
          <div className="bg-[#FFFFFF] border border-[#D5D1C3] rounded p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5D1C3]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#D65A31]">§ 2.0</span>
                <h3 className="font-bold text-sm text-[#20231F] uppercase tracking-wider">
                  Operational Permissions (8 Controls)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7A7F73]">Tri-State</span>
            </div>

            <div className="divide-y divide-[#EBE8DE]">
              {PERMISSION_DEFINITIONS.map(def => {
                const currentLevel = policy.permissions[def.key] || 'ask_first';

                return (
                  <div
                    key={def.key}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 max-w-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#20231F]">{def.label}</span>
                        {def.category === 'sensitive' && (
                          <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#9A3215]/10 text-[#9A3215] font-semibold">
                            Sensitive
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#575B52] leading-tight">
                        {def.description}
                      </p>
                    </div>

                    {/* Industrial 3-State Controls (Not relying on color alone) */}
                    <div className="inline-flex rounded border border-[#D5D1C3] bg-[#F3F1EA] p-0.5 shrink-0 self-start sm:self-center">
                      {/* Allowed */}
                      <button
                        type="button"
                        onClick={() => updatePermission(def.key, 'allowed')}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
                          currentLevel === 'allowed'
                            ? 'bg-[#2E5A36] text-[#FFFFFF] shadow-xs'
                            : 'text-[#575B52] hover:text-[#20231F]'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Allowed</span>
                      </button>

                      {/* Ask First */}
                      <button
                        type="button"
                        onClick={() => updatePermission(def.key, 'ask_first')}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
                          currentLevel === 'ask_first'
                            ? 'bg-[#8A5812] text-[#FFFFFF] shadow-xs'
                            : 'text-[#575B52] hover:text-[#20231F]'
                        }`}
                      >
                        <AlertCircle className="w-3 h-3" />
                        <span>Ask first</span>
                      </button>

                      {/* Blocked */}
                      <button
                        type="button"
                        onClick={() => updatePermission(def.key, 'blocked')}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
                          currentLevel === 'blocked'
                            ? 'bg-[#9A3215] text-[#FFFFFF] shadow-xs'
                            : 'text-[#575B52] hover:text-[#20231F]'
                        }`}
                      >
                        <Ban className="w-3 h-3" />
                        <span>Blocked</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Guardrail Boundaries */}
          <div className="bg-[#FFFFFF] border border-[#D5D1C3] rounded p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5D1C3]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#D65A31]">§ 3.0</span>
                <h3 className="font-bold text-sm text-[#20231F] uppercase tracking-wider">
                  Guardrail Boundaries
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7A7F73]">Optional Constraints</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#575B52] mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#697255]" />
                  <span>Allowed Domains</span>
                </label>
                <input
                  type="text"
                  value={policy.boundaries.allowedDomains}
                  onChange={e => updateBoundary('allowedDomains', e.target.value)}
                  placeholder="github.com, npmjs.com"
                  className="w-full px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#F3F1EA] font-mono text-xs text-[#20231F] focus:outline-none focus:border-[#D65A31]"
                />
                <span className="text-[10px] text-[#7A7F73] mt-0.5 block">Comma-separated hostnames</span>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#575B52] mb-1 flex items-center gap-1">
                  <Folder className="w-3 h-3 text-[#697255]" />
                  <span>Permitted Folders</span>
                </label>
                <input
                  type="text"
                  value={policy.boundaries.permittedFolders}
                  onChange={e => updateBoundary('permittedFolders', e.target.value)}
                  placeholder="./src, ./tests, ./docs"
                  className="w-full px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#F3F1EA] font-mono text-xs text-[#20231F] focus:outline-none focus:border-[#D65A31]"
                />
                <span className="text-[10px] text-[#7A7F73] mt-0.5 block">Filesystem write roots</span>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#575B52] mb-1 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-[#697255]" />
                  <span>Spending Limit & Currency</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={policy.boundaries.spendingLimit}
                    onChange={e => updateBoundary('spendingLimit', e.target.value)}
                    placeholder="0.00"
                    className="w-2/3 px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#F3F1EA] font-mono text-xs text-[#20231F] focus:outline-none focus:border-[#D65A31]"
                  />
                  <select
                    value={policy.boundaries.spendingCurrency}
                    onChange={e => updateBoundary('spendingCurrency', e.target.value as any)}
                    className="w-1/3 px-2 py-1.5 rounded border border-[#D5D1C3] bg-[#F3F1EA] text-xs font-mono text-[#20231F] focus:outline-none focus:border-[#D65A31]"
                  >
                    <option value="USDC">USDC</option>
                    <option value="SOL">SOL</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <span className="text-[10px] text-[#7A7F73] mt-0.5 block">Hard stop ceiling per run</span>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#575B52] mb-1 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-[#697255]" />
                  <span>Always Require Approval For</span>
                </label>
                <input
                  type="text"
                  value={policy.boundaries.approvalRequiredActions}
                  onChange={e => updateBoundary('approvalRequiredActions', e.target.value)}
                  placeholder="git push --force, rm -rf"
                  className="w-full px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#F3F1EA] font-mono text-xs text-[#20231F] focus:outline-none focus:border-[#D65A31]"
                />
                <span className="text-[10px] text-[#7A7F73] mt-0.5 block">High-consequence commands</span>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#575B52] mb-1 flex items-center gap-1">
                <Octagon className="w-3 h-3 text-[#9A3215]" />
                <span>Automated Stop Conditions</span>
              </label>
              <input
                type="text"
                value={policy.boundaries.stopConditions}
                onChange={e => updateBoundary('stopConditions', e.target.value)}
                placeholder="Encountering API keys, 3 consecutive errors, or user issuing STOP"
                className="w-full px-3 py-1.5 rounded border border-[#D5D1C3] bg-[#F3F1EA] font-mono text-xs text-[#20231F] focus:outline-none focus:border-[#D65A31]"
              />
              <span className="text-[10px] text-[#7A7F73] mt-0.5 block">Immediate execution abort trigger</span>
            </div>

            {/* Reset Action */}
            <div className="pt-3 border-t border-[#D5D1C3] flex items-center justify-between text-xs">
              <span className="text-[#575B52]">Discard changes and reset to factory defaults?</span>
              {showResetConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#9A3215] font-semibold">Confirm?</span>
                  <button
                    onClick={resetToDefaults}
                    className="px-2 py-0.5 rounded bg-[#9A3215] text-[#FFFFFF] font-bold text-[11px]"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-2 py-0.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-[#20231F] text-[11px]"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#575B52] hover:text-[#9A3215]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Generated Document-like Policy Preview (5 cols) */}
        <div
          className={`lg:col-span-5 lg:sticky lg:top-8 space-y-4 ${
            mobileView === 'edit' ? 'hidden sm:block' : 'block'
          }`}
        >
          <div className="bg-[#FFFFFF] border border-[#D5D1C3] rounded shadow-sm flex flex-col">
            {/* Document Header & Formats */}
            <div className="p-4 border-b border-[#D5D1C3] bg-[#EBE8DE]/50 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73]">
                  Generated Policy Document
                </div>
                <div className="text-xs font-bold text-[#20231F] font-mono">
                  {policy.name.toUpperCase()} (Rev. {policy.version})
                </div>
              </div>

              {/* Format Toggles */}
              <div className="flex items-center gap-1 rounded border border-[#D5D1C3] bg-[#FFFFFF] p-0.5">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-[#20231F] text-[#F3F1EA] font-semibold'
                      : 'text-[#575B52] hover:text-[#20231F]'
                  }`}
                >
                  Markdown
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'json'
                      ? 'bg-[#20231F] text-[#F3F1EA] font-semibold'
                      : 'text-[#575B52] hover:text-[#20231F]'
                  }`}
                >
                  JSON Spec
                </button>
                <button
                  onClick={() => setActiveTab('plain')}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'plain'
                      ? 'bg-[#20231F] text-[#F3F1EA] font-semibold'
                      : 'text-[#575B52] hover:text-[#20231F]'
                  }`}
                >
                  Plain Text
                </button>
              </div>
            </div>

            {/* Document Surface */}
            <div className="p-4 font-mono text-[11px] text-[#20231F] bg-[#FFFFFF] overflow-x-auto max-h-[480px] select-text border-b border-[#D5D1C3] leading-relaxed">
              {activeTab === 'preview' && (
                <pre className="whitespace-pre-wrap">{markdownContent}</pre>
              )}
              {activeTab === 'json' && (
                <pre className="text-[#20231F] whitespace-pre-wrap">{jsonContent}</pre>
              )}
              {activeTab === 'plain' && (
                <pre className="whitespace-pre-wrap">{plainTextContent}</pre>
              )}
            </div>

            {/* Document Actions Bar */}
            <div className="p-3.5 bg-[#F3F1EA] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
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
                  className="px-3 py-1.5 rounded bg-[#20231F] text-[#F3F1EA] font-semibold text-xs inline-flex items-center gap-1.5 hover:bg-[#343831] transition-colors"
                >
                  {copiedType === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#A3E635]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Document</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => downloadFile('policy.md', markdownContent, 'text/markdown')}
                  className="px-2.5 py-1.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-[#20231F] font-semibold text-xs hover:bg-[#EBE8DE] transition-colors inline-flex items-center gap-1"
                >
                  <Download className="w-3 h-3 text-[#697255]" />
                  <span>.MD</span>
                </button>

                <button
                  onClick={() => downloadFile('policy.json', jsonContent, 'application/json')}
                  className="px-2.5 py-1.5 rounded border border-[#D5D1C3] bg-[#FFFFFF] text-[#20231F] font-semibold text-xs hover:bg-[#EBE8DE] transition-colors inline-flex items-center gap-1"
                >
                  <Download className="w-3 h-3 text-[#697255]" />
                  <span>JSON</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-[#7A7F73]">
                Portable standard
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
