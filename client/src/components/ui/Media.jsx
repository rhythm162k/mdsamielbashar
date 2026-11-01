import useInView from "../../hooks/useInView";
import useTilt from "../../hooks/useTilt";
import "./Media.css";

// A rounded picture frame.
//   tilt   = leans toward the mouse
//   reveal = wipes in from the top the first time it scrolls into view
export default function Media({
  src,
  label,
  ratio = "16 / 9",
  fit = "cover",
  tilt = false,
  reveal = false,
}) {
  const [ref, seen] = useInView();
  useTilt(ref, { enabled: tilt });

  const natural = fit === "natural" && Boolean(src);
  const classes = [
    "media",
    natural && "media--natural",
    reveal && "media--reveal",
    seen && "in",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={`media-wrap ${tilt ? "tilt" : ""}`}>
      <div className={classes} style={natural ? undefined : { aspectRatio: ratio }}>
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
    </div>
  );
}
