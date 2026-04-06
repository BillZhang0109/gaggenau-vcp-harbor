import { useTranslation } from 'react-i18next';
import type { Store } from '../../types/store';

export default function ActionItems({ store }: { store: Store }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'zh';

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 bg-gold/5 border border-gold/20 rounded-lg p-3 animate-[fadeIn_0.3s_ease-out]">
        <span className="text-gold text-lg">→</span>
        <div>
          <p className="text-sm text-text-primary">{store.nextStep[lang]}</p>
          {store.estimatedCompletion && (
            <p className="text-xs text-text-secondary mt-1">
              {t('store.estCompletion')}: {store.estimatedCompletion}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
