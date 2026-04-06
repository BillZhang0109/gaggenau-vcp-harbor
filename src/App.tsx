import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreData } from './hooks/useStoreData';
import Navbar from './components/Layout/Navbar';
import PortfolioOverview from './pages/PortfolioOverview';
import StoreDetailPage from './pages/StoreDetailPage';
import PasswordGate, { isAuthenticated } from './components/PasswordGate';

export default function App() {
  const { t, i18n } = useTranslation();
  const [authed, setAuthed] = useState(isAuthenticated);
  const { data, loading, activeStores } = useStoreData();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = useMemo(() => {
    const lang = i18n.language as 'en' | 'zh';
    const list = [{ key: 'overview', label: t('nav.overview') }];
    activeStores.forEach((s) => {
      list.push({
        key: s.id,
        label: s.name[lang],
      });
    });
    return list;
  }, [activeStores, t, i18n.language]);

  if (!authed) {
    return <PasswordGate onSuccess={() => setAuthed(true)} />;
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gold font-display text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  const activeStore = data.stores.find((s) => s.id === activeTab);

  return (
    <div className="min-h-screen">
      <Navbar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main content */}
      <main className="max-w-[1400px] mx-auto" style={{ padding: '100px 32px 32px' }}>
        {activeTab === 'overview' ? (
          <PortfolioOverview key="overview" data={data} onStoreClick={setActiveTab} />
        ) : activeStore ? (
          <StoreDetailPage
            key={activeStore.id}
            store={activeStore}
            milestones={data.milestoneDefinition}
          />
        ) : null}
      </main>

      {/* Footer disclaimer */}
      <footer className="max-w-[1400px] mx-auto text-center" style={{ padding: '0 32px 48px' }}>
        <div className="border-t border-white/5" style={{ paddingTop: '24px' }}>
          <p className="text-text-secondary/40 text-[10px] leading-relaxed">
            {t('footer.disclaimer')}
          </p>
          <p className="text-text-secondary/30 text-[10px]" style={{ marginTop: '6px' }}>
            {t('footer.contact')}{' '}
            <a href="mailto:Bill.zhang@bshg.com" className="text-gold/50 hover:text-gold transition-colors">
              Bill.zhang@bshg.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
