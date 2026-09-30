import { PERMISSION_DEFINITIONS } from '../types/policy';
import type { AgentPolicy, PermissionKey } from '../types/policy';

/**
 * Format policy as clean Markdown ready for system prompts or AGENTS.md / CLAUDE.md
 */
export function formatPolicyToMarkdown(policy: AgentPolicy): string {
  const permMap = new Map(PERMISSION_DEFINITIONS.map(p => [p.key, p]));

  const permLines = Object.entries(policy.permissions)
    .map(([k, level]) => {
      const def = permMap.get(k as PermissionKey);
      const icon = level === 'allowed' ? '🟢 ALLOWED' : level === 'ask_first' ? '🟡 ASK FIRST' : '🔴 BLOCKED';
      return `- **${def?.label || k}**: \`${icon}\`\n  _${def?.description || ''}_`;
    })
    .join('\n');

  return `# AGENT BOUNDARY POLICY: ${policy.name.toUpperCase()}
> Standardized with LEASH (v${policy.version})
> Policy Timestamp: ${new Date(policy.updatedAt).toUTCString()}

## 1. AGENT IDENTITY & ROLE
- **Agent Name:** ${policy.name || 'Unnamed Agent'}
- **Core Purpose:** ${policy.purpose || 'General assistance.'}

## 2. OPERATIONAL PERMISSIONS
${permLines}

## 3. GUARDRAIL BOUNDARIES
- **Permitted Network Domains:**
  \`${policy.boundaries.allowedDomains || 'None specified (block non-explicit network calls)'}\`
- **Permitted File Paths:**
  \`${policy.boundaries.permittedFolders || 'Working directory root only'}\`
- **Maximum Spending Limit:**
  \`${policy.boundaries.spendingLimit || '0.00'} ${policy.boundaries.spendingCurrency}\`
- **Actions Requiring Mandatory Human Approval:**
  \`${policy.boundaries.approvalRequiredActions || 'Any irreversible state change'}\`
- **Automated Stop / Abort Conditions:**
  \`${policy.boundaries.stopConditions || 'Detecting API tokens or consecutive execution errors'}\`

---
*Notice: This policy defines instruction-level operational boundaries. Actual runtime enforcement depends on your agent harness, host environment, and tool execution sandbox.*
`;
}

/**
 * Format policy as documented structured JSON
 */
export function formatPolicyToJson(policy: AgentPolicy): string {
  const documentedPayload = {
    $schema: "https://leash.build/schemas/v1/agent-policy.json",
    meta: {
      generator: "LEASH Protocol Policy Builder",
      version: policy.version,
      exportedAt: new Date().toISOString(),
      license: "MIT - Open Agent Standard",
      disclaimer: "Instructional policy specification. Enforcement depends on target platform and execution harness.",
    },
    agent: {
      name: policy.name,
      purpose: policy.purpose,
    },
    permissions: policy.permissions,
    boundaries: {
      allowedDomains: policy.boundaries.allowedDomains
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      permittedFolders: policy.boundaries.permittedFolders
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      spending: {
        limit: parseFloat(policy.boundaries.spendingLimit) || 0,
        currency: policy.boundaries.spendingCurrency,
      },
      mandatoryApprovals: policy.boundaries.approvalRequiredActions
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      stopConditions: policy.boundaries.stopConditions
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    },
  };

  return JSON.stringify(documentedPayload, null, 2);
}

/**
 * Format policy as clean plain language instructions
 */
export function formatPolicyToPlainLanguage(policy: AgentPolicy): string {
  const permMap = new Map(PERMISSION_DEFINITIONS.map(p => [p.key, p]));

  const allowed = Object.entries(policy.permissions)
    .filter(([_, level]) => level === 'allowed')
    .map(([k]) => permMap.get(k as PermissionKey)?.label || k);

  const askFirst = Object.entries(policy.permissions)
    .filter(([_, level]) => level === 'ask_first')
    .map(([k]) => permMap.get(k as PermissionKey)?.label || k);

  const blocked = Object.entries(policy.permissions)
    .filter(([_, level]) => level === 'blocked')
    .map(([k]) => permMap.get(k as PermissionKey)?.label || k);

  return `POLICY DIRECTIVE FOR ${policy.name.toUpperCase()}

PURPOSE:
${policy.purpose}

WHAT YOU CAN DO AUTONOMOUSLY:
${allowed.length > 0 ? allowed.map(a => `• ${a}`).join('\n') : '• No unrestricted actions. Every action requires approval.'}

WHAT REQUIRES USER APPROVAL FIRST:
${askFirst.length > 0 ? askFirst.map(a => `• ${a}`).join('\n') : '• None.'}

WHAT IS STRICTLY BLOCKED:
${blocked.length > 0 ? blocked.map(b => `• ${b}`).join('\n') : '• None.'}

SPECIFIC CONSTRAINTS:
• Web access is limited to: ${policy.boundaries.allowedDomains || 'No external domains'}
• File system scope is limited to: ${policy.boundaries.permittedFolders || 'Current directory'}
• Spending ceiling: ${policy.boundaries.spendingLimit} ${policy.boundaries.spendingCurrency}
• Always request approval before: ${policy.boundaries.approvalRequiredActions || 'Destructive operations'}
• Abort immediately if: ${policy.boundaries.stopConditions || 'Encountering private credentials or repeated failures'}
`;
}
