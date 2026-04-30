export default function SocialIcon({ href, label, children }) {
  return (
    <a href={href} className="social-icon" aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  );
}
