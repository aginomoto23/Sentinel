import { AgentMockParams, AnalysisResult, RiskLevel } from "../types";

const MOCK_SIGNALS = {
  safe: ["Contract verified on Etherscan", "High liquidity detected (> $5M)", "Trusted protocol (Uniswap V3)", "No malicious functions found"],
  caution: ["Contract deployed < 24h ago", "Low liquidity pool", "Unverified source code", "Proxy pattern detected"],
  dangerous: ["Known phishing drainer wallet", "Malicious 'setApprovalForAll' detected", "Funds flow to mixer", "Honeypot logic identified"],
};

export const analyzeTx = async (params: AgentMockParams, sensitivity: string = 'standard'): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    // The delay is now handled by the UI animation timing, 
    // but we keep a small delay here for realism in data fetch
    setTimeout(() => {
      const { to = "", txType } = params;
      let risk: RiskLevel = 'safe';
      let score = 95;
      let signals = MOCK_SIGNALS.safe;
      let reason = "This interaction appears safe.";

      // Logic overrides based on mock addresses/types
      if (txType === 'sign' || to.includes("dead")) {
        risk = 'dangerous';
        score = 10;
        signals = MOCK_SIGNALS.dangerous;
        reason = "High probability of wallet drainer detected.";
      } else if (txType === 'approve') {
        risk = 'caution';
        score = 65;
        signals = MOCK_SIGNALS.caution;
        reason = "Interacting with a new contract. Verify legitimacy.";
      }

      resolve({
        final_risk: risk,
        score,
        reason,
        signals,
        confidence: 0.92,
        analyzed_at: new Date().toISOString(),
        target: to
      });
    }, 500); 
  });
};

export const analyzeAddress = async (address: string): Promise<AnalysisResult> => {
  return analyzeTx({ to: address, txType: 'transfer' });
};