import { useEffect, useRef } from 'react';

/**
 * Container for sticky stacking cards (Taithon-style).
 * Children must be <StackCard /> with data-index 0..N.
 * Applies progressive scale-down + opacity on scroll.
 */
export default function StackingCards({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = root.querySelectorAll('.stack-card');
    const total = cards.length;

    const handleScroll = () => {
      cards.forEach((card, idx) => {
        const inner = card.querySelector('.stack-card-inner');
        if (!inner) return;
        const rect = card.getBoundingClientRect();
        const cardTop = parseInt(getComputedStyle(card).top, 10) || 0;
        const distance = cardTop - rect.top;
        const threshold = window.innerHeight * 0.6;

        if (distance > 0 && idx < total - 1) {
          const progress = Math.min(distance / threshold, 1);
          const scale = 1 - progress * 0.06;
          const opacity = 1 - progress * 0.15;
          inner.style.transform = `scale(${scale})`;
          inner.style.opacity = opacity;
        } else {
          inner.style.transform = 'scale(1)';
          inner.style.opacity = 1;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={ref} className={`stacking-section relative ${className}`}>
      {children}
    </section>
  );
}
