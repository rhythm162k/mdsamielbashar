import { TICKER } from "../../data/content";
import "./Ticker.css";

// A slow, endless scrolling band. The list is repeated 4 times and the track slides by exactly
// one copy (25%), which makes the loop seamless. It is decoration only, so screen readers skip it.
export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1, 2, 3].map((copy) => (
          <ul className="ticker-set" key={copy}>
            {TICKER.map((item) => (
              <li key={item}>
                {item}
                <span>✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
