export interface PolicyCheckItem {
  id: string;
  title: string;
  passed: boolean;
  reason: string;
  suggestedWording: string;
}

export interface PolicyCheckResult {
  totalRules: number;
  passedCount: number;
  flaggedCount: number;
  items: PolicyCheckItem[];
}

export function checkAgentPolicyText(text: string): PolicyCheckResult {
  const normalized = text.toLowerCase();
  const hasText = normalized.trim().length > 0;

  // 1. Check stated purpose
  const purposeRegex = /(purpose|role|objective|task is to|you are a|you are an|designed to|responsible for|primary goal)/i;
  const hasPurpose = hasText && purposeRegex.test(normalized) && normalized.trim().length > 25;

  const itemPurpose: PolicyCheckItem = {
    id: 'purpose',
    title: 'Stated Purpose & Scope',
    passed: hasPurpose,
    reason: hasPurpose
      ? 'Clear statement of role, scope, or operational objective detected.'
      : 'No clear purpose or operational role was identified. Unbounded agents may drift beyond intended tasks.',
    suggestedWording:
      'ROLE & SCOPE:\nYou are a dedicated [role description] assisting with [specific scope]. You must not execute actions outside of this stated domain.',
  };

  // 2. Check spending approval
  const spendKeywords = /(spend|spending|fund|funds|wallet|transaction|purchase|balance|usdc|sol|metered|paid api|budget|cost)/i;
  const approvalKeywords = /(ask|approval|approve|permission|confirm|confirmation|blocked|prohibited|forbidden|never|limit|ceiling)/i;
  const hasSpendRule = hasText && spendKeywords.test(normalized) && approvalKeywords.test(normalized);

  const itemSpend: PolicyCheckItem = {
    id: 'spending',
    title: 'Spending & Financial Guardrail',
    passed: hasSpendRule,
    reason: hasSpendRule
      ? 'Instruction contains restrictions or approval requirements regarding funds and spending.'
      : 'No explicit restriction or human-in-the-loop approval rule for spending funds or metered API costs.',
    suggestedWording:
      'FINANCIAL RESTRICTION:\nDo not execute financial transactions, wallet transfers, or incurred billing without prior explicit human approval. Spending limit: 0.00.',
  };

  // 3. Check publishing or messaging approval
  const publishKeywords = /(publish|deploy|deployment|release|send message|email|tweet|post|broadcast|discord|slack|webhook|social)/i;
  const publishApprovalKeywords = /(approval|approve|confirm|ask first|preview|permission|review|human-in-the-loop|do not send|never publish)/i;
  const hasPublishRule = hasText && publishKeywords.test(normalized) && publishApprovalKeywords.test(normalized);

  const itemPublish: PolicyCheckItem = {
    id: 'publishing',
    title: 'Publishing & Outbound Messaging Approval',
    passed: hasPublishRule,
    reason: hasPublishRule
      ? 'Outbound communications, public posts, or production deployments require human sign-off.'
      : 'No approval requirement found for external messaging, social broadcasts, or deployments.',
    suggestedWording:
      'COMMUNICATION & DEPLOYMENT:\nAlways request explicit human confirmation before sending emails, publishing posts, pushing to production, or deploying code.',
  };

  // 4. Check credential boundary
  const credKeywords = /(credential|credentials|secret|secrets|\.env|api_key|apikey|private key|password|passwords|token|tokens|auth)/i;
  const credGuardKeywords = /(never|block|blocked|redact|sanitize|exclude|ignore|do not read|do not expose|protect|forbidden)/i;
  const hasCredBoundary = hasText && credKeywords.test(normalized) && credGuardKeywords.test(normalized);

  const itemCred: PolicyCheckItem = {
    id: 'credentials',
    title: 'Credential & Secret Boundaries',
    passed: hasCredBoundary,
    reason: hasCredBoundary
      ? 'Explicit boundary identified preventing exposure or unmetered access to secrets and keys.'
      : 'No clear prohibition against reading or exposing sensitive credentials (.env, tokens, private keys).',
    suggestedWording:
      'CREDENTIAL PROTECTION:\nStrictly forbidden from reading, outputting, or transmitting .env files, private keys, authentication tokens, or database passwords.',
  };

  // 5. Check stop conditions
  const stopKeywords = /(stop|halt|abort|terminate|pause|fail-safe|emergency|cancel|exit immediately|suspend)/i;
  const hasStopRule = hasText && stopKeywords.test(normalized);

  const itemStop: PolicyCheckItem = {
    id: 'stop_conditions',
    title: 'Automated Stop Conditions',
    passed: hasStopRule,
    reason: hasStopRule
      ? 'Emergency halt triggers or operational stop conditions are specified.'
      : 'No emergency halt trigger or abort condition defined for handling loops, unknown states, or errors.',
    suggestedWording:
      'STOP CONDITIONS:\nImmediately abort execution and prompt the user if: (1) 3 consecutive command failures occur, (2) unexpected remote requests are initiated, or (3) the user issues a STOP instruction.',
  };

  const items = [itemPurpose, itemSpend, itemPublish, itemCred, itemStop];
  const passedCount = items.filter(i => i.passed).length;

  return {
    totalRules: items.length,
    passedCount,
    flaggedCount: items.length - passedCount,
    items,
  };
}
