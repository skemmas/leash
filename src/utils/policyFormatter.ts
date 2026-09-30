import { PERMISSION_DEFINITIONS } from '../types/policy';
import type { AgentPolicy, PermissionKey } from '../types/policy';

/**
 * Format policy as clean Markdown ready for system prompts, AGENTS.md, or CLAUDE.md
 */
export function formatPolicyToMarkdown(policy: AgentPolicy): string {
  const permMap = new Map(PERMISSION_DEFINITIONS.map(p => [p.key, p]));

  const permLines = Object.entries(policy.permissions)
    .map(([k, level]) => {
      const def = permMap.get(k as PermissionKey);
      const tag = level === 'allowed' ? '[ALLOWED]' : level === 'ask_first' ? '[ASK FIRST]' : '[BLOCKED]';
      return `- **${def?.label || k}**: \`${tag}\`\n  ${def?.description || ''}`;
    })
    .join('\n');

  return `# AGENT BOUNDARY SPECIFICATION: ${policy.name.toUpperCase()}
Document Revision: v${policy.version}
Timestamp: ${new Date(policy.updatedAt).toUTCString()}
Standard: LEASH Protocol Spec v1

---

## § 1.0 AGENT IDENTITY & ROLE
- **Identifier:** ${policy.name || 'Unnamed Agent'}
- **Operational Scope:** ${policy.purpose || 'General assistance.'}

## § 2.0 OPERATIONAL PERMISSIONS
${permLines}

## § 3.0 GUARDRAIL BOUNDARIES
- **Permitted Network Domains:**
  \`${policy.boundaries.allowedDomains || 'None (Block non-explicit external network calls)'}\`
- **Permitted File Paths:**
  \`${policy.boundaries.permittedFolders || 'Working directory root only'}\`
- **Spending Ceiling:**
  \`${policy.boundaries.spendingLimit || '0.00'} ${policy.boundaries.spendingCurrency}\`
- **Actions Requiring Mandatory Approval:**
  \`${policy.boundaries.approvalRequiredActions || 'Any irreversible state change'}\`
- **Automated Stop Conditions:**
  \`${policy.boundaries.stopConditions || 'Encountering private credentials or repeated shell failures'}\`

---

## § 4.0 EXECUTION DISCLAIMER
This specification defines instruction-level boundaries for agent reasoning.
Runtime enforcement depends on the target agent platform, execution harness, and sandbox container.
`;
}

/**
 * Format policy as documented structured JSON
 */
export function formatPolicyToJson(policy: AgentPolicy): string {
  const documentedPayload = {
    $schema: "https://leash.build/schemas/v1/agent-policy.json",
    meta: {
      standard: "LEASH Protocol Spec v1",
      revision: policy.version,
      exportedAt: new Date().toISOString(),
      license: "MIT - Open Agent Standard",
      disclaimer: "Instructional policy specification. Enforcement depends on target platform and execution harness.",
    },
    agent: {
      identifier: policy.name,
      operationalScope: policy.purpose,
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
      spendingCeiling: {
        amount: parseFloat(policy.boundaries.spendingLimit) || 0,
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

  return `LEASH INSTRUCTION POLICY — ${policy.name.toUpperCase()} (Rev. ${policy.version})

§ 1.0 ROLE & SCOPE
${policy.purpose}

§ 2.0 PERMITTED ACTIONS (AUTONOMOUS)
${allowed.length > 0 ? allowed.map(a => `• ${a}`).join('\n') : '• None. Every action requires approval.'}

§ 2.1 SUPERVISED ACTIONS (ASK FIRST)
${askFirst.length > 0 ? askFirst.map(a => `• ${a}`).join('\n') : '• None.'}

§ 2.2 BLOCKED ACTIONS (STRICTLY PROHIBITED)
${blocked.length > 0 ? blocked.map(b => `• ${b}`).join('\n') : '• None.'}

§ 3.0 BOUNDARY PARAMETERS
• Network domain whitelist: ${policy.boundaries.allowedDomains || 'No external network access'}
• Filesystem write scope: ${policy.boundaries.permittedFolders || 'Current workspace root only'}
• Expenditure cap: ${policy.boundaries.spendingLimit} ${policy.boundaries.spendingCurrency}
• Always request approval before: ${policy.boundaries.approvalRequiredActions || 'Destructive operations'}
• Abort immediately if: ${policy.boundaries.stopConditions || 'Encountering private credentials or repeated failures'}
`;
}
