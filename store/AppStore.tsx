import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, HistoryItem } from '../types';
import { storage } from '../lib/storage';
import { i18n } from '../lib/i18n';

interface AppState {
  settings: AppSettings;
  history: HistoryItem[];
  isWalletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  addToHistory: (item: HistoryItem) => void;
  t: (key: keyof typeof i18n.en) => string;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());
  const [history, setHistory] = useState<HistoryItem[]>(storage.getHistory());
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storage.saveSettings(updated);
  };

  const addToHistory = (item: HistoryItem) => {
    const updated = [item, ...history].slice(0, 50);
    setHistory(updated);
    storage.addHistory(item);
  };

  const connectWallet = () => setIsWalletConnected(true);
  const disconnectWallet = () => setIsWalletConnected(false);

  const t = (key: keyof typeof i18n.en) => {
    return i18n[settings.language][key] || key;
  };

  return (
    <AppContext.Provider value={{ 
      settings, 
      history, 
      updateSettings, 
      addToHistory, 
      t,
      isWalletConnected,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within AppProvider");
  return context;
};