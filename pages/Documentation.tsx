import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ShieldCheck, ChevronLeft, Terminal, Code, Cpu, Layers, Copy, Check, ChevronRight, Zap, Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';

export const Documentation: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('introduction');
  const [copied, setCopied] = useState(false);

  // Background animation variants
  const backgroundVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CodeBlock = ({ code, label = 'BASH' }: { code: string, label?: string }) => (
    <div className="relative group my-6">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">{label}</span>
            <button 
                onClick={() => handleCopy(code)}
                className="text-gray-500 hover:text-white transition"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <div className="p-5 overflow-x-auto custom-scrollbar">
          <pre className="text-gray-300 font-mono leading-relaxed">
              <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );

  const SectionHeading = ({ title, desc }: { title: string, desc: string }) => (
    <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                {title}
            </span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl border-l-2 border-emerald-500/30 pl-6">
            {desc}
        </p>
    </div>
  );

  // --- Content Components ---

  const IntroductionContent = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeading 
            title="Introduction" 
            desc="Sentinel is the Guardian Layer for Web3. A proactive, AI-driven firewall that intercepts malicious transactions before they are signed." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <GlassCard className="p-8 group hover:bg-emerald-500/5 border-emerald-500/20">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Pre-Signature Defense</h3>
                <p className="text-gray-400 leading-relaxed">
                    Most wallets tell you *what* leaves your wallet. Sentinel tells you *why* it shouldn't. We simulate execution traces in a secure sandbox environment.
                </p>
            </GlassCard>

            <GlassCard className="p-8 group hover:bg-blue-500/5 border-blue-500/20">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Box className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Heuristic Engine</h3>
                <p className="text-gray-400 leading-relaxed">
                    Our ML models detect drainer patterns (e.g. SetApprovalForAll to EOA), phishing domains, and interaction with fresh unverified contracts.
                </p>
            </GlassCard>
        </div>

        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                Core Architecture
            </h2>
            <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="flex-1">
                        <div className="text-xs font-mono text-gray-500 mb-2">CLIENT SIDE</div>
                        <div className="text-lg font-bold text-white">dApp / Wallet</div>
                    </div>
                    <ChevronRight className="text-gray-600 rotate-90 md:rotate-0" />
                    <div className="flex-1 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/10 blur-xl animate-pulse"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-xs font-mono text-emerald-400 mb-1">SENTINEL CLOUD</div>
                            <div className="font-bold text-white">Risk Engine</div>
                        </div>
                    </div>
                    <ChevronRight className="text-gray-600 rotate-90 md:rotate-0" />
                     <div className="flex-1">
                        <div className="text-xs font-mono text-gray-500 mb-2">BLOCKCHAIN</div>
                        <div className="text-lg font-bold text-white">Mempool</div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  );

  const InstallationContent = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeading 
            title="Installation" 
            desc="Integrate the Guardian SDK into your React application. Supports Wagmi, Viem, and Ethers.js." 
        />

        <div className="space-y-16">
            <div className="relative pl-8 border-l border-white/10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center text-xs font-mono text-gray-400">1</div>
                <h3 className="text-xl font-bold text-white mb-4">Install Dependencies</h3>
                <p className="text-gray-400 mb-6">Install the core SDK package and the React adapter.</p>
                <CodeBlock 
                    label="TERMINAL"
                    code="npm install @sentinel-labs/sdk @sentinel-labs/react viem" 
                />
            </div>

            <div className="relative pl-8 border-l border-white/10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center text-xs font-mono text-gray-400">2</div>
                <h3 className="text-xl font-bold text-white mb-4">Configure API Key</h3>
                <p className="text-gray-400 mb-6">
                    Get your key from the <span className="text-emerald-400 cursor-pointer hover:underline">Dashboard</span>. 
                    Sentinel offers a generous free tier for development.
                </p>
                <CodeBlock 
                    label=".ENV"
                    code="NEXT_PUBLIC_SENTINEL_API_KEY=sk_live_51M3..." 
                />
            </div>
        </div>
    </motion.div>
  );

  const QuickStartContent = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeading 
            title="Quick Start" 
            desc="Wrap your app and protect your first transaction." 
        />

        <div className="space-y-12">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">1. Provider Setup</h3>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">App.tsx</span>
                </div>
                <p className="text-gray-400 mb-6">Wrap your application root. This establishes the WebSocket connection for real-time risk updates.</p>
                <CodeBlock 
                    label="TYPESCRIPT"
                    code={`import { SentinelProvider } from '@sentinel-labs/react';

export default function App({ children }) {
  return (
    <SentinelProvider 
      apiKey={process.env.NEXT_PUBLIC_SENTINEL_API_KEY}
      config={{
        mode: 'strict', // Auto-reject dangerous txs
        network: 'mainnet'
      }}
    >
      {children}
    </SentinelProvider>
  );
}`} 
                />
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">2. Interception Hook</h3>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Swap.tsx</span>
                </div>
                <p className="text-gray-400 mb-6">
                    Use <code className="text-emerald-400 bg-white/5 px-1 rounded">useSentinel</code> to pre-flight check transactions.
                </p>
                <CodeBlock 
                    label="TYPESCRIPT"
                    code={`const { analyze } = useSentinel();

const handleSwap = async () => {
  const risk = await analyze({
    to: contractAddress,
    data: calldata,
    value: amount
  });

  if (risk.level === 'dangerous') {
    // Show Sentinel Risk Modal
    return;
  }
  
  // Proceed...
}`} 
                />
            </div>
        </div>
    </motion.div>
  );

  const NavItem = ({ id, label }: { id: string, label: string }) => {
    const isActive = activeSection === id;
    return (
        <li className="relative mb-2">
            <button
                onClick={() => setActiveSection(id)}
                className={`
                    relative w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 z-10
                    ${isActive ? 'text-white font-medium pl-6' : 'text-gray-500 hover:text-white pl-4'}
                `}
            >
                {isActive && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-sm"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_10px_#10B981]" />
                    </motion.div>
                )}
                <span className="relative z-10">{label}</span>
            </button>
        </li>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-black overflow-hidden relative">
      
      {/* Ambient Background - Documentation Specific */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          variants={backgroundVariants}
          animate="animate"
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]"
        />
        <motion.div 
          variants={backgroundVariants}
          animate="animate"
          className="absolute top-[40%] left-[-20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition group px-3 py-1.5 rounded-full hover:bg-white/5"
            >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-sm font-medium">Back</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="font-bold font-mono tracking-tight">Sentinel <span className="text-gray-600">Docs</span></span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-emerald-500/70 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-500/5">v1.0.4-beta</span>
          </div>
        </div>
      </header>

      <div className="pt-24 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-4">
                <nav className="space-y-10">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 pl-4">Getting Started</h3>
                        <ul>
                            <NavItem id="introduction" label="Introduction" />
                            <NavItem id="installation" label="Installation" />
                            <NavItem id="quickstart" label="Quick Start" />
                        </ul>
                    </div>
                    <div>
                         <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 pl-4">Core Concepts</h3>
                        <ul>
                            <NavItem id="risk-engine" label="Risk Engine" />
                            <NavItem id="interception" label="Interception Layer" />
                            <NavItem id="sandbox" label="Simulation Sandbox" />
                        </ul>
                    </div>
                    <div>
                         <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 pl-4">API Reference</h3>
                        <ul>
                            <NavItem id="rest-api" label="REST API" />
                            <NavItem id="websocket" label="WebSocket Feed" />
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-32">
            <AnimatePresence mode="wait">
                {activeSection === 'introduction' && <IntroductionContent key="intro" />}
                {activeSection === 'installation' && <InstallationContent key="install" />}
                {activeSection === 'quickstart' && <QuickStartContent key="quick" />}
                
                {/* Fallback for sections not yet implemented in this demo */}
                {['risk-engine', 'interception', 'sandbox', 'rest-api', 'websocket'].includes(activeSection) && (
                    <motion.div 
                        key="fallback"
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center h-96 border border-dashed border-white/10 rounded-3xl bg-white/5"
                    >
                        <Code className="w-12 h-12 mb-4 text-emerald-500/40" />
                        <h2 className="text-xl font-bold text-white mb-2">Work in Progress</h2>
                        <p className="text-sm text-gray-500">This section is being documented by our engineering team.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
};