import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreData } from './hooks/useStoreData';
import Navbar from './components/Layout/Navbar';
import PortfolioOverview from './pages/PortfolioOverview';
import StoreDetailPage from './pages/StoreDetailPage';

export default function App() {
  const { t, i18n } = useTranslation();
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
      <main className="max-w-[1400px] mx-auto" style={{ padding: '100px 24px 64px' }}>
        {activeTab === 'overview' ? (
          <PortfolioOverview key="overview" data={data} />
        ) : activeStore ? (
          <StoreDetailPage
            key={activeStore.id}
            store={activeStore}
            milestones={data.milestoneDefinition}
          />
        ) : null}
      </main>
    </div>
  );
}
