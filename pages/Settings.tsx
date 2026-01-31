import React from 'react';
import { useAppStore } from '../store/AppStore';
import { GlassCard } from '../components/ui/GlassCard';
import { Moon, Sun } from 'lucide-react';

export const Settings: React.FC = () => {
  const { t, settings, updateSettings } = useAppStore();

  const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="mb-8">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 dark:text-white/40 mb-4 font-bold">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
  );

  const Option = ({ label, active, onClick, icon: Icon }: { label: string, active: boolean, onClick: () => void, icon?: React.ElementType }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all mr-2 mb-2 inline-flex items-center gap-2 ${
            active 
            ? 'bg-white dark:bg-white text-black shadow-lg shadow-black/10 dark:shadow-white/10' 
            : 'bg-black/5 dark:bg-white/5 text-gray-500 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
        }`}
    >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('settings')}</h1>

      <GlassCard>
        <div className="p-2">
            <Section title={t('theme')}>
                <div className="flex flex-wrap">
                    <Option 
                        label="Dark" 
                        active={settings.theme === 'dark'} 
                        onClick={() => updateSettings({ theme: 'dark' })} 
                        icon={Moon}
                    />
                    <Option 
                        label="Light" 
                        active={settings.theme === 'light'} 
                        onClick={() => updateSettings({ theme: 'light' })} 
                        icon={Sun}
                    />
                </div>
            </Section>

            <Section title={t('language')}>
                <Option label="English" active={settings.language === 'en'} onClick={() => updateSettings({ language: 'en' })} />
                <Option label="中文" active={settings.language === 'zh'} onClick={() => updateSettings({ language: 'zh' })} />
            </Section>

            <Section title={t('sensitivity')}>
                <div className="mb-4 text-xs text-gray-500 dark:text-white/40 italic">
                    {settings.riskSensitivity === 'minimal' ? t('minimal_mode_desc') : 'Standard interception for most users.'}
                </div>
                <Option label="Minimal" active={settings.riskSensitivity === 'minimal'} onClick={() => updateSettings({ riskSensitivity: 'minimal' })} />
                <Option label="Standard" active={settings.riskSensitivity === 'standard'} onClick={() => updateSettings({ riskSensitivity: 'standard' })} />
                <Option label="Strict" active={settings.riskSensitivity === 'strict'} onClick={() => updateSettings({ riskSensitivity: 'strict' })} />
            </Section>

            <Section title={t('animation')}>
                <Option label="Subtle" active={settings.animationIntensity === 'subtle'} onClick={() => updateSettings({ animationIntensity: 'subtle' })} />
                <Option label="Normal" active={settings.animationIntensity === 'normal'} onClick={() => updateSettings({ animationIntensity: 'normal' })} />
                <Option label="Fun" active={settings.animationIntensity === 'fun'} onClick={() => updateSettings({ animationIntensity: 'fun' })} />
            </Section>
        </div>
      </GlassCard>
    </div>
  );
};