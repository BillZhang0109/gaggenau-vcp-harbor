import { useTranslation } from 'react-i18next';
import type { Store, MilestoneKey } from '../types/store';
import { calculateProgress } from '../utils/progress';
import StatusBadge from '../components/Dashboard/StatusBadge';
import CountUp from '../components/CountUp';
import TimelineVertical from '../components/StoreDetail/TimelineVertical';
import BudgetGauge from '../components/StoreDetail/BudgetGauge';
import RiskPanel from '../components/StoreDetail/RiskPanel';
import ActionItems from '../components/StoreDetail/ActionItems';

interface StoreDetailPageProps {
  store: Store;
  milestones: MilestoneKey[];
}

export default function StoreDetailPage({ store, milestones }: StoreDetailPageProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'zh';
  const progress = calculateProgress(store, milestones);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="glass-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ padding: '20px 32px' }}>
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-gold text-xl lg:text-2xl font-bold truncate">
              {store.name[lang]}
            </h2>
            <span
              className="flex-shrink-0 text-[11px] font-bold"
              style={{
                padding: '2px 10px',
                borderRadius: '20px',
                background: store.type === 'FFS' ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.04)',
                color: store.type === 'FFS' ? '#C9A96E' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${store.type === 'FFS' ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {store.type}
            </span>
          </div>
          <p className="text-text-secondary text-sm mt-1.5">
            {store.designPartner}
          </p>
        </div>
        <div className="flex items-center gap-5 flex-shrink-0">
          <StatusBadge status={store.status} />
          <div className="text-right" style={{ paddingLeft: '20px', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{t('store.overallProgress')}</p>
            <p className="text-3xl font-bold text-gold tabular-nums mt-0.5">
              <CountUp end={progress} />
              <span style={{ color: 'rgba(201,169,110,0.4)', fontSize: '18px', marginLeft: '2px' }}>%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Timeline + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-card" style={{ padding: '20px 32px' }}>
          <h3 className="font-display text-gold text-base font-semibold mb-5">
            {t('detail.timeline')}
          </h3>
          <TimelineVertical
            milestones={milestones}
            completed={store.completedMilestones}
            current={store.currentMilestone}
            phaseDetails={store.phaseDetails}
          />
        </div>

        <div className="lg:col-span-3 glass-card" style={{ padding: '20px 32px' }}>
          <h3 className="font-display text-gold text-base font-semibold mb-5">
            {t('detail.budgetDashboard')}
          </h3>
          <BudgetGauge used={store.budgetUsed} total={store.budgetTotal} />
        </div>
      </div>

      {/* Risks + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card" style={{ padding: '20px 32px' }}>
          <h3 className="font-display text-gold text-base font-semibold mb-4">
            {t('detail.risks')}
          </h3>
          <RiskPanel risks={store.risks} />
        </div>

        <div className="glass-card" style={{ padding: '20px 32px' }}>
          <h3 className="font-display text-gold text-base font-semibold mb-4">
            {t('detail.actions')}
          </h3>
          <ActionItems store={store} />
        </div>
      </div>
    </div>
  );
}
