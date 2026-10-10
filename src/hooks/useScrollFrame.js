import { useEffect, useRef } from 'react';

// Runs `callback` once, then on every scroll (and optionally resize),
// throttled to one call per animation frame.
export default function useScrollFrame(callback, { resize = false } = {}) {
  const saved = useRef(callback);
  saved.current = callback;

  useEffect(() => {
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => saved.current());
    };
    saved.current();
    window.addEventListener('scroll', run, { passive: true });
    if (resize) window.addEventListener('resize', run);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', run);
      if (resize) window.removeEventListener('resize', run);
    };
  }, [resize]);
}
