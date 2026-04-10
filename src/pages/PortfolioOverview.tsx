import { useTranslation } from 'react-i18next';
import type { ProgramData } from '../types/store';
import { formatCurrency } from '../utils/progress';
import StoreCard from '../components/Dashboard/StoreCard';

interface PortfolioOverviewProps {
  data: ProgramData;
  onStoreClick: (storeId: string) => void;
}

export default function PortfolioOverview({ data, onStoreClick }: PortfolioOverviewProps) {
  const { t } = useTranslation();
  const onTrack = data.stores.filter(s => s.status === 'on_track').length;
  const notStarted = data.stores.filter(s => s.status === 'not_started').length;
  const totalBudget = data.program.totalBudget;

  const kpis = [
    { label: t('overview.stores'), value: String(data.stores.length), sub: `${data.stores.filter(s => s.type === 'FFS').length} FFS + ${data.stores.filter(s => s.type === 'BFS').length} BFS` },
    { label: t('status.on_track'), value: String(onTrack), sub: data.stores.filter(s => s.status === 'on_track').map(s => s.id.split('-')[0]).join(', ') || '—' },
    { label: t('status.not_started'), value: String(notStarted), sub: `${notStarted} ${t('overview.stores').toLowerCase()}` },
    { label: t('overview.totalBudget'), value: formatCurrency(totalBudget, true), sub: '¥0 consumed' },
  ];

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* KPI Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '28px' }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-card" style={{ padding: '20px 24px' }}>
            <div className="uppercase tracking-wider" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', marginBottom: '8px' }}>
              {kpi.label}
            </div>
            <div className="font-bold tabular-nums text-gold" style={{ fontSize: '26px' }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(125,211,252,0.5)', marginTop: '4px' }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Store Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {data.stores.map((store, i) => (
          <StoreCard
            key={store.id}
            store={store}
            milestones={data.milestoneDefinition}
            index={i}
            onClick={() => onStoreClick(store.id)}
          />
        ))}
      </div>
    </div>
  );
}
