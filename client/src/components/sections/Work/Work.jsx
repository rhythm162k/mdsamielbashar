import { PROJECTS } from '../../../data/content';
import Reveal from '../../ui/Reveal';
import Blobs from '../../ui/Blobs';
import Project from './Project';
import './Work.css';

export default function Work() {
  return (
    <section className="section work" id="work">
      <Blobs variant="soft" />
      <div className="wrap">
        <Reveal className="work-head">
          <p className="eyebrow">Selected work</p>
          <h2 className="h2">Things I've built.</h2>
        </Reveal>
        {PROJECTS.map((project) => (
          <Project key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
