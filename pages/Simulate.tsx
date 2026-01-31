import React, { useState } from 'react';
import { useAppStore } from '../store/AppStore';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowRightLeft, Gift, AlertTriangle, Wallet, X, Shield, ExternalLink } from 'lucide-react';
import { analyzeTx } from '../lib/agentMock';
import { SentinelRiskModal } from '../features/risk/SentinelRiskModal';
import { AnalysisResult, TxType } from '../types';
import { MOCK_ADDRESSES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

export const Simulate: React.FC = () => {
  const { t, settings, addToHistory } = useAppStore();
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const scenarios = [
    { 
        id: 'safe',
        label: t('scenario_safe'), 
        desc: t('scenario_safe_desc'),
        type: 'swap' as TxType, 
        icon: ArrowRightLeft, 
        address: MOCK_ADDRESSES.SAFE,
        amount: "1000 USDC",
        color: "text-blue-400"
    },
    { 
        id: 'phishing',
        label: t('scenario_phishing'), 
        desc: t('scenario_phishing_desc'),
        type: 'sign' as TxType, 
        icon: Gift, 
        address: MOCK_ADDRESSES.DANGER,
        amount: "0 ETH (Gasless)",
        color: "text-amber-400"
    },
    { 
        id: 'new_contract',
        label: t('scenario_new'), 
        desc: t('scenario_new_desc'),
        type: 'approve' as TxType, 
        icon: AlertTriangle, 
        address: MOCK_ADDRESSES.CAUTION,
        amount: "Unlimited USDT",
        color: "text-purple-400"
    },
  ];

  const handleWalletConfirm = async () => {
    // 1. Trigger Interception
    setModalOpen(true);
    // Modal will handle the analysis animation and state
    
    // 2. Perform background check (mock)
    const analysis = await analyzeTx({
        txType: activeScenario.type,
        to: activeScenario.address,
        chainId: 1
    }, settings.riskSensitivity);

    setResult(analysis);
    
    addToHistory({
        ...analysis,
        id: Math.random().toString(36).substr(2, 9),
        type: 'tx',
        target: activeScenario.address,
        txType: activeScenario.type
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col p-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('scenarios')}</h1>
        <p className="text-gray-500 dark:text-white/50">{t('simulation_guide')}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 h-full">
        
        {/* Scenario List */}
        <div className="flex-1 space-y-4">
            {scenarios.map((s) => (
                <GlassCard 
                    key={s.id}
                    onClick={() => setActiveScenario(s)}
                    className={`relative overflow-hidden cursor-pointer transition-all duration-300 border-2 
                        ${activeScenario?.id === s.id 
                            ? 'border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-500/10' 
                            : 'border-transparent hover:border-white/10'}`}
                >
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-black/5 dark:bg-white/5 ${s.color}`}>
                            <s.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{s.label}</h3>
                            <p className="text-sm text-gray-500 dark:text-white/50">{s.desc}</p>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>

        {/* Fake Wallet Interface */}
        <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
                {activeScenario ? (
                    <motion.div
                        key={activeScenario.id}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-sm"
                    >
                        <div className="rounded-3xl bg-white dark:bg-[#1C1C1E] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden relative">
                            {/* Wallet Header */}
                            <div className="bg-gray-100 dark:bg-black/20 p-4 flex items-center justify-between border-b border-gray-200 dark:border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                        <Wallet className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold text-sm text-gray-700 dark:text-white">Demo Wallet</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs text-gray-500">Mainnet</span>
                                </div>
                            </div>

                            {/* Wallet Content */}
                            <div className="p-6 space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-3">
                                        <activeScenario.icon className={`w-8 h-8 ${activeScenario.color}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('wallet_popup')}</h3>
                                    <p className="text-xs text-gray-500 mt-1 break-all font-mono opacity-60">
                                        {activeScenario.address}
                                    </p>
                                </div>

                                <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-4 space-y-2 border border-gray-100 dark:border-white/5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Action</span>
                                        <span className="font-medium text-gray-900 dark:text-white uppercase">{activeScenario.type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Value</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{activeScenario.amount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Network Fee</span>
                                        <span className="font-medium text-gray-900 dark:text-white">~$4.20</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => setActiveScenario(null)}
                                        className="py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/5 transition"
                                    >
                                        {t('wallet_reject')}
                                    </button>
                                    <button 
                                        onClick={handleWalletConfirm}
                                        className="py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 transition transform active:scale-95"
                                    >
                                        {t('wallet_sign')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center text-gray-400 dark:text-white/20">
                        <Shield className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>Select a scenario to start</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </div>

      <SentinelRiskModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        result={result}
        onProceed={() => setModalOpen(false)}
      />
    </div>
  );
};