import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Activity, ShieldAlert, Radar, Settings, ShieldCheck, Search, LogOut } from 'lucide-react';
import { useAppStore } from '../../store/AppStore';
import { motion, Variants } from 'framer-motion';

export const AppShell: React.FC = () => {
  const { t, disconnectWallet } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  const navItems = [
    { icon: Activity, label: t('dashboard'), path: '/app' }, // index route of /app
    { icon: Radar, label: t('simulate'), path: '/app/simulate' },
    { icon: Search, label: t('check'), path: '/app/check' },
    { icon: Settings, label: t('settings'), path: '/app/settings' },
  ];

  // Helper to check active state including nested routes
  const checkActive = (path: string) => {
    if (path === '/app' && location.pathname === '/app') return true;
    if (path !== '/app' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Ambient background variants
  const backgroundVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.4, 0.3],
      rotate: [0, 45, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f5f7] dark:bg-[#050505] text-gray-900 dark:text-white transition-colors duration-300 selection:bg-sentinel-neon selection:text-black relative overflow-hidden font-sans">
      
      {/* Ambient Background - More Dramatic */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          variants={backgroundVariants}
          animate="animate"
          className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-emerald-500/10 dark:bg-sentinel-neon/5 rounded-full blur-[150px]"
        />
        <motion.div 
          variants={backgroundVariants}
          animate="animate"
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-15 mix-blend-overlay"></div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-20 lg:w-72 flex-col border-r border-gray-200 dark:border-white/5 glass-panel h-screen sticky top-0 z-20 transition-all duration-300">
        <div className="p-8 flex items-center justify-center lg:justify-start gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-500 dark:text-sentinel-neon shrink-0" />
          <span className="text-xl font-bold tracking-tight hidden lg:block font-mono">Sentinel</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-8">
          {navItems.map((item) => {
            const isActive = checkActive(item.path);
            return (
                <NavLink
                key={item.path}
                to={item.path}
                className={`
                    flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden
                    ${isActive 
                    ? 'bg-gray-200/50 dark:bg-white/10 text-black dark:text-white shadow-lg' 
                    : 'text-gray-500 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}
                `}
                >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-emerald-600 dark:text-sentinel-neon' : ''}`} />
                <span className="font-medium hidden lg:block tracking-wide text-sm">{item.label}</span>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 dark:bg-sentinel-neon rounded-r-full" />}
                </NavLink>
            );
          })}
        </nav>

        <div className="p-4">
             <button 
                onClick={handleDisconnect}
                className="flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all group"
             >
                <LogOut className="w-5 h-5 shrink-0" />
                <span className="font-medium hidden lg:block tracking-wide text-sm">Disconnect</span>
             </button>
        </div>
        
        <div className="p-8 text-xs text-center lg:text-left text-gray-400 dark:text-white/20 font-mono">
          <span className="hidden lg:inline">SYS.VER.1.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto z-10 relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-gray-200 dark:border-white/5 flex items-center px-4 justify-between glass-panel sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
           <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500 dark:text-sentinel-neon" />
            <span className="font-bold font-mono">SENTINEL</span>
           </div>
           <button onClick={handleDisconnect} className="p-2">
             <LogOut className="w-5 h-5 text-gray-400" />
           </button>
        </div>

        {/* Added Padding for Breathing Room */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 min-h-[calc(100vh-4rem)] md:min-h-screen flex flex-col">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <Outlet />
          </motion.div>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass-panel border-t border-gray-200 dark:border-white/10 flex items-center justify-around z-50 pb-safe bg-white/90 dark:bg-black/90 backdrop-blur-xl">
           {navItems.map((item) => {
             const isActive = checkActive(item.path);
             return (
                <NavLink
                key={item.path}
                to={item.path}
                className={`
                    flex flex-col items-center justify-center w-full h-full p-2
                    ${isActive ? 'text-emerald-500 dark:text-sentinel-neon' : 'text-gray-400 dark:text-white/40'}
                `}
                >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">{item.label}</span>
                </NavLink>
             );
           })}
        </div>
      </main>
    </div>
  );
};