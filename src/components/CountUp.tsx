import { useEffect, useState } from 'react';

export default function CountUp({ end, duration = 800 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (end === 0) { setValue(0); return; }
    const startTime = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return <>{value}</>;
}
