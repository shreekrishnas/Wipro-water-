import { useEffect, useRef, useState } from 'react';

export function Counter({ value = 0, duration = 900, format = (n) => n.toLocaleString(), className = '' }) {
  const [n, setN] = useState(0);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  useEffect(() => {
    const target = Number(value) || 0;
    const start = performance.now();
    startRef.current = start;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);
  return <span className={className}>{format(Math.round(n))}</span>;
}
