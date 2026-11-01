import "./Blobs.css";

// Soft drifting colour behind a section. Put it as the first child of a section that has
// `position: relative; isolation: isolate; overflow: hidden`.
//   variant="soft" = two blobs, fainter (used behind the projects)
export default function Blobs({ variant = "hero" }) {
  return (
    <div className={`blobs blobs--${variant}`} aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
    </div>
  );
}
