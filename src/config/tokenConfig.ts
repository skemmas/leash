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

const getStoredMint = (): string | null => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('leash_ca_mint');
    }
  } catch {
    // Ignore storage errors
  }
  return null;
};

const getStoredPumpUrl = (): string | null => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('leash_ca_pump');
    }
  } catch {
    // Ignore storage errors
  }
  return null;
};

const storedMint = getStoredMint();
const storedPump = getStoredPumpUrl();

export const tokenConfig: TokenConfig = {
  name: "LEASH",
  ticker: "$LEASH",
  tagline: "Your agent. Your rules.",
  narrative:
    "AI agents are becoming more autonomous. People need a simple way to define what their agents can access, change, spend, and publish. LEASH makes those boundaries readable and reusable.",
  
  // Set to null while provisional unless loaded from persistent storage
  mintAddress: storedMint || null,
  explorerUrl: storedMint ? `https://solscan.io/token/${storedMint}` : null,
  pumpFunUrl: storedPump || (storedMint ? `https://pump.fun/coin/${storedMint}` : null),

  socials: {
    twitter: "https://x.com",
    github: "https://github.com/skemmas/leash",
    telegram: "",
  },

  status: {
    isLaunched: Boolean(storedMint),
    statusText: storedMint ? "Token Live" : "Token not launched",
    note: storedMint
      ? `Live CA: ${storedMint}`
      : "Provisional community coin. The policy builder and instruction validator are 100% free and work right now in your browser without a wallet.",
  },
};
