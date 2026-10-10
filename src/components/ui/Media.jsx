import "./Media.css";

// An image slot. Shows a quiet placeholder until `src` is provided.
// fit="natural": the container takes the image's own proportions (no cropping).
// fit="cover":   the container keeps `ratio` and the image fills it.
export default function Media({ src, label, ratio = "16 / 9", fit = "cover" }) {
  const natural = fit === "natural" && Boolean(src);
  return (
    <div
      className={`media ${natural ? "media--natural" : ""}`}
      style={natural ? undefined : { aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          loading={natural ? undefined : "lazy"}
          decoding="async"
        />
      ) : (
        <div className="media-empty">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
