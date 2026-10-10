import { useRef } from 'react';
import useScrollFrame from '../../../hooks/useScrollFrame';
import { prefersReducedMotion } from '../../../utils/motion';
import { STATEMENT } from '../../../data/content';
import './Statement.css';

// Words brighten one by one as the paragraph moves up the screen.
export default function Statement() {
  const ref = useRef(null);
  const words = STATEMENT.split(' ');

  useScrollFrame(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    const spans = el.querySelectorAll('.w');
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.5 + rect.height)));
    const n = spans.length;
    spans.forEach((span, i) => {
      const t = Math.min(1, Math.max(0, progress * (n + 2) - i));
      span.style.opacity = String(0.2 + 0.8 * t);
    });
  }, { resize: true });

  return (
    <section className="section statement-section">
      <div className="wrap">
        <p className="statement" ref={ref}>
          {words.map((word, i) => (
            <span className="w" key={i}>{word}{i < words.length - 1 ? ' ' : ''}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
