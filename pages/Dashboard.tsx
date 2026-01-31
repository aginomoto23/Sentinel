import React from 'react';
import { useAppStore } from '../store/AppStore';
import { Shield, Zap, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { t, history } = useAppStore();
  const navigate = useNavigate();

  const safeCount = history.filter(h => h.final_risk === 'safe').length;
  const interceptCount = history.filter(h => h.final_risk !== 'safe').length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6 relative">
      
      {/* Hero Status Ring */}
      <div className="relative mb-12 group cursor-default">
        {/* Outer Glow Ring */}
        <motion.div 
            animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-sentinel-neon/20 blur-3xl"
        />
        
        {/* Rotating Ring */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-gray-200 dark:border-white/5 flex items-center justify-center backdrop-blur-sm bg-white/5 dark:bg-black/20 shadow-2xl">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-t border-r border-emerald-500/30 dark:border-sentinel-neon/30"
            />
             <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border-b border-l border-emerald-500/20 dark:border-sentinel-neon/20"
            />
            
            <div className="flex flex-col items-center text-center z-10">
                <Shield className="w-16 h-16 text-emerald-500 dark:text-sentinel-neon mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{t('system_status')}</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono uppercase text-gray-500 dark:text-white/50 tracking-widest">Online</span>
                </div>
            </div>
        </div>
      </div>

      <div className="text-center max-w-md mb-12">
        <p className="text-lg text-gray-500 dark:text-white/60 leading-relaxed">
            {t('system_desc')}
        </p>
      </div>

      {/* Primary Action */}
      <motion.button
        whileHover={{ scale: 1.02, paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/app/simulate')}
        className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg shadow-xl shadow-emerald-500/10 dark:shadow-sentinel-neon/20 transition-all flex items-center gap-3 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Zap className="w-5 h-5" />
        {t('run_simulation')}
        <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Minimal Stats Footer */}
      <div className="absolute bottom-0 w-full max-w-4xl border-t border-gray-200 dark:border-white/5 pt-6 pb-2 px-6 flex justify-between text-sm">
        <div className="flex gap-8">
            <div className="flex flex-col">
                <span className="text-gray-400 dark:text-white/30 uppercase text-xs font-bold tracking-wider mb-1">Scans</span>
                <span className="font-mono text-gray-700 dark:text-white/80">{history.length}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 dark:text-white/30 uppercase text-xs font-bold tracking-wider mb-1">Threats</span>
                <span className="font-mono text-red-500 dark:text-red-400">{interceptCount}</span>
            </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 dark:text-white/30">
            <Activity className="w-4 h-4" />
            <span className="font-mono text-xs">Latency: 12ms</span>
        </div>
      </div>

    </div>
  );
};