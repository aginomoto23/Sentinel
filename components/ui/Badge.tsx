import React from 'react';
import { motion } from 'framer-motion';
import { RiskLevel } from '../../types';

interface BadgeProps {
  type: RiskLevel;
  text?: string;
  size?: 'sm' | 'md';
}

const colors = {
  safe: 'bg-emerald-500/10 dark:bg-sentinel-safe/20 text-emerald-700 dark:text-sentinel-safe border-emerald-500/30 dark:border-sentinel-safe/30',
  caution: 'bg-amber-500/10 dark:bg-sentinel-caution/20 text-amber-700 dark:text-sentinel-caution border-amber-500/30 dark:border-sentinel-caution/30',
  dangerous: 'bg-red-500/10 dark:bg-sentinel-danger/20 text-red-700 dark:text-sentinel-danger border-red-500/30 dark:border-sentinel-danger/30',
};

const dotColors = {
  safe: 'bg-emerald-500 dark:bg-emerald-400',
  caution: 'bg-amber-500 dark:bg-amber-400',
  dangerous: 'bg-red-500 dark:bg-red-400',
};

export const Badge: React.FC<BadgeProps> = ({ type, text, size = 'md' }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative inline-flex items-center justify-center rounded-full border ${colors[type]} 
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm font-medium'}
        backdrop-blur-md shadow-sm uppercase tracking-wider overflow-hidden
      `}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: Math.random() * 2 }}
      />
      
      <span className={`relative w-1.5 h-1.5 rounded-full mr-2 ${dotColors[type]} animate-pulse shadow-[0_0_8px_currentColor]`} />
      <span className="relative z-10">{text || type}</span>
    </motion.span>
  );
};