import type { Store, MilestoneKey } from '../types/store';

export function calculateProgress(
  store: Store,
  milestones: MilestoneKey[]
): number {
  const total = milestones.length;
  if (total === 0) return 0;

  const milestoneProgress = (store.completedMilestones.length / total) * 100;

  if (store.timelineStart && store.timelineEnd) {
    const start = new Date(store.timelineStart).getTime();
    const end = new Date(store.timelineEnd).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      const now = Date.now();
      const timeProgress = Math.min(
        Math.max(((now - start) / (end - start)) * 100, 0),
        100
      );
      return Math.round(milestoneProgress * 0.7 + timeProgress * 0.3);
    }
  }

  return Math.round(milestoneProgress);
}

export function formatCurrency(value: number, short = false): string {
  if (short) {
    if (value >= 10000) return `¥${(value / 10000).toFixed(0)}万`;
    return `¥${value.toLocaleString()}`;
  }
  return `¥${value.toLocaleString()}`;
}

const EUR_RATE = 8.1;

function formatEur(cny: number, short: boolean): string {
  const eur = cny / EUR_RATE;
  if (short) {
    if (eur >= 1000000) return `€${(eur / 1000000).toFixed(1)}M`;
    if (eur >= 1000) return `€${(eur / 1000).toFixed(0)}k`;
    return `€${Math.round(eur).toLocaleString()}`;
  }
  return `€${Math.round(eur).toLocaleString()}`;
}

export function formatDualCurrency(cny: number, short = false): string {
  return `${formatEur(cny, short)} / ${formatCurrency(cny, short)}`;
}
