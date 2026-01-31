import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, ShieldAlert, X, Scan, Binary, Database, Lock } from 'lucide-react';
import { AnalysisResult } from '../../types';
import { useAppStore } from '../../store/AppStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult | null;
  onProceed?: () => void;
}

export const SentinelRiskModal: React.FC<Props> = ({ isOpen, onClose, result, onProceed }) => {
  const { t } = useAppStore();
  const [phase, setPhase] = useState<'scanning' | 'analyzing' | 'result'>('scanning');

  useEffect(() => {
    if (isOpen) {
      setPhase('scanning');
      // Sequence the animations
      const t1 = setTimeout(() => setPhase('analyzing'), 1500);
      const t2 = setTimeout(() => {
          if (result) setPhase('result');
      }, 2500); // Only show result when data is ready AND time has passed

      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isOpen, result]);

  // Keep phase in 'analyzing' if result isn't ready yet, even if time passed
  useEffect(() => {
      if (phase === 'analyzing' && result) {
          setPhase('result');
      }
  }, [result, phase]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`
                relative w-full max-w-lg rounded-3xl overflow-hidden border transition-colors duration-500
                ${phase === 'result' && result?.final_risk === 'safe' ? 'border-emerald-500 bg-black/90 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : ''}
                ${phase === 'result' && result?.final_risk !== 'safe' ? 'border-red-500 bg-black/90 shadow-[0_0_50px_rgba(239,68,68,0.4)]' : ''}
                ${phase !== 'result' ? 'border-white/10 bg-black/90 shadow-2xl' : ''}
            `}
        >
            {/* Background Scanner Effect */}
            {phase !== 'result' && (
                <motion.div 
                    initial={{ top: "-100%" }}
                    animate={{ top: "100%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent z-0 pointer-events-none"
                />
            )}

            <div className="relative z-10 p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                
                {/* PHASE 1: SCANNING */}
                {phase === 'scanning' && (
                    <motion.div
                        key="scan"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="relative">
                            <Scan className="w-20 h-20 text-emerald-500 animate-pulse" />
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-10px] border-2 border-dashed border-emerald-500/30 rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-mono text-white tracking-widest uppercase">{t('risk_scanning')}</h2>
                        <div className="font-mono text-xs text-emerald-500/70 space-y-1">
                            <p>Target: {result?.target?.slice(0, 10)}...</p>
                            <p>Method: Static Analysis</p>
                        </div>
                    </motion.div>
                )}

                {/* PHASE 2: ANALYZING */}
                {phase === 'analyzing' && (
                    <motion.div
                        key="analyze"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        className="flex flex-col items-center gap-6 w-full"
                    >
                        <div className="flex gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl animate-pulse delay-75">
                                <Binary className="w-8 h-8 text-blue-400" />
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl animate-pulse delay-150">
                                <Database className="w-8 h-8 text-purple-400" />
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl animate-pulse delay-300">
                                <Lock className="w-8 h-8 text-amber-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                             <h2 className="text-xl font-bold text-white">{t('analyzing')}</h2>
                             <div className="h-1 w-48 bg-white/10 rounded-full overflow-hidden mx-auto">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    className="h-full bg-white"
                                />
                             </div>
                        </div>
                        <div className="text-left w-full max-w-xs font-mono text-xs text-white/50 space-y-1">
                            <p className="text-emerald-400">> {t('analyzing_contract')}</p>
                            <p className="delay-300">> Pattern matching...</p>
                            <p className="delay-700 text-blue-400">> {t('checking_databases')}</p>
                        </div>
                    </motion.div>
                )}

                {/* PHASE 3: RESULT */}
                {phase === 'result' && result && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-6 w-full"
                    >
                        {result.final_risk === 'safe' ? (
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} 
                                className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50"
                            >
                                <CheckCircle className="w-12 h-12 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} 
                                className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50"
                            >
                                <ShieldAlert className="w-12 h-12 text-white" />
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <h2 className={`text-3xl font-bold uppercase tracking-tight ${result.final_risk === 'safe' ? 'text-emerald-500' : 'text-red-500'}`}>
                                {result.final_risk === 'safe' ? t('safety_confirmed') : t('risk_detected')}
                            </h2>
                            <p className="text-white/80 max-w-xs mx-auto text-lg leading-snug">
                                {result.reason}
                            </p>
                        </div>

                        {/* Evidence Box */}
                        <div className="w-full bg-white/5 rounded-xl p-4 text-left border border-white/5">
                            <p className="text-xs uppercase text-white/40 font-bold mb-3 tracking-wider">Analysis Signals</p>
                            <ul className="space-y-2">
                                {result.signals.map((s, i) => (
                                    <motion.li 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={i} 
                                        className="flex items-start text-sm text-white/80"
                                    >
                                        <span className={`mr-2 mt-1 w-1.5 h-1.5 rounded-full ${result.final_risk === 'safe' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        {s}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 w-full mt-2">
                            {result.final_risk === 'safe' ? (
                                <button onClick={onClose} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition">
                                    {t('cancel_safe')}
                                </button>
                            ) : (
                                <>
                                    <button onClick={onClose} className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition">
                                        {t('action_blocked')}
                                    </button>
                                    <button onClick={onProceed} className="flex-1 py-4 bg-transparent border border-red-500/30 text-red-500 font-bold rounded-xl hover:bg-red-500/10 transition text-sm">
                                        {t('proceed_danger')}
                                    </button>
                                </>
                            )}
                        </div>

                    </motion.div>
                )}

            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};