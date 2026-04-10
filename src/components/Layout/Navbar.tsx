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
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(12, 15, 20, 0.8)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)' }}
    >
      {/* Top bar: brand + actions */}
      <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between" style={{ padding: '0 32px' }}>
        <h1 className="font-display text-gold text-base lg:text-lg tracking-[0.2em] font-semibold">
          {t('brand')}
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-full transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,169,110,0.2)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {i18n.language === 'en' ? '中' : 'EN'}
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="max-w-[1400px] mx-auto flex gap-2 lg:gap-4 overflow-x-auto scrollbar-none" style={{ padding: '0 32px' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'text-gold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            style={{ padding: i === 0 ? '10px 20px 10px 0' : '10px 20px' }}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full" style={{ opacity: 0.7 }} />
            )}
          </button>
        ))}
      </div>

      {/* Divider - gradient line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2) 20%, rgba(125,211,252,0.08) 80%, transparent)' }} />
    </nav>
  );
}
