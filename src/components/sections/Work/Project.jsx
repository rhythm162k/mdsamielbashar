import Reveal from "../../ui/Reveal";
import Media from "../../ui/Media";
import CountUp from "../../ui/CountUp";
import ArrowLink from "../../ui/ArrowLink";

export default function Project({ project: p }) {
  return (
    <article className="project">
      <Reveal className="p-top">
        <span className="eyebrow">{p.date}</span>
        <h3 className="p-title">{p.name}</h3>
        <p className="p-tag">{p.tagline}</p>
        <div className="p-links">
          <ArrowLink href={p.live}>Live demo</ArrowLink>
          <ArrowLink href={p.repo}>GitHub</ArrowLink>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Media src={p.image} label={`${p.name} screenshot`} fit="natural" />
      </Reveal>

      <div className="stats">
        {p.stats.map((s, i) => (
          <Reveal className="stat" key={s.label} delay={i * 100}>
            <div className="stat-n">
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="stat-l">{s.label}</div>
          </Reveal>
        ))}
      </div>

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
    </article>
  );
}
