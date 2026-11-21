import { useId, useState } from "react";
import Reveal from "../../ui/Reveal";
import Media from "../../ui/Media";
import CountUp from "../../ui/CountUp";
import ArrowLink from "../../ui/ArrowLink";

export default function Project({ project: p }) {
  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);
  const toggleLabel = expanded ? "See less" : "See more";

  return (
    <article className="project">
      <Reveal className="p-top">
        <span className="eyebrow">
          {p.date}
          {p.status && ` · ${p.status}`}
        </span>
        <h3 className="p-title">{p.name}</h3>
        <p className="p-tag">{p.tagline}</p>
        <div className="p-links">
          <ArrowLink href={p.live}>{p.liveLabel ?? "Live demo"}</ArrowLink>
          {p.repo && <ArrowLink href={p.repo}>GitHub</ArrowLink>}
        </div>
      </Reveal>

      {/* tilt = leans toward the mouse, reveal = wipes in when scrolled to */}
      <Media src={p.image} label={`${p.name} screenshot`} fit="natural" tilt reveal />

      <div className="stats">
        {p.stats.map((s, i) => (
          <Reveal className="stat" key={s.label} delay={i * 100}>
            <div className="stat-n">
              <CountUp
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
              />
            </div>
            <div className="stat-l">{s.label}</div>
          </Reveal>
        ))}
      </div>

      <button
        className="p-details-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        aria-label={`${toggleLabel} about ${p.name}`}
        onClick={() => setExpanded((current) => !current)}
      >
        {toggleLabel}
      </button>

      <div className="p-details" id={detailsId}>
        <ul className="points">
          {p.points.map((text, i) => (
            <Reveal as="li" key={i} delay={i * 50}>
              {text}
            </Reveal>
          ))}
        </ul>

        <Reveal className="tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </article>
  );
}
