import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import type { Store, MilestoneKey } from '../../types/store';
import { calculateProgress, formatDualCurrency } from '../../utils/progress';
import StatusBadge from './StatusBadge';
import MilestoneTrack from './MilestoneTrack';
import CountUp from '../CountUp';

interface StoreCardProps {
  store: Store;
  milestones: MilestoneKey[];
  index: number;
  onClick?: () => void;
}

export default function StoreCard({ store, milestones, index, onClick }: StoreCardProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'zh';
  const progress = calculateProgress(store, milestones);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (visible && barRef.current) {
      barRef.current.style.width = `${progress}%`;
    }
  }, [visible, progress]);

  const budgetLabel = store.budgetTotal
    ? formatDualCurrency(store.budgetTotal, true)
    : store.area_sqm && store.unitCost
    ? `~${formatDualCurrency(store.area_sqm * store.unitCost, true)}`
    : t('store.tbd');

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      className="glass-card group flex flex-col cursor-pointer hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out, background 0.4s, border-color 0.4s, box-shadow 0.4s',
        padding: '28px 28px 24px',
      }}
    >
      {/* Header: City + Type + Status */}
      <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <div className="flex items-center gap-3">
          <h3 className="font-display text-gold text-lg lg:text-xl font-bold leading-snug">
            {store.name[lang]}
          </h3>
          <span
            className="text-[10px] font-bold"
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
        <StatusBadge status={store.status} />
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '20px' }}>
        <div className="flex items-baseline justify-between" style={{ marginBottom: '8px' }}>
          <span className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{t('store.progress')}</span>
          <span className="text-gold text-base font-bold tabular-nums">
            <CountUp end={progress} />
            <span style={{ color: 'rgba(201,169,110,0.4)', fontSize: '14px', marginLeft: '2px' }}>%</span>
          </span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            ref={barRef}
            style={{ height: '100%', width: 0, background: 'linear-gradient(90deg, rgba(201,169,110,0.4), #C9A96E)', borderRadius: '4px', transition: 'width 0.8s ease-in-out' }}
          />
        </div>
        {store.timelineStart && store.timelineEnd && (
          <div className="flex justify-between tabular-nums" style={{ marginTop: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
            <span>{store.timelineStart}</span>
            <span>{store.timelineEnd}</span>
          </div>
        )}
      </div>

      {/* Milestones */}
      <div style={{ marginBottom: '20px' }}>
        <MilestoneTrack
          milestones={milestones}
          completed={store.completedMilestones}
          current={store.currentMilestone}
        />
      </div>

      {/* Key info grid */}
      <div className="text-[13px]">
        <div className="flex justify-between" style={{ padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>{t('store.currentPhase')}</span>
          <span className="text-gold font-medium">{t(`milestone.${store.currentPhase}`)}</span>
        </div>
        <div className="flex justify-between" style={{ padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>{t('store.designer')}</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{store.designPartner}</span>
        </div>
        <div className="flex justify-between" style={{ padding: '7px 0' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>{t('store.budget')}</span>
          <span className="tabular-nums" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{budgetLabel}</span>
        </div>

        <div style={{ marginTop: '14px', padding: '12px 16px', background: 'rgba(201,169,110,0.04)', border: '1px solid rgba(201,169,110,0.08)', borderRadius: '12px' }}>
          <div className="uppercase tracking-wider" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>{t('store.nextStep')}</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{store.nextStep[lang]}</p>
        </div>

        {store.lastUpdated && (
          <div className="flex justify-between" style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
            <span>{t('store.lastUpdated')}</span>
            <span className="tabular-nums">{store.lastUpdated}</span>
          </div>
        )}
      </div>
    </div>
  );
}
