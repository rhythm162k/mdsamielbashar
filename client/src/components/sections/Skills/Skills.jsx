import { SKILLS } from '../../../data/content';
import Reveal from '../../ui/Reveal';
import './Skills.css';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2 className="h2 skills-title">What I work with.</h2>
        </Reveal>

        <div className="skills">
          {SKILLS.map(([category, items], i) => (
            <Reveal className="skill-row" key={category} delay={i * 40}>
              <div className="skill-cat">{category}</div>
              <div className="skill-items">
                {items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
