import { useTranslation } from 'react-i18next';
import type { MilestoneKey } from '../../types/store';

interface MilestoneTrackProps {
  milestones: MilestoneKey[];
  completed: MilestoneKey[];
  current: MilestoneKey;
}

export default function MilestoneTrack({ milestones, completed, current }: MilestoneTrackProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Dots + connecting lines */}
      <div className="flex items-center">
        {milestones.map((m, i) => {
          const isCompleted = completed.includes(m);
          const isCurrent = m === current && !isCompleted;
          const isLast = i === milestones.length - 1;

          return (
            <div key={m} className="flex items-center" style={{ flex: isLast ? '0 0 auto' : '1 1 0' }}>
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 border-[1.5px] ${
                  isCompleted
                    ? 'bg-gold border-gold'
                    : isCurrent
                    ? 'bg-gold/30 border-gold animate-blink'
                    : 'bg-transparent border-text-secondary/30'
                }`}
              />
              {!isLast && (
                <div
                  className={`h-[1px] flex-1 min-w-1 ${
                    isCompleted ? 'bg-gold/50' : 'bg-text-secondary/15'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Labels */}
      <div className="flex mt-1.5">
        {milestones.map((m, i) => {
          const isCompleted = completed.includes(m);
          const isCurrent = m === current && !isCompleted;
          const isLast = i === milestones.length - 1;

          return (
            <div
              key={m}
              className={isLast ? 'flex-shrink-0' : 'flex-1 min-w-0'}
            >
              <span
                className={`block text-[10px] leading-tight truncate pr-1 ${
                  isCompleted
                    ? 'text-gold/80'
                    : isCurrent
                    ? 'text-gold/60'
                    : 'text-text-secondary/40'
                }`}
              >
                {t(`milestone.${m}`)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
