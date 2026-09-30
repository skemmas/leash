export interface TokenConfig {
  name: string;
  ticker: string;
  tagline: string;
  narrative: string;
  // Mint address on Solana. Empty string or null means "Token not launched".
  mintAddress: string | null;
  // Block explorer URL if token is launched
  explorerUrl: string | null;
  // Pump.fun URL if token is launched
  pumpFunUrl: string | null;
  // Social & community channels
  socials: {
    twitter: string;
    github: string;
    telegram?: string;
  };
  status: {
    isLaunched: boolean;
    statusText: string;
    note: string;
  };
}

export const tokenConfig: TokenConfig = {
  name: "LEASH",
  ticker: "$LEASH",
  tagline: "Your agent. Your rules.",
  narrative:
    "AI agents are becoming more autonomous. People need a simple way to define what their agents can access, change, spend, and publish. LEASH makes those boundaries readable and reusable.",
  
  // Set to null while provisional. No fabricated address or fake links.
  mintAddress: null,
  explorerUrl: null,
  pumpFunUrl: null,

  socials: {
    twitter: "https://x.com",
    github: "https://github.com",
    telegram: "",
  },

  status: {
    isLaunched: false,
    statusText: "Token not launched",
    note: "Provisional community coin. The policy builder and instruction validator are 100% free and work right now in your browser without a wallet.",
  },
};
