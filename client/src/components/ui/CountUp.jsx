import { useEffect, useState } from 'react';
import useInView from '../../hooks/useInView';
import { prefersReducedMotion } from '../../utils/motion';

// Counts from 0 to `to` the first time it scrolls into view.
export default function CountUp({ to, prefix = '', suffix = '', decimals = 0 }) {
  const [ref, seen] = useInView();
  const [value, setValue] = useState(() => (0).toFixed(decimals));

  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion) {
      setValue(to.toFixed(decimals));
      return;
    }
    let raf;
    let start;
    const tick = (t) => {
      start = start || t;
      const p = Math.min((t - start) / 1600, 1);
      const progress = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue((to * progress).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix && <small className="unit">{suffix}</small>}
    </span>
  );
}
