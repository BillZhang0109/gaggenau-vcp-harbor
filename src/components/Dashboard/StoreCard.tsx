import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import type { Store, MilestoneKey } from '../../types/store';
import { calculateProgress, formatCurrency } from '../../utils/progress';
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
    ? formatCurrency(store.budgetTotal, true)
    : store.area_sqm && store.unitCost
    ? `~${formatCurrency(store.area_sqm * store.unitCost, true)}`
    : t('store.tbd');

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      className="group bg-card backdrop-blur-xl border border-card-border rounded-lg hover:border-card-hover hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,169,110,0.08)] transition-all duration-300 flex flex-col cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        padding: '28px 28px 24px',
      }}
    >
      {/* Header: City + Type + Status */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-gold text-lg lg:text-xl font-bold leading-snug">
            {store.name[lang]}
          </h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
            store.type === 'FFS'
              ? 'bg-gold/15 text-gold border border-gold/25'
              : 'bg-white/5 text-text-secondary border border-white/10'
          }`}>
            {store.type}
          </span>
        </div>
        <StatusBadge status={store.status} />
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-text-secondary text-[11px] uppercase tracking-wider">{t('store.progress')}</span>
          <span className="text-gold text-base font-bold tabular-nums">
            <CountUp end={progress} />
            <span className="text-gold/50 text-sm ml-0.5">%</span>
          </span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-gold/70 to-gold rounded-full"
            style={{ width: 0, transition: 'width 0.8s ease-in-out' }}
          />
        </div>
        {store.timelineStart && store.timelineEnd && (
          <div className="flex justify-between text-[10px] text-text-secondary/50 mt-2 tabular-nums">
            <span>{store.timelineStart}</span>
            <span>{store.timelineEnd}</span>
          </div>
        )}
      </div>

      {/* Milestones */}
      <div className="mb-6">
        <MilestoneTrack
          milestones={milestones}
          completed={store.completedMilestones}
          current={store.currentMilestone}
        />
      </div>

      {/* Key info grid */}
      <div className="space-y-3 text-[13px]">
        <div className="flex justify-between">
          <span className="text-text-secondary">{t('store.currentPhase')}</span>
          <span className="text-gold font-medium">{t(`milestone.${store.currentPhase}`)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">{t('store.designer')}</span>
          <span className="text-text-primary font-medium">{store.designPartner}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">{t('store.budget')}</span>
          <span className="text-text-primary font-medium tabular-nums">{budgetLabel}</span>
        </div>

        <div className="border-t border-white/5 pt-3 mt-3">
          <div className="text-text-secondary text-[11px] uppercase tracking-wider mb-1.5">{t('store.nextStep')}</div>
          <p className="text-text-primary text-[13px] leading-relaxed">{store.nextStep[lang]}</p>
        </div>

        {store.lastUpdated && (
          <div className="border-t border-white/5 pt-3 mt-3 flex justify-between">
            <span className="text-text-secondary/50 text-[10px]">{t('store.lastUpdated')}</span>
            <span className="text-text-secondary/50 text-[10px] tabular-nums">{store.lastUpdated}</span>
          </div>
        )}
      </div>
    </div>
  );
}
