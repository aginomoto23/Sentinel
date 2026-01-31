import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { ScoreRing } from '../components/ui/ScoreRing';
import { Search } from 'lucide-react';
import { analyzeAddress } from '../lib/agentMock';
import { AnalysisResult } from '../types';

export const Check: React.FC = () => {
  const { t, addToHistory } = useAppStore();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    setResult(null);

    const res = await analyzeAddress(address);
    
    setResult(res);
    setLoading(false);
    
    addToHistory({
        ...res,
        id: Math.random().toString(36).substr(2, 9),
        type: 'address',
        target: address
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{t('check')}</h1>
      <p className="text-gray-500 dark:text-white/50 mb-8">{t('check_desc')}</p>

      <GlassCard className="mb-8">
        <form onSubmit={handleCheck} className="flex gap-4">
            <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('enter_address')}
                className="flex-1 bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-sentinel-neon/50 font-mono"
            />
            <button 
                type="submit" 
                disabled={loading}
                className="bg-gray-900 dark:bg-white text-white dark:text-black font-bold px-6 py-3 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200 transition disabled:opacity-50 flex items-center gap-2"
            >
                {loading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                {t('analyze')}
            </button>
        </form>
      </GlassCard>

      {result && (
        <GlassCard className={`border-t-4 ${
            result.final_risk === 'safe' ? 'border-t-emerald-500' : 
            result.final_risk === 'caution' ? 'border-t-amber-500' : 'border-t-red-500'
        }`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                    <ScoreRing score={result.score} level={result.final_risk} size={140} />
                </div>
                <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-2">
                        <Badge type={result.final_risk} />
                        <span className="text-xs text-gray-500 dark:text-white/40 font-mono">Confidence: {(result.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t(result.final_risk === 'safe' ? 'looks_safe' : 'risk_found')}</h3>
                    <p className="text-gray-700 dark:text-white/70 mb-4">{result.reason}</p>
                    
                    <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                        <div className="text-xs uppercase text-gray-400 dark:text-white/30 mb-2">Signals</div>
                        <div className="flex flex-wrap gap-2">
                            {result.signals.map((s, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-gray-600 dark:text-white/80">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
      )}
    </div>
  );
};