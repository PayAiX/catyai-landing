export default function StatusDot({ size = 8, className = '' }) {
  return (
    <span
      className={`status-dot ${className}`}
      style={size !== 8 ? { width: `${size}px`, height: `${size}px` } : undefined}
      aria-hidden="true"
    />
  );
}
