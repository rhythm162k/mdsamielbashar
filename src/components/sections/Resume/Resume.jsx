import { RESUME } from "../../../data/content";
import Reveal from "../../ui/Reveal";
import Button from "../../ui/Button";
import "./Resume.css";

export default function Resume() {
  return (
    <section className="section alt resume" id="resume">
      <div className="wrap">
        <Reveal className="resume-in">
          <div>
            <h2 className="h2">Resume.</h2>
            <p className="resume-sub">
              One page with my education, projects and skills.
            </p>
          </div>
          <div className="resume-actions">
            <Button
              href={RESUME.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume
            </Button>
            <Button
              href={RESUME.file}
              download={RESUME.downloadName}
              variant="secondary"
            >
              Download resume
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
