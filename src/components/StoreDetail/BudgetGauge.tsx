import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { formatDualCurrency } from '../../utils/progress';
import CountUp from '../CountUp';

interface BudgetGaugeProps {
  used: number;
  total: number | null;
}

export default function BudgetGauge({ used, total }: BudgetGaugeProps) {
  const { t } = useTranslation();
  const circleRef = useRef<SVGCircleElement>(null);

  if (!total) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-text-secondary text-sm">
        {t('store.tbd')}
      </div>
    );
  }

  const pct = Math.min((used / total) * 100, 100);
  const remaining = total - used;
  const isHealthy = pct <= 80;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (pct / 100) * circumference;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = `${targetOffset}`;
    }
  }, [targetOffset]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
          <circle
            ref={circleRef}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={isHealthy ? '#C9A96E' : '#f87171'}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: circumference, transition: 'stroke-dashoffset 1s ease-in-out 0.3s' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gold tabular-nums">
            <CountUp end={Math.round(pct)} />%
          </span>
          <span className="text-[11px] text-text-secondary">{t('store.consumptionRate')}</span>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">{t('store.budgetUsed')}</span>
          <span className="text-gold font-medium tabular-nums">{formatDualCurrency(used, true)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">{t('store.budgetRemaining')}</span>
          <span className="text-text-primary tabular-nums">{formatDualCurrency(remaining, true)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">{t('store.budgetTotal')}</span>
          <span className="text-text-primary tabular-nums">{formatDualCurrency(total, true)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-card-border">
          <span className="text-text-secondary">{t('store.budgetHealth')}</span>
          <span className={isHealthy ? 'text-status-green' : 'text-status-red'}>
            {isHealthy ? t('store.healthy') : t('store.overBudget')}
          </span>
        </div>
      </div>
    </div>
  );
}
