import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';
import { GlassCard } from '../components/ui/GlassCard';
import { storage } from '../lib/storage';
import { Flag, Check } from 'lucide-react';

export const Mark: React.FC = () => {
  const { t } = useAppStore();
  const [formData, setFormData] = useState({ address: '', note: '', level: 'dangerous' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storage.addMark({
        id: Math.random().toString(),
        address: formData.address,
        riskLevel: formData.level as any,
        note: formData.note,
        timestamp: new Date().toISOString()
    });
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ address: '', note: '', level: 'dangerous' });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{t('mark')}</h1>
      <p className="text-gray-500 dark:text-white/50 mb-8">{t('mark_desc')}</p>

      <GlassCard>
        {submitted ? (
            <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Report Submitted</h3>
                <p className="text-gray-500 dark:text-white/50">Thank you for contributing to the Sentinel network.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm text-gray-500 dark:text-white/60 mb-2">Suspicious Address</label>
                    <input 
                        required
                        className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 dark:focus:border-sentinel-neon/50 outline-none font-mono text-gray-900 dark:text-white"
                        placeholder="0x..."
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                </div>
                
                <div>
                    <label className="block text-sm text-gray-500 dark:text-white/60 mb-2">Risk Level</label>
                    <div className="flex gap-4">
                        {['caution', 'dangerous'].map((l) => (
                            <button
                                key={l}
                                type="button"
                                onClick={() => setFormData({...formData, level: l})}
                                className={`flex-1 py-3 rounded-xl border transition-all ${
                                    formData.level === l 
                                    ? (l === 'dangerous' ? 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-500' : 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-500')
                                    : 'border-black/5 dark:border-white/10 text-gray-400 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/5'
                                }`}
                            >
                                {l.charAt(0).toUpperCase() + l.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 dark:text-white/60 mb-2">Notes</label>
                    <textarea 
                        className="w-full bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 dark:focus:border-sentinel-neon/50 outline-none h-32 resize-none text-gray-900 dark:text-white"
                        placeholder="Describe the scam or suspicious activity..."
                        value={formData.note}
                        onChange={e => setFormData({...formData, note: e.target.value})}
                    />
                </div>

                <button type="submit" className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-700 dark:hover:bg-gray-200 transition flex items-center justify-center gap-2">
                    <Flag className="w-4 h-4" />
                    {t('submit')}
                </button>
            </form>
        )}
      </GlassCard>
    </div>
  );
};