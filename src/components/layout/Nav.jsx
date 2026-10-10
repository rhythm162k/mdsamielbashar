import { useEffect, useState } from 'react';
import useScrollFrame from '../../hooks/useScrollFrame';
import { IMAGES } from '../../data/images';
import { NAV_LINKS, PROFILE } from '../../data/content';
import './Nav.css';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  // Highlight the section currently in view.
  useScrollFrame(() => {
    setSolid(window.scrollY > 8);
    let current = '';
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
    });
    setActive(current);
  });

  // Mobile menu: lock page scroll, close on Escape or when the screen grows.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 760 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav ${solid && !open ? 'solid' : ''} ${open ? 'open' : ''}`}>
        <div className="wrap nav-in">
          <a href="#top" className="brand" onClick={close}>
            {IMAGES.logo ? <img src={IMAGES.logo} alt="" /> : <span className="logo-slot">R</span>}
            <span>{PROFILE.short}</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
            ))}
          </nav>

          <button
            type="button"
            className="menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Sits outside <header>: backdrop-filter would otherwise trap a fixed child. */}
      <div id="mobile-menu" className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} style={{ '--i': i }} onClick={close} tabIndex={open ? 0 : -1}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
