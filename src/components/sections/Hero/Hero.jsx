import { useRef } from 'react';
import useScrollFrame from '../../../hooks/useScrollFrame';
import { prefersReducedMotion } from '../../../utils/motion';
import { HERO, PROFILE } from '../../../data/content';
import Button from '../../ui/Button';
import ArrowLink from '../../ui/ArrowLink';
import './Hero.css';

export default function Hero() {
  const inner = useRef(null);

  // The content drifts down and fades as you scroll away from it.
  useScrollFrame(() => {
    const el = inner.current;
    if (!el || prefersReducedMotion) return;
    const h = window.innerHeight;
    const y = Math.min(window.scrollY, h);
    const p = y / h;
    el.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 - p * 0.05})`;
    el.style.opacity = String(Math.max(0, 1 - p * 1.2));
  });

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-inner" ref={inner}>
          <p className="eyebrow hero-eyebrow">{PROFILE.name}</p>
          <h1 className="hero-title">
            <span className="line"><span className="line-in" style={{ '--i': 0 }}>{HERO.line1}</span></span>
            <span className="line"><span className="line-in muted" style={{ '--i': 1 }}>{HERO.line2}</span></span>
          </h1>
          <p className="hero-sub">{HERO.sub}</p>
          <div className="hero-cta">
            <Button href="#work">View my work</Button>
            <ArrowLink href="#contact">Get in touch</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
