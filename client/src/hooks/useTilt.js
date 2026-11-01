import { useEffect } from 'react';
import { prefersReducedMotion } from '../utils/motion';

// Gives an element a subtle 3D tilt that follows the mouse.
// It only sets two CSS variables (--rx, --ry); the .tilt class in Media.css turns them into a rotation.
// Skipped on touch screens and for people who asked for reduced motion.
export default function useTilt(ref, { enabled = true, max = 6 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5; // -0.5 (left) .. 0.5 (right)
        const y = (e.clientY - r.top) / r.height - 0.5; // -0.5 (top)  .. 0.5 (bottom)
        el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, enabled, max]);
}
