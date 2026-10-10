import { EDUCATION } from '../../../data/content';
import { IMAGES } from '../../../data/images';
import Reveal from '../../ui/Reveal';
import Media from '../../ui/Media';
import './About.css';

export default function About() {
  return (
    <section className="section alt" id="about">
      <div className="wrap about">
        <Reveal className="about-photo">
          <Media src={IMAGES.portrait} label="Portrait" ratio="4 / 5" />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Education</p>
            <h2 className="h2">{EDUCATION.degree}</h2>
            <p className="school">{EDUCATION.school}</p>
          </Reveal>

          <Reveal as="dl" className="facts" delay={100}>
            {EDUCATION.facts.map(([label, value]) => (
              <div className="fact" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
