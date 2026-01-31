import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Lock, Globe, Activity, ArrowRight, MousePointer2, Languages } from 'lucide-react';
import { useAppStore } from '../store/AppStore';
import { WalletModal } from '../components/modals/WalletModal';

// --- Spotlight Card Component ---
const SpotlightCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
  
    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  
    return (
      <div
        className={`group relative border border-white/10 bg-gray-900/40 overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(16, 185, 129, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    );
  };

// --- Content Dictionary ---
const content = {
  en: {
    nav: {
      features: "Features",
      technology: "Technology",
      docs: "Documentation",
      launch: "Launch App"
    },
    hero: {
      badge: "SENTINEL PROTOCOL V1.0 LIVE",
      title_1: "AI That Stops Bad Transactions",
      title_2: "Before You Sign.",
      subtitle: "Sentinel intercepts wallet transactions in real time — analyzing smart contract logic, fund flows, and social signals before you approve.",
      cta_connect: "Connect Wallet",
      cta_docs: "View Documentation",
      stats: [
        { label: 'Assets Protected', value: '$1.2B+' },
        { label: 'Threats Blocked', value: '450K+' },
        { label: 'Latency', value: '< 50ms' },
        { label: 'Uptime', value: '99.99%' },
      ]
    },
    features: {
      heading: "Intelligence at scale.",
      subheading: "Our engine processes millions of signals to detect what humans miss.",
      highlight: "Protection that evolves.",
      main_card: {
        title: "Pre-Signature Interception",
        desc: "Sentinel sits between your dApp and your wallet. We simulate every transaction in a sandboxed environment before you confirm.",
        log_info: "Transaction intercepted",
        log_warn: "Malicious Permit Detected (Seaport v1.1 Fake)",
        log_analysis: "Known Phishing",
        risk_score: "Risk Score"
      },
      card_2: {
        title: "Global Threat Database",
        desc: "Synchronized with 50+ security partners and community reports in real-time."
      },
      card_3: {
        title: "Privacy First",
        desc: "Zero-knowledge architecture. We analyze the transaction data, not your identity."
      }
    },
    cta: {
      title: "Ready to secure your journey?",
      button: "Connect Wallet",
      support: "Supports MetaMask, Rabbit, Rainbow, and WalletConnect."
    },
    footer: {
      privacy: "Privacy",
      terms: "Terms",
      rights: "© 2025 AIGC-DAO. All rights reserved."
    }
  },
  zh: {
    nav: {
      features: "核心功能",
      technology: "技术原理",
      docs: "开发文档",
      launch: "启动应用"
    },
    hero: {
      badge: "SENTINEL 协议 V1.0 已上线",
      title_1: "在您签名之前，",
      title_2: "AI 智能阻断恶意交易。",
      subtitle: "Sentinel 实时拦截钱包交易 — 在您批准之前，深度分析智能合约逻辑、资金流向与社会化信号。",
      cta_connect: "连接钱包",
      cta_docs: "查看文档",
      stats: [
        { label: '资产保护总额', value: '$1.2B+' },
        { label: '已拦截威胁', value: '450K+' },
        { label: '平均延迟', value: '< 50ms' },
        { label: '系统在线率', value: '99.99%' },
      ]
    },
    features: {
      heading: "规模化智能防御体系。",
      subheading: "我们的引擎每秒处理数百万个信号，捕捉人类难以察觉的风险。",
      highlight: "进化式安全防护。",
      main_card: {
        title: "交易预执行拦截",
        desc: "Sentinel 驻守在 dApp 与钱包之间。我们在沙盒环境中模拟每一笔交易的执行结果，在您确认前发现隐患。",
        log_info: "交易已拦截",
        log_warn: "检测到恶意授权许可 (伪造 Seaport v1.1)",
        log_analysis: "已知钓鱼地址",
        risk_score: "风险评分"
      },
      card_2: {
        title: "全球威胁情报库",
        desc: "与 50+ 安全合作伙伴及社区举报数据实时同步，构建防御网络。"
      },
      card_3: {
        title: "隐私至上架构",
        desc: "零知识证明设计。我们仅分析交易代码与数据，绝不触碰您的身份隐私。"
      }
    },
    cta: {
      title: "准备好开启安全之旅了吗？",
      button: "连接钱包",
      support: "支持 MetaMask, Rabbit, Rainbow 以及 WalletConnect。"
    },
    footer: {
      privacy: "隐私政策",
      terms: "服务条款",
      rights: "© 2025 AIGC-DAO. 保留所有权利。"
    }
  }
};

export const Landing: React.FC = () => {
  const { connectWallet } = useAppStore();
  const navigate = useNavigate();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'zh'>('en'); // Language state
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const t = content[lang]; // Current translation

  const handleConnectSuccess = () => {
    setIsWalletModalOpen(false);
    connectWallet();
    navigate('/app');
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
        onConnect={handleConnectSuccess} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <span className="text-xl font-bold tracking-tight font-mono">Sentinel</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                <a href="#features" className="hover:text-white transition">{t.nav.features}</a>
                <a href="#technology" className="hover:text-white transition">{t.nav.technology}</a>
                <button onClick={() => navigate('/docs')} className="hover:text-white transition">{t.nav.docs}</button>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleLanguage}
                    className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition flex items-center gap-1"
                >
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase w-5">{lang}</span>
                </button>
                <button 
                    onClick={() => setIsWalletModalOpen(true)}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition font-medium text-sm border border-white/10"
                >
                    {t.nav.launch}
                </button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
            <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />
            <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {t.hero.badge}
                </div>
                
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
                    {t.hero.title_1} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-white">
                        {t.hero.title_2}
                    </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    {t.hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => setIsWalletModalOpen(true)}
                        className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
                    >
                        {t.hero.cta_connect} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => navigate('/docs')}
                        className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition w-full sm:w-auto backdrop-blur-md"
                    >
                        {t.hero.cta_docs}
                    </button>
                </div>

                {/* Trust Signals */}
                <motion.div 
                    style={{ opacity }}
                    className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {t.hero.stats.map((stat, i) => (
                        <div key={i}>
                            <div className="text-2xl md:text-3xl font-mono font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Improved Bento Grid Features */}
      <section id="features" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="mb-20">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t.features.heading}</h2>
                <p className="text-gray-400 max-w-xl text-xl leading-relaxed">
                    {t.features.subheading} 
                    <span className="text-emerald-500"> {t.features.highlight}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto">
                {/* Main Feature - Large */}
                <SpotlightCard className="md:col-span-2 md:row-span-2 rounded-3xl min-h-[500px]">
                    <div className="relative z-10 h-full flex flex-col justify-between p-10">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="p-3 bg-emerald-500/10 w-fit rounded-xl mb-6 border border-emerald-500/20">
                                    <Zap className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white">{t.features.main_card.title}</h3>
                                <p className="text-gray-400 leading-relaxed max-w-md text-lg">
                                    {t.features.main_card.desc}
                                </p>
                            </div>
                            <ShieldCheck className="w-32 h-32 text-emerald-900/20 hidden md:block" />
                        </div>
                        
                        {/* Interactive Code Simulation */}
                        <div className="mt-8 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                <span className="ml-2 text-xs font-mono text-gray-500">interceptor.log</span>
                            </div>
                            <div className="p-6 font-mono text-sm space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500">14:20:01</span>
                                    <span className="text-emerald-500">[INFO]</span>
                                    <span className="text-gray-300">{t.features.main_card.log_info}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500">14:20:01</span>
                                    <span className="text-red-500">[WARN]</span>
                                    <span className="text-red-400">{t.features.main_card.log_warn}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500">14:20:02</span>
                                    <span className="text-blue-500">[ANALYSIS]</span>
                                    <span className="text-gray-300">Spender: <span className="text-white border-b border-gray-600">0x8a...3b21</span> ({t.features.main_card.log_analysis})</span>
                                </div>
                                <div className="flex items-center gap-3 mt-2 pl-24">
                                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs border border-red-500/30">{t.features.main_card.risk_score}: 98/100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Background Dispersion */}
                    <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                </SpotlightCard>

                {/* Secondary Feature - Top Right */}
                <SpotlightCard className="rounded-3xl min-h-[240px]">
                    <div className="relative z-10 p-8">
                        <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                        <div className="p-3 bg-blue-500/10 w-fit rounded-xl mb-6 border border-blue-500/20">
                            <Globe className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{t.features.card_2.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t.features.card_2.desc}
                        </p>
                    </div>
                </SpotlightCard>

                {/* Secondary Feature - Bottom Right */}
                <SpotlightCard className="rounded-3xl min-h-[240px]">
                    <div className="relative z-10 p-8">
                        <div className="absolute right-0 bottom-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] translate-y-1/2 translate-x-1/2" />
                        <div className="p-3 bg-purple-500/10 w-fit rounded-xl mb-6 border border-purple-500/20">
                            <Lock className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{t.features.card_3.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {t.features.card_3.desc}
                        </p>
                    </div>
                </SpotlightCard>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tighter">{t.cta.title}</h2>
            <div className="flex flex-col items-center gap-6">
                <button 
                    onClick={() => setIsWalletModalOpen(true)}
                    className="px-12 py-6 bg-emerald-500 text-black rounded-full font-bold text-xl hover:bg-emerald-400 transition shadow-[0_0_50px_rgba(16,185,129,0.3)] hover:scale-105 duration-300"
                >
                    {t.cta.button}
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {t.cta.support}
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-gray-600" />
                <span className="font-mono text-gray-600 font-bold">SENTINEL</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
                <a href="#" className="hover:text-white transition">{t.footer.privacy}</a>
                <a href="#" className="hover:text-white transition">{t.footer.terms}</a>
                <a href="https://x.com/aweijing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a>
                <a href="https://github.com/aginomoto23" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
            </div>
            <div className="text-sm text-gray-700">
                {t.footer.rights}
            </div>
        </div>
      </footer>
    </div>
  );
};