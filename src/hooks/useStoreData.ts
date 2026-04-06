import { useState, useEffect } from 'react';
import type { ProgramData } from '../types/store';

const DATA_URL = import.meta.env.VITE_DATA_URL || './data/default-stores.json';

export function useStoreData() {
  const [data, setData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    // Always fetch fresh data from server — no localStorage cache.
    // This enables remote sync: update the JSON on the server,
    // stakeholders refresh their browser to see the latest state.
    const url = `${DATA_URL}${DATA_URL.includes('?') ? '&' : '?'}t=${Date.now()}`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d: ProgramData) => setData(d))
      .catch(() => {
        setToast({ type: 'error', message: 'error' });
        setTimeout(() => setToast(null), 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  const activeStores = data?.stores.filter(
    (s) => s.status !== 'not_started' || s.type === 'FFS'
  ) ?? [];

  return { data, loading, activeStores, toast };
}
