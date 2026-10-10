import { PROFILE } from '../../../data/content';
import Reveal from '../../ui/Reveal';
import './Contact.css';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <Reveal>
          <h2 className="h2">Let's talk.</h2>
          <p className="lead">
            I'm looking for a tech internship. If you're hiring, or just want to say hello, my inbox is open.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </Reveal>

        <Reveal className="socials" delay={160}>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </Reveal>

        <div className="foot">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>{PROFILE.location}</span>
        </div>
      </div>
    </section>
  );
}
