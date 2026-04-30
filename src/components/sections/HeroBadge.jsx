/**
 * Pulsing gold badge used at top of hero sections.
 * Default text in RO; can be overridden via children.
 */
export default function HeroBadge({ children = 'CatyAI v3.0 · GEO Infrastructure live' }) {
  return (
    <div className="badge-glow rounded-full px-4 py-1.5 mb-8 inline-flex items-center gap-2 text-xs font-medium text-gold">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
      </span>
      {children}
    </div>
  );
}
