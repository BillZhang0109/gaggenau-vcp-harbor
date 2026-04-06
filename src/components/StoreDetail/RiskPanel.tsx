import { useTranslation } from 'react-i18next';
import type { Risk } from '../../types/store';

const severityConfig = {
  critical: { bg: 'bg-status-red/10', border: 'border-status-red/30', text: 'text-status-red', icon: '🔴' },
  warning: { bg: 'bg-status-yellow/10', border: 'border-status-yellow/30', text: 'text-status-yellow', icon: '🟡' },
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: '🔵' },
};

export default function RiskPanel({ risks }: { risks: Risk[] }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'zh';

  if (risks.length === 0) {
    return (
      <div className="text-text-secondary text-sm py-4 text-center">
        {t('detail.noRisks')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {risks.map((risk, i) => {
        const severity = risk.severity || 'warning';
        const cfg = severityConfig[severity];

        return (
          <div
            key={i}
            className={`${cfg.bg} border ${cfg.border} rounded-lg p-3 animate-[fadeIn_0.3s_ease-out_both] ${
              severity === 'critical' ? 'animate-pulse-red' : ''
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm flex-shrink-0">{cfg.icon}</span>
              <div>
                <span className={`text-xs font-semibold ${cfg.text} uppercase`}>
                  {t(`detail.severity.${severity}`)}
                </span>
                <p className="text-sm text-text-primary mt-1">{risk[lang]}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
