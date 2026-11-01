import { useEffect, useLayoutEffect, useState } from "react";
import { PROFILE } from "../../data/content";
import { prefersReducedMotion } from "../../utils/motion";
import "./Preloader.css";

// A short name-reveal that plays once per browser session (not on every scroll or refresh).
// To remove it completely, delete <Preloader /> from App.jsx.
const KEY = "preloader-seen";
const HOLD_MS = 1300; // how long the name stays on screen
const EXIT_MS = 850; // slide-up time. Keep in sync with the transition in Preloader.css

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false; // storage can be blocked; just show it
  }
};

export default function Preloader() {
  // show -> leaving -> done
  const [phase, setPhase] = useState(() =>
    prefersReducedMotion || alreadySeen() ? "done" : "show",
  );

  // While the curtain is up, the page behind it can't scroll and the hero's entrance
  // animation is held back (see "is-loading" in Hero.css). It starts as the curtain lifts.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (phase === "show") {
      root.classList.add("is-loading");
      root.style.overflow = "hidden";
    } else if (phase === "leaving") {
      root.classList.remove("is-loading");
    } else {
      root.classList.remove("is-loading");
      root.style.overflow = "";
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "show") {
      const t = setTimeout(() => setPhase("leaving"), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (phase === "leaving") {
      const t = setTimeout(() => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        setPhase("done");
      }, EXIT_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "leaving" ? "leaving" : ""}`} role="status" aria-label="Loading">
      <p className="preloader-name" aria-hidden="true">
        {[...PROFILE.short.toUpperCase()].map((ch, i) => (
          <span key={i} style={{ "--i": i }}>
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}
