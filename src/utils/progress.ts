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
    const now = Date.now();
    const timeProgress = Math.min(
      Math.max(((now - start) / (end - start)) * 100, 0),
      100
    );
    return Math.round(milestoneProgress * 0.7 + timeProgress * 0.3);
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
