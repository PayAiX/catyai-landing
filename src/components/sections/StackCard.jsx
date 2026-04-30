/**
 * Single sticky card inside a <StackingCards> wrapper.
 * Pass index 0..4 (StackingCards manages stacking offsets via CSS).
 */
export default function StackCard({ index, tag, tagIcon, children, id }) {
  return (
    <div id={id} className="stack-card" data-index={index}>
      <div className="stack-card-inner">
        {tag && (
          <span className="card-tag">
            {tagIcon}
            {tag}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
