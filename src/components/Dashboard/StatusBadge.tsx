import { useTranslation } from 'react-i18next';
import type { StoreStatus } from '../../types/store';

const statusConfig: Record<StoreStatus, { color: string; dotClass: string; glow: string }> = {
  on_track: { color: 'text-status-green', dotClass: 'bg-status-green', glow: 'status-glow-green' },
  at_risk: { color: 'text-status-yellow', dotClass: 'bg-status-yellow', glow: 'status-glow-yellow' },
  critical: { color: 'text-status-red', dotClass: 'bg-status-red animate-pulse-red', glow: 'status-glow-red' },
  not_started: { color: 'text-status-gray', dotClass: 'bg-status-gray', glow: 'status-glow-gray' },
};

export default function StatusBadge({ status }: { status: StoreStatus }) {
  const { t } = useTranslation();
  const cfg = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
      <span className={`w-2 h-2 rounded-full ${cfg.dotClass} ${cfg.glow}`} />
      {t(`status.${status}`)}
    </span>
  );
}
