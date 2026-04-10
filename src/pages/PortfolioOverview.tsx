import { useTranslation } from 'react-i18next';
import type { ProgramData } from '../types/store';
import { formatDualCurrency } from '../utils/progress';
import StoreCard from '../components/Dashboard/StoreCard';

interface PortfolioOverviewProps {
  data: ProgramData;
  onStoreClick: (storeId: string) => void;
}

function formatLastUpdated(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function PortfolioOverview({ data, onStoreClick }: PortfolioOverviewProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'zh';
  const onTrack = data.stores.filter(s => s.status === 'on_track').length;
  const notStarted = data.stores.filter(s => s.status === 'not_started').length;
  const totalBudget = data.program.totalBudget;

  const kpis = [
    { label: t('overview.stores'), value: String(data.stores.length), sub: `${data.stores.filter(s => s.type === 'FFS').length} FFS + ${data.stores.filter(s => s.type === 'BFS').length} BFS` },
    { label: t('status.on_track'), value: String(onTrack), sub: data.stores.filter(s => s.status === 'on_track').map(s => s.name[lang]).join(', ') || '—' },
    { label: t('status.not_started'), value: String(notStarted), sub: `${notStarted} ${t('overview.stores').toLowerCase()}` },
    { label: t('overview.totalBudget'), value: formatDualCurrency(totalBudget, true), sub: '€0 / ¥0' },
  ];

  const programRisks = data.program.risks ?? [];

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* Last Updated */}
      <div className="flex justify-end" style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
          {t('overview.lastUpdated')}: {formatLastUpdated(data.program.lastUpdated)}
        </span>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '28px' }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-card" style={{ padding: '20px 24px' }}>
            <div className="uppercase tracking-wider" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', marginBottom: '8px' }}>
              {kpi.label}
            </div>
            <div className="font-bold tabular-nums text-gold" style={{ fontSize: '22px' }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(125,211,252,0.5)', marginTop: '4px' }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Program-Level Risks */}
      {programRisks.length > 0 && (
        <div className="glass-card" style={{ padding: '20px 28px', marginBottom: '28px' }}>
          <h3 className="font-display text-gold text-base font-semibold" style={{ marginBottom: '12px' }}>
            {t('overview.programRisks')}
          </h3>
          <div className="space-y-3">
            {programRisks.map((risk, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
                style={{ padding: '12px 16px', background: 'rgba(250,204,21,0.04)', border: '1px solid rgba(250,204,21,0.12)', borderRadius: '12px' }}
              >
                <span style={{ flexShrink: 0, width: '8px', height: '8px', marginTop: '5px', borderRadius: '50%', background: risk.severity === 'critical' ? '#f87171' : risk.severity === 'warning' ? '#facc15' : '#7DD3FC' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  {risk[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

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
