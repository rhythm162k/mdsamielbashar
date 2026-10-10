import "./Button.css";

export default function Button({
  href,
  variant = "primary",
  children,
  ...rest
}) {
  return (
    <a className={`btn btn--${variant}`} href={href} {...rest}>
      {children}
    </a>
  );
}
