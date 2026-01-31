import { AppSettings, HistoryItem, MarkRecord } from "../types";

const KEYS = {
  SETTINGS: 'sentinel_settings',
  HISTORY: 'sentinel_history',
  MARKS: 'sentinel_marks',
};

const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  theme: 'dark',
  riskSensitivity: 'standard',
  animationIntensity: 'normal',
};

export const storage = {
  getSettings: (): AppSettings => {
    try {
      const stored = localStorage.getItem(KEYS.SETTINGS);
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
  saveSettings: (settings: AppSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },
  getHistory: (): HistoryItem[] => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.HISTORY) || '[]');
    } catch {
      return [];
    }
  },
  addHistory: (item: HistoryItem) => {
    const current = storage.getHistory();
    const updated = [item, ...current].slice(0, 50); // Keep last 50
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
  },
  getMarks: (): MarkRecord[] => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.MARKS) || '[]');
    } catch {
      return [];
    }
  },
  addMark: (mark: MarkRecord) => {
    const current = storage.getMarks();
    localStorage.setItem(KEYS.MARKS, JSON.stringify([mark, ...current]));
  }
};