import { useTranslation } from 'react-i18next';
import type { MilestoneKey, PhaseDetail } from '../../types/store';

interface TimelineVerticalProps {
  milestones: MilestoneKey[];
  completed: MilestoneKey[];
  current: MilestoneKey;
  phaseDetails?: Partial<Record<MilestoneKey, PhaseDetail>>;
}

export default function TimelineVertical({ milestones, completed, current, phaseDetails }: TimelineVerticalProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'zh';

  return (
    <div className="space-y-0" style={{ paddingLeft: '8px' }}>
      {milestones.map((m, i) => {
        const isCompleted = completed.includes(m);
        const isCurrent = m === current && !isCompleted;
        const isLast = i === milestones.length - 1;
        const detail = phaseDetails?.[m];

        return (
          <div
            key={m}
            className="flex items-start gap-4 animate-[fadeIn_0.3s_ease-out_both]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isCompleted
                    ? 'bg-gold border-gold'
                    : isCurrent
                    ? 'bg-gold/20 border-gold animate-blink'
                    : 'bg-transparent border-text-secondary/30'
                }`}
              >
                {isCompleted && (
                  <svg className="w-2.5 h-2.5 text-bg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {isCurrent && <div className="w-1.5 h-1.5 bg-gold rounded-full" />}
              </div>
              {!isLast && (
                <div className={`w-0.5 ${detail ? 'h-14' : 'h-10'} ${isCompleted ? 'bg-gold/40' : 'bg-text-secondary/15'}`} />
              )}
            </div>
            <div className="pb-6 -mt-0.5 flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <p className={`text-sm font-medium flex-shrink-0 ${isCompleted ? 'text-gold' : isCurrent ? 'text-gold/90' : 'text-text-secondary/50'}`}>
                  {t(`milestone.${m}`)}
                </p>
                {detail?.updatedAt && (
                  <span className="text-[10px] text-text-secondary/40 tabular-nums flex-shrink-0">
                    {detail.updatedAt}
                  </span>
                )}
              </div>
              {detail ? (
                <p className={`text-xs mt-1 leading-relaxed ${isCompleted ? 'text-text-secondary' : isCurrent ? 'text-text-primary/70' : 'text-text-secondary/40'}`}>
                  {detail.description[lang]}
                </p>
              ) : (
                <p className="text-xs text-text-secondary/40 mt-0.5">
                  {isCompleted ? t('detail.completed') : isCurrent ? t('detail.inProgress') : t('detail.upcoming')}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
