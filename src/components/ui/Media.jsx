import "./Media.css";

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
