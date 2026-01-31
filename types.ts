export type RiskLevel = 'safe' | 'caution' | 'dangerous';

export type TxType = 'approve' | 'swap' | 'transfer' | 'sign';

export interface AnalysisResult {
  final_risk: RiskLevel;
  score: number;
  reason: string;
  signals: string[];
  confidence: number;
  analyzed_at: string;
  target?: string;
}

export interface HistoryItem extends AnalysisResult {
  id: string;
  type: 'tx' | 'address';
  target: string; // address or contract
  txType?: TxType;
}

export interface MarkRecord {
  id: string;
  address: string;
  riskLevel: RiskLevel;
  note: string;
  timestamp: string;
}

export interface AppSettings {
  language: 'en' | 'zh';
  theme: 'dark' | 'light';
  riskSensitivity: 'minimal' | 'standard' | 'strict';
  animationIntensity: 'subtle' | 'normal' | 'fun';
}

export interface AgentMockParams {
  txType?: TxType;
  to?: string;
  data?: string;
  chainId?: number;
  address?: string;
}