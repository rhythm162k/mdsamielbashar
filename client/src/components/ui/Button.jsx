import "./Button.css";

// Renders a link when you give it an href, otherwise a real <button> (used by the contact form).
export default function Button({ href, variant = "primary", children, ...rest }) {
  const className = `btn btn--${variant}`;
  return href ? (
    <a className={className} href={href} {...rest}>
      {children}
    </a>
  ) : (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
