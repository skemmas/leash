export type PermissionLevel = 'allowed' | 'ask_first' | 'blocked';

export type PermissionKey =
  | 'browse_web'
  | 'read_files'
  | 'edit_files'
  | 'run_terminal'
  | 'access_credentials'
  | 'send_messages'
  | 'publish_deploy'
  | 'spend_funds';

export interface PermissionDefinition {
  key: PermissionKey;
  label: string;
  description: string;
  category: 'network' | 'filesystem' | 'execution' | 'sensitive';
  defaultLevel: PermissionLevel;
}

export const PERMISSION_DEFINITIONS: PermissionDefinition[] = [
  {
    key: 'browse_web',
    label: 'Browse public websites',
    description: 'Fetch HTTP/HTTPS pages, query read-only APIs, and retrieve search results.',
    category: 'network',
    defaultLevel: 'ask_first',
  },
  {
    key: 'read_files',
    label: 'Read local files',
    description: 'Inspect source code, documents, configs, and directory structures.',
    category: 'filesystem',
    defaultLevel: 'ask_first',
  },
  {
    key: 'edit_files',
    label: 'Edit local files',
    description: 'Create new files, modify existing code, and delete project artifacts.',
    category: 'filesystem',
    defaultLevel: 'ask_first',
  },
  {
    key: 'run_terminal',
    label: 'Execute terminal commands',
    description: 'Run shell commands, package managers, scripts, and background services.',
    category: 'execution',
    defaultLevel: 'ask_first',
  },
  {
    key: 'access_credentials',
    label: 'Access credentials',
    description: 'Read environment variables (.env), API keys, tokens, and private keypairs.',
    category: 'sensitive',
    defaultLevel: 'blocked',
  },
  {
    key: 'send_messages',
    label: 'Send messages',
    description: 'Post outbound messages to Slack, Discord, email, or chat webhooks.',
    category: 'network',
    defaultLevel: 'ask_first',
  },
  {
    key: 'publish_deploy',
    label: 'Publish or deploy',
    description: 'Push Git commits, trigger CI/CD releases, publish npm packages, and deploy servers.',
    category: 'execution',
    defaultLevel: 'ask_first',
  },
  {
    key: 'spend_funds',
    label: 'Spend funds',
    description: 'Execute financial transactions, wallet transfers, or metered paid API calls.',
    category: 'sensitive',
    defaultLevel: 'blocked',
  },
];

export interface AgentBoundaries {
  allowedDomains: string;
  permittedFolders: string;
  spendingLimit: string;
  spendingCurrency: 'USDC' | 'SOL' | 'USD';
  approvalRequiredActions: string;
  stopConditions: string;
}

export interface AgentPolicy {
  name: string;
  purpose: string;
  permissions: Record<PermissionKey, PermissionLevel>;
  boundaries: AgentBoundaries;
  version: string;
  updatedAt: string;
}

export interface PolicyPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  policy: {
    name: string;
    purpose: string;
    permissions: Record<PermissionKey, PermissionLevel>;
    boundaries: AgentBoundaries;
  };
}

export const DEFAULT_POLICY: AgentPolicy = {
  name: 'Watchdog-Alpha',
  purpose: 'Assists with software development and code reviews within designated local repositories.',
  permissions: {
    browse_web: 'ask_first',
    read_files: 'ask_first',
    edit_files: 'ask_first',
    run_terminal: 'ask_first',
    access_credentials: 'blocked',
    send_messages: 'ask_first',
    publish_deploy: 'ask_first',
    spend_funds: 'blocked',
  },
  boundaries: {
    allowedDomains: 'github.com, npmjs.com, docs.rs, stackoverflow.com',
    permittedFolders: './src, ./tests, ./docs, ./package.json',
    spendingLimit: '0.00',
    spendingCurrency: 'USDC',
    approvalRequiredActions: 'git push --force, npm publish, rm -rf, installing global packages',
    stopConditions: 'Detecting uncommitted secret keys, 3 consecutive shell failures, or user issuing STOP command',
  },
  version: '1.0.0',
  updatedAt: new Date().toISOString(),
};

export const POLICY_PRESETS: PolicyPreset[] = [
  {
    id: 'research',
    name: 'Research Assistant',
    badge: 'Read-Heavy',
    description: 'Free to browse docs and read local files, but completely blocked from edits, shell, and spends.',
    policy: {
      name: 'Research-Scout',
      purpose: 'Gathers technical documentation, synthesizes web research, and summarizes papers without altering workspace files.',
      permissions: {
        browse_web: 'allowed',
        read_files: 'allowed',
        edit_files: 'blocked',
        run_terminal: 'blocked',
        access_credentials: 'blocked',
        send_messages: 'blocked',
        publish_deploy: 'blocked',
        spend_funds: 'blocked',
      },
      boundaries: {
        allowedDomains: 'arxiv.org, github.com, wikipedia.org, docs.python.org, developer.mozilla.org',
        permittedFolders: './docs, ./research, ./references',
        spendingLimit: '0.00',
        spendingCurrency: 'USD',
        approvalRequiredActions: 'Accessing paywalled or unauthorized domain',
        stopConditions: 'Encountering login prompts or untrusted external redirects',
      },
    },
  },
  {
    id: 'coding',
    name: 'Coding Assistant',
    badge: 'Dev Mode',
    description: 'Reads local code freely. Asks before making file edits or running terminal commands. Strict secret blocks.',
    policy: {
      name: 'Code-Companion',
      purpose: 'Assists with frontend and backend feature implementation, test suites, and bug fixes.',
      permissions: {
        browse_web: 'allowed',
        read_files: 'allowed',
        edit_files: 'ask_first',
        run_terminal: 'ask_first',
        access_credentials: 'blocked',
        send_messages: 'blocked',
        publish_deploy: 'ask_first',
        spend_funds: 'blocked',
      },
      boundaries: {
        allowedDomains: 'github.com, npmjs.com, pypi.org, crates.io, stackoverflow.com',
        permittedFolders: './src, ./tests, ./components, ./lib',
        spendingLimit: '0.00',
        spendingCurrency: 'USDC',
        approvalRequiredActions: 'git push, deleting directories, installing native binaries',
        stopConditions: 'Git tree has unstaged external edits, or terminal command exits with fatal status',
      },
    },
  },
  {
    id: 'content',
    name: 'Content Assistant',
    badge: 'Copy & Drafts',
    description: 'Allowed to edit copy and draft files. Explicit approval needed before sending messages or publishing.',
    policy: {
      name: 'Copy-Editor',
      purpose: 'Drafts technical blog posts, release notes, changelogs, and social updates from repository diffs.',
      permissions: {
        browse_web: 'allowed',
        read_files: 'allowed',
        edit_files: 'allowed',
        run_terminal: 'blocked',
        access_credentials: 'blocked',
        send_messages: 'ask_first',
        publish_deploy: 'ask_first',
        spend_funds: 'blocked',
      },
      boundaries: {
        allowedDomains: 'twitter.com, x.com, linkedin.com, substack.com, medium.com',
        permittedFolders: './content, ./blog, ./drafts, ./marketing',
        spendingLimit: '0.00',
        spendingCurrency: 'USD',
        approvalRequiredActions: 'Publishing draft live, broadcasting messages, modifying author metadata',
        stopConditions: 'Attempting to publish to external channel without preview confirmation',
      },
    },
  },
  {
    id: 'cautious',
    name: 'Cautious Mode',
    badge: 'High Security',
    description: 'Maximum paranoia. All execution, network, and file actions require explicit human sign-off.',
    policy: {
      name: 'Sentinel-Guard',
      purpose: 'Operates in high-risk environments where all non-trivial agent actions must be supervised.',
      permissions: {
        browse_web: 'ask_first',
        read_files: 'ask_first',
        edit_files: 'ask_first',
        run_terminal: 'ask_first',
        access_credentials: 'blocked',
        send_messages: 'blocked',
        publish_deploy: 'blocked',
        spend_funds: 'blocked',
      },
      boundaries: {
        allowedDomains: 'api.internal.local (only vetted intranet hosts)',
        permittedFolders: './sandbox',
        spendingLimit: '0.00',
        spendingCurrency: 'USD',
        approvalRequiredActions: 'Every file modification, any external network request, any shell invocation',
        stopConditions: 'Any unexpected file creation, unknown command flag, or lack of explicit human ACK',
      },
    },
  },
];
