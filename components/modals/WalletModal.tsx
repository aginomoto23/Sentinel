import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Smartphone, ScanLine, ArrowRight } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const WALLETS = [
  { id: 'rainbow', name: 'Rainbow', color: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' },
  { id: 'metamask', name: 'MetaMask', color: 'bg-orange-500' },
  { id: 'walletconnect', name: 'WalletConnect', color: 'bg-blue-500' },
  { id: 'coinbase', name: 'Coinbase', color: 'bg-blue-600' },
];

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [step, setStep] = useState<'select' | 'connecting'>('select');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
        setStep('select');
        setSelectedWallet(null);
    }
  }, [isOpen]);

  const handleWalletSelect = (id: string) => {
    setSelectedWallet(id);
    setStep('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
        onConnect();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-[#1A1B1F] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h3 className="text-xl font-bold text-white">
                {step === 'select' ? 'Connect Wallet' : 'Scan to Connect'}
            </h3>
            <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
            >
                <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-2 min-h-[320px]">
            {step === 'select' ? (
                <div className="flex flex-col gap-2 p-2">
                    {WALLETS.map((wallet) => (
                        <button
                            key={wallet.id}
                            onClick={() => handleWalletSelect(wallet.id)}
                            className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition group text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl ${wallet.color} flex items-center justify-center shadow-lg`}>
                                    {/* Simple Icon Simulation */}
                                    <div className="w-6 h-6 bg-white/20 rounded-lg" />
                                </div>
                                <span className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                                    {wallet.name}
                                </span>
                            </div>
                            {wallet.id === 'rainbow' && (
                                <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-bold tracking-wider">
                                    Recommended
                                </span>
                            )}
                        </button>
                    ))}
                    <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-gray-500">
                        New to Ethereum? <span className="text-emerald-500 cursor-pointer">Learn more about wallets</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                    {selectedWallet === 'rainbow' ? (
                        <div className="relative">
                            {/* Rainbow Pulse Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-40 animate-pulse" />
                            <div className="relative w-48 h-48 bg-white rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
                                <ScanLine className="w-32 h-32 text-black/10 animate-ping absolute" />
                                <div className="z-10 bg-black p-4 rounded-xl">
                                    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-12 h-12 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-emerald-500 animate-spin mb-8" />
                    )}
                    
                    <h4 className="text-xl font-bold text-white mb-2">Requesting Connection</h4>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto mb-8">
                        Check your {WALLETS.find(w => w.id === selectedWallet)?.name} app to approve the connection.
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Smartphone className="w-4 h-4" />
                        <span>Open via Mobile App</span>
                    </div>
                </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};