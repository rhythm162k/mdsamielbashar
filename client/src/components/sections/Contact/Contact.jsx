import { AVAILABLE, PROFILE } from "../../../data/content";
import useInView from "../../../hooks/useInView";
import Reveal from "../../ui/Reveal";
import PulseDot from "../../ui/PulseDot";
import ContactForm from "./ContactForm";
import "./Contact.css";

// The huge name at the bottom. Each letter slides up out of its own mask when it scrolls into view.
function Wordmark({ text }) {
  const [ref, seen] = useInView();
  return (
    <p ref={ref} className={`wordmark ${seen ? "in" : ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((ch, i) => (
          <span className="wm-mask" key={i}>
            <span className="wm-char" style={{ "--i": i }}>
              {ch}
            </span>
          </span>
        ))}
      </span>
    </p>
  );
}

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <Reveal>
          {AVAILABLE.open && (
            <p className="status">
              <PulseDot />
              {AVAILABLE.label}
            </p>
          )}
          <h2 className="h2">Let's talk.</h2>
          <p className="lead">
            If you're hiring, or just want to say hello, my inbox is open.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>

          <Reveal className="contact-side" delay={160}>
            <p className="side-label">Or reach me directly</p>
            <a className="mail" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            <div className="socials">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <p className="where">{PROFILE.location}</p>
          </Reveal>
        </div>

        <Wordmark text={PROFILE.short} />

        <div className="foot">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span>Stay hungry, Stay foolish</span>
        </div>
      </div>
    </section>
  );
}
