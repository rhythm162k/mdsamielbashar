import './ArrowLink.css';

export default function ArrowLink({ href, children }) {
  const external = typeof href === 'string' && href.startsWith('http');
  return (
    <a className="arrow-link" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children} <span aria-hidden="true">›</span>
    </a>
  );
}
