import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

interface NavbarProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function Navbar({ tabs, activeTab, onTabChange }: NavbarProps) {
  const { t, i18n } = useTranslation();

  const toggleLang = useCallback(() => {
    const next = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('gaggenau-lang', next);
  }, [i18n]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[rgba(20,20,20,0.85)]"
    >
      {/* Top bar: brand + actions */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
        <h1 className="font-display text-gold text-base lg:text-lg tracking-[0.2em] font-semibold">
          {t('brand')}
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="w-8 h-8 flex items-center justify-center text-xs font-semibold border border-gold/20 rounded-full text-text-secondary hover:text-gold hover:border-gold/50 transition-colors"
          >
            {i18n.language === 'en' ? '中' : 'EN'}
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex gap-2 lg:gap-4 overflow-x-auto scrollbar-none">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative px-5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'text-gold'
                : 'text-text-secondary hover:text-text-primary'
            } ${i > 0 ? 'border-l border-white/5' : ''}`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gold rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </nav>
  );
}
